// Renders the 3D style frames to PNG with headless Chrome (software WebGL). Needs the preview server on :8765.
import { spawnSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '3d'); mkdirSync(out, { recursive: true });
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const jobs = [['hero', 'hero-still.png', 1600, 1000, false], ['kettlebell', 'icon-kettlebell.png', 900, 900, true], ['card', 'icon-appointment-card.png', 900, 900, true]];
for (const [scene, file, w, h, alpha] of jobs) {
  const args = ['--headless=new', '--hide-scrollbars', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', `--window-size=${w},${h}`, '--virtual-time-budget=20000',
    ...(alpha ? ['--default-background-color=00000000'] : []), `--screenshot=${join(out, file)}`, `http://127.0.0.1:8765/design/phase1/three-frames.html?scene=${scene}`];
  const r = spawnSync(chrome, args, { encoding: 'utf8', timeout: 120000 });
  console.log(r.status === 0 ? 'ok  ' : 'FAIL', file);
}
