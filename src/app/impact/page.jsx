import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';
import Ledger from '@/components/Ledger';
import PhotoCarousel from '@/components/PhotoCarousel';
import Seam from '@/components/Seam';
import { Section, SectionHead, Eyebrow, ButtonLink, TextLink } from '@/components/ui';

import { LEDGER, SYSTEMS_CHANGE } from '@/data/impact';
import { FIELD_WORK } from '@/data/photos';
import { SCOPE } from '@/data/expertise';
import { og } from '@/lib/metadata';

const REACH = LEDGER.filter((row) => row.group === 'Reach');
const DELIVERY = LEDGER.filter((row) => row.group === 'Delivery');

export const metadata = {
  alternates: { canonical: '/impact' },
  openGraph: og('/impact'),
  title: "Impact",
  description: "A record of eighteen years of health systems work: 1,044 laboratory professionals trained, 216 facilities strengthened across 44 counties, 21 laboratories supported toward ISO accreditation, 22 countries supported.",
};

export default function Impact() {
  return (
    <>

      <PageHeader
        eyebrow="Impact"
        title="A record of account."
        lead="Counted in the things that were built and are still standing, rather than in activities delivered."
      />

      <Section ground="paper">
        <SectionHead
          eyebrow="Reach"
          title="The scale the work has operated at"
          lead="Programmes, countries and networks reached through technical and strategic leadership."
        />
        <div className="mt-12 md:mt-16">
          <Ledger rows={REACH} />
        </div>
      </Section>

      <Section ground="bone">
        <SectionHead
          eyebrow="Delivery"
          title="What was actually built"
          lead="Capacity, facilities and accredited systems — the units that outlast a funding cycle."
        />
        <div className="mt-12 md:mt-16">
          <Ledger rows={DELIVERY} />
        </div>
      </Section>

      {/* The ledger counts; these show. Placed directly after it because the
          facilities, trainings and caucuses in the figures above are the same
          ones in the photographs below. */}
      <Section ground="paper">
        <SectionHead
          eyebrow="The work in practice"
          title="Where the figures were earned"
          lead="Facilities, ministries, conferences and county governments — the engagements the ledger counts."
        />
        <div className="mt-14 md:mt-16">
          <PhotoCarousel photos={FIELD_WORK} eyebrow="From the field" />
        </div>
      </Section>

      <Section ground="deep">
        <SectionHead
          tone="light"
          eyebrow="From scale to systems change"
          title="Four accounts of what changed"
          lead="Named for what changed, not for the project that funded it."
        />

        <div className="mt-14 grid gap-px bg-white/12 md:mt-16 md:grid-cols-2">
          {SYSTEMS_CHANGE.map((item, i) => (
            <FadeIn key={item.heading}>
              <div className="flex h-full flex-col bg-deep p-8 md:p-10 lg:p-12">
                <h3 className="font-display text-xl font-normal leading-snug text-white md:text-2xl">
                  {item.heading}
                </h3>
                <Seam
                  weights={[2, 1, 3]}
                  integrated
                  tone="gold"
                  height={2}
                  className="mt-6 max-w-16"
                />
                <p className="mt-6 text-base leading-relaxed text-white/70">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-10 text-base text-white/70">
            Recognition and peer-reviewed evidence are listed under{' '}
            <TextLink href="/insights" className="text-gold hover:text-white">
              insights and publications
            </TextLink>
            .
          </p>
        </FadeIn>
      </Section>

      <Section ground="paper">
        <SectionHead
          eyebrow="Geographic footprint"
          title="Where the work has been done"
          lead={SCOPE.description}
        />

        <FadeIn>
          <div className="mt-12 flex flex-wrap gap-x-3 gap-y-3">
            {SCOPE.implemented.map((country) => (
              <span
                key={country}
                className="border border-deep/25 px-4 py-2 font-mono text-xs tracking-wide text-deep"
              >
                {country}
              </span>
            ))}
          </div>
          <p className="eyebrow mt-5 text-slate">Programmes implemented directly</p>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 flex flex-wrap gap-x-3 gap-y-3">
            {SCOPE.organizations.map((org) => (
              <span
                key={org}
                className="border border-teal/40 px-4 py-2 font-mono text-xs tracking-wide text-teal-deep"
              >
                {org}
              </span>
            ))}
          </div>
          <p className="eyebrow mt-5 text-slate">Through roles with</p>
        </FadeIn>
      </Section>

      <Section ground="bone">
        <Seam integrated tone="brass" height={2} className="mb-14" />
        <div className="max-w-3xl">
          <Eyebrow>Next step</Eyebrow>
          <h2 className="mt-6 font-display text-title font-normal text-deep">
            Bring this record to your system.
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-slate">
            Engagements begin wherever the system is — with a diagnostic, a time-bound
            transformation engagement, or embedded advisory support.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact" variant="deep">
              Start a scoping conversation
            </ButtonLink>
            <ButtonLink href="/expertise" variant="outlineDark">
              How engagements are structured
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
