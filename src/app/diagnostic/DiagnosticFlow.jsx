'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import PageHeader from '@/components/PageHeader';
import { Container, Eyebrow, Button, TextLink, Tm } from '@/components/ui';
import { Field, Check, Notice } from '@/components/Field';
import { DIAGNOSTIC } from '@/data/site';
import { DOMAINS, SCALE, TOTAL_DOMAINS } from '#shared/diagnostic';
import { maturity } from '@/lib/maturity';

const STORAGE_KEY = 'db.diagnostic.v1';

const EMPTY_DETAILS = {
  firstName: '',
  lastName: '',
  email: '',
  organisation: '',
  countryRegion: '',
  roleTitle: '',
  phone: '',
  contextNotes: '',
  reportConsent: false,
  marketingOptIn: false,
  privacyAcknowledged: false,
};

/**
 * The progress indicator is the seam: ten segments, one per domain, closing
 * as the instrument is completed. The device that states the argument on the
 * home page is the same one that measures it here.
 */
function ProgressSeam({ answers, current }) {
  return (
    <div>
      <div className="flex w-full gap-[3px]" aria-hidden="true">
        {answers.map((value, i) => (
          <span key={i} className="relative h-[3px] flex-1 bg-ink/12">
            <motion.span
              className={`absolute inset-0 origin-left ${
                i === current ? 'bg-teal' : 'bg-gold'
              }`}
              initial={false}
              animate={{ scaleX: value || i === current ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <p className="eyebrow text-slate">
          Domain {current + 1} of {TOTAL_DOMAINS}
        </p>
        <p className="tnum eyebrow text-slate">
          {answers.filter(Boolean).length} answered
        </p>
      </div>
    </div>
  );
}

export default function DiagnosticFlow() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [step, setStep] = useState('intro');
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [answers, setAnswers] = useState(() => Array(TOTAL_DOMAINS).fill(null));
  const [current, setCurrent] = useState(0);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const restored = useRef(false);
  const headingRef = useRef(null);

  // Restore an interrupted sitting.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved) {
        setDetails({ ...EMPTY_DETAILS, ...saved.details });
        if (Array.isArray(saved.answers) && saved.answers.length === TOTAL_DOMAINS) {
          setAnswers(saved.answers);
        }
        if (saved.step) setStep(saved.step);
        if (typeof saved.current === 'number') setCurrent(saved.current);
      }
    } catch {
      /* a corrupt draft is not worth reporting; start clean */
    }
    restored.current = true;
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, details, answers, current }));
    } catch {
      /* private browsing: progress simply is not saved */
    }
  }, [step, details, answers, current]);

  // Move focus to the new heading on each step so keyboard and screen reader
  // users are not left at the top of the document.
  useEffect(() => {
    if (step !== 'intro') headingRef.current?.focus();
  }, [step, current]);

  const set = (key) => (e) =>
    setDetails((d) => ({
      ...d,
      [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const detailErrors = {
    firstName: details.firstName.trim() ? '' : 'Enter your first name.',
    lastName: details.lastName.trim() ? '' : 'Enter your last name.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())
      ? ''
      : 'Enter a valid email address.',
    organisation: details.organisation.trim() ? '' : 'Enter your organisation.',
    countryRegion: details.countryRegion.trim() ? '' : 'Enter the country or region you work in.',
    roleTitle: details.roleTitle.trim() ? '' : 'Enter your role or title.',
  };
  const detailsValid =
    Object.values(detailErrors).every((v) => !v) &&
    details.reportConsent &&
    details.privacyAcknowledged;

  function goToDetails() {
    setStep('details');
  }

  function startQuestions() {
    setTouched(true);
    if (!detailsValid) return;
    setTouched(false);
    setStep('question');
  }

  function next() {
    if (current < TOTAL_DOMAINS - 1) setCurrent((c) => c + 1);
    else setStep('review');
  }

  function back() {
    if (current > 0) setCurrent((c) => c - 1);
    else setStep('details');
  }

  async function submit() {
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/diagnostic/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...details, answers }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      router.push(`/diagnostic/results/${data.token}`);
    } catch (err) {
      setError(
        err.message === 'Submission failed'
          ? 'That did not submit. Check your connection and try again.'
          : err.message,
      );
      setSubmitting(false);
    }
  }

  const stepMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      };

  const headingProps = {
    ref: headingRef,
    tabIndex: -1,
    className: 'font-display text-head font-normal text-deep outline-none',
  };

  return (
    <>

      {step === 'intro' && (
        <PageHeader
          eyebrow={`${DIAGNOSTIC.name} · Free · Five to ten minutes`}
          title="Where is fragmentation holding your health system back?"
          lead="Score ten domains of integration on a four-point maturity scale and receive a gap analysis with your three priority domains and a practical 90-day plan."
          intro="The diagnostics helps policy makers, governments, UN agencies, and donor programmes assess the degree to which WASH and infection prevention and control are integrated into the health system, or remain fragmented across donor-driven, siloed programmes."
        />
      )}

      <Container className="pb-24 pt-16 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait" initial={false}>
            {step === 'intro' && (
              <motion.div key="intro" {...stepMotion}>
                <h2 className="font-display text-head font-normal text-deep">
                  What the instrument does
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-slate">
                  Ten equally weighted domains, each scored from 1 to 4. The report names
                  the three domains most in need of attention, what each weakness tends to
                  cause, and what to do first.
                </p>
                <p className="mt-5 text-base leading-relaxed text-slate">
                  This diagnostic is directional. It is not a formal accreditation, audit,
                  certification, or clinical assessment.
                </p>

                <div className="mt-12">
                  <Eyebrow>The maturity scale</Eyebrow>
                  <ul className="mt-6 list-none p-0">
                    {SCALE.map((row) => (
                      <li
                        key={row.value}
                        className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-ink/12 py-4 last:border-b"
                      >
                        <span
                          className={`tnum flex h-9 w-9 items-center justify-center font-mono text-sm ${maturity(row.value).chip}`}
                        >
                          {row.value}
                        </span>
                        <span>
                          <span className="block text-base font-medium text-deep">
                            {row.label}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-slate">
                            {row.description}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12">
                  <Eyebrow>The ten domains</Eyebrow>
                  <ol className="mt-6 grid list-none gap-x-8 gap-y-2 p-0 sm:grid-cols-2">
                    {DOMAINS.map((d) => (
                      <li key={d.id} className="flex gap-3 text-sm text-slate">
                        <span className="tnum font-mono text-xs text-teal-deep">
                          {String(d.id).padStart(2, '0')}
                        </span>
                        {d.name}
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="mt-12 text-sm leading-relaxed text-slate">
                  Before you begin, please read the{' '}
                  <TextLink href="/privacy">privacy notice</TextLink>, which explains how your
                  information is collected, used and protected.
                </p>

                <div className="mt-10">
                  <Button variant="deep" onClick={goToDetails}>
                    Begin
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div key="details" {...stepMotion}>
                <Eyebrow>Step 1 of 3 · Your details</Eyebrow>
                <h2 {...headingProps} className={`mt-5 ${headingProps.className}`}>
                  Tell us a little about you
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate">
                  Your report is generated instantly and also emailed to you, so it can be
                  shared with colleagues.
                </p>

                <div className="mt-12 space-y-9">
                  <div className="grid gap-9 sm:grid-cols-2">
                    <Field
                      label="First name"
                      autoComplete="given-name"
                      value={details.firstName}
                      onChange={set('firstName')}
                      error={touched ? detailErrors.firstName : ''}
                    />
                    <Field
                      label="Last name"
                      autoComplete="family-name"
                      value={details.lastName}
                      onChange={set('lastName')}
                      error={touched ? detailErrors.lastName : ''}
                    />
                  </div>
                  <Field
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    value={details.email}
                    onChange={set('email')}
                    error={touched ? detailErrors.email : ''}
                    hint="Used to deliver your report and its secure link."
                  />
                  <div className="grid gap-9 sm:grid-cols-2">
                    <Field
                      label="Organisation"
                      autoComplete="organization"
                      value={details.organisation}
                      onChange={set('organisation')}
                      error={touched ? detailErrors.organisation : ''}
                    />
                    <Field
                      label="Country or region"
                      value={details.countryRegion}
                      onChange={set('countryRegion')}
                      error={touched ? detailErrors.countryRegion : ''}
                    />
                  </div>
                  <Field
                    label="Role or title"
                    autoComplete="organization-title"
                    value={details.roleTitle}
                    onChange={set('roleTitle')}
                    error={touched ? detailErrors.roleTitle : ''}
                  />
                  <div className="grid gap-9 sm:grid-cols-2">
                    <Field
                      label="Phone"
                      type="tel"
                      autoComplete="tel"
                      optional
                      value={details.phone}
                      onChange={set('phone')}
                    />
                    <Field
                      label="Notes or context"
                      optional
                      value={details.contextNotes}
                      onChange={set('contextNotes')}
                    />
                  </div>

                  <div className="space-y-5 pt-2">
                    <Check
                      checked={details.reportConsent}
                      onChange={set('reportConsent')}
                      label="I agree to receive my diagnostic report and related follow-up from Doris Bota."
                    />
                    <Check
                      checked={details.privacyAcknowledged}
                      onChange={set('privacyAcknowledged')}
                      label={
                        <>
                          I have read and acknowledge the{' '}
                          <TextLink href="/privacy">privacy notice</TextLink>.
                        </>
                      }
                    />
                    <Check
                      checked={details.marketingOptIn}
                      onChange={set('marketingOptIn')}
                      label="Send me occasional insights and updates. (Optional)"
                    />
                  </div>

                  {touched && !detailsValid && (
                    <Notice>
                      Complete the required fields and both consent statements to continue.
                    </Notice>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('intro')}
                      className="inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-deep"
                    >
                      <ArrowLeft size={16} aria-hidden="true" /> Back
                    </button>
                    <Button variant="deep" onClick={startQuestions}>
                      Continue
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'question' && (
              <motion.div key={`q${current}`} {...stepMotion}>
                <ProgressSeam answers={answers} current={current} />

                <p className="eyebrow mt-12 text-teal-deep">
                  {String(DOMAINS[current].id).padStart(2, '0')} · {DOMAINS[current].name}
                </p>
                <h2 {...headingProps} className={`mt-5 ${headingProps.className}`}>
                  {DOMAINS[current].question}
                </h2>

                <fieldset className="mt-10 border-0 p-0">
                  <legend className="sr-only">Select a rating from 1 to 4</legend>
                  <div className="space-y-3">
                    {SCALE.map((option) => {
                      const selected = answers[current] === option.value;
                      return (
                        <label
                          key={option.value}
                          className={`flex cursor-pointer items-start gap-5 border p-5 transition-colors duration-200 ${
                            selected
                              ? 'border-deep bg-deep/[0.04]'
                              : 'border-ink/15 hover:border-deep/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`domain-${DOMAINS[current].id}`}
                            value={option.value}
                            checked={selected}
                            onChange={() =>
                              setAnswers((a) =>
                                a.map((v, i) => (i === current ? option.value : v)),
                              )
                            }
                            className="sr-only"
                          />
                          <span
                            className={`tnum flex h-9 w-9 shrink-0 items-center justify-center font-mono text-sm ${
                              selected
                                ? maturity(option.value).chip
                                : 'border border-ink/20 text-slate'
                            }`}
                            aria-hidden="true"
                          >
                            {option.value}
                          </span>
                          <span>
                            <span className="block text-base font-medium text-deep">
                              {option.label}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-slate">
                              {option.description}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-deep"
                  >
                    <ArrowLeft size={16} aria-hidden="true" /> Back
                  </button>
                  <Button variant="deep" onClick={next} disabled={answers[current] === null}>
                    {current === TOTAL_DOMAINS - 1 ? 'Review answers' : 'Next domain'}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 'review' && (
              <motion.div key="review" {...stepMotion}>
                <Eyebrow>Step 3 of 3 · Review</Eyebrow>
                <h2 {...headingProps} className={`mt-5 ${headingProps.className}`}>
                  Review your answers
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate">
                  Select any domain to change your response before submitting.
                </p>

                <ul className="mt-10 list-none p-0">
                  {DOMAINS.map((domain, i) => {
                    const value = answers[i];
                    return (
                      <li key={domain.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setCurrent(i);
                            setStep('question');
                          }}
                          className="flex w-full items-center gap-4 border-t border-ink/12 py-4 text-left transition-colors hover:bg-deep/[0.03]"
                        >
                          <span
                            className={`tnum flex h-8 w-8 shrink-0 items-center justify-center font-mono text-xs ${
                              value ? maturity(value).chip : 'border border-ink/20 text-slate'
                            }`}
                          >
                            {value ?? '–'}
                          </span>
                          <span className="flex-1 text-sm text-deep">{domain.name}</span>
                          <span className="hidden text-sm text-slate sm:inline">
                            {value ? SCALE[value - 1].label : 'Not answered'}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-ink/12" />

                {error && (
                  <div className="mt-8">
                    <Notice>{error}</Notice>
                  </div>
                )}

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrent(TOTAL_DOMAINS - 1);
                      setStep('question');
                    }}
                    className="inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-deep"
                  >
                    <ArrowLeft size={16} aria-hidden="true" /> Back
                  </button>
                  <Button
                    variant="gold"
                    onClick={submit}
                    disabled={submitting || answers.some((a) => a === null)}
                    arrow={!submitting}
                  >
                    {submitting ? 'Generating your report…' : 'Submit and view my report'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step === 'intro' && (
            <p className="mt-16 border-t border-ink/12 pt-8 text-sm leading-relaxed text-slate">
              The instrument sits inside the Integrated Health Systems Transformation
              Framework<Tm className="text-gold" />.{' '}
              <TextLink href="/expertise">See how engagements are structured</TextLink>.
            </p>
          )}
        </div>
      </Container>
    </>
  );
}
