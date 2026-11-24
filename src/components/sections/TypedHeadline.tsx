"use client";

import { useEffect, useState } from "react";
import { heroPhrases } from "@/config/content";

const TYPE_MS = 60;
const DELETE_MS = 35;
const HOLD_MS = 2200;
const GAP_MS = 350;

/**
 * Typing ending for the hero H1. Phrase 1 is server-rendered in full, so the headline is complete at
 * first paint, without JavaScript and under reduced motion. Typing starts after mount. All phrases sit in
 * one grid cell (the inactive ones hidden) so the box never changes height.
 */
export function TypedHeadline() {
  const [text, setText] = useState<string>(heroPhrases[0]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimated(true);
    let i = 0;
    let n: number = heroPhrases[0].length;
    let mode: "hold" | "delete" | "type" = "hold";
    let timer = 0;

    const tick = () => {
      if (document.visibilityState !== "visible") { timer = window.setTimeout(tick, 500); return; }
      if (mode === "hold") { mode = "delete"; timer = window.setTimeout(tick, HOLD_MS); return; }
      if (mode === "delete") {
        n -= 1;
        setText(heroPhrases[i].slice(0, n));
        if (n <= 0) { i = (i + 1) % heroPhrases.length; mode = "type"; timer = window.setTimeout(tick, GAP_MS); return; }
        timer = window.setTimeout(tick, DELETE_MS);
        return;
      }
      n += 1;
      setText(heroPhrases[i].slice(0, n));
      if (n >= heroPhrases[i].length) { mode = "hold"; timer = window.setTimeout(tick, 0); return; }
      timer = window.setTimeout(tick, TYPE_MS);
    };

    timer = window.setTimeout(tick, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const longest = heroPhrases.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <>
      <span className="sr">{heroPhrases[0]}</span>
      <span className="tw" aria-hidden="true">
        <span className="gh">{longest}</span>
        <span className={animated ? "live" : undefined}>
          <span className="sw">{text || "\u200b"}</span>
        </span>
      </span>
    </>
  );
}
