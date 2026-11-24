import type { CSSProperties } from "react";
import type { Theme } from "./types";

/** Maps a theme to CSS variables on the site's root element. Components only ever read the variables. */
export function themeToStyle(t: Theme): CSSProperties {
  const c = t.colors;
  const vars: Record<string, string> = {
    "--t-ink": c.ink, "--t-muted": c.muted, "--t-surface": c.surface, "--t-tint": c.tint, "--t-line": c.line,
    "--t-primary": c.primary, "--t-primary-ink": c.primaryInk, "--t-accent": c.accent, "--t-accent-ink": c.accentInk,
    "--t-hero-bg": c.heroBg, "--t-hero-ink": c.heroInk, "--t-book-bg": c.bookBg, "--t-book-ink": c.bookInk, "--t-error": c.error,
    "--t-radius": t.radius === "sharp" ? "6px" : "16px",
    "--t-radius-sm": t.radius === "sharp" ? "4px" : "10px",
    "--t-btn-radius": t.radius === "sharp" ? "6px" : "999px",
  };
  return vars as CSSProperties;
}

function channel(v: number) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
  const n = parseInt(full, 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

/** WCAG contrast ratio between two #rrggbb colours. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** The text pairings every theme must satisfy (WCAG AA, 4.5:1 for normal text). */
export function themePairs(t: Theme): [label: string, fg: string, bg: string][] {
  const c = t.colors;
  return [
    ["ink on surface", c.ink, c.surface],
    ["muted on surface", c.muted, c.surface],
    ["muted on tint", c.muted, c.tint],
    ["ink on tint", c.ink, c.tint],
    ["primary on surface", c.primary, c.surface],
    ["primary on tint", c.primary, c.tint],
    ["primaryInk on primary", c.primaryInk, c.primary],
    ["accentInk on accent", c.accentInk, c.accent],
    ["heroInk on heroBg", c.heroInk, c.heroBg],
    ["bookInk on bookBg", c.bookInk, c.bookBg],
    ["error on surface", c.error, c.surface],
  ];
}

export function failingPairs(t: Theme, min = 4.5) {
  return themePairs(t).map(([label, fg, bg]) => ({ label, ratio: contrastRatio(fg, bg) })).filter((p) => p.ratio < min);
}
