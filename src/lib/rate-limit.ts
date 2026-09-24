/**
 * Minimal in-process fixed-window rate limiter for POST /api/contact.
 *
 * Zero-dependency and deliberately simple: enough to stop a single client
 * spamming the Resend quota, without standing up Upstash/KV for a personal
 * site.
 *
 * Caveat worth knowing: state lives in this process, so on serverless each
 * cold start resets it and concurrent instances don't share counts. It's a
 * speed bump, not a wall — the honeypot + Resend's own abuse protection are
 * the other layers. If the form ever gets real traffic, swap this for
 * Upstash Ratelimit (same `check()` call site).
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Drop expired buckets so the map can't grow without bound. */
function prune(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * @returns `null` when allowed, or seconds until the window resets when the
 * caller has exceeded `max` requests within `windowMs`.
 */
export function checkRateLimit(
  key: string,
  { max = 5, windowMs = 60_000 }: { max?: number; windowMs?: number } = {},
): number | null {
  const now = Date.now();

  // Cheap bound: only bother sweeping once the map is meaningfully large.
  if (buckets.size > 1000) prune(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (bucket.count >= max) {
    return Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
  }

  bucket.count += 1;
  return null;
}

/**
 * Best-effort client identity. `x-forwarded-for` is set by the hosting
 * platform's edge; falls back to `x-real-ip`, then a shared bucket so an
 * unknown caller still gets limited rather than unlimited.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) return first;

  const real = request.headers.get("x-real-ip");
  if (real) return real;

  return "unknown";
}
