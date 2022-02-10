const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'css/style.css',
    'js/main.js'
];


//Call Install event

self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
    // console.log(e)
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())// this line I don't really understand it for now
    );
})

// Call Activate Event

self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated')
    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            // return Promise.all(  // If you want you can incude this line and the closing one.... 
            cacheNames.map(cache => {
                if (cache !== cacheName) {
                    console.log('Service worker: Clearing Old Cache');
                    return caches.delete(cache);
                }
            })
            // )
        })
    )
})


// Call Fetch Event

self.addEventListener('fetch', (e) => {
    console.log('Service worker: Fetching');
    // console.log(e)
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})
