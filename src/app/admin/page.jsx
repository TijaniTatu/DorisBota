import { headers } from 'next/headers';

import PageHeader from '@/components/PageHeader';
import { Container } from '@/components/ui';
import { Notice } from '@/components/Field';
import { isAuthenticated } from '@/server/auth';
import { getSubmissions } from '@/server/queries';
import AdminLogin from './AdminLogin';
import AdminConsole from './AdminConsole';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin',
  description: 'Private.',
  robots: { index: false, follow: false },
};

export default async function Admin() {
  const cookieHeader = (await headers()).get('cookie');
  const signedIn = isAuthenticated(cookieHeader);

  let data = null;
  let error = '';
  if (signedIn) {
    try {
      data = await getSubmissions();
    } catch (err) {
      console.error('Failed to load submissions:', err);
      error = 'Could not load submissions. Check that DATABASE_URL is set.';
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Private"
        title="Submissions"
        lead="Diagnostic assessments and scoping enquiries."
      />
      <Container className="pb-24 pt-16 md:pb-32">
        {!signedIn && <AdminLogin />}
        {signedIn && error && <Notice>{error}</Notice>}
        {signedIn && data && (
          <AdminConsole assessments={data.assessments} inquiries={data.inquiries} />
        )}
      </Container>
    </>
  );
}
