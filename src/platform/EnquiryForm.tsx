"use client";

import { useId } from "react";
import { composeEnquiry } from "./compose";
import type { EnquiryForm as Cfg } from "./types";
import { useEnquirySubmit } from "./use-enquiry-submit";

/** The shared enquiry form. Fields, wording and tag come from the site config; the flow comes from the shared hook. */
export function EnquiryFormView({ cfg }: { cfg: Cfg }) {
  const id = useId();
  const { errors, status, message, nameRef, phoneRef, onSubmit } = useEnquirySubmit({
    source: cfg.source,
    type: cfg.type,
    build: (f) => {
      const values: Record<string, string> = {};
      for (const s of cfg.selects) values[s.name] = String(f.get(s.name) ?? "");
      return composeEnquiry(cfg, values, String(f.get("note") ?? ""));
    },
  });

  return (
    <form className={`pf-form${status === "sent" ? " sent" : ""}`} noValidate onSubmit={onSubmit} aria-label={cfg.submitLabel}>
      <div className="pf-fields">
        <div className="pf-field">
          <label htmlFor={`${id}-n`}>Your name</label>
          <input ref={nameRef} className="pf-input" id={`${id}-n`} name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-ne` : undefined} />
          {errors.name && <p className="pf-err" id={`${id}-ne`}>{errors.name}</p>}
        </div>
        <div className="pf-field">
          <label htmlFor={`${id}-p`}>Mobile number</label>
          <input ref={phoneRef} className="pf-input" id={`${id}-p`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10 digits" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-pe` : undefined} />
          {errors.phone && <p className="pf-err" id={`${id}-pe`}>{errors.phone}</p>}
        </div>
        {cfg.selects.length > 0 && (
          <div className={cfg.selects.length > 1 ? "pf-two" : undefined} style={cfg.selects.length > 2 ? { gridTemplateColumns: "1fr" } : undefined}>
            {cfg.selects.map((s) => (
              <div className="pf-field" key={s.name}>
                <label htmlFor={`${id}-${s.name}`}>{s.label}</label>
                <select className="pf-input" id={`${id}-${s.name}`} name={s.name} defaultValue={s.defaultValue ?? ""}>
                  {s.emptyLabel !== undefined && <option value="">{s.emptyLabel}</option>}
                  {s.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
        <div className="pf-field">
          <label htmlFor={`${id}-m`}>{cfg.noteLabel ?? "Anything we should know? (optional)"}</label>
          <textarea className="pf-input" id={`${id}-m`} name="note" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-me` : undefined} />
          {errors.message && <p className="pf-err" id={`${id}-me`}>{errors.message}</p>}
        </div>
        <div className="pf-hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p className="pf-consent">{cfg.consent} See the <a href="/privacy">privacy policy</a>.</p>
        <button className="pf-btn pf-go" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : status === "error" ? "Try again" : cfg.submitLabel}</button>
        <div role="status" aria-live="polite">{status === "error" && <p className="pf-err">{message}</p>}</div>
      </div>
      <div className="pf-ok" role="status" aria-live="polite">
        <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="var(--t-accent)" /><path d="M19 33l9 9 17-19" fill="none" stroke="var(--t-accent-ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <h3>{cfg.successTitle}</h3>
        <p>{cfg.successText}</p>
      </div>
    </form>
  );
}
