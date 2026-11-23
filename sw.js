// Lưu ứng dụng vào máy để dùng khi không có mạng.
// Khi sửa index.html, đổi số phiên bản dưới đây để điện thoại tải bản mới.
const CACHE = 'so-chi-tieu-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Mở từ bộ nhớ máy ngay (chạy được khi mất mạng), đồng thời cập nhật ngầm khi có mạng.
// Font chữ Nunito từ Google Fonts cũng được lưu lại để dùng khi offline.
self.addEventListener('fetch', e => {
  const url = e.request.url;
  const same = url.startsWith(self.location.origin);
  const font = url.startsWith('https://fonts.googleapis.com/') || url.startsWith('https://fonts.gstatic.com/');
  if (e.request.method !== 'GET' || (!same && !font)) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request, {ignoreSearch: same}) ||
        (e.request.mode === 'navigate' ? await cache.match('./index.html') : undefined);
      if (cached && font) return cached; // font không đổi, khỏi tải lại
      const network = fetch(e.request)
        .then(res => { if (res.ok || res.type === 'opaque') cache.put(e.request, res.clone()); return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
