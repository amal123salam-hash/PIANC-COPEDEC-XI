import React, { createContext, useContext } from 'react';
import { useWishlist } from '../hooks/useWishlist';

const WishlistContext = createContext<ReturnType<typeof useWishlist> | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const wishlist = useWishlist();
  return <WishlistContext.Provider value={wishlist}>{children}</WishlistContext.Provider>;
}

export function useWishlistContext() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlistContext must be used within a WishlistProvider');
  return ctx;
}
