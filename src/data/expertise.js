import { Compass, Droplets, FlaskConical, Share2, Globe } from 'lucide-react';

/**
 * Practice areas are a set, not a sequence, so they carry no ordinal
 * markers — each is introduced by its own name.
 */
export const PRACTICE_AREAS = [
  {
    slug: 'health-systems',
    icon: Compass,
    title: 'Health systems strategy, governance and leadership',
    description:
      'Translating evidence and implementation learning into policies, financing approaches, institutional arrangements, and coordinated action across ministries, donors, and partners.',
    detail: [
      'Policy and strategy development, and the institutional arrangements that carry them.',
      'Governance structures, decision rights, and accountability across ministries and partners.',
      'Financing approaches and investment cases that survive a change of funding cycle.',
    ],
  },
  {
    slug: 'wash-ipc',
    icon: Droplets,
    title: 'WASH–IPC integration, quality and safety',
    description:
      'Closing operational gaps between WASH services and infection prevention performance to strengthen patient and health worker safety, quality of care, and outbreak readiness.',
    detail: [
      'WASH FIT assessments, facility improvement planning, and follow-through.',
      'IPC and occupational health and safety policy, standards, and implementation tools.',
      'Hand hygiene, environmental cleaning, and waste management as routine system functions.',
    ],
  },
  {
    slug: 'laboratory',
    icon: FlaskConical,
    title: 'Laboratory systems and integrated diagnostics',
    description:
      'Strengthening diagnostic networks, point-of-care testing, specimen referral, surveillance linkages, quality management, biosafety, and biosecurity across levels of care.',
    detail: [
      'Diagnostic network design, specimen referral, and surveillance linkage.',
      'Quality management toward ISO 15189 accreditation and ISO 15190 safety compliance.',
      'Biosafety and biosecurity governance, curricula, and technical working groups.',
    ],
  },
  {
    slug: 'policy-influence',
    icon: Share2,
    title: 'Multi-sectoral leadership and policy influence',
    description:
      'Aligning ministries, donors, and implementing partners around one shared technical and policy agenda, and turning that alignment into policy decisions, investment cases, and systems change.',
    detail: [
      'Convening and chairing technical working groups across institutions.',
      'Translating implementation evidence into policy and investment decisions.',
      'Building coalitions that outlast individual projects and personalities.',
    ],
  },
];

export const SCOPE = {
  icon: Globe,
  title: 'Geographic and organizational scope',
  description:
    'Directly implemented programmes in Kenya, South Sudan, Ghana, Nigeria, Malawi, and India, while providing regional and global remote technical assistance across Sub-Saharan Africa, Europe, and Central Asia through roles with UNICEF, Save the Children, MSH, FHI360, University of Maryland, Arkangelo Ali Association, and independent consultancy engagements. This includes support to Christian Health Associations across 32 African countries.',
  implemented: ['Kenya', 'South Sudan', 'Ghana', 'Nigeria', 'Malawi', 'India'],
  organizations: [
    'UNICEF',
    'Save the Children',
    'Management Sciences for Health',
    'FHI 360',
    'University of Maryland',
    'Arkangelo Ali Association',
  ],
};
