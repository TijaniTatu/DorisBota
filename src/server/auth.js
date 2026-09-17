import crypto from 'node:crypto';

/**
 * Admin session.
 *
 * One shared password, exchanged for a signed, expiring cookie. There is one
 * administrator and no user accounts, so a full auth provider would be more
 * surface area than the problem deserves — but the cookie is signed so it
 * cannot be forged, and password comparison is timing-safe.
 */

const COOKIE = 'db_admin';
const MAX_AGE_SECONDS = 60 * 60 * 12;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error('ADMIN_SESSION_SECRET is not set.');
  return value;
}

function sign(payload) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function passwordMatches(candidate) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error('ADMIN_PASSWORD is not set.');
  if (typeof candidate !== 'string') return false;
  // Hash both sides first so the comparison length never leaks the password length.
  const hash = (value) => crypto.createHash('sha256').update(value).digest();
  return crypto.timingSafeEqual(hash(candidate), hash(expected));
}

export function sessionCookie() {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const token = `${expires}.${sign(String(expires))}`;
  const flags = [
    `${COOKIE}=${token}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Strict',
    `Max-Age=${MAX_AGE_SECONDS}`,
  ];
  if (process.env.NODE_ENV === 'production') flags.push('Secure');
  return flags.join('; ');
}

export function clearedCookie() {
  return `${COOKIE}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`;
}

/** Verify a raw Cookie header. Works from a route handler or a server component. */
export function isAuthenticated(cookieHeader) {
  if (!cookieHeader) return false;

  const raw = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (!raw) return false;

  const [expires, signature] = raw.split('.');
  if (!expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;

  try {
    return safeEqual(signature, sign(expires));
  } catch {
    return false;
  }
}
