"use client";

import { useId } from "react";
import { goals, times } from "@/config/demo-gym";
import { useEnquirySubmit } from "@/platform/use-enquiry-submit";

/** Free-trial request. Uses the shared submit flow from the platform, tagged `demo-gym`. Labelled as a concept. */
export function TrialForm() {
  const id = useId();
  const { errors, status, message, nameRef, phoneRef, onSubmit } = useEnquirySubmit({
    source: "demo-gym",
    type: "gym",
    build: (f) => {
      const goal = String(f.get("goal") ?? "");
      const time = String(f.get("time") ?? "");
      const note = String(f.get("note") ?? "");
      return { business: goal, city: time, message: `Free trial request. Goal: ${goal || "not stated"}. Preferred time: ${time || "any"}. ${note}`.trim() };
    },
  });

  return (
    <form className={`dg-form${status === "sent" ? " sent" : ""}`} noValidate onSubmit={onSubmit} aria-label="Book a free trial">
      <div className="dg-fields" style={{ display: "grid", gap: "1rem" }}>
        <div className="dg-field">
          <label htmlFor={`${id}-n`}>Your name</label>
          <input ref={nameRef} className="dg-input" id={`${id}-n`} name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-ne` : undefined} />
          {errors.name && <p className="dg-err" id={`${id}-ne`}>{errors.name}</p>}
        </div>
        <div className="dg-field">
          <label htmlFor={`${id}-p`}>Mobile number</label>
          <input ref={phoneRef} className="dg-input" id={`${id}-p`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10 digits" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-pe` : undefined} />
          {errors.phone && <p className="dg-err" id={`${id}-pe`}>{errors.phone}</p>}
        </div>
        <div className="dg-two">
          <div className="dg-field">
            <label htmlFor={`${id}-g`}>Your goal</label>
            <select className="dg-input" id={`${id}-g`} name="goal" defaultValue="">
              <option value="">Not sure yet</option>
              {goals.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="dg-field">
            <label htmlFor={`${id}-t`}>Best time to train</label>
            <select className="dg-input" id={`${id}-t`} name="time" defaultValue="Any time">
              {times.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="dg-field">
          <label htmlFor={`${id}-m`}>Anything we should know? (optional)</label>
          <textarea className="dg-input" id={`${id}-m`} name="note" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-me` : undefined} />
          {errors.message && <p className="dg-err" id={`${id}-me`}>{errors.message}</p>}
        </div>
        <div className="dg-hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p className="dg-consent">This is a concept website, not a real gym. Your details are used only to reply to this request. See the <a href="/privacy">privacy policy</a>. Please don’t enter health information.</p>
        <button className="dg-btn dg-go" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : status === "error" ? "Try again" : "Book my free trial"}</button>
        <div role="status" aria-live="polite">{status === "error" && <p className="dg-err">{message}</p>}</div>
      </div>
      <div className="dg-ok" role="status" aria-live="polite">
        <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#b8f23a" /><path d="M19 33l9 9 17-19" fill="none" stroke="#0e1116" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <h3>You’re in</h3>
        <p>Thank you. A real gym would now message you to fix your free trial. This is a concept project, so no one will be in touch.</p>
      </div>
    </form>
  );
}
