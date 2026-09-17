import Image from 'next/image';

import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';
import Seam from '@/components/Seam';
import { Section, SectionHead, Eyebrow, ButtonLink, TextLink, Tm } from '@/components/ui';

import { PROFILE } from '@/data/site';
import { BIO, AFFILIATIONS, AVAILABILITY } from '@/data/about';
import { RECOGNITION, PUBLICATIONS } from '@/data/insights';
import { SCOPE } from '@/data/expertise';
import portrait from '@/../public/doris-portrait.jpg';
import { og } from '@/lib/metadata';

export const metadata = {
  alternates: { canonical: '/about' },
  openGraph: og('/about'),
  title: "About",
  description: "Doris Bota is a global health systems specialist working where infection prevention, WASH in health care facilities, laboratory diagnostics and health security meet the machinery of government.",
};

export default function About() {
  return (
    <>

      <PageHeader
        eyebrow="About"
        title="The work is making the global health and health security functions survive beyond the donor funded project."
        lead="Eighteen years of strategic and technical leadership across health systems in Africa, Europe, Central Asia and South Asia."
      />

      <Section ground="paper">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <FadeIn className="md:col-span-5">
            <Image
              src={portrait}
              alt="Doris Bota"
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="aspect-4/5 w-full object-cover object-[center_15%] ring-1 ring-deep/15"
            />
            <p className="eyebrow mt-5 text-teal-deep">{PROFILE.name} · {PROFILE.base}</p>
          </FadeIn>

          <div className="md:col-span-7">
            <FadeIn>
              <div className="space-y-6 text-lg leading-relaxed text-slate">
                {BIO.map((para, i) => (
                  <p key={i} className={i === 0 ? 'text-xl text-ink' : undefined}>
                    {para}
                  </p>
                ))}
              </div>
            </FadeIn>

            <FadeIn>
              <p className="mt-10 border-l-2 border-gold pl-6 font-display text-xl italic leading-snug text-deep">
                {PROFILE.tagline}
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      <Section ground="deep">
        <SectionHead
          tone="light"
          eyebrow="Where the work has been done"
          title="Scope"
          lead={SCOPE.description}
        />

        <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <Eyebrow tone="gold">Programmes implemented directly</Eyebrow>
            <ul className="mt-6 list-none p-0">
              {SCOPE.implemented.map((country) => (
                <li
                  key={country}
                  className="flex items-center gap-4 border-t border-white/15 py-3 text-base text-white/80 last:border-b"
                >
                  <span className="h-[2px] w-6 bg-gold" aria-hidden="true" />
                  {country}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn>
            <Eyebrow tone="gold">Organizations worked with</Eyebrow>
            <ul className="mt-6 list-none p-0">
              {AFFILIATIONS.map((org) => (
                <li
                  key={org}
                  className="flex items-center gap-4 border-t border-white/15 py-3 text-base text-white/80 last:border-b"
                >
                  <span className="h-[2px] w-6 bg-teal" aria-hidden="true" />
                  {org}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      <Section ground="bone">
        <SectionHead
          eyebrow="Recognition and evidence"
          title="Published and recognised"
          lead="The method is documented, peer-reviewed where it can be, and independently recognised."
        />

        <div className="mt-14 md:mt-16">
          {[...RECOGNITION, ...PUBLICATIONS].map((item, i) => (
            <FadeIn key={item.title}>
              <article className="grid gap-x-10 gap-y-3 border-t border-ink/12 py-8 md:grid-cols-[8rem_minmax(0,1fr)] md:py-10">
                <div>
                  <p className="tnum font-mono text-sm text-teal-deep">{item.year}</p>
                  <p className="eyebrow mt-2 text-slate">{item.kind}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-normal leading-snug text-deep md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate">{item.venue}</p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
                    {item.summary}
                  </p>
                  <p className="mt-5">
                    <TextLink href={item.href} external>
                      Read the source
                    </TextLink>
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
          <div className="border-t border-ink/12" />
        </div>

        <FadeIn>
          <p className="mt-10">
            <TextLink href="/insights">See all insights and publications</TextLink>
          </p>
        </FadeIn>
      </Section>

      <Section ground="paper">
        <Seam integrated tone="brass" height={2} className="mb-14" />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>{AVAILABILITY.heading}</Eyebrow>
            <h2 className="mt-6 font-display text-head font-normal text-deep">
              Available for assignment, roster, TOR and RFP processes.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              {AVAILABILITY.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="deep">
                Start a scoping conversation
              </ButtonLink>
              <ButtonLink href="/expertise" variant="outlineDark">
                See areas of practice
              </ButtonLink>
            </div>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <Eyebrow>The method</Eyebrow>
            <p className="mt-6 font-display text-xl leading-snug text-deep">
              The Integrated Health Systems Transformation Framework<Tm className="text-gold" />
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate">
              A strategic focus, a transformation outcome, and a strategic enabler —
              delivered as a diagnostic, a transformation engagement, or embedded advisory
              support.
            </p>
            <p className="mt-6">
              <TextLink href="/expertise">How engagements are structured</TextLink>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
