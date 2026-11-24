// Renders each homepage section at 1440 and 360 px wide to design/phase1/homepage/. Needs the preview server on :8765.
import { spawnSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'homepage'); mkdirSync(out, { recursive: true });
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const all = ['hero','ticker','problem','industries','services','showcase','why','process','vision','faq','contact','footer','notfound'];
const only = process.argv[2] ? process.argv[2].split(',') : all;
const widths = process.argv[3] ? process.argv[3].split(',').map(Number) : [1440, 360];
const base = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=9000'];
for (const w of widths) for (const s of only) {
  const mob = w < 700; const url = `http://127.0.0.1:8765/design/phase1/${mob ? 'homepage-mobile' : 'homepage'}.html?only=${s}`; const W = mob ? 400 : w;
  const d = spawnSync(chrome, [...base, `--window-size=${W},900`, '--dump-dom', url], { encoding: 'utf8', timeout: 90000, maxBuffer: 1 << 26 });
  const m = /data-h="(\d+)"/.exec(d.stdout || ''); const h = Math.min(Math.max(m ? +m[1] : 900, 300), 6000);
  const r = spawnSync(chrome, [...base, `--window-size=${W},${h}`, `--screenshot=${join(out, `${s}-${w}.png`)}`, url], { encoding: 'utf8', timeout: 90000 });
  console.log(r.status === 0 ? 'ok  ' : 'FAIL', `${s}-${w}`, h);
}
