import DiagnosticFlow from './DiagnosticFlow';
import { og } from '@/lib/metadata';

export const metadata = {
  alternates: { canonical: '/diagnostic' },
  openGraph: og('/diagnostic'),
  title: 'The IPC/WASH Health Systems Fragmentation Diagnostics',
  description:
    'Part of The Integrated Health Systems Transformation Framework™. A free self-assessment scoring ten defined dimensions of WASH, IPC and health system integration on a four-point maturity scale, returning a personalised gap analysis with prioritised recommendations in five to ten minutes.',
};

export default function DiagnosticPage() {
  return <DiagnosticFlow />;
}
