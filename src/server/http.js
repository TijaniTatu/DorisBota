/** Shared helpers for the route handlers. */

export function json(status, body, headers) {
  return Response.json(body, { status, ...(headers ? { headers } : {}) });
}

/** Parse a JSON body, tolerating an empty or malformed one. */
export async function readBody(request) {
  try {
    return (await request.json()) ?? {};
  } catch {
    return {};
  }
}

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/**
 * Best-effort throttle.
 *
 * Per-instance memory, so it will not stop an attacker spread across
 * instances. It exists to stop the ordinary case — a stuck retry loop or a
 * casual script — without adding a Redis dependency to a site that receives a
 * handful of submissions a week.
 */
const hits = new Map();

export function rateLimited(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const record = hits.get(key);

  if (!record || now > record.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    if (hits.size > 5000) hits.clear();
    return false;
  }

  record.count += 1;
  return record.count > limit;
}

export const isEmail = (value) =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/** Trim, cap length, and coerce anything unexpected to an empty string. */
export function str(value, max = 500) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
