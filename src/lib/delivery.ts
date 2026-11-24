import { normalisePhone, type EnquiryInput } from "./validation";

/**
 * Delivery adapter. The destination for enquiries is decision D-08 (still open), so delivery is a
 * configured webhook: any form service, automation or small endpoint that accepts a JSON POST
 * (for example one that writes a sheet row or sends an email). Nothing is stored by this app.
 * Personal data is never written to logs here.
 */
export interface DeliveryConfig {
  url?: string;
  secret?: string;
  timeoutMs?: number;
  /** Which site the enquiry came from. Defaults to the agency site. */
  source?: string;
}

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };

export async function deliverEnquiry(
  enquiry: EnquiryInput,
  key: string,
  cfg: DeliveryConfig,
  fetchImpl: typeof fetch = fetch,
  now: () => Date = () => new Date(),
): Promise<DeliveryResult> {
  if (!cfg.url) return { ok: false, reason: "not_configured" };
  const payload = {
    id: key,
    receivedAt: now().toISOString(),
    source: cfg.source ?? "theyellowworks.com",
    name: enquiry.name.trim(),
    business: enquiry.business.trim(),
    type: enquiry.type,
    city: enquiry.city.trim(),
    phone: normalisePhone(enquiry.phone),
    message: enquiry.message.trim(),
  };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), cfg.timeoutMs ?? 8000);
  try {
    const res = await fetchImpl(cfg.url, {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": key, ...(cfg.secret ? { authorization: `Bearer ${cfg.secret}` } : {}) },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  } finally {
    clearTimeout(timer);
  }
}
