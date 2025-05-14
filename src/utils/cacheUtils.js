export const cacheAssets = async (assets) => {
    const cache = await caches.open('v1');
    await cache.addAll(assets);
};

export const fetchFromCache = async (request) => {
    const cache = await caches.open('v1');
    const response = await cache.match(request);
    return response || fetch(request);
};

export const clearCache = async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
        })
    );
};