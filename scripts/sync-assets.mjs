import fs from 'fs';
import path from 'path';

const distHtmlPath = path.resolve(process.cwd(), 'dist', 'index.html');
const outPath = path.resolve(process.cwd(), 'backend', 'builtAssets.json');

const html = fs.existsSync(distHtmlPath) ? fs.readFileSync(distHtmlPath, 'utf8') : '';

const cssHrefs = [];
const jsSrcs = [];

for (const m of html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi)) {
  cssHrefs.push(m[1]);
}
for (const m of html.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']stylesheet["'][^>]*>/gi)) {
  if (!cssHrefs.includes(m[1])) cssHrefs.push(m[1]);
}
for (const m of html.matchAll(/<script[^>]+type=["']module["'][^>]*src=["']([^"']+)["'][^>]*>/gi)) {
  if (!m[1].includes('src/main.tsx')) {
    jsSrcs.push(m[1]);
  }
}

fs.writeFileSync(outPath, JSON.stringify({ cssHrefs, jsSrcs }, null, 2) + '\n', 'utf8');
console.log('[sync-assets] Extracted built assets:', { cssHrefs, jsSrcs });
