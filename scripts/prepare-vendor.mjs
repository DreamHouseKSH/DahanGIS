import { mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

// Serve the existing legacy-page JavaScript locally; CSS and icon fonts are bundled by Next.
const root = process.cwd();
const target = join(root, 'public/vendor');
await mkdir(target, { recursive: true });
await copyFile(join(root, 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'), join(target, 'bootstrap.bundle.min.js'));
await copyFile(join(root, 'node_modules/bootstrap/LICENSE'), join(target, 'bootstrap.LICENSE.txt'));
