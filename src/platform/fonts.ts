import { Barlow, Barlow_Condensed, Manrope, Sora, Source_Sans_3, Work_Sans } from "next/font/google";
import type { Theme } from "./types";

/**
 * A small, curated set of font pairs. next/font needs literal options at module scope, so clients choose
 * a pair by name instead of naming any Google font. Only the chosen pair's class is applied to a site, so
 * only its files are requested. Only the weights actually used are loaded.
 */
const sora = Sora({ subsets: ["latin"], variable: "--pf-display", display: "swap", weight: ["600", "700"] });
const source = Source_Sans_3({ subsets: ["latin"], variable: "--pf-body", display: "swap", weight: ["400", "600", "700"] });
const barlowC = Barlow_Condensed({ subsets: ["latin"], variable: "--pf-display", display: "swap", weight: ["800"] });
const barlow = Barlow({ subsets: ["latin"], variable: "--pf-body", display: "swap", weight: ["400", "600"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--pf-display", display: "swap", weight: ["800"] });
const work = Work_Sans({ subsets: ["latin"], variable: "--pf-body", display: "swap", weight: ["400", "600"] });

const pairs = {
  friendly: `${sora.variable} ${source.variable}`,
  athletic: `${barlowC.variable} ${barlow.variable}`,
  modern: `${manrope.variable} ${work.variable}`,
} as const;

export function fontClass(pair: Theme["fontPair"]): string {
  return pairs[pair];
}
