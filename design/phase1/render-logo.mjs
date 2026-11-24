// Renders PNGs (and favicon.ico) from public/brand SVGs using headless Chrome/Edge.
// Run after build-logo.mjs: node design/phase1/render-logo.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BRAND = join(ROOT, 'public', 'brand'), PNG = join(BRAND, 'png');
mkdirSync(PNG, { recursive: true });
const TMP = mkdtempSync(join(tmpdir(), 'yw-render-'));

const BROWSERS = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'];
const chrome = BROWSERS.find(existsSync);
if (!chrome) throw new Error('No Chrome or Edge found');

// [source svg, output png, width, height, transparent]
const JOBS = [
  ['favicon.svg', 'favicon-16.png', 16, 16, true],
  ['favicon.svg', 'favicon-32.png', 32, 32, true],
  ['favicon.svg', 'favicon-48.png', 48, 48, true],
  ['icon-maskable.svg', 'apple-touch-icon-180.png', 180, 180, false],
  ['icon-maskable.svg', 'icon-192.png', 192, 192, false],
  ['icon-maskable.svg', 'icon-512.png', 512, 512, false],
  ['avatar.svg', 'avatar-800.png', 800, 800, false],
  ['og-template.svg', 'og-1200x630.png', 1200, 630, false],
  ['mark-color.svg', 'mark-color-1024.png', 1024, 1024, true],
  ['mark-color-glow.svg', 'mark-color-glow-1024.png', 1024, 1024, true],
  ['lockup-horizontal.svg', 'lockup-horizontal-1600.png', 1600, 300, true],
  ['lockup-horizontal-reversed.svg', 'lockup-horizontal-reversed-1600.png', 1600, 300, true],
  ['lockup-stacked.svg', 'lockup-stacked-1200.png', 1200, 900, true],
];

const FONT = '<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&display=swap" rel="stylesheet">';
for (const [src, out, w, h, transparent] of JOBS) {
  const svg = readFileSync(join(BRAND, src), 'utf8').replace(/^<svg /, `<svg width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" `);
  const html = join(TMP, out.replace('.png', '.html'));
  writeFileSync(html, `<!doctype html><meta charset="utf-8">${FONT}<style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}svg{display:block}</style><body>${svg}</body>`);
  const args = ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${w},${h}`, '--virtual-time-budget=8000',
    ...(transparent ? ['--default-background-color=00000000'] : []), `--screenshot=${join(PNG, out)}`, pathToFileURL(html).href];
  const r = spawnSync(chrome, args, { encoding: 'utf8', timeout: 60000 });
  console.log(r.status === 0 ? 'ok  ' : 'FAIL', out);
}

// favicon.ico: PNG-compressed entries at 16, 32 and 48 px
const sizes = [16, 32, 48];
const imgs = sizes.map((s) => readFileSync(join(PNG, `favicon-${s}.png`)));
const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dirs = imgs.map((img, i) => { const e = Buffer.alloc(16); e[0] = sizes[i]; e[1] = sizes[i]; e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(img.length, 8); e.writeUInt32LE(offset, 12); offset += img.length; return e; });
writeFileSync(join(BRAND, 'favicon.ico'), Buffer.concat([head, ...dirs, ...imgs]));
console.log('ok   favicon.ico');
