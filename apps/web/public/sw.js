/* TMStock PWA service worker.
   Purpose: make the site installable and behave like a real app once it's on
   the home screen — instant relaunch, and it still opens (with a readable
   page) when the phone has no signal.
   Strategy: cache-first for immutable build assets, network-first for pages
   with a cached fallback, stale-while-revalidate for photos and icons. */

const VERSION = "tmstock-v1";
const SHELL = `${VERSION}-shell`;
const ASSETS = `${VERSION}-assets`;
const OFFLINE_URL = "/";

const PRECACHE = ["/", "/saved", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== SHELL && key !== ASSETS).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Let the page tell a waiting worker to take over immediately.
self.addEventListener("message", (event) => {
  if (event.data === "skip-waiting") self.skipWaiting();
});

// Build output is content-hashed, so a cached copy can never be wrong.
function isImmutable(url) {
  return url.pathname.startsWith("/_next/static/");
}

// Photos and icons live at fixed paths and CAN be replaced in place, so they are
// served from cache but refreshed in the background. /_next/image is included so
// the optimized catalog photos someone already viewed still show up offline.
function isRevalidatingAsset(url) {
  return (
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/catalog/") ||
    url.pathname.startsWith("/brand/") ||
    /\.(png|jpe?g|svg|webp|avif|ico|woff2?)$/i.test(url.pathname)
  );
}

function putInCache(name, request, response) {
  if (!response || !response.ok) return;
  const copy = response.clone();
  caches
    .open(name)
    .then((cache) => cache.put(request, copy))
    .catch(() => {});
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  // Pages: network first, so content is always fresh; cache as an offline net.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          putInCache(SHELL, req, res);
          return res;
        })
        .catch(() =>
          caches
            .match(req)
            .then((hit) => hit || caches.match(OFFLINE_URL))
            .then((hit) => hit || Response.error())
        )
    );
    return;
  }

  // Hashed build output: straight from cache, no revalidation needed.
  if (isImmutable(url)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            putInCache(ASSETS, req, res);
            return res;
          })
      )
    );
    return;
  }

  // Replaceable assets: answer from cache instantly, then refresh in the background.
  if (isRevalidatingAsset(url)) {
    event.respondWith(
      caches.match(req).then((hit) => {
        const fresh = fetch(req)
          .then((res) => {
            putInCache(ASSETS, req, res);
            return res;
          })
          .catch(() => hit);
        return hit || fresh;
      })
    );
  }
});
