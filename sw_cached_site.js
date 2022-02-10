const cacheName = 'v2';



//Call Install event

self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
    // console.log(e)
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
        fetch(e.request)
        .then( res => {
            //Make a copy/clone of response
            const resClone = res.clone();
            //Open a cache
            caches
                .open(cacheName)
                .then( cache => {
                    // Add the response to the cache
                    cache.put(e.request, resClone);
                });
                return res;
        }).catch( err => caches.match(e.request).then(res => res))
    );
});
