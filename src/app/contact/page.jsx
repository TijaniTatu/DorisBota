import { Linkedin, Mail } from 'lucide-react';

import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';
import Seam from '@/components/Seam';
import { Section, Eyebrow } from '@/components/ui';
import { PROFILE, CLIENT_TYPES } from '@/data/site';
import ContactForm from './ContactForm';
import { og } from '@/lib/metadata';

export const metadata = {
  alternates: { canonical: '/contact' },
  openGraph: og('/contact'),
  title: 'Contact',
  description:
    'Start a scoping conversation with Doris Bota. Available for assignments with governments, UN agencies, development partners and implementing organizations. Registered on UNGM.',
};

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact and scoping"
        title="Start a scoping conversation."
        lead="Tell Doris where the system is and what you are trying to move. A scoping conversation begins from your situation rather than from a generic questionnaire."
      />

      <Section ground="paper">
        <div className="grid gap-14 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <FadeIn className="md:col-span-5">
            <Eyebrow>Direct contact</Eyebrow>
            <Seam integrated tone="brass" height={2} className="mt-5 max-w-12" />
            <a
              href={`mailto:${PROFILE.email}`}
              className="link-wipe mt-7 flex w-fit max-w-full items-start gap-3 font-display text-xl text-deep hover:text-teal md:text-2xl"
            >
              <Mail
                size={20}
                strokeWidth={1.25}
                aria-hidden="true"
                className="mt-[0.3em] shrink-0"
              />
              <span className="break-all">{PROFILE.email}</span>
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-wipe mt-5 flex w-fit items-center gap-3 text-base text-slate hover:text-deep"
            >
              <Linkedin size={18} strokeWidth={1.25} aria-hidden="true" />
              LinkedIn profile
            </a>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-slate">
              For roster, TOR and RFP processes, reference the relevant opportunity in your
              message. Registered on UNGM.
            </p>

            <div className="mt-12">
              <Eyebrow>Available for assignments with</Eyebrow>
              <ul className="mt-6 list-none p-0">
                {CLIENT_TYPES.map((type) => (
                  <li
                    key={type}
                    className="border-t border-ink/12 py-2.5 text-sm text-slate last:border-b"
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
