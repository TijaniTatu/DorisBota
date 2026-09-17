import 'server-only';

import { sql, ensureSchema } from './db';

/**
 * Read a report by its public token.
 *
 * The token is 24 random bytes, so it is the credential — but the projection
 * still omits everything the report does not render (email, phone, context
 * notes, marketing consent), so a shared link leaks as little as possible.
 */
export async function getReport(token) {
  if (typeof token !== 'string' || token.length < 20 || token.length > 200) return null;

  await ensureSchema();
  const [row] = await sql`
    select token, first_name, last_name, organisation, country_region, role_title,
           answers, raw_score, overall_average, integration_percent, total_gap,
           risk_band, priority_domain_ids, strength_domain_ids,
           scoring_version, report_version, submitted_at
    from diagnostic_assessments
    where token = ${token}
    limit 1
  `;
  if (!row) return null;

  return {
    token: row.token,
    firstName: row.first_name,
    lastName: row.last_name,
    organisation: row.organisation,
    countryRegion: row.country_region,
    roleTitle: row.role_title,
    answers: row.answers.map(Number),
    rawScore: Number(row.raw_score),
    overallAverage: Number(row.overall_average),
    integrationPercent: Number(row.integration_percent),
    totalGap: Number(row.total_gap),
    riskBand: row.risk_band,
    priorityDomainIds: row.priority_domain_ids.map(Number),
    strengthDomainIds: row.strength_domain_ids.map(Number),
    scoringVersion: row.scoring_version,
    reportVersion: row.report_version,
    submittedAt: row.submitted_at.toISOString(),
  };
}

/** Everything the admin view lists. Only ever called behind an auth check. */
export async function getSubmissions() {
  await ensureSchema();

  const [assessments, inquiries] = await Promise.all([
    sql`
      select id, token, first_name, last_name, email, organisation, country_region,
             role_title, phone, context_notes, report_consent, marketing_opt_in,
             answers, overall_average, integration_percent, total_gap, risk_band,
             priority_domain_ids, email_status, submitted_at
      from diagnostic_assessments
      order by submitted_at desc
      limit 500
    `,
    sql`
      select id, name, email, organisation, role, message, created_at
      from scoping_inquiries
      order by created_at desc
      limit 500
    `,
  ]);

  return {
    assessments: assessments.map((row) => ({
      id: row.id,
      token: row.token,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      organisation: row.organisation,
      countryRegion: row.country_region,
      roleTitle: row.role_title,
      phone: row.phone,
      contextNotes: row.context_notes,
      reportConsent: row.report_consent,
      marketingOptIn: row.marketing_opt_in,
      answers: row.answers.map(Number),
      overallAverage: Number(row.overall_average),
      integrationPercent: Number(row.integration_percent),
      totalGap: Number(row.total_gap),
      riskBand: row.risk_band,
      priorityDomainIds: row.priority_domain_ids.map(Number),
      emailStatus: row.email_status,
      submittedAt: row.submitted_at.toISOString(),
    })),
    inquiries: inquiries.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      organisation: row.organisation,
      role: row.role,
      message: row.message,
      createdAt: row.created_at.toISOString(),
    })),
  };
}
