self.__precacheManifest = [
  {
    "url": "/_next/static/NN-sLtnH4PQ0IRjLpn98P/pages/_app.js",
    "revision": "4327484cc8f2a2c9126b"
  },
  {
    "url": "/_next/static/NN-sLtnH4PQ0IRjLpn98P/pages/_error.js",
    "revision": "0e22077a00884aae4234"
  },
  {
    "url": "/_next/static/NN-sLtnH4PQ0IRjLpn98P/pages/index.js",
    "revision": "8b5251c891754e0b49ae"
  },
  {
    "url": "/_next/static/NN-sLtnH4PQ0IRjLpn98P/pages/test.js",
    "revision": "2983a600e41b1f66e4a9"
  },
  {
    "url": "/_next/static/NN-sLtnH4PQ0IRjLpn98P/pages/test/[id].js",
    "revision": "b30708cb9c7a2399c1e7"
  },
  {
    "url": "/_next/static/chunks/commons.15f38dc553a22e357b68.js",
    "revision": "5c45f1c96fef515156c8"
  },
  {
    "url": "/_next/static/runtime/main-caf4201b982e86790db4.js",
    "revision": "ef78f7a4d2375451ab5b"
  },
  {
    "url": "/_next/static/runtime/webpack-035ac2b14bde147cb4a8.js",
    "revision": "be4b6cc6d10632d2262c"
  }
];

/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "static/favicon.ico",
    "revision": "05eb92df17aecfe9ff39edd73259dfea"
  },
  {
    "url": "static/icon-192x192.png",
    "revision": "dc8e10cc446e8ffd2821af8dfc1bf698"
  },
  {
    "url": "static/icon-512x512.png",
    "revision": "80eeb2081c9dca8d504ecc07df82cdcf"
  },
  {
    "url": "static/manifest.json",
    "revision": "d7fe32a7104d09eb0aca5c6a20480db7"
  },
  {
    "url": "static/service-worker.js",
    "revision": "bb75e58c429c86b6e4ff74617fbc35c2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https?.*/, new workbox.strategies.NetworkFirst({ "cacheName":"offlineCache", plugins: [new workbox.expiration.Plugin({ maxEntries: 200, purgeOnQuotaError: false })] }), 'GET');
