import { readdir, mkdir, rm, stat } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import sharp from 'sharp';

const root = join(process.cwd(), 'public', 'images');
const destination = join(root, 'optimized');
const widths = [320, 640, 960, 1280, 1920];
async function collect(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'optimized') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(path));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) files.push(path);
  }
  return files;
}
const files = await collect(root);
await rm(destination, { recursive: true, force: true });
let originalBytes = 0;
let sampleBytes = 0;
for (const file of files) {
  originalBytes += (await stat(file)).size;
  for (const width of widths) {
    const output = join(destination, `${relative(root, file)}.${width}.webp`);
    await mkdir(dirname(output), { recursive: true });
    const info = await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 4 }).toFile(output);
    if (width === 1280) sampleBytes += info.size;
  }
}
console.log(`Images: ${files.length} originals, ${files.length * widths.length} static WebP variants. Original bytes=${originalBytes}; 1280px variant bytes=${sampleBytes}.`);
