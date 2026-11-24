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
  // Google Apps Script treats any Authorization header as an OAuth token and rejects a non-Google one,
  // so for Apps Script the secret travels only in the URL (?key=...). Other webhooks still get the header.
  const sendBearer = Boolean(cfg.secret) && !isAppsScript(cfg.url);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), cfg.timeoutMs ?? 8000);
  try {
    const res = await fetchImpl(cfg.url, {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": key, ...(sendBearer ? { authorization: `Bearer ${cfg.secret}` } : {}) },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    if (!res.ok) return { ok: false, reason: "failed" };
    // Apps Script always answers HTTP 200, even for "unauthorized" or "bad_json"; the real result is in the JSON body.
    // A JSON body with ok:false is a failure, so the visitor is told to retry instead of the enquiry being lost.
    if ((res.headers.get("content-type") ?? "").includes("application/json")) {
      const body: unknown = await res.json().catch(() => null);
      if (body && typeof body === "object" && (body as { ok?: unknown }).ok === false) return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "failed" };
  } finally {
    clearTimeout(timer);
  }
}

function isAppsScript(url: string): boolean {
  try {
    return new URL(url).hostname === "script.google.com";
  } catch {
    return false;
  }
}
