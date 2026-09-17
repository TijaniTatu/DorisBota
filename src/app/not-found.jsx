import PageHeader from '@/components/PageHeader';
import { Container, ButtonLink, TextLink } from '@/components/ui';
import { NAV } from '@/data/site';

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="That page does not exist."
        lead="The link may be out of date, or the address may have a typo in it."
        weights={[3, 1, 1, 4, 1]}
      />
      <Container className="pb-24 pt-16 md:pb-32">
        <div className="max-w-xl">
          <p className="text-lg leading-relaxed text-slate">Try one of these instead:</p>
          <ul className="mt-8 list-none p-0">
            {[...NAV, { label: 'Contact', to: '/contact' }].map((link) => (
              <li key={link.to} className="border-t border-ink/12 py-3 last:border-b">
                <TextLink href={link.to}>{link.label}</TextLink>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/" variant="deep">
              Back to the home page
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
