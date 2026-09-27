import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.env.STATIC_ROOT || 'out');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2' };
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method || '')) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
  let url;
  let file;
  try {
    url = new URL(request.url || '/', 'http://localhost');
    file = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (file !== root && !file.startsWith(root + sep)) throw new Error('Outside static root');
  } catch { response.writeHead(400); response.end('Bad request'); return; }
  try {
    const info = await stat(file);
    if (info.isDirectory()) {
      if (!url.pathname.endsWith('/')) { response.writeHead(308, { Location: `${url.pathname}/${url.search}` }); response.end(); return; }
      file = resolve(file, 'index.html');
    }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(request.method === 'HEAD' ? undefined : await readFile(resolve(root, '404.html')).catch(() => 'Not found'));
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Static preview: http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
