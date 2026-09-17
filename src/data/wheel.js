import {
  ScrollText,
  Coins,
  TrendingUp,
  Presentation,
  SearchCheck,
  Star,
  BriefcaseMedical,
  Handshake,
  ShieldCheck,
  Baby,
  HardHat,
  Pill,
  Siren,
  Landmark,
} from 'lucide-react';

/**
 * The WASH and IPC Health Systems Wheel™.
 *
 * Eight domains around one hub. The wheel is not a list drawn in a circle:
 * the claim it makes is that no single domain holds on its own — policy
 * without financing is a document, training without monitoring is an event —
 * so the form has no first item and no last one.
 *
 * It sits under Pillar 02 of the IHSTF, health systems strengthening through
 * governance and institutionalization, and the domain order here is the order
 * on the published artwork. Changing it changes the diagram, so don't.
 */
export const WHEEL = {
  name: 'The WASH and IPC Health Systems Wheel',
  subtitle: 'Evidence-informed strategies for health care facilities (2024–2026)',
  pillar: 'Pillar 02 · Health systems strengthening through governance and institutionalization',
  outcome:
    'Institutionalized, accountable, and financed health systems that sustain quality of care, health security, and country ownership.',
  hub: {
    title: 'Integrated WASH & IPC systems',
    drivers: [
      'Quality of care',
      'Patient safety',
      'Health security',
      'AMR prevention',
      'Universal health coverage',
    ],
  },
  /** The original artwork, kept downloadable so the diagram can travel. */
  artwork: '/wash-ipc-health-systems-wheel.png',
};

export const WHEEL_DOMAINS = [
  {
    n: 1,
    slug: 'policy-governance',
    title: 'Policy & governance',
    icon: ScrollText,
    summary: 'One set of rules, owned by government, covering both functions at once.',
    items: [
      'Unified IPC–WASH policies and guidelines',
      'Joint IPC/WASH taskforces',
      'Integration into national health strategies',
      'IPC/WASH indicators in health information systems',
    ],
  },
  {
    n: 2,
    slug: 'financing-resources',
    title: 'Financing & resources',
    icon: Coins,
    summary: 'A budget line is the difference between a priority and an intention.',
    items: [
      'Costed national strategies and blueprints',
      'Dedicated IPC budget lines at all levels',
      'Facility budgets for WASH/IPC infrastructure',
      'Supplies and commodities (IPC, WASH, PPE)',
      'Dedicated IPC officers and focal persons',
    ],
  },
  {
    n: 3,
    slug: 'quality-improvement',
    title: 'Quality improvement',
    icon: TrendingUp,
    summary: 'IPC and WASH written into the quality machinery that already exists.',
    items: [
      'Integrated IPC/WASH audits, standards and checklists',
      'IPC/WASH in QI committee terms of reference',
      '5S and Plan-Do-Check-Act (PDCA) approaches',
      'IPC/WASH in quality checklists and audits',
    ],
  },
  {
    n: 4,
    slug: 'training-capacity',
    title: 'Training & capacity building',
    icon: Presentation,
    summary: 'Every cadre that touches the environment of care, not only clinicians.',
    items: [
      'Pre-service education in IPC/WASH',
      'Regular in-service training',
      'All staff categories included, including cleaners, waste and ancillary staff',
      'Training of trainers, materials and job aids',
    ],
  },
  {
    n: 5,
    slug: 'monitoring-data',
    title: 'Monitoring, surveillance & data',
    icon: SearchCheck,
    summary: 'Routine reporting, not survey rounds — the cycle that outlasts the project.',
    items: [
      'HMIS surveillance systems, real-time where possible',
      'Supportive supervision and mentoring',
      'Self-assessment and external verification',
      'Standardized metrics, dashboards and feedback loops',
    ],
  },
  {
    n: 6,
    slug: 'behaviour-change',
    title: 'Behaviour change',
    icon: Star,
    summary: 'Standards change practice only when someone in the facility owns them.',
    items: [
      'IPC champions and change agents',
      'Recognition and non-monetary incentives',
      'Behaviour-change led interventions',
      'IPC focal persons present in, and linked to, QI committees',
    ],
  },
  {
    n: 7,
    slug: 'emergency-preparedness',
    title: 'Emergency preparedness',
    icon: BriefcaseMedical,
    summary: 'Outbreak response is routine IPC under time pressure. It is rehearsed or it is not.',
    items: [
      'IPC/WASH in national contingency preparedness and response plans',
      'IPC/WASH emergency kits, supplies and PPE',
      'Simulation exercises and tabletop drills for high-risk diseases, including Ebola, cholera, mpox and Marburg',
    ],
  },
  {
    n: 8,
    slug: 'partnerships-knowledge',
    title: 'Partnerships & knowledge management',
    icon: Handshake,
    summary: 'Aligned partners behind one government plan, and learning that is written down.',
    items: [
      'Multi-sectoral and multi-partner collaboration',
      'Engagement of the private sector and professional bodies',
      'Alignment with AMR, quality of care, MNH, UHC and other health plans',
      'Knowledge sharing, learning and best practice documentation',
    ],
  },
];

/** What the eight domains are for, when they run together. */
export const WHEEL_IMPACT = [
  { icon: ShieldCheck, label: 'Reduced healthcare-associated infections' },
  { icon: Baby, label: 'Improved maternal and newborn outcomes' },
  { icon: HardHat, label: 'Health worker safety' },
  { icon: Pill, label: 'AMR prevention' },
  { icon: Siren, label: 'Outbreak preparedness' },
  { icon: Landmark, label: 'Stronger health systems' },
];

export const WHEEL_BAND = [
  'Safe facilities',
  'Quality care',
  'Health security',
  'Universal health coverage',
];
