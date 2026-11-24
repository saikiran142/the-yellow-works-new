// Renders each style frame to PNG at 1440 wide (needs the preview server on :8765 for the logo images).
import { spawnSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'frames'); mkdirSync(out, { recursive: true });
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const names = ['A-hero','A-industries','B-hero','B-industries','C-hero','C-industries'], heights = [820,760,820,760,820,760];
names.forEach((n, i) => {
  const r = spawnSync(chrome, ['--headless=new','--disable-gpu','--hide-scrollbars',`--window-size=1440,${heights[i]}`,'--virtual-time-budget=8000',`--screenshot=${join(out, n + '.png')}`,`http://127.0.0.1:8765/design/phase1/style-frames.html?only=${i}`], { encoding: 'utf8', timeout: 60000 });
  console.log(r.status === 0 ? 'ok  ' : 'FAIL', n);
});
