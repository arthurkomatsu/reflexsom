/// <reference lib="webworker" />

const CACHE_NAME = 'reflex-som-v2';
const STATIC_CACHE = 'reflex-som-static-v2';
const DYNAMIC_CACHE = 'reflex-som-dynamic-v2';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/assets/logo-reflex-som.png',
  '/assets/hero-bg.jpg',
];

// Assets that should use stale-while-revalidate strategy
const STALE_WHILE_REVALIDATE_PATTERNS = [
  /\/assets\//,
  /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
];

// Assets that should be cached for a long time
const CACHE_FIRST_PATTERNS = [
  /\.(?:js|css)$/,
  /fonts\.googleapis\.com/,
  /fonts\.gstatic\.com/,
];

/**
 * Check if a request matches any pattern in the array
 */
function matchesPattern(url, patterns) {
  return patterns.some((pattern) => pattern.test(url));
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

/**
 * Stale-while-revalidate strategy
 * Returns cached response immediately, then updates cache in background
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

/**
 * Cache-first strategy
 * Returns cached response if available, otherwise fetches from network
 */
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

/**
 * Network-first strategy
 * Tries network first, falls back to cache
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
      return caches.match('/');
    }
    return new Response('Offline', { 
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// Fetch event - use appropriate caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (except fonts)
  if (!url.startsWith(self.location.origin) && 
      !url.includes('fonts.googleapis.com') && 
      !url.includes('fonts.gstatic.com')) {
    return;
  }

  // Use cache-first for static assets (JS, CSS, fonts)
  if (matchesPattern(url, CACHE_FIRST_PATTERNS)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Use stale-while-revalidate for images
  if (matchesPattern(url, STALE_WHILE_REVALIDATE_PATTERNS)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Use network-first for everything else (HTML, API calls)
  event.respondWith(networkFirst(request));
});

// TypeScript needs this to make the file a module
export {};
