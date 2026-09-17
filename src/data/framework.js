import { Droplets, Landmark, Network } from 'lucide-react';

/**
 * The IHSTF pillars carry *types*, not sequence numbers — a focus, an
 * outcome and an enabler. Labelling them by role says something true about
 * how they relate; numbering them 01/02/03 would imply an order that does
 * not exist.
 */
export const PILLARS = [
  {
    role: 'Strategic focus',
    icon: Droplets,
    title:
      'WASH–IPC and laboratory systems integration for quality care, patient and health worker safety',
    description:
      'Leveraging WASH, infection prevention and laboratory systems to advance respectful maternity care, newborn safety, specimen referral and surveillance, outbreak preparedness, and the safety of patients and health workers — while improving quality of care and building resilient, integrated health services.',
  },
  {
    role: 'Transformation outcome',
    icon: Landmark,
    title: 'Health systems strengthening through governance and institutionalization',
    description:
      'Embedding health priorities into governance structures, policies, institutions, financing mechanisms, and accountability systems that endure beyond projects and funding cycles.',
  },
  {
    role: 'Strategic enabler',
    icon: Network,
    title: 'Multi-sectoral leadership and policy influence',
    description:
      'Turning evidence, implementation learning, and stakeholder partnerships into policy decisions, investment cases, governance reforms, and systems change.',
  },
];

export const CROSS_CUTTING =
  'Knowledge management and MEAL — monitoring, evaluation, accountability and learning — run through every pillar, tracking quality, capturing learning, and generating evidence for adaptation and scale.';

/**
 * The three engagement tiers genuinely are a sequence: each assumes more
 * system readiness than the last. Numbering is information here.
 */
export const TIERS = [
  {
    n: 1,
    name: 'Diagnostic',
    summary: 'Find out where the system actually is.',
    description:
      'A focused review of diagnostic networks, WASH–IPC, policies, quality systems, governance, workforce, and data, producing priorities, findings, and a practical action plan.',
  },
  {
    n: 2,
    name: 'System transformation',
    summary: 'Build the arrangements that make change stick.',
    description:
      'A time-bound strategic and technical engagement that aligns governance, policy, financing, and partnerships, and develops standards, tools, workplans, capacity, and MEAL mechanisms for implementation.',
  },
  {
    n: 3,
    name: 'Embedded consultant',
    summary: 'Stay until the institution owns it.',
    description:
      'Ongoing embedded advisory and technical support that stewards implementation, strengthens capacity, resolves emerging challenges, and sustains institutional ownership. Includes the Learning and Evidence Loop, which turns implementation learning into policy, investment, and system-wide change.',
  },
];

export const TIERS_NOTE =
  'Engagements can begin at any tier, depending on where the system is. Monitoring, evaluation, learning and knowledge management are integrated throughout.';
