/**
 * Only verifiable items are listed here. Anything added later (talks, briefs,
 * further papers) should carry a real link or reference — a publications page
 * that cannot be checked is worse than a short one.
 */
export const PUBLICATIONS = [
  {
    kind: 'Peer-reviewed paper',
    year: '2022',
    title:
      'Strengthening medical laboratory systems in Kenya: an innovative biosafety training model',
    venue: 'Applied Biosafety',
    href: 'https://journals.sagepub.com/doi/10.1089/apb.20.0072',
    summary:
      'Evidence on a training model designed to build biosafety capacity within laboratory systems rather than alongside them, and what it took to embed the model in national curricula.',
  },
];

export const RECOGNITION = [
  {
    kind: 'Award',
    year: '2016',
    title: 'Biosafety Hero Award',
    venue: 'International Federation for Biosafety Associations (IFBA)',
    href:
      'https://internationalbiosafety.org/wp-content/uploads/2019/02/4.1-2016-Biosafety-Heroes.pdf',
    summary:
      'International recognition for leadership in strengthening biosafety practice and governance.',
  },
];

/**
 * Short written positions drawn from the practice. These are Doris's own
 * framing of the problem, not summaries of other people's work.
 */
export const POSITIONS = [
  {
    title: 'A project that ends is not a system that works',
    standfirst:
      'Donor-funded IPC and WASH work often performs well while it is funded and disappears when it is not. The difference is whether the function was ever written into someone’s job, budget line, and reporting cycle.',
  },
  {
    title: 'WASH and IPC are one operational question, not two budgets',
    standfirst:
      'Water, cleaning, waste and infection prevention are usually planned by different teams against different indicators. Patients meet them as a single experience of safety, or the absence of it.',
  },
  {
    title: 'Diagnostics fail at the referral, not at the bench',
    standfirst:
      'Laboratory investment concentrates on equipment and accreditation. Most of the loss happens in specimen referral, turnaround, and whether a result ever reaches a clinical decision.',
  },
];
