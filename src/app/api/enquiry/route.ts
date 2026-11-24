import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { handleEnquiry } from "@/lib/enquiry-handler";
import { IdempotencyStore } from "@/lib/idempotency";
import { RateLimiter } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Module-level, so they live as long as the server instance. See rate-limit.ts for the serverless caveat.
const limiter = new RateLimiter(5, 60 * 60 * 1000);
const idempotency = new IdempotencyStore(24 * 60 * 60 * 1000);

function allowedHosts(req: Request): string[] {
  const hosts = new Set<string>();
  try { hosts.add(new URL(site.url).host); hosts.add(`www.${new URL(site.url).host}`); } catch {}
  const host = req.headers.get("host");
  // Local development and preview deployments call from their own host.
  if (host && (process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview")) hosts.add(host);
  return [...hosts];
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const out = await handleEnquiry(
    { rawBody: await req.text(), headers: req.headers, ip },
    { limiter, idempotency, allowedHosts: allowedHosts(req), delivery: { url: process.env.ENQUIRY_WEBHOOK_URL, secret: process.env.ENQUIRY_WEBHOOK_SECRET } },
  );
  return NextResponse.json(out.body, { status: out.status, headers: { "cache-control": "no-store" } });
}
