import { deliverEnquiry, type DeliveryConfig, type DeliveryResult } from "./delivery";
import { IdempotencyStore, isValidKey, type Outcome } from "./idempotency";
import { RateLimiter } from "./rate-limit";
import { validateEnquiry, type EnquiryInput } from "./validation";

export interface HandlerRequest {
  rawBody: string;
  headers: { get(name: string): string | null };
  ip: string;
}

export interface HandlerDeps {
  limiter: RateLimiter;
  idempotency: IdempotencyStore;
  delivery: DeliveryConfig;
  /** Hosts allowed in the Origin header (the site's own host names). */
  allowedHosts: string[];
  deliver?: (e: EnquiryInput, key: string, cfg: DeliveryConfig) => Promise<DeliveryResult>;
}

const TYPES = new Set(["clinic", "gym", "realty", "other"]);
/** Only these tags are accepted, so a caller cannot stamp arbitrary text into the receiver. */
const SOURCES = new Set(["theyellowworks.com", "demo-clinic", "demo-gym", "demo-realty"]);
/** Platform sites tag their enquiries `site-<slug>`. */
const SITE_SOURCE = /^site-[a-z0-9-]{2,40}$/;
const MAX_BODY = 8 * 1024;
const json = (status: number, body: unknown): Outcome => ({ status, body });

/**
 * The whole server-side flow, as a pure function so it can be tested without a server.
 * Order: origin, size, honeypot, rate limit, validation, idempotency, delivery.
 * Errors say what happened and what to do. Personal data is never logged.
 */
export async function handleEnquiry(req: HandlerRequest, deps: HandlerDeps): Promise<Outcome> {
  // 1. Browsers send Origin on POST. Anything else is not our form.
  const origin = req.headers.get("origin");
  let originHost = "";
  try { originHost = origin ? new URL(origin).host : ""; } catch { originHost = ""; }
  if (!originHost || !deps.allowedHosts.includes(originHost)) return json(403, { error: "forbidden" });

  if (req.rawBody.length > MAX_BODY) return json(413, { error: "too_large", message: "That message is too long to send. Shorten it and try again." });

  let data: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(req.rawBody);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("shape");
    data = parsed as Record<string, unknown>;
  } catch {
    return json(400, { error: "bad_request", message: "We couldn’t read that form. Reload the page and try again." });
  }

  // 2. Honeypot: a hidden field real people never fill. Answer as if it worked so bots learn nothing.
  if (typeof data.website === "string" && data.website.trim() !== "") return json(200, { ok: true });

  // 3. Rate limit per client.
  if (!deps.limiter.allow(req.ip)) return json(429, { error: "rate_limited", message: "Too many enquiries from this connection. Try again in an hour, or email us." });

  // 4. Validation (the same function the form uses).
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const enquiry: EnquiryInput = { name: str(data.name), business: str(data.business), type: str(data.type), city: str(data.city), phone: str(data.phone), message: str(data.message) };
  if (!TYPES.has(enquiry.type)) enquiry.type = "other";
  if (enquiry.business.length > 120 || enquiry.city.length > 80 || enquiry.name.length > 120) return json(422, { error: "invalid", errors: { name: "Shorten your entries and try again." } });
  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length) return json(422, { error: "invalid", errors });

  const source = typeof data.source === "string" && (SOURCES.has(data.source) || SITE_SOURCE.test(data.source)) ? data.source : "theyellowworks.com";

  // 5 and 6. Idempotent delivery: a retry or a simultaneous duplicate with the same key waits for, and returns, the first result.
  const key = req.headers.get("idempotency-key");
  if (!isValidKey(key)) return json(400, { error: "bad_request", message: "We couldn’t read that form. Reload the page and try again." });
  return deps.idempotency.run(key, async () => {
    const result = await (deps.deliver ?? deliverEnquiry)(enquiry, key, { ...deps.delivery, source });
    if (!result.ok) {
      if (result.reason === "not_configured") return json(503, { error: "unavailable", message: "Enquiries by form aren’t switched on yet. Email us and we’ll reply." });
      return json(502, { error: "delivery_failed", message: "Your enquiry didn’t send. Try again, or email us." });
    }
    return json(200, { ok: true });
  });
}
