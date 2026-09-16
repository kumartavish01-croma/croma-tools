// Purane worker ko turant replace karega
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Purana saara cache delete karega taaki purana app load na ho sake
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

// Har request ko block karke custom HTML message return karega
self.addEventListener('fetch', (event) => {
  // Page load requests (HTML documents) ko intercept karein
  if (event.request.mode === 'navigate') {
    const shutdownHTML = `
      <!DOCTYPE html>
      <html lang="hi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>App Shifted</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
          body {
            background-color: #0f172a;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            text-align: center;
          }
          .card {
            background: #1e293b;
            padding: 30px 24px;
            border-radius: 16px;
            max-width: 420px;
            width: 100%;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            border: 1px solid #334155;
          }
          h2 { color: #f87171; margin-bottom: 16px; font-size: 22px; }
          p { color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
          .highlight { font-weight: bold; color: #38bdf8; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Notice / Suchna</h2>
          <p>Yeh app badal kar <span class="highlight">naye app</span> par chala gaya hai.</p>
          <p>Kripya <strong>Admin se contact karke new app le lein</strong>.</p>
          <p>Thank you!</p>
        </div>
      </body>
      </html>
    `;

    event.respondWith(
      new Response(shutdownHTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    );
  }
});
