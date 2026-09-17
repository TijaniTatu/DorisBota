import Image from 'next/image';

import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';
import Seam from '@/components/Seam';
import Wheel from '@/components/Wheel';
import { Section, SectionHead, Eyebrow, ButtonLink, TextLink, Tm } from '@/components/ui';

import { PRACTICE_AREAS, SCOPE } from '@/data/expertise';
import { PILLARS, CROSS_CUTTING, TIERS, TIERS_NOTE } from '@/data/framework';
import { WHEEL, WHEEL_IMPACT, WHEEL_BAND } from '@/data/wheel';
import { PROFILE } from '@/data/site';
import ihstfLogo from '@/../public/ihstf-logo.png';

function PracticeArea({ area, index }) {
  return (
    <FadeIn>
      <article className="grid gap-x-12 gap-y-6 border-t border-ink/12 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <area.icon size={30} strokeWidth={1} className="text-teal-deep" aria-hidden="true" />
          <h3 className="mt-6 font-display text-2xl font-normal leading-snug text-deep md:text-3xl">
            {area.title}
          </h3>
        </div>
        <div className="md:col-span-7 md:pt-1">
          <p className="text-lg leading-relaxed text-slate">{area.description}</p>
          <ul className="mt-8 list-none p-0">
            {area.detail.map((item) => (
              <li key={item} className="flex gap-4 border-t border-ink/10 py-3 text-base text-slate">
                <span className="mt-[0.7em] h-[2px] w-4 shrink-0 bg-gold" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </FadeIn>
  );
}

export const metadata = {
  alternates: { canonical: '/expertise' },
  openGraph: { url: '/expertise' },
  title: "Expertise",
  description: "Health systems strategy and governance, WASH–IPC integration, laboratory systems and integrated diagnostics, and multi-sectoral policy influence — and how engagements are structured.",
};

export default function Expertise() {
  return (
    <>

      <PageHeader
        eyebrow="Expertise"
        title="Four strands of practice, and the framework that holds them together."
        lead="Each is usually planned by a different team against a different indicator. Patients meet them as one thing: whether care is safe."
      />

      <Section ground="paper">
        <div>
          {PRACTICE_AREAS.map((area, i) => (
            <PracticeArea key={area.slug} area={area} index={i} />
          ))}
          <div className="border-t border-ink/12" />
        </div>

        <FadeIn>
          <div className="mt-14 grid gap-x-12 gap-y-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <SCOPE.icon size={30} strokeWidth={1} className="text-teal-deep" aria-hidden="true" />
              <h3 className="mt-6 font-display text-2xl font-normal leading-snug text-deep md:text-3xl">
                {SCOPE.title}
              </h3>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg leading-relaxed text-slate">{SCOPE.description}</p>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section ground="deep">
        <SectionHead
          tone="light"
          eyebrow="The methodology"
          title={
            <>
              The Integrated Health Systems Transformation Framework
              <Tm className="text-gold" />
            </>
          }
        />
        <FadeIn>
          <p className="mt-6 font-display text-xl italic text-gold md:text-2xl">
            {PROFILE.tagline}
          </p>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 inline-block bg-white p-7 md:p-9">
            <Image
              src={ihstfLogo}
              alt="The Integrated Health Systems Transformation Framework"
              sizes="380px"
              className="h-auto w-[300px] md:w-[380px]"
            />
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-px bg-white/12 md:mt-20 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.role}>
              <div className="flex h-full flex-col bg-deep p-8 md:p-10">
                <pillar.icon
                  size={30}
                  strokeWidth={1}
                  className="text-gold"
                  aria-hidden="true"
                />
                <Eyebrow tone="gold" className="mt-7">
                  {pillar.role}
                </Eyebrow>
                <h3 className="mt-5 font-display text-xl font-normal leading-snug text-white">
                  {pillar.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/65">
                  {pillar.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-10 max-w-4xl border-l-2 border-gold/50 pl-6 text-base leading-relaxed text-white/60">
            {CROSS_CUTTING}
          </p>
        </FadeIn>
      </Section>

      {/* Pillar 02 drawn as the instrument it is. The wheel turns because
          the claim is circular: no domain here holds on its own. */}
      <Section ground="paper" id="wheel">
        <SectionHead
          eyebrow="The instrument"
          title={
            <>
              The WASH and IPC Health Systems Wheel<Tm className="text-gold" />
            </>
          }
          lead="Eight domains that decide whether infection prevention and WASH are a function of the health system or a project running alongside it. Select any one of them, or let the wheel turn."
        />

        <FadeIn>
          <p className="mt-7 max-w-3xl border-l-2 border-gold pl-6 text-base leading-relaxed text-slate">
            {WHEEL.pillar}. {WHEEL.outcome}
          </p>
        </FadeIn>

        <div className="mt-16 md:mt-20">
          <Wheel />
        </div>

        <FadeIn>
          <div className="mt-20 border-t border-ink/12 pt-12">
            <Eyebrow>Collective impact</Eyebrow>
            <ul className="mt-8 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {WHEEL_IMPACT.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <item.icon
                    size={26}
                    strokeWidth={1}
                    className="mt-0.5 shrink-0 text-teal-deep"
                    aria-hidden="true"
                  />
                  <span className="text-base leading-relaxed text-slate">{item.label}</span>
                </li>
              ))}
            </ul>

            <Seam integrated tone="brass" height={2} className="mt-12" />
            <ul className="mt-5 flex list-none flex-wrap gap-x-8 gap-y-2 p-0">
              {WHEEL_BAND.map((item) => (
                <li key={item} className="eyebrow text-teal-deep">
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-10 text-sm text-slate">
              <TextLink href={WHEEL.artwork} external>
                Download the full wheel
              </TextLink>{' '}
              · Image credit: {PROFILE.name}, IPC/WASH and health systems consultant.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* The tiers are the one genuinely ordered thing on the site: each
          assumes more system readiness than the last. Numbering is
          information here, not ornament. */}
      <Section ground="bone">
        <SectionHead
          eyebrow="Engagement structure"
          title={
            <>
              The Integration Architecture<Tm className="text-gold" />
            </>
          }
          lead={TIERS_NOTE}
        />

        <div className="mt-16 md:mt-20">
          {TIERS.map((tier, i) => (
            <FadeIn key={tier.n}>
              <article className="grid gap-x-10 gap-y-5 border-t border-ink/15 py-10 md:grid-cols-12 md:py-14">
                <div className="md:col-span-2">
                  <p className="tnum font-display text-5xl font-normal leading-none text-gold md:text-6xl">
                    {tier.n}
                  </p>
                  <p className="eyebrow mt-3 text-slate">Tier {tier.n}</p>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl font-normal leading-snug text-deep">
                    {tier.name}
                  </h3>
                  <p className="mt-3 font-display text-lg italic text-teal-deep">{tier.summary}</p>
                </div>
                <div className="md:col-span-6 md:pt-1">
                  <p className="text-base leading-relaxed text-slate">{tier.description}</p>
                </div>
              </article>
            </FadeIn>
          ))}
          <div className="border-t border-ink/15" />
        </div>
      </Section>

      <Section ground="paper">
        <Seam integrated tone="brass" height={2} className="mb-14" />
        <div className="max-w-3xl">
          <Eyebrow>Next step</Eyebrow>
          <h2 className="mt-6 font-display text-title font-normal text-deep">
            Not sure which tier fits?
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-slate">
            The diagnostic scores ten domains of integration in about five minutes and
            returns the three that most need attention — a reasonable place to begin a
            scoping conversation.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/diagnostic" variant="deep">
              Take the diagnostic
            </ButtonLink>
            <ButtonLink href="/contact" variant="outlineDark">
              Start a scoping conversation
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
