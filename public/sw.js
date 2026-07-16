/* PIANC-COPEDEC XI — self-contained PWA service worker (no external CDN). */
const VERSION = 'copedec-xi-v1';
const BASE = '/PIANC-COPEDEC-XI';

// App shell precached on install so the PWA opens offline.
const PRECACHE_URLS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  `${BASE}/offline.html`,
  `${BASE}/icons/icon-192x192.png`,
  `${BASE}/icons/icon-512x512.png`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// ---------------------------------------------------------------------------
// Push notifications
// ---------------------------------------------------------------------------

// Default notification shown if a push arrives with no/invalid payload.
const DEFAULT_NOTIFICATION = {
  title: 'PIANC-COPEDEC XI',
  options: {
    body: 'You have a new update from the conference.',
    icon: `${BASE}/icons/icon-192x192.png`,
    badge: `${BASE}/icons/icon-72x72.png`,
    tag: 'copedec-xi',
    renotify: false,
  },
};

// Parse a push payload into { title, options, url }.
function parsePush(data) {
  let payload = {};
  try {
    payload = data ? JSON.parse(data) : {};
  } catch {
    // Plain-text payload (e.g. a raw message body).
    payload = { body: data };
  }

  const options = {
    body: payload.body || DEFAULT_NOTIFICATION.options.body,
    icon: payload.icon || DEFAULT_NOTIFICATION.options.icon,
    badge: payload.badge || DEFAULT_NOTIFICATION.options.badge,
    image: payload.image,
    tag: payload.tag || DEFAULT_NOTIFICATION.options.tag,
    renotify: payload.renotify ?? DEFAULT_NOTIFICATION.options.renotify,
    requireInteraction: payload.requireInteraction ?? false,
    data: {
      url: payload.url ? `${BASE}${payload.url.startsWith('/') ? '' : '/'}${payload.url}` : `${BASE}/`,
      ...(payload.data || {}),
    },
    // Action buttons (optional). Each action's `action` is echoed on click.
    actions: Array.isArray(payload.actions)
      ? payload.actions.slice(0, 2).map((a) => ({ action: a.action, title: a.title }))
      : undefined,
  };

  return { title: payload.title || DEFAULT_NOTIFICATION.title, options };
}

self.addEventListener('push', (event) => {
  const { title, options } = parsePush(event.data ? event.data.text() : null);
  event.waitUntil(self.registration.showNotification(title, options));
});

// Open/focus the app when a notification is clicked. Honors deep-link `url`.
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const targetUrl = (notification.data && notification.data.url) || `${BASE}/`;
  notification.close();

  // Respect action buttons if present.
  if (event.action && notification.data && notification.data[`action:${event.action}`]) {
    // Custom deep-link supplied per action (optional). Falls through to targetUrl.
  }

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus an already-open window at the target URL if possible.
        for (const client of clientList) {
          if ('focus' in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }
        // Otherwise open a new window.
        if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
      })
  );
});

// Keep push subscriptions alive across application-server-key rotations.
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    self.registration.pushManager
      .subscribe({ userVisibleOnly: true, applicationServerKey: event.oldSubscription?.options?.applicationServerKey })
      .then((subscription) => {
        // App should re-send the subscription to its backend; we just log here.
        console.log('Push subscription renewed:', subscription.endpoint);
      })
      .catch((err) => console.warn('Resubscribe failed:', err))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Only handle same-origin requests under our base path.
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;

  // Network-first for navigation requests, fall back to cache / offline page.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(`${BASE}/offline.html`))
        )
    );
    return;
  }

  // Cache-first for static assets (JS/CSS/icons/images), populate on use.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.status === 200) {
          const copy = response.clone();
          caches.open(VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
