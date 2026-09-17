import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';
import Seam from '@/components/Seam';
import { Section, SectionHead, Eyebrow, ButtonLink, TextLink } from '@/components/ui';

import Image from 'next/image';

import { PUBLICATIONS, RECOGNITION, POSITIONS } from '@/data/insights';
import { PUBLICATION_CARD } from '@/data/photos';
import { PROFILE } from '@/data/site';

function RecordRow({ item }) {
  return (
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
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">{item.summary}</p>
        <p className="mt-5">
          <TextLink href={item.href} external>
            Read the source
          </TextLink>
        </p>
      </div>
    </article>
  );
}

export const metadata = {
  alternates: { canonical: '/insights' },
  openGraph: { url: '/insights' },
  title: "Insights and Publications",
  description: "Peer-reviewed evidence, international recognition, and written positions on health system fragmentation, WASH–IPC integration and laboratory diagnostics.",
};

export default function Insights() {
  return (
    <>

      <PageHeader
        eyebrow="Insights"
        title="Evidence, recognition, and the arguments behind the work."
        lead="What the practice has published, what it has been recognised for, and the positions it keeps returning to."
      />

      <Section ground="paper">
        <SectionHead
          eyebrow="Positions"
          title="Three arguments this practice keeps making"
          lead="Drawn from implementation rather than from literature — the patterns that recur across every system the work has touched."
        />

        <div className="mt-14 md:mt-16">
          {POSITIONS.map((item, i) => (
            <FadeIn key={item.title}>
              <article className="grid gap-x-12 gap-y-4 border-t border-ink/12 py-10 md:grid-cols-12 md:py-12">
                <div className="md:col-span-6">
                  <h3 className="font-display text-2xl font-normal leading-snug text-deep md:text-3xl">
                    {item.title}
                  </h3>
                </div>
                <div className="md:col-span-6 md:pt-2">
                  <p className="text-lg leading-relaxed text-slate">{item.standfirst}</p>
                </div>
              </article>
            </FadeIn>
          ))}
          <div className="border-t border-ink/12" />
        </div>
      </Section>

      <Section ground="bone">
        <SectionHead
          eyebrow="Peer-reviewed evidence"
          title="Publications"
          lead="Only work with a verifiable reference is listed."
        />
        <div className="mt-12 md:mt-16">
          {PUBLICATIONS.map((item) => (
            <FadeIn key={item.title}>
              <RecordRow item={item} />
            </FadeIn>
          ))}
          <div className="border-t border-ink/12" />
        </div>

        {/* The programme the paper is about, as it was published. Its three
            figures are the same ones the impact ledger carries. */}
        <FadeIn>
          <figure className="mt-14 grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
            <div className="md:col-span-7">
              <Image
                src={PUBLICATION_CARD.src}
                alt={PUBLICATION_CARD.alt}
                width={PUBLICATION_CARD.width}
                height={PUBLICATION_CARD.height}
                sizes="(max-width: 768px) 100vw, 600px"
                className="h-auto w-full max-w-[600px] ring-1 ring-deep/15"
              />
            </div>
            <figcaption className="md:col-span-5">
              <Eyebrow>The programme</Eyebrow>
              <p className="mt-5 font-display text-xl leading-snug text-deep">
                {PUBLICATION_CARD.title}
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate">
                Technical assistance to the national biosafety programme, built to stand
                on its own once the assistance ended: 1,044 laboratory professionals
                trained, 216 facilities and 44 counties.
              </p>
              <p className="mt-6">
                <TextLink href="/impact">See the full record</TextLink>
              </p>
            </figcaption>
          </figure>
        </FadeIn>
      </Section>

      <Section ground="paper">
        <SectionHead eyebrow="Recognition" title="Awards and honours" />
        <div className="mt-12 md:mt-16">
          {RECOGNITION.map((item) => (
            <FadeIn key={item.title}>
              <RecordRow item={item} />
            </FadeIn>
          ))}
          <div className="border-t border-ink/12" />
        </div>
      </Section>

      <Section ground="deep">
        <Seam integrated tone="gold" height={2} className="mb-14" />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow tone="gold">Speaking and advisory</Eyebrow>
            <h2 className="mt-6 font-display text-title font-normal text-white">
              Available for panels, technical working groups and expert review.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              On health system fragmentation, WASH–IPC integration, laboratory systems and
              biosafety governance, and translating implementation evidence into policy.
            </p>
            <div className="mt-10">
              <ButtonLink href="/contact" variant="gold">
                Get in touch
              </ButtonLink>
            </div>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <Eyebrow tone="gold">Direct</Eyebrow>
            <a
              href={`mailto:${PROFILE.email}`}
              className="link-wipe mt-6 block break-all font-display text-2xl text-white hover:text-gold"
            >
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-wipe mt-4 block w-fit text-base text-white/60 hover:text-gold"
            >
              LinkedIn profile
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
