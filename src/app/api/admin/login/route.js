import { json, readBody, clientIp, rateLimited } from '@/server/http';
import { passwordMatches, sessionCookie } from '@/server/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  // Tight limit: this is the only credential on the site.
  if (rateLimited(`admin-login:${clientIp(request)}`, { limit: 6, windowMs: 15 * 60_000 })) {
    return json(429, { error: 'Too many attempts. Try again later.' });
  }

  const { password } = await readBody(request);

  try {
    if (!passwordMatches(password)) {
      return json(401, { error: 'That password was not accepted.' });
    }
  } catch (err) {
    console.error('Admin auth is not configured:', err.message);
    return json(500, { error: 'Admin access is not configured.' });
  }

  return json(200, { ok: true }, { 'Set-Cookie': sessionCookie() });
}
