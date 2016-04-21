/**
 * Service Workers enable offline and efficient online mobile web app experiences.
 * For example, we can efficiently cache assets that our app will often reuse, and do it
 * ahead of the app launch to for a fast initial app load experience.
 *
 * Service Workers also enable push notification support in Chrome and other mobile browsers, among
 * many other features.
 *
 * Some great resources on Service Workers:
 * https://davidwalsh.name/offline-recipes-service-workers
 * https://davidwalsh.name/cache
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 * https://github.com/mdn/sw-test
 * https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web?hl=en
 */
var CACHE_NAME = 'my-cache';

this.addEventListener('install', function(event) {
  // Handle the "install" Service Worker event.
  //
  // This is where we might cache some resources ahead of time to
  // improve our initial app loading experience.
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/js/style.css',
        '/js/app.js'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  // Handle the "fetch" Service Worker event

   caches.match(event.request).then(function(response) {
     // We had a cache hit and can return the response
     if (response) {
       return response;
     }

     // Object not found in cache, perform a full fetch
     return fetch(event.request);
   });
});

this.addEventListener('push', function(event) {
  // Handle the "push" Service Worker event
  // See this Chrome article on using Push Notifications on the web:
  // https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web?hl=en
});

this.addEventListener('activate', function(event) {
  // 
  event.waitUntil(self.clients.claim());
});
