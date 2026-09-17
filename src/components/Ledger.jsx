import FadeIn from './FadeIn';

/**
 * The impact ledger.
 *
 * These figures carry long descriptions that a four-up stat grid crushes
 * into two words a line. Set as ledger rows — figure, unit, rule, account —
 * they read as a record rather than a dashboard, and the copy survives.
 */
export default function Ledger({ rows, tone = 'light' }) {
  const dark = tone === 'dark';

  return (
    <dl className="m-0">
      {rows.map((row, i) => (
        <FadeIn
          key={row.label}
          className={`grid grid-cols-[minmax(0,1fr)] items-baseline gap-x-8 gap-y-3 border-t py-7 sm:grid-cols-[9rem_minmax(0,1fr)] md:grid-cols-[11rem_minmax(0,1fr)] md:py-9 ${
            dark ? 'border-white/15' : 'border-ink/12'
          }`}
        >
            <dt className="flex items-baseline gap-2">
              <span
                className={`tnum font-display text-5xl font-normal leading-none md:text-6xl ${
                  dark ? 'text-gold' : 'text-deep'
                }`}
              >
                {row.figure}
                {row.suffix && <span className="text-[0.6em]">{row.suffix}</span>}
              </span>
            </dt>
            <dd className="m-0">
              <p className={`eyebrow ${dark ? 'text-white/70' : 'text-teal-deep'}`}>{row.unit}</p>
              <p
                className={`mt-2 max-w-xl text-base leading-relaxed ${
                  dark ? 'text-white/75' : 'text-slate'
                }`}
              >
                {row.label}
              </p>
            </dd>
        </FadeIn>
      ))}
      <div className={`border-t ${dark ? 'border-white/15' : 'border-ink/12'}`} />
    </dl>
  );
}
