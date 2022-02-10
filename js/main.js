// Make sure service workers are supported
if('serviceWorker' in navigator){
    // console.log(navigator);
    window.addEventListener('load', () =>{
        navigator.serviceWorker
        .register('../sw_cached_pages.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service worker: Error: ${err}`))
    })
}
// console.log(navigator)



// Am not yet cleared on the below.....................

// if('serviceWorker' in navigator){
//     window.addEventListener('load', () =>{
//         var webWorker = new Worker('../sw_cached_pages.js');
//     })
// }