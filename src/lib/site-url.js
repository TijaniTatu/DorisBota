/**
 * The canonical origin.
 *
 * Prefers the configured SITE_URL so report links in emails always point at
 * the real domain, and falls back to the forwarded host, which keeps preview
 * deployments self-consistent.
 */
export function siteUrl(request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');

  if (request) {
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
    const proto = request.headers.get('x-forwarded-proto') ?? 'https';
    if (host) return `${proto}://${host}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return 'http://localhost:3000';
}
