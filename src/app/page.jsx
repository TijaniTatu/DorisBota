import Link from 'next/link';

import Hero from './Hero';
import { ArrowRight } from 'lucide-react';

import Seam from '@/components/Seam';
import FadeIn from '@/components/FadeIn';
import Ledger from '@/components/Ledger';
import { Section, SectionHead, Eyebrow, ButtonLink, TextLink, Tm } from '@/components/ui';

import { PROFILE, DIAGNOSTIC } from '@/data/site';
import { PILLARS, CROSS_CUTTING } from '@/data/framework';
import { WHEEL_DOMAINS } from '@/data/wheel';
import { PRACTICE_AREAS } from '@/data/expertise';
import { LEDGER } from '@/data/impact';
import { og } from '@/lib/metadata';


function Thesis() {
  return (
    <Section ground="paper">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <FadeIn>
            <Eyebrow>The problem</Eyebrow>
            <p className="mt-6 font-display text-head font-normal leading-tight text-deep">
              Most health systems are not short of plans. They are short of the
              arrangements that let a plan survive a funding cycle.
            </p>
          </FadeIn>
        </div>

        <div className="md:col-span-7 md:pt-1">
          <FadeIn>
            <div className="space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Infection prevention, WASH in health facilities, and laboratory diagnostics
                are usually financed as projects, delivered by partners, and measured
                against activity. They perform while the money lasts.
              </p>
              <p>
                What decides whether they last is something else: whether the function has
                an owner inside government, a budget line, a standard, and a reporting
                cycle that continues after the project closes. That is the work.
              </p>
            </div>
            <p className="mt-8">
              <TextLink href="/about">Read more about the practice</TextLink>
            </p>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

function Framework() {
  return (
    <Section ground="deep">
      <SectionHead
        tone="light"
        eyebrow="The methodology"
        title={
          <>
            The Integrated Health Systems Transformation Framework<Tm className="text-gold" />
          </>
        }
      />
      <FadeIn>
        <p className="mt-6 font-display text-xl italic text-gold md:text-2xl">
          {PROFILE.tagline}
        </p>
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
              <p className="mt-5 text-base leading-relaxed text-white/65">{pillar.description}</p>
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
  );
}

/**
 * The wheel gets the same treatment the framework does here — named and
 * enumerated, with the working version a click away on /expertise.
 */
function WheelTeaser() {
  return (
    <Section ground="paper">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <FadeIn>
            <Eyebrow>The instrument</Eyebrow>
            <h2 className="mt-6 font-display text-head font-normal leading-tight text-deep">
              The WASH and IPC Health Systems Wheel<Tm className="text-gold" />
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-slate">
              Eight domains that decide whether infection prevention and WASH are a
              function of the health system or a project running alongside it. Governance
              and financing, quality and data, people and preparedness — turning together
              or not at all.
            </p>
            <p className="mt-8">
              <TextLink href="/expertise#wheel">Turn the wheel</TextLink>
            </p>
          </FadeIn>
        </div>

        <div className="md:col-span-7">
          <FadeIn>
            <ul className="grid list-none gap-x-10 p-0 sm:grid-cols-2">
              {WHEEL_DOMAINS.map((d) => (
                <li
                  key={d.slug}
                  className="flex items-baseline gap-5 border-t border-ink/12 py-4"
                >
                  <span className="tnum font-mono text-sm text-teal-deep">
                    {String(d.n).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg leading-snug text-deep">
                    {d.title}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

function Practice() {
  return (
    <Section ground="bone">
      <SectionHead
        eyebrow="Areas of practice"
        title="Where the work happens"
        lead="Four strands that are usually managed separately and experienced by patients as one thing: whether care is safe."
      />

      <div className="mt-16 grid gap-px bg-ink/12 md:mt-20 md:grid-cols-2">
        {PRACTICE_AREAS.map((area, i) => (
          <FadeIn key={area.slug}>
            <div className="flex h-full flex-col bg-bone p-8 md:p-10 lg:p-12">
              <area.icon size={30} strokeWidth={1} className="text-teal-deep" aria-hidden="true" />
              <h3 className="mt-7 font-display text-xl font-normal leading-snug text-deep md:text-2xl">
                {area.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-slate">{area.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <p className="mt-12">
          <TextLink href="/expertise">See the full scope and how engagements are structured</TextLink>
        </p>
      </FadeIn>
    </Section>
  );
}

function Impact() {
  return (
    <Section ground="deep">
      <SectionHead
        tone="light"
        eyebrow="Proven impact"
        title="A record of account"
        lead="Eighteen years of technical leadership, counted in the things that were actually built."
      />
      <div className="mt-14 md:mt-16">
        <Ledger rows={LEDGER.slice(0, 4)} tone="dark" />
      </div>
      <FadeIn>
        <div className="mt-12">
          <ButtonLink href="/impact" variant="outlineLight">
            See the full record
          </ButtonLink>
        </div>
      </FadeIn>
    </Section>
  );
}

/**
 * White rather than a second navy: the darker step this section used to take
 * read as a different blue altogether beside the deep ground above it. On
 * white the maturity ramp also runs true — level 4 can be drawn in the navy
 * it actually stands for instead of being inverted to white.
 */
function DiagnosticCta() {
  return (
    <Section ground="white">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <Eyebrow>{DIAGNOSTIC.name}</Eyebrow>
          <h2 className="mt-6 font-display text-title font-normal text-deep">
            Where is fragmentation holding your system back?
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate">
            Score ten domains of health-system integration on a four-point maturity
            scale and receive a gap analysis with your three priority domains and a
            practical 90-day plan.
          </p>
          <div className="mt-10">
            <ButtonLink href="/diagnostic" variant="deep">
              Start the diagnostic
            </ButtonLink>
          </div>
          <p className="eyebrow mt-6 text-slate">
            Free · Five to ten minutes · Instant report, emailed to you
          </p>
        </div>

        <FadeIn className="md:col-span-5">
          <ul className="m-0 list-none space-y-0 p-0">
            {[
              { n: '1', label: 'Highly fragmented', tone: 'bg-m1' },
              { n: '2', label: 'Partly coordinated', tone: 'bg-m2' },
              { n: '3', label: 'Mostly integrated', tone: 'bg-m3' },
              { n: '4', label: 'Fully integrated', tone: 'bg-m4' },
            ].map((row) => (
              <li
                key={row.n}
                className="flex items-center gap-5 border-t border-ink/12 py-4 last:border-b"
              >
                <span className="tnum font-mono text-sm text-slate">{row.n}</span>
                <span className={`h-[3px] flex-1 ${row.tone}`} aria-hidden="true" />
                <span className="w-40 text-sm text-slate">{row.label}</span>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-5 text-teal-deep">The maturity scale</p>
        </FadeIn>
      </div>
    </Section>
  );
}

function ClosingCta() {
  return (
    // Paper, not bone: the diagnostic call above it is now white, and bone
    // is too close to white for the two to read as separate sections.
    <Section ground="paper">
      <Seam integrated tone="brass" height={2} className="mb-14" />
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Eyebrow>Contact and scoping</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-display text-title font-normal text-deep">
            Start a scoping conversation.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate">
            Registered on UNGM and available for roster, TOR, and RFP processes with
            governments, UN agencies, development partners, and implementing organizations.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 font-display text-2xl text-deep md:text-3xl"
          >
            <span className="link-wipe">Get in touch</span>
            <ArrowRight
              size={26}
              strokeWidth={1}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}

export const metadata = {
  alternates: { canonical: '/' },
  openGraph: og('/'),
  title: {
    absolute:
      "Doris Bota — Health Systems Strengthening, WASH–IPC and Laboratory Systems",
  },
  description: "Doris Bota helps governments, UN agencies, donors and NGOs move IPC, WASH in health, laboratory diagnostic networks and health security out of fragmented projects into integrated, government-led health systems.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Thesis />
      <Framework />
      <WheelTeaser />
      <Practice />
      <Impact />
      <DiagnosticCta />
      <ClosingCta />
    </>
  );
}
