"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/config/content";
import { site } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

/** Transparent over the dusk hero, Paper with a hairline after scrolling. Mobile: full-screen menu sheet. */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`hdr${solid ? " solid" : ""}`}>
        <div className="w">
          <a href="#top" aria-label={`${site.name}, home`}>
            <Image className="logo" src={solid ? "/brand/lockup-horizontal.svg" : "/brand/lockup-horizontal-reversed.svg"} alt={site.name} width={320} height={72} priority unoptimized />
          </a>
          <nav aria-label="Main">
            {navigation.map((n, i) => (
              <a key={n.href} href={n.href} aria-current={i === 0 ? "page" : undefined}>{n.label}</a>
            ))}
          </nav>
          <a className="btn b-y cta" href="#contact">Let’s build your website</a>
          <button ref={burgerRef} className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="menu-sheet" onClick={() => setOpen(true)}>
            <Icon name="menu" style={{ width: 26, height: 26 }} />
          </button>
        </div>
      </header>
      {open && (
        <div className="sheet open" id="menu-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <button ref={closeRef} className="btn b-y x" onClick={() => { setOpen(false); burgerRef.current?.focus(); }}>Close</button>
          <div style={{ paddingTop: "5rem" }}>
            {navigation.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
            ))}
            <a className="btn b-y" style={{ marginTop: "1.5rem", fontSize: "1rem" }} href="#contact" onClick={() => setOpen(false)}>Let’s build your website</a>
          </div>
        </div>
      )}
    </>
  );
}
