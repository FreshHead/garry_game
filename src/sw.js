const version = '0.6';
const assetCacheName = `assets-${version}`;
self.addEventListener("install", event => {
    event.waitUntil(caches.open(assetCacheName).then(cache => {
        console.log("Cache opened!")
        return cache.addAll([
            "/",
            "/style.css",
            "https://code.jquery.com/jquery-3.4.1.min.js",
            "/js/main.js",
            "/js/field.js",
            "/js/utils.js",
            "/js/line.js",
            "/manifest.json",
            "/img/bg.webp",
            "/img/bg_phone.webp",
            "/img/open_mouth.png",
            "/img/open_mouth_phone.png",
            "/img/tiles/apple.svg",
            "/img/tiles/meat.svg",
            "/img/tiles/pizza.svg",
            "/img/tiles/rice.svg",
            "/img/tiles/sweet.svg"
        ]).then(() => {
            console.log("Cache successfully added!");
        });
    }).catch(error => {
        console.error(error);
    }));
});

self.addEventListener("activate", event => {
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if (cacheName !== assetCacheName) {
                return caches.delete(cacheName);
            }
        }));
    }))
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method === 'GET') {
        event.respondWith(
            caches.match(request).then((response) => {
                if (response) {
                    return response;
                }
                return fetch(request).then((response) => {
                    return response;
                })
            })
        );
    }
});