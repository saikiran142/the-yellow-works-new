"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroMark } from "./HeroMark";
import { canRunHero3D, readCapability } from "@/lib/capability";

// Loaded only after the LCP content has painted and the browser is idle, on capable devices.
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

/**
 * The hero cube. The animated SVG mark is always in the markup, so the scene works without JavaScript,
 * on phones, with reduced motion, with Save-Data and if WebGL fails. On capable devices the real-time 3D
 * cube takes exactly the same box and fades in over it, so swapping causes no layout shift.
 */
export function HeroStage() {
  const [want3D, setWant3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled && canRunHero3D(readCapability())) setWant3D(true);
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const run = () => (idle ? idle(start, { timeout: 2500 }) : window.setTimeout(start, 1200));
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="stage" aria-hidden="true">
      <div className="cube">
        <div style={{ opacity: ready ? 0 : 1, transition: "opacity var(--yw-dur-base)" }}><HeroMark /></div>
        {want3D && <Hero3D onReady={() => setReady(true)} />}
      </div>
    </div>
  );
}
