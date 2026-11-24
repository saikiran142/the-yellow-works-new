"use client";

import { useRef, useState } from "react";
import { validateEnquiry, type EnquiryErrors } from "@/lib/validation";

export type SubmitStatus = "idle" | "sending" | "sent" | "error";

interface Options {
  /** Tag stored with the enquiry (see enquiry-handler SOURCES). */
  source: string;
  type: string;
  /** Turns the form's fields into the enquiry record. Called after the name and phone are read. */
  build: (f: FormData) => { business: string; city: string; message: string };
}

/**
 * The one submit flow every site form uses: validate in the browser with the same function as the server,
 * focus the first bad field, send with a stable idempotency key, block a second submit in the same tick,
 * and map server answers to messages that say what to do. Replaces three copies in the demos.
 */
export function useEnquirySubmit({ source, type, build }: Options) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const keyRef = useRef<string | null>(null);
  const busy = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const f = new FormData(e.currentTarget);
    const built = build(f);
    const input = { name: String(f.get("name") ?? ""), phone: String(f.get("phone") ?? ""), type, ...built };
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
        body: JSON.stringify({ ...input, source, website: String(f.get("website") ?? "") }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; errors?: EnquiryErrors };
      if (res.ok) { keyRef.current = null; setStatus("sent"); return; }
      if (res.status === 422 && data.errors) { setErrors(data.errors); setStatus("idle"); return; }
      setMessage(data.message ?? "Your request didn’t send. Try again.");
      setStatus("error");
    } catch {
      setMessage("We couldn’t reach the server. Check your connection and try again.");
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }

  return { errors, status, message, nameRef, phoneRef, onSubmit };
}
