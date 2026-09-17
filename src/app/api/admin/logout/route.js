import { json } from '@/server/http';
import { clearedCookie } from '@/server/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  return json(200, { ok: true }, { 'Set-Cookie': clearedCookie() });
}
