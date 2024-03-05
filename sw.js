const broadcastChannel = new BroadcastChannel("sw_channel");

const staticCacheName = 's-app-v3'
const dynamicCacheName = 'd-app-v3'

const assetUrls = [
    'index.html',
    '/js/app.js',
    '/css/styles.css',
    'about.html',
    'contacts.html',
    'Log.html',
    'offline.html'
]

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
    broadcastChannel.postMessage("SW INSTALLED");
})

self.addEventListener('activate', async event => {
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames
            .filter(name => name !== staticCacheName)
            .filter(name => name !== dynamicCacheName)
            .map(name => caches.delete(name))
    )
    broadcastChannel.postMessage("SW ACTIVATED");
})

self.addEventListener('fetch', event => {
    const { request } = event
    broadcastChannel.postMessage("SW FETCHED");
    const url = new URL(request.url)
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }


})

async function cacheFirst(request) {
    const cached = await caches.match(request)
    broadcastChannel.postMessage("SW FETCHED (CacheFirst)");
    return cached ?? await fetch(request)
}

async function networkFirst(request) {
    broadcastChannel.postMessage("SW FETCHED (NetworkFirst)");
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await cache.match(request)
        return cached ?? await caches.match('/offline.html')
    }
}