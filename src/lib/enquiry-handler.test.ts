import { describe, expect, it, vi } from "vitest";
import { handleEnquiry, type HandlerDeps } from "./enquiry-handler";
import { IdempotencyStore } from "./idempotency";
import { RateLimiter } from "./rate-limit";
import { deliverEnquiry } from "./delivery";

const KEY = "abcdefghijklmnop1234";
const valid = { name: "Asha", business: "", type: "clinic", city: "", phone: "9811111111", message: "Hello", website: "" };
const headers = (over: Record<string, string> = {}): { get(n: string): string | null } => {
  const h: Record<string, string> = { origin: "https://theyellowworks.com", "idempotency-key": KEY, ...over };
  return { get: (n: string) => h[n.toLowerCase()] ?? null };
};
const deps = (over: Partial<HandlerDeps> = {}): HandlerDeps => ({
  limiter: new RateLimiter(5, 3600_000),
  idempotency: new IdempotencyStore(3600_000),
  delivery: { url: "https://example.test/hook" },
  allowedHosts: ["theyellowworks.com"],
  deliver: vi.fn(async () => ({ ok: true as const })),
  ...over,
});
const call = (body: unknown, d = deps(), h = headers(), ip = "1.1.1.1") => handleEnquiry({ rawBody: typeof body === "string" ? body : JSON.stringify(body), headers: h, ip }, d);

describe("handleEnquiry", () => {
  it("delivers a valid enquiry", async () => {
    const d = deps();
    const r = await call(valid, d);
    expect(r).toEqual({ status: 200, body: { ok: true } });
    expect(d.deliver).toHaveBeenCalledTimes(1);
  });
  it("rejects a foreign or missing origin", async () => {
    expect((await call(valid, deps(), headers({ origin: "https://evil.test" }))).status).toBe(403);
    expect((await call(valid, deps(), { get: () => null })).status).toBe(403);
  });
  it("silently accepts but does not deliver when the honeypot is filled", async () => {
    const d = deps();
    const r = await call({ ...valid, website: "http://spam" }, d);
    expect(r.status).toBe(200);
    expect(d.deliver).not.toHaveBeenCalled();
  });
  it("rate limits the sixth request from one client", async () => {
    const d = deps();
    for (let i = 0; i < 5; i++) await call(valid, d, headers({ "idempotency-key": `key-number-${String(i).padStart(10, "0")}` }));
    expect((await call(valid, d, headers({ "idempotency-key": "key-number-0000000009" }))).status).toBe(429);
  });
  it("returns field errors that say how to fix them", async () => {
    const r = await call({ ...valid, phone: "123" });
    expect(r.status).toBe(422);
    expect(JSON.stringify(r.body)).toMatch(/10-digit/);
  });
  it("is idempotent: a retry with the same key does not deliver twice", async () => {
    const d = deps();
    await call(valid, d);
    const again = await call(valid, d);
    expect(again.status).toBe(200);
    expect(d.deliver).toHaveBeenCalledTimes(1);
  });
  it("delivers once when two identical requests arrive at the same time", async () => {
    let calls = 0;
    const deliver = vi.fn(async () => { calls++; await new Promise((r) => setTimeout(r, 30)); return { ok: true as const }; });
    const d = deps({ deliver });
    const [a, b] = await Promise.all([call(valid, d), call(valid, d)]);
    expect([a.status, b.status]).toEqual([200, 200]);
    expect(calls).toBe(1);
  });
  it("passes a known demo source to delivery and ignores unknown ones", async () => {
    const d = deps();
    await call({ ...valid, source: "demo-clinic" }, d);
    expect((d.deliver as ReturnType<typeof vi.fn>).mock.calls[0][2]).toMatchObject({ source: "demo-clinic" });
    const d2 = deps();
    await call({ ...valid, source: "<script>" }, d2, headers({ "idempotency-key": "other-key-0000000001" }));
    expect((d2.deliver as ReturnType<typeof vi.fn>).mock.calls[0][2]).toMatchObject({ source: "theyellowworks.com" });
  });
  it("accepts platform site tags of the form site-<slug> and rejects look-alikes", async () => {
    const d = deps();
    await call({ ...valid, source: "site-brightpath" }, d, headers({ "idempotency-key": "site-key-0000000001" }));
    expect((d.deliver as ReturnType<typeof vi.fn>).mock.calls[0][2]).toMatchObject({ source: "site-brightpath" });
    const d2 = deps();
    await call({ ...valid, source: "site-Bad Slug!" }, d2, headers({ "idempotency-key": "site-key-0000000002" }));
    expect((d2.deliver as ReturnType<typeof vi.fn>).mock.calls[0][2]).toMatchObject({ source: "theyellowworks.com" });
  });
  it("does not remember failures, so they can be retried", async () => {
    const deliver = vi.fn().mockResolvedValueOnce({ ok: false, reason: "failed" }).mockResolvedValueOnce({ ok: true });
    const d = deps({ deliver });
    expect((await call(valid, d)).status).toBe(502);
    expect((await call(valid, d)).status).toBe(200);
    expect(deliver).toHaveBeenCalledTimes(2);
  });
  it("returns 503 when no destination is configured", async () => {
    const r = await call(valid, deps({ deliver: undefined, delivery: {} }));
    expect(r.status).toBe(503);
  });
  it("rejects bad JSON, oversized bodies and bad keys", async () => {
    expect((await call("not json")).status).toBe(400);
    expect((await call({ ...valid, message: "x".repeat(9000) })).status).toBe(413);
    expect((await call(valid, deps(), headers({ "idempotency-key": "short" }))).status).toBe(400);
  });
  it("never puts personal data in the error response", async () => {
    const r = await call({ ...valid, phone: "123" });
    expect(JSON.stringify(r.body)).not.toContain("Asha");
  });
});

describe("deliverEnquiry", () => {
  it("posts the normalised payload with the idempotency key and secret", async () => {
    const f = vi.fn(async () => new Response("ok", { status: 200 }));
    const r = await deliverEnquiry({ ...valid, phone: "+91 98111 11111" }, KEY, { url: "https://x.test/h", secret: "s3" }, f as unknown as typeof fetch, () => new Date("2026-01-01T00:00:00Z"));
    expect(r).toEqual({ ok: true });
    const [, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ id: KEY, phone: "9811111111", source: "theyellowworks.com", receivedAt: "2026-01-01T00:00:00.000Z" });
    expect((init.headers as Record<string, string>)["idempotency-key"]).toBe(KEY);
    expect((init.headers as Record<string, string>).authorization).toBe("Bearer s3");
  });
  it("reports failure on a non-2xx or a thrown error", async () => {
    expect((await deliverEnquiry(valid, KEY, { url: "https://x.test" }, (async () => new Response("", { status: 500 })) as unknown as typeof fetch))).toEqual({ ok: false, reason: "failed" });
    expect((await deliverEnquiry(valid, KEY, { url: "https://x.test" }, (async () => { throw new Error("net"); }) as unknown as typeof fetch))).toEqual({ ok: false, reason: "failed" });
  });
  it("reports failure when a 200 JSON reply says ok:false (Apps Script errors)", async () => {
    const reply = (o: unknown) => (async () => new Response(JSON.stringify(o), { status: 200, headers: { "content-type": "application/json; charset=utf-8" } })) as unknown as typeof fetch;
    expect(await deliverEnquiry(valid, KEY, { url: "https://x.test" }, reply({ ok: false, error: "unauthorized" }))).toEqual({ ok: false, reason: "failed" });
    expect(await deliverEnquiry(valid, KEY, { url: "https://x.test" }, reply({ ok: true }))).toEqual({ ok: true });
    expect(await deliverEnquiry(valid, KEY, { url: "https://x.test" }, reply({ ok: true, duplicate: true }))).toEqual({ ok: true });
  });
  it("does not send an Authorization header to Google Apps Script", async () => {
    const f = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } }));
    const r = await deliverEnquiry(valid, KEY, { url: "https://script.google.com/macros/s/ID/exec?key=k", secret: "s3" }, f as unknown as typeof fetch);
    expect(r).toEqual({ ok: true });
    const [, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    expect((init.headers as Record<string, string>).authorization).toBeUndefined();
  });
  it("is not_configured without a url", async () => {
    expect(await deliverEnquiry(valid, KEY, {})).toEqual({ ok: false, reason: "not_configured" });
  });
});
