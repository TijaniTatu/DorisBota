'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Eyebrow } from '@/components/ui';
import { maturity } from '@/lib/maturity';
import { DOMAINS } from '#shared/diagnostic';

function formatDate(value) {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function AssessmentDetail({ row }) {
  return (
    <div className="border-t border-ink/12 bg-bone px-5 py-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Eyebrow>Respondent</Eyebrow>
          <dl className="mt-4">
            {[
              ['Email', row.email],
              ['Role', row.roleTitle],
              ['Country or region', row.countryRegion],
              ['Phone', row.phone || '—'],
              ['Report consent', row.reportConsent ? 'Yes' : 'No'],
              ['Marketing opt-in', row.marketingOptIn ? 'Yes' : 'No'],
              ['Report email', row.emailStatus],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 border-t border-ink/10 py-2">
                <dt className="eyebrow text-slate">{label}</dt>
                <dd className="m-0 text-right text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          {row.contextNotes && (
            <>
              <Eyebrow className="mt-6">Context notes</Eyebrow>
              <p className="mt-3 text-sm leading-relaxed text-slate">{row.contextNotes}</p>
            </>
          )}
          <p className="mt-6 break-all font-mono text-xs text-slate">
            Report link: /diagnostic/results/{row.token}
          </p>
        </div>

        <div>
          <Eyebrow>Domain scores</Eyebrow>
          <ul className="mt-4 list-none p-0">
            {DOMAINS.map((domain, i) => {
              const score = row.answers[i];
              const isPriority = row.priorityDomainIds.includes(domain.id);
              return (
                <li
                  key={domain.id}
                  className="flex items-center gap-3 border-t border-ink/10 py-2 text-sm"
                >
                  <span
                    className={`tnum flex h-6 w-6 items-center justify-center font-mono text-xs ${
                      maturity(score).chip
                    }`}
                  >
                    {score}
                  </span>
                  <span className={isPriority ? 'font-medium text-deep' : 'text-slate'}>
                    {domain.name}
                  </span>
                  {isPriority && <span className="eyebrow ml-auto text-brass-deep">Priority</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Assessments({ rows }) {
  const [open, setOpen] = useState(null);

  if (!rows.length) {
    return <p className="text-base text-slate">No diagnostic submissions yet.</p>;
  }

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          <button
            type="button"
            onClick={() => setOpen(open === row.id ? null : row.id)}
            aria-expanded={open === row.id}
            className="grid w-full grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 border-t border-ink/12 py-4 text-left transition-colors hover:bg-deep/[0.03] sm:grid-cols-[3rem_minmax(0,1fr)_9rem_11rem]"
          >
            <span
              className={`tnum flex h-9 w-9 items-center justify-center font-mono text-sm ${
                maturity(Math.round(row.overallAverage)).chip
              }`}
            >
              {row.overallAverage.toFixed(1)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-deep">
                {row.firstName} {row.lastName}
              </span>
              <span className="block truncate text-xs text-slate">{row.organisation}</span>
            </span>
            <span className="hidden text-xs text-slate sm:block">{row.riskBand}</span>
            <span className="text-right text-xs text-slate">{formatDate(row.submittedAt)}</span>
          </button>
          {open === row.id && <AssessmentDetail row={row} />}
        </div>
      ))}
      <div className="border-t border-ink/12" />
    </div>
  );
}

function Inquiries({ rows }) {
  if (!rows.length) {
    return <p className="text-base text-slate">No scoping enquiries yet.</p>;
  }
  return (
    <div>
      {rows.map((row) => (
        <article key={row.id} className="border-t border-ink/12 py-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-deep">{row.name}</p>
              <p className="text-xs text-slate">
                {[row.role, row.organisation].filter(Boolean).join(' · ') || '—'}
              </p>
            </div>
            <p className="text-xs text-slate">{formatDate(row.createdAt)}</p>
          </div>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate">
            {row.message}
          </p>
          <a href={`mailto:${row.email}`} className="link-wipe mt-4 inline-block text-sm text-teal-deep">
            {row.email}
          </a>
        </article>
      ))}
      <div className="border-t border-ink/12" />
    </div>
  );
}

export default function AdminConsole({ assessments, inquiries }) {
  const router = useRouter();
  const [tab, setTab] = useState('assessments');

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-ink/12 pb-5">
        <div className="flex gap-6">
          {[
            ['assessments', `Diagnostics (${assessments.length})`],
            ['inquiries', `Enquiries (${inquiries.length})`],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`relative pb-2 text-sm transition-colors after:absolute after:inset-x-0 after:-bottom-[21px] after:h-[2px] after:bg-gold after:transition-transform ${
                tab === key
                  ? 'text-deep after:scale-x-100'
                  : 'text-slate hover:text-deep after:scale-x-0'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={signOut}
          className="link-wipe text-sm text-slate hover:text-deep"
        >
          Sign out
        </button>
      </div>

      <div className="mt-10">
        {tab === 'assessments' ? (
          <Assessments rows={assessments} />
        ) : (
          <Inquiries rows={inquiries} />
        )}
      </div>
    </div>
  );
}
