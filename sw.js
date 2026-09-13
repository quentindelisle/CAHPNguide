// Service worker — Pas à pas CCF EPS
// Incrémentez CACHE_VERSION à chaque publication pour forcer la mise à jour
// du cache chez les utilisateurs (ex: "ccf-eps-2026-06-12").
const CACHE_VERSION = 'ccf-eps-v15';
const CACHE_NAME = `ccf-eps-guide-${CACHE_VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/logo-cahpnantes.jpg',
  './assets/intro-apps.png',
  './assets/logo-demarche-numerique.png',
  './assets/logo-cyclades.png',
  './assets/logo-santorin.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-16.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Page HTML : réseau en priorité (pour récupérer les mises à jour du contenu),
  // repli sur le cache si hors-ligne.
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Assets statiques (icônes, images, manifest) : cache en priorité.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        return res;
      });
    })
  );
});

// Permet à la page de forcer l'activation immédiate d'une nouvelle version
// (utilisé par le bouton "Vérifier les mises à jour" de l'interface Administration).
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
