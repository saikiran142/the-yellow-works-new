/**
 * Remembers the outcome of a submission key for a short time, so a retry (double click, flaky network)
 * returns the first result instead of delivering the enquiry twice. The key is also forwarded to the
 * receiver so it can deduplicate if this instance restarts.
 */
export type Outcome = { status: number; body: unknown };

export class IdempotencyStore {
  private seen = new Map<string, { at: number; outcome: Outcome }>();
  constructor(private readonly ttlMs: number, private readonly maxEntries = 2000) {}

  get(key: string, now: number = Date.now()): Outcome | undefined {
    const e = this.seen.get(key);
    if (!e) return undefined;
    if (now - e.at > this.ttlMs) {
      this.seen.delete(key);
      return undefined;
    }
    return e.outcome;
  }

  private inflight = new Map<string, Promise<Outcome>>();

  /**
   * Runs `fn` once per key at a time. A second request with the same key that arrives while the first is
   * still running waits for it and gets the same result, so a double click cannot deliver twice.
   * Only successful results are remembered afterwards, so a failed attempt can be retried.
   */
  async run(key: string, fn: () => Promise<Outcome>, now: () => number = Date.now): Promise<Outcome> {
    const done = this.get(key, now());
    if (done) return done;
    const running = this.inflight.get(key);
    if (running) return running;
    const p = fn().then((o) => {
      if (o.status === 200) this.set(key, o, now());
      return o;
    }).finally(() => this.inflight.delete(key));
    this.inflight.set(key, p);
    return p;
  }

  /** Only successful deliveries are stored, so a failed attempt can be retried. */
  set(key: string, outcome: Outcome, now: number = Date.now()) {
    this.seen.set(key, { at: now, outcome });
    if (this.seen.size > this.maxEntries) {
      const oldest = this.seen.keys().next().value;
      if (oldest !== undefined) this.seen.delete(oldest);
    }
  }
}

export const isValidKey = (k: string | null): k is string => !!k && /^[A-Za-z0-9_-]{16,64}$/.test(k);
