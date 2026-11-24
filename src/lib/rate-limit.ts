/**
 * Sliding-window limiter, in memory. Good enough to blunt a single noisy client on one server instance.
 * On serverless hosting each instance has its own memory, so this is a first line of defence only;
 * put a shared store (Redis or the platform's rate-limit product) behind it before relying on it.
 */
export class RateLimiter {
  private hits = new Map<string, number[]>();
  constructor(private readonly limit: number, private readonly windowMs: number, private readonly maxKeys = 5000) {}

  /** Returns true if the request is allowed, and records it. */
  allow(key: string, now: number = Date.now()): boolean {
    const cutoff = now - this.windowMs;
    const recent = (this.hits.get(key) ?? []).filter((t) => t > cutoff);
    if (recent.length >= this.limit) {
      this.hits.set(key, recent);
      return false;
    }
    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > this.maxKeys) this.prune(cutoff);
    return true;
  }

  private prune(cutoff: number) {
    for (const [k, v] of this.hits) if (v.every((t) => t <= cutoff)) this.hits.delete(k);
  }
}
