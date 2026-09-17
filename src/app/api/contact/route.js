import { sql, ensureSchema } from '@/server/db';
import { json, readBody, clientIp, rateLimited, isEmail, str } from '@/server/http';
import { send, inquiryEmail } from '@/server/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (rateLimited(`contact:${clientIp(request)}`, { limit: 5, windowMs: 10 * 60_000 })) {
    return json(429, { error: 'Too many messages from this address. Try again shortly.' });
  }

  const body = await readBody(request);
  const form = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    organisation: str(body.organisation, 200),
    role: str(body.role, 200),
    message: str(body.message, 5000),
  };

  if (!form.name) return json(400, { error: 'Enter your name.' });
  if (!isEmail(form.email)) return json(400, { error: 'Enter a valid email address.' });
  if (!form.message) return json(400, { error: 'Enter a message.' });
  if (body.privacyAcknowledged !== true) {
    return json(400, { error: 'Please acknowledge the privacy notice.' });
  }

  try {
    await ensureSchema();
    await sql`
      insert into scoping_inquiries (name, email, organisation, role, message)
      values (${form.name}, ${form.email}, ${form.organisation || null},
              ${form.role || null}, ${form.message})
    `;
  } catch (err) {
    console.error('Failed to store scoping enquiry:', err);
    return json(500, { error: 'That message could not be saved. Please email directly.' });
  }

  // The enquiry is safely stored; a failed notification must not fail the request.
  await send({
    subject: `Scoping enquiry — ${form.name}${form.organisation ? ` (${form.organisation})` : ''}`,
    html: inquiryEmail(form),
    replyTo: form.email,
  });

  return json(200, { ok: true });
}
