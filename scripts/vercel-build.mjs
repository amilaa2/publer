import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cwd } from 'node:process';

const root = cwd();

console.log('[vercel-build] cwd:', root);
console.log('[vercel-build] package.json:', existsSync('package.json'));
console.log('[vercel-build] vite.config.js:', existsSync('vite.config.js'));

const viteBin = './node_modules/vite/bin/vite.js';
const result = spawnSync(process.execPath, [viteBin, 'build'], {
  stdio: 'inherit',
  cwd: root,
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
