"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { analytics, analyticsConfigured } from "@/config/site";

const KEY = "yw-analytics-consent";
type Choice = "granted" | "denied" | "none" | "ssr";

function read(): Choice {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "none";
  } catch {
    return "none"; // storage blocked: treat as no choice made, so nothing loads
  }
}
const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener("yw-consent", cb);
  return () => { window.removeEventListener("storage", cb); window.removeEventListener("yw-consent", cb); };
};

/**
 * Renders nothing, and loads nothing, unless analytics is configured. When it is, a notice asks first;
 * the script is added only after "Accept". Declining is as easy as accepting and is remembered.
 */
export function ConsentBanner() {
  // "ssr" on the server and during hydration, so nothing flashes and nothing loads before a real read.
  const choice = useSyncExternalStore(subscribe, read, () => "ssr" as Choice);

  if (!analyticsConfigured || choice === "ssr") return null;

  const save = (c: "granted" | "denied") => {
    try { window.localStorage.setItem(KEY, c); } catch {}
    window.dispatchEvent(new Event("yw-consent"));
  };

  return (
    <>
      {choice === "granted" && (
        <Script strategy="afterInteractive" defer data-domain={analytics.domain} src="https://plausible.io/js/script.js" />
      )}
      {choice === "none" && (
        <div role="region" aria-label="Analytics notice" className="consent-bar">
          <p>
            We’d like to count visits so we can improve this website. It uses a privacy-friendly tool and doesn’t track you across other sites.
            See our <a href="/privacy">privacy policy</a>.
          </p>
          <div className="consent-actions">
            <button className="btn b-y" onClick={() => save("granted")}>Accept</button>
            <button className="btn b-o" onClick={() => save("denied")}>Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
