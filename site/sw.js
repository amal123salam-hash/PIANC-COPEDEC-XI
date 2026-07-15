const CACHE_NAME = 'copedec-9-v1';
// Must match the repo's GitHub Pages base path (see vite.config.ts `base`).
// Service worker cache URLs are resolved from the ORIGIN, so they need the
// full /PIANC-COPEDEC-9/ prefix or addAll() 404s and the worker fails to install.
const BASE = '/PIANC-COPEDEC-9';
const STATIC_ASSETS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: network-first for API calls, cache-first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Always go network-first for API requests (Gemini)
  if (
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('generativelanguage') ||
    url.pathname.startsWith('/api/')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Cache successful GET responses
          if (request.method === 'GET' && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to index.html for navigation requests (SPA routing)
          if (request.mode === 'navigate') {
            return caches.match(`${BASE}/index.html`);
          }
        });
    })
  );
});
