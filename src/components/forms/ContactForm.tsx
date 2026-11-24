"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { businessTypes } from "@/config/content";
import { placeholders, site } from "@/config/site";
import { validateEnquiry, type EnquiryErrors } from "@/lib/validation";
import { whatsappLink } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Validates in the browser (same function as the server), then posts to /api/enquiry.
 * States: idle, sending, sent, error (with a message that says what to do). A stable idempotency key
 * per attempt means a retry never delivers the enquiry twice.
 */
export function ContactForm() {
  const id = useId();
  const [type, setType] = useState<(typeof businessTypes)[number]["key"]>("clinic");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const keyRef = useRef<string | null>(null);
  const busy = useRef(false); // blocks a second submit in the same tick, before state updates
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const accent = businessTypes.find((b) => b.key === type) ?? businessTypes[0];
  const wa = whatsappLink(site.whatsappNumber);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const f = new FormData(e.currentTarget);
    const input = { name: String(f.get("name") ?? ""), business: String(f.get("business") ?? ""), type, city: String(f.get("city") ?? ""), phone: String(f.get("phone") ?? ""), message: String(f.get("message") ?? "") };
    const errs = validateEnquiry(input);
    setErrors(errs);
    if (errs.name) return nameRef.current?.focus();
    if (errs.phone) return phoneRef.current?.focus();
    if (errs.message) return;
    busy.current = true;
    keyRef.current ??= (crypto.randomUUID?.() ?? `k${Date.now()}${Math.random().toString(36).slice(2)}`).replace(/[^A-Za-z0-9_-]/g, "").padEnd(16, "0");
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json", "idempotency-key": keyRef.current },
        body: JSON.stringify({ ...input, website: String(f.get("website") ?? "") }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; errors?: EnquiryErrors };
      if (res.ok) { keyRef.current = null; setStatus("sent"); return; }
      if (res.status === 422 && data.errors) { setErrors(data.errors); setStatus("idle"); return; }
      setMessage(data.message ?? "Your enquiry didn’t send. Try again, or email us.");
      setStatus("error");
    } catch {
      setMessage("We couldn’t reach the server. Check your connection and try again, or email us.");
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }

  return (
    <section className="sec cont" id="contact" style={{ ["--accent" as string]: accent.accent, ["--on-accent" as string]: accent.on }}>
      <div className="w">
        <div>
          <h2>Your business has something worth showing. <span className="sw">Let’s put it online.</span></h2>
          <div className="alt">
            <span>Email: <a href={`mailto:${site.email}`}>{site.email}</a></span>
            <span>WhatsApp: <b>{site.whatsappNumber ?? placeholders.whatsapp}</b>{site.whatsappNumber ? "" : " (to be confirmed)"}</span>
            {wa ? (
              <a className="btn b-d" style={{ width: "max-content" }} href={wa} target="_blank" rel="noopener noreferrer">Send us a WhatsApp message</a>
            ) : (
              <span className="btn b-d" aria-disabled="true" style={{ width: "max-content", opacity: 0.5, cursor: "not-allowed" }}>WhatsApp: number to be confirmed</span>
            )}
            <span style={{ fontSize: "var(--yw-text-xs)", color: "var(--yw-text-muted)" }}>Opens WhatsApp with a ready-to-send message.</span>
          </div>
        </div>
        <form className={`cform${status === "sent" ? " sent" : ""}`} noValidate onSubmit={onSubmit}>
          <div className="fields" style={{ display: "grid", gap: "var(--yw-space-4)" }}>
            <div className="two">
              <div className="field">
                <label htmlFor={`${id}-n`}>Name</label>
                <input ref={nameRef} className="input" id={`${id}-n`} name="name" autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-ne` : undefined} />
                {errors.name && <p className="err" id={`${id}-ne`}>{errors.name}</p>}
              </div>
              <div className="field">
                <label htmlFor={`${id}-b`}>Business name</label>
                <input className="input" id={`${id}-b`} name="business" autoComplete="organization" placeholder="Your business" />
              </div>
            </div>
            <div className="field">
              <span className="lb" id={`${id}-bt`}>Business type</span>
              <div className="tchips" role="group" aria-labelledby={`${id}-bt`}>
                {businessTypes.map((b) => (
                  <button key={b.key} type="button" className="c" aria-pressed={b.key === type} onClick={() => setType(b.key)}>{b.label}</button>
                ))}
              </div>
            </div>
            <div className="two">
              <div className="field">
                <label htmlFor={`${id}-c`}>City</label>
                <input className="input" id={`${id}-c`} name="city" autoComplete="address-level2" placeholder={site.city ? "Your city" : placeholders.city} />
              </div>
              <div className="field">
                <label htmlFor={`${id}-p`}>Contact number</label>
                <input ref={phoneRef} className="input" id={`${id}-p`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-pe` : undefined} />
                {errors.phone && <p className="err" id={`${id}-pe`}>{errors.phone}</p>}
              </div>
            </div>
            <div className="field">
              <label htmlFor={`${id}-m`}>Message</label>
              <textarea className="input" id={`${id}-m`} name="message" placeholder="Tell us about your business" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-me` : undefined} />
              {errors.message && <p className="err" id={`${id}-me`}>{errors.message}</p>}
            </div>
            {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
              <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <p className="consent">By sending this you agree to us contacting you about your enquiry. See our <a href="/privacy">privacy policy</a>.</p>
            <button className="btn b-y" type="submit" style={{ justifySelf: "start" }} disabled={status === "sending"}>{status === "sending" ? "Sending…" : status === "error" ? "Try again" : "Send enquiry"}</button>
            <div role="status" aria-live="polite">
              {status === "error" && <p className="err">{message} <a href={`mailto:${site.email}`}>{site.email}</a></p>}
            </div>
          </div>
          <div className="ok" role="status" aria-live="polite">
            <Image src="/brand/mark-color-glow.svg" alt="" width={152} height={156} unoptimized />
            <h3>Enquiry sent. We’ll be in touch.</h3>
            <p>Thanks for getting in touch. We’ll reply to the number you gave us.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
