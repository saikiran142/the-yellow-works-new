"use client";

import { useId } from "react";
import { services, timesOfDay } from "@/config/demo-clinic";
import { useEnquirySubmit } from "@/platform/use-enquiry-submit";

/**
 * Appointment request. Uses the shared submit flow (validation, idempotency, error messages) from the platform,
 * tagged `demo-clinic`. Labelled as a concept so nobody is misled.
 */
export function AppointmentForm() {
  const id = useId();
  const { errors, status, message, nameRef, phoneRef, onSubmit } = useEnquirySubmit({
    source: "demo-clinic",
    type: "clinic",
    build: (f) => {
      const treatment = String(f.get("treatment") ?? "");
      const time = String(f.get("time") ?? "");
      const note = String(f.get("note") ?? "");
      return { business: treatment, city: time, message: `Appointment request. Treatment: ${treatment || "not stated"}. Preferred time: ${time || "any"}. ${note}`.trim() };
    },
  });

  return (
    <form className={`dc-form${status === "sent" ? " sent" : ""}`} noValidate onSubmit={onSubmit} aria-label="Request an appointment">
      <div className="dc-fields" style={{ display: "grid", gap: "1rem" }}>
        <div className="dc-field">
          <label htmlFor={`${id}-n`}>Your name</label>
          <input ref={nameRef} className="dc-input" id={`${id}-n`} name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-ne` : undefined} />
          {errors.name && <p className="dc-err" id={`${id}-ne`}>{errors.name}</p>}
        </div>
        <div className="dc-field">
          <label htmlFor={`${id}-p`}>Mobile number</label>
          <input ref={phoneRef} className="dc-input" id={`${id}-p`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10 digits" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-pe` : undefined} />
          {errors.phone && <p className="dc-err" id={`${id}-pe`}>{errors.phone}</p>}
        </div>
        <div className="dc-two">
          <div className="dc-field">
            <label htmlFor={`${id}-t`}>What do you need?</label>
            <select className="dc-input" id={`${id}-t`} name="treatment" defaultValue="">
              <option value="">Not sure yet</option>
              {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
          </div>
          <div className="dc-field">
            <label htmlFor={`${id}-w`}>Best time of day</label>
            <select className="dc-input" id={`${id}-w`} name="time" defaultValue="Any time">
              {timesOfDay.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="dc-field">
          <label htmlFor={`${id}-m`}>Anything we should know? (optional)</label>
          <textarea className="dc-input" id={`${id}-m`} name="note" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-me` : undefined} />
          {errors.message && <p className="dc-err" id={`${id}-me`}>{errors.message}</p>}
        </div>
        <div className="dc-hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p className="dc-consent">This is a concept website, not a real clinic. Your details are used only to reply to this request. See the <a href="/privacy">privacy policy</a>. Please don’t enter health information.</p>
        <button className="dc-btn dc-go" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : status === "error" ? "Try again" : "Request appointment"}</button>
        <div role="status" aria-live="polite">{status === "error" && <p className="dc-err">{message}</p>}</div>
      </div>
      <div className="dc-ok" role="status" aria-live="polite">
        <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#5ccabc" /><path d="M19 33l9 9 17-19" fill="none" stroke="#0b3433" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <h3>Request received</h3>
        <p>Thank you. A real clinic would now call you to confirm a time. This is a concept project, so no one will call.</p>
      </div>
    </form>
  );
}
