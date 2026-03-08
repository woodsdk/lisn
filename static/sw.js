// Lisn Service Worker — offline shell caching
const CACHE = 'lisn-v1';
const SHELL = [
  '/',
  '/static/css/lisn.css',
  '/static/js/app.js',
  '/static/js/store.js',
  '/static/js/api.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('/api/')) return; // Don't cache API calls
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
