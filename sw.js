self.addEventListener('install', event => {
  console.log('Service worker installed!');
  event.waitUntil(
    caches.open('my-cache-v1')
    .then(cache => {


       return cache.addAll([
         './index.html',
         './style.css',
         '/script.js'
     // Add other files you want to cache here
       ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(

    caches.match(event.request)
   .then(response => {
     if (response) {
       console.log('Loading from cache:', event.request.url);
       return response;
     } 
     // Fetch from network if not in cache
     console.log('Loading from network:', event.request.url);
     return fetch(event.request);
   })
 );
});