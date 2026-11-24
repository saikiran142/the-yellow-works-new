"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { canRunHero3D, readCapability } from "@/lib/capability";

// Loaded only after the LCP content has painted and the browser is idle, on capable devices.
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

/**
 * The hero scene. The pre-rendered SVG cube and the interface panels are always in the markup, so the
 * scene is identical without JavaScript, with reduced motion, on phones, with Save-Data and if WebGL fails.
 * The canvas takes exactly the same box as the SVG cube, so swapping causes no layout shift.
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
        <Image src="/brand/mark-color-glow.svg" alt="" width={152} height={156} priority unoptimized style={{ width: "100%", height: "auto", opacity: ready ? 0 : 1, transition: "opacity var(--yw-dur-base)" }} />
        {want3D && <Hero3D onReady={() => setReady(true)} />}
      </div>
      <div className="pn p1"><b>Book an appointment</b><div className="sl"><span>9:30</span><span className="on">10:15</span><span>11:00</span></div></div>
      <div className="pn p2"><b>Join a gym</b>Monthly plan<div className="sl" style={{ marginTop: 6 }}><span className="on">Start a free trial</span></div></div>
      <div className="pn p3"><b>Schedule a site visit</b><div className="sl"><span style={{ background: "#fff3" }}>Sat</span><span style={{ background: "#fff", color: "var(--yw-dusk)" }}>11:00</span></div></div>
    </div>
  );
}
