// Scrolls the industries section in a real browser and screenshots the viewport at each industry, to verify the pinned stage and tint switching.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const url = process.argv[2] ?? 'http://127.0.0.1:3100/';
mkdirSync('qa', { recursive: true });
const chromePath = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const proc = spawn(chromePath, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=9334', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'yw-cdp-'))}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch('http://127.0.0.1:9334/json/list')).json(); if (targets.length) break; } catch {} await sleep(250); }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.result?.value;
await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url }); await sleep(4000);
const res = [];
for (const k of ['clinic', 'gym', 'realty']) {
  await ev(`(()=>{const el=document.querySelector('.ind-c section[data-i="${k}"]');const r=el.getBoundingClientRect();window.scrollTo(0, window.scrollY + r.top + r.height/2 - innerHeight/2)})()`);
  await sleep(1200);
  const info = await ev(`(()=>{const s=document.querySelector('.ind-s').getBoundingClientRect();return {tint:getComputedStyle(document.getElementById('industries')).getPropertyValue('--tint').trim(), stageTop:Math.round(s.top), stageH:Math.round(s.height), bg:getComputedStyle(document.getElementById('industries')).backgroundColor}})()`);
  const shot = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(`qa/industries-${k}.png`, Buffer.from(shot.result.data, 'base64'));
  res.push({ k, ...info });
}
console.log(JSON.stringify(res, null, 1)); ws.close(); proc.kill();
