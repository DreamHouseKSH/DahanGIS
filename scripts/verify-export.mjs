import assert from 'node:assert/strict';
import { access, readFile, stat, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve('out');
const origin = 'https://dahangis.co.kr';
const paths = ['/', '/services/', '/contact/', '/about/', '/service-ortho/', '/service-data/', '/service-consulting/', '/service-software/', '/service-education/'];
for (const path of paths) {
  const html = await readFile(join(root, path, 'index.html'), 'utf8');
  const canonicals = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(canonicals, [`${origin}${path}`], `Incorrect canonical for ${path}`);
  assert(html.includes('<title>'), `Missing title: ${path}`);
  assert(!html.includes('/_next/image?'), `Server image optimizer leaked into static export: ${path}`);
  for (const [, raw] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    const pathname = decodeURIComponent(raw.split(/[?#]/)[0]);
    if (!pathname) continue;
    const file = join(root, pathname);
    const info = await stat(file).catch(() => null);
    assert(info, `Broken local asset/link in ${path}: ${pathname}`);
    if (info.isDirectory()) await access(join(file, 'index.html'));
  }
}
await access(join(root, '404.html'));
assert.equal((await readFile(join(root, 'CNAME'), 'utf8')).trim(), 'dahangis.co.kr');
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
for (const path of paths) assert(sitemap.includes(`${origin}${path}`), `Sitemap missing ${path}`);
assert((await readFile(join(root, 'robots.txt'), 'utf8')).includes(`${origin}/sitemap.xml`));
await writeFile(join(root, '.nojekyll'), '');
await writeFile(join(root, 'version.json'), JSON.stringify({ revision: process.env.GITHUB_SHA || 'local', builtAt: new Date().toISOString() }) + '\n');
console.log(`Static export verified: ${paths.length} public routes, local assets, canonical URLs, sitemap, robots, CNAME, 404 and .nojekyll.`);
