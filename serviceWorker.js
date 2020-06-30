const CACHE_NAME = "handaCoffee-v5";
let assets = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/images/bags-coffee.jpg",
  "/images/bags-of-coffee-2.jpg",
  "/images/coffee-break.svg",
  "/images/coffee-laptop.jpg",
  "/images/pouring-beans.jpg",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/pages/about.html",
  "/pages/home.html",
  "/pages/howItWorks.html",
  "/pages/order.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/script.js",
  "/js/materialize.min.js",
  "/js/nav.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches
      .match(fetchEvent.request, { cacheName: CACHE_NAME })
      .then((response) => {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          fetchEvent.request.url
        );
        return fetch(fetchEvent.request);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
