
const CACHE_NAME = 'mumet-cache-v1';
const OFFLINE_URL = '/offline.html';
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['/','/index.html','/style.css','/script.js','/offline.html'])));
});
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)).catch(()=>caches.match(OFFLINE_URL)));
});
