// Retire every older Garage Asani offline worker when the browser checks for updates.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key.startsWith('garage-asani')).map(key => caches.delete(key)));
  await self.clients.claim();
  await self.registration.unregister();
})()));
