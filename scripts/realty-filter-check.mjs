// Real-browser check of the property filter chips on /demos/real-estate: counts cards and aria-pressed per chip.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const url = process.argv[2] ?? 'http://127.0.0.1:3100/demos/real-estate';
const chromePath = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const proc = spawn(chromePath, ['--headless=new', '--disable-gpu', '--remote-debugging-port=9336', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'yw-cdp-'))}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t; for (let i = 0; i < 40; i++) { try { t = await (await fetch('http://127.0.0.1:9336/json/list')).json(); if (t.length) break; } catch {} await sleep(250); }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.result?.value;
await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url }); await sleep(3500);
const out = [];
for (const label of ['All properties', 'Apartments', 'Villas', 'Plots', 'All properties']) {
  await ev(`[...document.querySelectorAll('.dr-chip')].find(b=>b.textContent==='${label}').click()`); await sleep(300);
  out.push(await ev(`({chip:'${label}',cards:document.querySelectorAll('.dr-card').length,pressed:[...document.querySelectorAll('.dr-chip')].filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.textContent),status:document.querySelector('.dr-count').textContent})`));
}
console.log(JSON.stringify(out, null, 1)); ws.close(); proc.kill();
