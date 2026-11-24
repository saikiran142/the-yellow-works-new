// QA screenshots via the Chrome DevTools Protocol: true viewport widths, reduced motion on/off, console errors, horizontal overflow.
// Usage: node scripts/shoot.mjs [url] [widths] ; needs a running server (default http://127.0.0.1:3100/).
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const url = process.argv[2] ?? 'http://127.0.0.1:3100/';
const widths = (process.argv[3] ?? '360,768,1280,1920').split(',').map(Number);
const clipArg = process.argv[4]; // optional 'y,height' to crop, e.g. 0,1000
const out = 'qa'; mkdirSync(out, { recursive: true });
const chromePath = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const port = 9333;
const proc = spawn(chromePath, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'yw-cdp-'))}`, '--use-angle=swiftshader', '--enable-unsafe-swiftshader', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let targets;
for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (targets.length) break; } catch {} await sleep(250); }
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const events = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else events.push(d); };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
const report = [];
for (const w of widths) for (const reduced of [false, true]) {
  events.length = 0;
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 700 });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] });
  await send('Page.navigate', { url });
  await sleep(4500);
  // trigger lazy content: scroll through the page once, then back to top
  const h0 = await ev('document.documentElement.scrollHeight');
  for (let y = 0; y < h0; y += 700) { await ev(`window.scrollTo(0, ${y})`); await sleep(120); }
  await ev('window.scrollTo(0,0)'); await sleep(600);
  const h = await ev('document.documentElement.scrollHeight');
  const overflow = await ev('document.documentElement.scrollWidth > window.innerWidth + 1');
  const errs = events.filter((e) => (e.method === 'Runtime.exceptionThrown') || (e.method === 'Log.entryAdded' && ['error'].includes(e.params.entry.level)) || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error')).map((e) => e.params.exceptionDetails?.text ?? e.params.entry?.text ?? e.params.args?.map((a) => a.value ?? a.description).join(' '));
  const canvas = await ev('!!document.querySelector("canvas")');
  const file = `${out}/home-${w}${reduced ? '-reduced' : ''}${clipArg ? '-' + clipArg.replace(',', '_') : ''}.png`;
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: clipArg ? { x: 0, y: +clipArg.split(',')[0], width: w, height: +clipArg.split(',')[1], scale: 1 } : { x: 0, y: 0, width: w, height: Math.min(h, 9000), scale: 1 } });
  writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
  report.push({ width: w, reducedMotion: reduced, height: h, horizontalOverflow: overflow, canvasPresent: canvas, consoleErrors: errs, file });
}
console.log(JSON.stringify(report, null, 1));
ws.close(); proc.kill();
