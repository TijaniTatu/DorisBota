import Link from 'next/link';

import FadeIn from '@/components/FadeIn';
import Seam from '@/components/Seam';
import { Container, Section, Eyebrow, ButtonLink, TextLink, Tm } from '@/components/ui';
import { Notice } from '@/components/Field';
import { maturity } from '@/lib/maturity';
import { getReport } from '@/server/queries';
import {
  SCALE,
  TOTAL_DOMAINS,
  bandFor,
  buildDomainRows,
  buildNinetyDayPlan,
  executiveSummaryFor,
  domainById,
} from '#shared/diagnostic';
import PrintButton from './PrintButton';

/* Each report is unique to one respondent and read fresh from the database. */
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Your diagnostic report',
  description: 'Your Health Systems Fragmentation Diagnostic report.',
  robots: { index: false, follow: false },
};

/**
 * A domain's score drawn as a four-step bar. The filled steps use the maturity
 * ramp, so a reader scanning the report sees the same colour language as the
 * questionnaire they just completed.
 */
function ScoreBar({ score, tone = 'light' }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {[1, 2, 3, 4].map((step) => (
        <span
          key={step}
          className={`h-[6px] w-8 ${
            step <= score ? maturity(score).bg : tone === 'dark' ? 'bg-white/15' : 'bg-ink/12'
          }`}
        />
      ))}
    </div>
  );
}

function DomainRow({ row, rank }) {
  return (
    <article className="grid gap-x-10 gap-y-4 border-t border-ink/12 py-8 md:grid-cols-12 md:py-10">
      <div className="md:col-span-4">
        <div className="flex items-center gap-3">
          <span
            className={`tnum flex h-9 w-9 shrink-0 items-center justify-center font-mono text-sm ${
              maturity(row.score).chip
            }`}
          >
            {row.score}
          </span>
          {rank && <span className="eyebrow text-slate">Priority {rank}</span>}
        </div>
        <h3 className="mt-5 font-display text-xl font-normal leading-snug text-deep">
          {row.name}
        </h3>
        <div className="mt-4">
          <ScoreBar score={row.score} />
        </div>
        <p className="eyebrow mt-3 text-slate">
          {row.classification} · gap of {row.gap}
        </p>
      </div>

      <div className="md:col-span-8 md:pt-1">
        <p className="text-base leading-relaxed text-slate">{row.interpretation}</p>
        <p className="mt-5 border-l-2 border-gold pl-5 text-base leading-relaxed text-deep">
          <span className="font-medium">{row.prefix}:</span> {row.action}
        </p>
      </div>
    </article>
  );
}

function NotFoundReport() {
  return (
    <Container className="py-32">
      <div className="mx-auto max-w-xl">
        <Notice>This report could not be found.</Notice>
        <p className="mt-8 text-base text-slate">
          Report links are unique and do not expire. If you followed a link from an email and
          it did not work, <TextLink href="/diagnostic">take the diagnostic again</TextLink> or{' '}
          <TextLink href="/contact">get in touch</TextLink>.
        </p>
      </div>
    </Container>
  );
}

export default async function DiagnosticReport({ params }) {
  const { token } = await params;

  let report;
  try {
    report = await getReport(token);
  } catch (err) {
    console.error('Failed to load report:', err);
    return <NotFoundReport />;
  }
  if (!report) return <NotFoundReport />;

  const rows = buildDomainRows(report.answers);
  const priorities = report.priorityDomainIds.map((id) => rows.find((r) => r.id === id));
  const strengths = report.strengthDomainIds.map((id) => rows.find((r) => r.id === id));
  const plan = buildNinetyDayPlan(report.priorityDomainIds);

  // Take the colour from the risk band itself rather than from a rounded
  // average, so the swatch can never contradict the band it sits under.
  const band = maturity(Number(bandFor(report.overallAverage).tone.slice(1)));

  const completed = new Date(report.submittedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <div className="bg-deep text-white">
        <Container className="pb-16 pt-16 md:pb-20 md:pt-20">
          <Eyebrow tone="gold">
            Health Systems Fragmentation Diagnostic · {report.organisation}
          </Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-title font-normal">
            {report.firstName}, here is where your system stands.
          </h1>

          <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-3">
            <div>
              <p className="tnum font-display text-6xl font-normal leading-none text-gold">
                {report.overallAverage.toFixed(1)}
                <span className="text-2xl text-white/70"> / 4.0</span>
              </p>
              <p className="eyebrow mt-4 text-white/70">
                Mean maturity across {TOTAL_DOMAINS} domains
              </p>
            </div>
            <div>
              <p className="tnum font-display text-6xl font-normal leading-none text-white">
                {report.integrationPercent}
                <span className="text-2xl text-white/70">%</span>
              </p>
              <p className="eyebrow mt-4 text-white/70">Integration score</p>
            </div>
            <div>
              <p className="font-display text-2xl font-normal leading-snug text-white">
                {report.riskBand}
              </p>
              <div className={`mt-4 h-[3px] w-24 ${band.bg}`} aria-hidden="true" />
              <p className="eyebrow mt-4 text-white/70">
                Total gap of {report.totalGap} against a perfect {TOTAL_DOMAINS * 4}
              </p>
            </div>
          </div>

          <p className="mt-12 max-w-3xl border-l-2 border-gold pl-6 text-lg leading-relaxed text-white/80">
            {executiveSummaryFor(report.riskBand)}
          </p>
        </Container>
      </div>

      <Section ground="paper">
        <FadeIn>
          <Eyebrow>Start here</Eyebrow>
          <h2 className="mt-6 font-display text-title font-normal text-deep">
            Your three priority domains
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            The domains where the gap between current practice and full integration is widest.
            Work on these before anything else.
          </p>
        </FadeIn>

        <div className="mt-14 md:mt-16">
          {priorities.map((row, i) => (
            <FadeIn key={row.id}>
              <DomainRow row={row} rank={i + 1} />
            </FadeIn>
          ))}
          <div className="border-t border-ink/12" />
        </div>
      </Section>

      <Section ground="deep">
        <FadeIn>
          <Eyebrow tone="gold">Protect these</Eyebrow>
          <h2 className="mt-6 font-display text-head font-normal text-white">
            {strengths.length > 1 ? 'Your strongest domains' : 'Your strongest domain'}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-px bg-white/12 md:grid-cols-2">
          {strengths.map((row) => (
            <FadeIn key={row.id}>
              <div className="flex h-full flex-col bg-deep p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <span
                    className={`tnum flex h-9 w-9 items-center justify-center font-mono text-sm ${
                      maturity(row.score).chip
                    }`}
                  >
                    {row.score}
                  </span>
                  <span className="eyebrow text-white/70">{row.classification}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-normal text-white">{row.name}</h3>
                <div className="mt-4">
                  <ScoreBar score={row.score} tone="dark" />
                </div>
                <p className="mt-6 text-base leading-relaxed text-white/70">
                  <span className="font-medium text-gold">{row.prefix}:</span> {row.action}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section ground="bone">
        <FadeIn>
          <Eyebrow>A practical next quarter</Eyebrow>
          <h2 className="mt-6 font-display text-title font-normal text-deep">Your 90-day plan</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Sequenced against your three priority domains:{' '}
            {report.priorityDomainIds.map((id) => domainById(id).name).join(', ')}.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-px bg-ink/12 md:mt-16 md:grid-cols-3">
          {plan.map((phase, i) => (
            <FadeIn key={phase.label}>
              <div className="flex h-full flex-col bg-bone p-8 md:p-10">
                <Eyebrow>{phase.label}</Eyebrow>
                <h3 className="mt-5 font-display text-xl font-normal text-deep">{phase.aim}</h3>
                <Seam
                  weights={[1, 1, 1]}
                  integrated={i === 2}
                  tone="brass"
                  gap={5}
                  height={2}
                  className="mt-5 max-w-14"
                />
                <ul className="mt-7 list-none space-y-3 p-0">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate">
                      <span className="mt-[0.6em] h-[2px] w-3 shrink-0 bg-gold" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section ground="paper">
        <FadeIn>
          <Eyebrow>The full picture</Eyebrow>
          <h2 className="mt-6 font-display text-head font-normal text-deep">All ten domains</h2>
        </FadeIn>

        <div className="mt-12">
          {rows.map((row) => (
            <FadeIn key={row.id}>
              <DomainRow row={row} />
            </FadeIn>
          ))}
          <div className="border-t border-ink/12" />
        </div>

        <FadeIn>
          <div className="mt-10">
            <Eyebrow>Scale reference</Eyebrow>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 p-0">
              {SCALE.map((s) => (
                <li key={s.value} className="flex items-center gap-3 text-sm text-slate">
                  <span className={`h-[6px] w-8 ${maturity(s.value).bg}`} aria-hidden="true" />
                  <span className="tnum font-mono text-xs">{s.value}</span>
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Section>

      <Section ground="deep">
        <Seam integrated tone="gold" height={2} className="mb-14" />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow tone="gold">Where this leads</Eyebrow>
            <h2 className="mt-6 font-display text-title font-normal text-white">
              Turn the findings into a plan that holds.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              This report is directional. A scoping conversation validates the findings against
              your actual governance, financing and workforce arrangements, and sets the tier of
              engagement that fits.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="gold">
                Start a scoping conversation
              </ButtonLink>
              <PrintButton />
            </div>
          </div>

          <div className="md:col-span-5 md:pl-8">
            <Eyebrow tone="gold">About this report</Eyebrow>
            <dl className="mt-6 list-none">
              {[
                ['Respondent', `${report.firstName} ${report.lastName}`],
                ['Organisation', report.organisation],
                ['Country or region', report.countryRegion],
                ['Completed', completed],
                ['Scoring version', report.scoringVersion],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-6 border-t border-white/15 py-3 last:border-b"
                >
                  <dt className="eyebrow text-white/70">{label}</dt>
                  <dd className="m-0 text-right text-sm text-white/80">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm leading-relaxed text-white/70">
              Produced with the Integrated Health Systems Transformation Framework
              <Tm className="text-gold" />. Not an accreditation, audit, certification or
              clinical assessment.{' '}
              <Link href="/privacy" className="link-wipe text-gold">
                Privacy notice
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
