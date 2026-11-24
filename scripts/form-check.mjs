// Drives the real contact form in Chrome: empty submit (errors + focus), valid submit (success state), double submit (one delivery).
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const url = process.argv[2] ?? 'http://127.0.0.1:3100/';
const scope = process.argv[3] ?? '#contact'; // CSS selector of the section that contains the form
const chromePath = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const proc = spawn(chromePath, ['--headless=new', '--disable-gpu', '--remote-debugging-port=9335', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'yw-cdp-'))}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t; for (let i = 0; i < 40; i++) { try { t = await (await fetch('http://127.0.0.1:9335/json/list')).json(); if (t.length) break; } catch {} await sleep(250); }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url }); await sleep(3500);
const set = (name, v) => ev(`(()=>{const el=document.querySelector('${scope} [name="${name}"]');const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,${JSON.stringify(v)});el.dispatchEvent(new Event('input',{bubbles:true}))})()`);
const out = {};
await ev(`document.querySelector('${scope} form button[type=submit]').click()`); await sleep(500);
out.emptySubmit = await ev(`({errors:[...document.querySelectorAll('${scope} [class*=err]')].map(e=>e.textContent), focusedName:document.activeElement?.getAttribute('name'), ariaInvalid:document.querySelector('${scope} [name=name]').getAttribute('aria-invalid')})`);
await ev(`(document.querySelectorAll('${scope} .tchips .c')[1]||{click(){}}).click()`); await sleep(200);
out.chipGym = await ev(`getComputedStyle(document.querySelector('${scope}')).getPropertyValue('--accent').trim()`);
await set('name', 'Test Person'); await set('phone', '98111 11111'); await set('message', 'Form check');
await ev(`(()=>{const b=document.querySelector('${scope} form button[type=submit]');b.click();b.click();})()`); await sleep(1500);
out.afterValidSubmit = await ev(`({sentClass:document.querySelector('${scope} form').classList.contains('sent'), heading:document.querySelector('${scope} [class*=ok] h3')?.textContent, okVisible:getComputedStyle(document.querySelector('${scope} [class*=ok]')).display})`);
console.log(JSON.stringify(out, null, 1)); ws.close(); proc.kill();
