const CACHE = 'garage-asani-disabled-v6';
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
