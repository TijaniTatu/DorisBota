import { neon } from '@neondatabase/serverless';

/**
 * The connection is created on first use rather than at module load.
 *
 * Next evaluates route modules while collecting page data at build time, and a
 * build should never need a database. Deferring the client keeps builds working
 * without DATABASE_URL and surfaces a clear error at request time if it is
 * genuinely missing in production.
 */
let client;

function connection() {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set.');
    client = neon(url);
  }
  return client;
}

/** Tagged template, same shape as the neon client it wraps. */
export function sql(strings, ...values) {
  return connection()(strings, ...values);
}

/**
 * Create the schema if it is missing.
 *
 * Serverless instances are short-lived, so this runs at most once per warm
 * instance and is a no-op after the first deploy. `if not exists` makes
 * concurrent cold starts safe.
 */
let schemaReady;

export function ensureSchema() {
  schemaReady ??= (async () => {
    await sql`
      create table if not exists diagnostic_assessments (
        id                   uuid primary key default gen_random_uuid(),
        token                text not null unique,
        first_name           text not null,
        last_name            text not null,
        email                text not null,
        organisation         text not null,
        country_region       text not null,
        role_title           text not null,
        phone                text,
        context_notes        text,
        report_consent       boolean not null default false,
        marketing_opt_in     boolean not null default false,
        privacy_acknowledged boolean not null default false,
        privacy_policy_version text,
        answers              smallint[] not null,
        raw_score            smallint not null,
        overall_average      numeric(3,2) not null,
        integration_percent  smallint not null,
        total_gap            smallint not null,
        risk_band            text not null,
        priority_domain_ids  smallint[] not null,
        strength_domain_ids  smallint[] not null,
        scoring_version      text not null,
        report_version       text not null,
        email_status         text not null default 'pending',
        submitted_at         timestamptz not null default now()
      )
    `;
    await sql`
      create table if not exists scoping_inquiries (
        id           uuid primary key default gen_random_uuid(),
        name         text not null,
        email        text not null,
        organisation text,
        role         text,
        message      text not null,
        created_at   timestamptz not null default now()
      )
    `;
    await sql`
      create index if not exists diagnostic_assessments_submitted_at_idx
        on diagnostic_assessments (submitted_at desc)
    `;
    await sql`
      create index if not exists scoping_inquiries_created_at_idx
        on scoping_inquiries (created_at desc)
    `;
  })().catch((err) => {
    // Reset so the next request retries rather than caching a failure forever.
    schemaReady = undefined;
    throw err;
  });

  return schemaReady;
}
