// Generates every SVG in public/brand from one geometry definition.
// Mark: "Cube Y, seams of light, A2 Broad". Run: node design/phase1/build-logo.mjs
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'public', 'brand');
mkdirSync(OUT, { recursive: true });

/* ---- geometry (120-unit grid, isometric cube, edge 50, centre 60,62) ---- */
const HEX = '60,12 103.3,37 103.3,87 60,112 16.7,87 16.7,37';
const TOP = '60,12 103.3,37 60,62 16.7,37';
const LEFT = '16.7,37 60,62 60,112 16.7,87';
const RIGHT = '60,62 103.3,37 103.3,87 60,112';
const ENDS = [[16.7, 37], [103.3, 37], [60, 112]];
const VB = '14 10 92 104';            // tight box around the cube
const W_BROAD = 9.5;                  // A2 arm half-width
const W_SMALL = 12;                   // heavier Y for sizes <= 32 px

const f = (n) => +n.toFixed(2);
function yPath(w) {
  let d = '';
  for (const [x, y] of ENDS) {
    const dx = x - 60, dy = y - 62, L = Math.hypot(dx, dy);
    const nx = -dy / L, ny = dx / L, ex = x + (dx / L) * 10, ey = y + (dy / L) * 10;
    const P = [[60 + nx * w, 62 + ny * w], [ex + nx * w, ey + ny * w], [ex - nx * w, ey - ny * w], [60 - nx * w, 62 - ny * w]];
    d += 'M' + P.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L') + ' Z ';
  }
  return d.trim();
}
const Y = yPath(W_BROAD), Y_SMALL = yPath(W_SMALL);

const C = { sun: '#FFD52A', marigold: '#FF9F1C', dusk: '#16142B', twilight: '#2A2160', paper: '#FFFCF2', butter: '#FFF1B8' };

const gradient = (id) => `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="60" cy="62" r="56"><stop offset="0" stop-color="#FFFDF0"/><stop offset=".22" stop-color="${C.butter}"/><stop offset=".5" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.marigold}"/></radialGradient>`;
const clip = (id) => `<clipPath id="${id}"><polygon points="${HEX}"/></clipPath>`;

/* faces: on-light uses deep indigo; on-dark is lifted so the cube reads against Dusk */
const FACES = { light: ['#2A2160', '#16142B', '#0D0C1C'], dark: ['#3B3572', '#2A2160', '#211B4F'] };

/** Full-colour mark. theme: light | dark. glow adds the blurred halo (not used at small sizes). */
function colourMark({ theme = 'light', glow = false, small = false, id = 'a' }) {
  const [a, b, d] = FACES[theme];
  const y = small ? Y_SMALL : Y, w = small ? W_SMALL : W_BROAD;
  const blur = glow ? `<filter id="${id}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${f(4 + w * 0.35)}"/></filter>` : '';
  return {
    defs: `${gradient(id + 'g')}${clip(id + 'c')}${blur}`,
    body: `<polygon points="${TOP}" fill="${a}"/><polygon points="${LEFT}" fill="${b}"/><polygon points="${RIGHT}" fill="${d}"/>` +
      (glow ? `<g filter="url(#${id}b)" opacity=".85"><path d="${yPath(w + 2)}" fill="${C.marigold}"/><circle cx="60" cy="62" r="${w + 3}" fill="${C.sun}"/></g>` : '') +
      `<g clip-path="url(#${id}c)"><path d="${y}" fill="url(#${id}g)"/><circle cx="60" cy="62" r="${w}" fill="url(#${id}g)"/></g>`,
  };
}

/** One-colour mark: the hexagon with the Y cut out (transparent), so it sits on any background. */
function monoMark({ color, small = false, id = 'm' }) {
  const y = small ? Y_SMALL : Y, w = small ? W_SMALL : W_BROAD;
  return {
    defs: `<mask id="${id}k" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120"><polygon points="${HEX}" fill="#fff"/><path d="${y}" fill="#000"/><circle cx="60" cy="62" r="${w}" fill="#000"/></mask>`,
    body: `<rect x="0" y="0" width="120" height="120" fill="${color}" mask="url(#${id}k)"/>`,
  };
}

const svg = (vb, inner, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" ${extra}>${inner}</svg>\n`;
const wrap = (m, vb = VB, extra = '') => svg(vb, `<defs>${m.defs}</defs>${m.body}`, extra);
const write = (name, s) => writeFileSync(join(OUT, name), s);
const label = (t) => `role="img" aria-label="${t}"`;

/* ---------- marks ---------- */
write('mark-color.svg', wrap(colourMark({ theme: 'light' }), VB, label('The Yellow Works')));
write('mark-color-glow.svg', wrap(colourMark({ theme: 'dark', glow: true }), '-16 -18 152 156', label('The Yellow Works')));
write('mark-small.svg', wrap(colourMark({ theme: 'light', small: true }), VB, label('The Yellow Works')));
write('mark-dusk.svg', wrap(monoMark({ color: C.dusk }), VB, label('The Yellow Works')));
write('mark-black.svg', wrap(monoMark({ color: '#000000' }), VB, label('The Yellow Works')));
write('mark-white.svg', wrap(monoMark({ color: '#FFFFFF' }), VB, label('The Yellow Works')));

/* colour variants on their own backgrounds (the five required variants) */
const tile = (bg, mk, vb = '0 0 120 120', r = 0) => svg(vb, `<defs>${mk.defs}</defs><rect width="120" height="120" rx="${r}" fill="${bg}"/>${mk.body}`);
const onDusk = colourMark({ theme: 'dark', glow: true, id: 'd' });
write('variant-on-dusk.svg', svg('0 0 120 120', `<defs>${onDusk.defs}</defs><rect width="120" height="120" fill="${C.dusk}"/><g transform="translate(60 62) scale(.86) translate(-60 -62)">${onDusk.body}</g>`, label('The Yellow Works')));
const dOnY = monoMark({ color: C.dusk, id: 'y' });
write('variant-dusk-on-yellow.svg', svg('0 0 120 120', `<defs>${dOnY.defs}</defs><rect width="120" height="120" fill="${C.sun}"/><g transform="translate(60 62) scale(.86) translate(-60 -62)">${dOnY.body}</g>`, label('The Yellow Works')));

/* ---------- favicon (adapts to light and dark tabs) ---------- */
{
  const small = true, w = W_SMALL, y = Y_SMALL;
  const css = `<style>.a{fill:#2A2160}.b{fill:#16142B}.c{fill:#0D0C1C}@media (prefers-color-scheme:dark){.a{fill:#6C63C7}.b{fill:#4F47A8}.c{fill:#3D3689}}</style>`;
  write('favicon.svg', svg(VB, `<defs>${gradient('fg')}${clip('fc')}${css}</defs><polygon class="a" points="${TOP}"/><polygon class="b" points="${LEFT}"/><polygon class="c" points="${RIGHT}"/><g clip-path="url(#fc)"><path d="${y}" fill="url(#fg)"/><circle cx="60" cy="62" r="${w}" fill="url(#fg)"/></g>`, label('The Yellow Works')));
}

/* ---------- wordmark lockups (outlined paths, see outline-wordmark.py) ---------- */
const WM = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'wordmark-paths.json'), 'utf8'));
/** Outlined text: key from wordmark-paths.json, left x (or centre x if anchor 'middle'), baseline y, font size in px. */
const textPath = (key, x, y, size, fill, anchor = 'start') => {
  const k = size / 1000, w = WM[key].width * k, x0 = anchor === 'middle' ? x - w / 2 : x;
  return `<path transform="translate(${f(x0)} ${f(y)}) scale(${f(k)})" d="${WM[key].d}" fill="${fill}"/>`;
};
const placeMark = (m, x, y, h) => { const s = h / 104; return `<g transform="translate(${f(x - 14 * s)} ${f(y - 10 * s)}) scale(${f(s)})">${m.body}</g>`; };

function horizontal(name, mk, textColor) {
  const mh = 64, fs = 60, tw = f(WM.name.width * fs / 1000), gap = 22, pad = 4;
  const w = pad + 92 / 104 * mh + gap + tw + pad, h = mh + pad * 2;
  write(name, svg(`0 0 ${f(w)} ${h}`, `<defs>${mk.defs}</defs>${placeMark(mk, pad, pad, mh)}${textPath('name', pad + 92 / 104 * mh + gap, pad + mh / 2 + fs * 0.34, fs, textColor)}`, label('The Yellow Works')));
}
function stacked(name, mk, textColor) {
  const mh = 120, fs = 52, tw = f(WM.name.width * fs / 1000), w = Math.max(tw, 92 / 104 * mh) + 16, gap = 22;
  const mw = 92 / 104 * mh, h = mh + gap + fs * 0.9 + 12;
  write(name, svg(`0 0 ${f(w)} ${f(h)}`, `<defs>${mk.defs}</defs>${placeMark(mk, (w - mw) / 2, 4, mh)}${textPath('name', w / 2, 4 + mh + gap + fs * 0.7, fs, textColor, 'middle')}`, label('The Yellow Works')));
}
horizontal('lockup-horizontal.svg', colourMark({ theme: 'light', id: 'h1' }), C.dusk);
horizontal('lockup-horizontal-reversed.svg', colourMark({ theme: 'dark', id: 'h2' }), C.paper);
horizontal('lockup-horizontal-dusk.svg', monoMark({ color: C.dusk, id: 'h3' }), C.dusk);
horizontal('lockup-horizontal-white.svg', monoMark({ color: '#fff', id: 'h4' }), '#fff');
stacked('lockup-stacked.svg', colourMark({ theme: 'light', id: 's1' }), C.dusk);
stacked('lockup-stacked-reversed.svg', colourMark({ theme: 'dark', id: 's2' }), C.paper);

/* ---------- avatar (circle-safe), app icons ---------- */
{
  const m = colourMark({ theme: 'dark', glow: true, id: 'av' });
  const inner = `<defs>${m.defs}</defs><rect width="800" height="800" fill="${C.dusk}"/><g transform="translate(400 400) scale(4.1) translate(-60 -62)">${m.body}</g>`;
  write('avatar.svg', svg('0 0 800 800', inner, label('The Yellow Works')));
  const sm = colourMark({ theme: 'dark', small: true, id: 'ic' });
  const icon = (s) => svg(`0 0 ${s} ${s}`, `<defs>${sm.defs}</defs><rect width="${s}" height="${s}" fill="${C.dusk}"/><g transform="translate(${s / 2} ${s / 2}) scale(${f(s / 120 * 0.62)}) translate(-60 -62)">${sm.body}</g>`, label('The Yellow Works'));
  write('icon-maskable.svg', icon(512));   // full-bleed Dusk, mark inside the 80% safe zone
}

/* ---------- Open Graph template 1200x630 (live text) ---------- */
{
  const m = colourMark({ theme: 'dark', glow: true, id: 'og' });
  write('og-template.svg', svg('0 0 1200 630', `<defs>${m.defs}<radialGradient id="ogs" cx=".82" cy=".5" r=".6"><stop offset="0" stop-color="${C.sun}" stop-opacity=".35"/><stop offset=".5" stop-color="${C.marigold}" stop-opacity=".12"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="630" fill="${C.dusk}"/><rect width="1200" height="630" fill="url(#ogs)"/>
  <g transform="translate(960 315) scale(3.3) translate(-60 -62)">${m.body}</g>
  ${textPath('tag1', 72, 300, 78, C.paper)}${textPath('tag2', 72, 392, 78, C.paper)}${textPath('name', 72, 540, 34, C.sun)}`, label('The Yellow Works. Good businesses deserve to be seen.')));
}

/* ---------- animated logo (1.4 s, plays once; static in reduced motion) ---------- */
{
  const m = colourMark({ theme: 'dark', glow: true, id: 'an' });
  const css = `<style>
  .seam{animation:on 1.4s linear both}
  .halo{animation:on 1.4s linear both}
  @keyframes on{0%,18%{opacity:0}28%{opacity:.95}34%{opacity:.15}48%{opacity:1}54%{opacity:.45}66%,100%{opacity:1}}
  @media (prefers-reduced-motion:reduce){.seam,.halo{animation:none}}
  </style>`;
  const body = m.body.replace('<g filter', '<g class="halo" filter').replace('<g clip-path', '<g class="seam" clip-path');
  write('logo-animated.svg', svg('-16 -18 152 156', `<defs>${m.defs}${css}</defs>${body}`, label('The Yellow Works')));
}

console.log('SVGs written to', OUT);
