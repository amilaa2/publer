import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const root = cwd();
const distDir = resolve(root, 'dist');
const indexPath = resolve(distDir, 'index.html');

console.log('[verify-dist] cwd:', root);

if (!existsSync(distDir)) {
  console.error('[verify-dist] ERROR: dist/ folder does not exist');
  process.exit(1);
}

if (!existsSync(indexPath)) {
  console.error('[verify-dist] ERROR: dist/index.html is missing');
  console.error('[verify-dist] dist contents:', readdirSync(distDir));
  process.exit(1);
}

const files = readdirSync(distDir, { recursive: true });
console.log('[verify-dist] OK — dist/index.html exists');
console.log('[verify-dist] files:', files.length);
