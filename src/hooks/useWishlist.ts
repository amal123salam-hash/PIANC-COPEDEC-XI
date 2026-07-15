import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'copedec9.wishlist';

function readStore(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

/**
 * Persisted personal schedule ("wishlist"). Stored as an array of session ids in
 * localStorage so it survives reloads and works without a backend. Listens for
 * cross-tab updates so changes sync across open tabs.
 */
export function useWishlist() {
  const [ids, setIds] = useState<string[]>(readStore);

  // Hydrate on mount (covers the SSR/no-window guard) and sync across tabs.
  useEffect(() => {
    setIds(readStore());
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setIds(readStore());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage may be unavailable (private mode); the in-memory copy still works */
    }
  }, []);

  const isWishlisted = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      persist(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
    },
    [ids, persist],
  );

  const add = useCallback(
    (id: string) => {
      if (!ids.includes(id)) persist([...ids, id]);
    },
    [ids, persist],
  );

  const remove = useCallback(
    (id: string) => persist(ids.filter((x) => x !== id)),
    [ids, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);

  return { ids, isWishlisted, toggle, add, remove, clear, count: ids.length };
}
