import crypto from 'node:crypto';

import { sql, ensureSchema } from '@/server/db';
import { json, readBody, clientIp, rateLimited, isEmail, str } from '@/server/http';
import { send, reportEmail, diagnosticNotifyEmail } from '@/server/mail';
import { siteUrl } from '@/lib/site-url';
import {
  validateAnswers,
  scoreAnswers,
  domainById,
  buildDomainRows,
  PRIVACY_POLICY_VERSION,
} from '#shared/diagnostic';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (rateLimited(`diagnostic:${clientIp(request)}`, { limit: 8, windowMs: 10 * 60_000 })) {
    return json(429, { error: 'Too many submissions from this address. Try again shortly.' });
  }

  const body = await readBody(request);

  const details = {
    firstName: str(body.firstName, 120),
    lastName: str(body.lastName, 120),
    email: str(body.email, 200),
    organisation: str(body.organisation, 200),
    countryRegion: str(body.countryRegion, 200),
    roleTitle: str(body.roleTitle, 200),
    phone: str(body.phone, 60),
    contextNotes: str(body.contextNotes, 2000),
  };

  const missing = Object.entries({
    firstName: 'first name',
    lastName: 'last name',
    organisation: 'organisation',
    countryRegion: 'country or region',
    roleTitle: 'role or title',
  }).find(([key]) => !details[key]);
  if (missing) return json(400, { error: `Enter your ${missing[1]}.` });
  if (!isEmail(details.email)) return json(400, { error: 'Enter a valid email address.' });
  if (body.reportConsent !== true || body.privacyAcknowledged !== true) {
    return json(400, { error: 'Both consent statements are required.' });
  }

  const validated = validateAnswers(body.answers);
  if (!validated.ok) return json(400, { error: validated.error });

  const { answers } = validated;
  const score = scoreAnswers(answers);
  const token = crypto.randomBytes(24).toString('base64url');

  try {
    await ensureSchema();
    await sql`
      insert into diagnostic_assessments (
        token, first_name, last_name, email, organisation, country_region, role_title,
        phone, context_notes, report_consent, marketing_opt_in, privacy_acknowledged,
        privacy_policy_version, answers, raw_score, overall_average, integration_percent,
        total_gap, risk_band, priority_domain_ids, strength_domain_ids,
        scoring_version, report_version
      ) values (
        ${token}, ${details.firstName}, ${details.lastName}, ${details.email},
        ${details.organisation}, ${details.countryRegion}, ${details.roleTitle},
        ${details.phone || null}, ${details.contextNotes || null},
        ${body.reportConsent === true}, ${body.marketingOptIn === true}, ${true},
        ${PRIVACY_POLICY_VERSION}, ${answers}, ${score.rawScore}, ${score.overallAverage},
        ${score.integrationPercent}, ${score.totalGap}, ${score.riskBand},
        ${score.priorityDomainIds}, ${score.strengthDomainIds},
        ${score.scoringVersion}, ${score.reportVersion}
      )
    `;
  } catch (err) {
    console.error('Failed to store diagnostic assessment:', err);
    return json(500, { error: 'Your report could not be saved. Please try again.' });
  }

  const url = `${siteUrl(request)}/diagnostic/results/${token}`;
  const rows = buildDomainRows(answers);
  const priorities = score.priorityDomainIds.map((id) => ({
    name: domainById(id).name,
    score: rows.find((r) => r.id === id).score,
    action: domainById(id).action,
  }));

  const emailStatus = await send({
    to: details.email,
    subject: `Your health systems diagnostic report — ${score.riskBand}`,
    html: reportEmail({ details, score, url, priorities }),
    replyTo: process.env.MAIL_TO || 'dbota@integratedhealthsystemstransformation.com',
  });

  // Best effort: the respondent already has their report either way.
  try {
    await sql`
      update diagnostic_assessments set email_status = ${emailStatus} where token = ${token}
    `;
  } catch (err) {
    console.error('Failed to record email status:', err);
  }

  await send({
    subject: `Diagnostic completed — ${details.organisation} (${score.riskBand})`,
    html: diagnosticNotifyEmail({ details, score, url, priorities }),
    replyTo: details.email,
  });

  return json(200, { token, emailStatus });
}
