/**
 * Health Systems Fragmentation Diagnostic — instrument definition and scoring.
 *
 * This module is the single source of truth for the instrument. It is imported
 * by the React app (to render the questionnaire and the report) and by the
 * serverless functions (to score a submission and compose the report email),
 * so scoring can never drift between what a respondent sees and what is stored.
 */

export const SCORING_VERSION = '1.0.0';
export const REPORT_VERSION = '1.0.0';
export const PRIVACY_POLICY_VERSION = '2026-09-01';

export const TOTAL_DOMAINS = 10;

export const SCALE = [
  {
    value: 1,
    label: 'Highly fragmented',
    description: 'Arrangements are siloed, inconsistent, reactive, conflicting, or unclear.',
  },
  {
    value: 2,
    label: 'Partly coordinated',
    description: 'Some coordination exists, but important gaps, silos, or inconsistencies remain.',
  },
  {
    value: 3,
    label: 'Mostly integrated',
    description: 'Coordination works across most of the system, with specific gaps still to address.',
  },
  {
    value: 4,
    label: 'Fully integrated',
    description: 'Arrangements are consistently aligned, embedded, system-wide, and continuously improved.',
  },
];

export const DOMAINS = [
  {
    id: 1,
    name: 'Governance and accountability',
    question:
      'How consistently are roles, decision rights, and accountability aligned across the health system?',
    interpretation:
      'Unclear or overlapping mandates can slow decisions, weaken ownership, and allow cross-organizational issues to go unresolved.',
    action:
      'Map decision rights and accountabilities across key institutions. Agree on a single escalation path, named owners, and a recurring cross-system governance forum.',
  },
  {
    id: 2,
    name: 'Strategic alignment',
    question:
      'To what extent do organizations and levels of care work from a shared strategy and priorities?',
    interpretation:
      'Divergent priorities and planning cycles can produce duplicated initiatives, resource competition, and inconsistent execution.',
    action:
      'Establish a shared set of outcomes and priorities, align planning calendars, and use a joint scorecard to review progress.',
  },
  {
    id: 3,
    name: 'Service delivery and referral pathways',
    question:
      'How coordinated is the patient journey across primary, secondary, tertiary, community, and social care?',
    interpretation:
      'Disconnected pathways shift the burden of navigation to patients and increase delays, duplication, loss to follow-up, and inequity.',
    action:
      'Map one high-impact patient journey from beginning to end. Standardize referral and feedback protocols, and track completion and handoff failures.',
  },
  {
    id: 4,
    name: 'Health information exchange',
    question:
      'How effectively can providers and decision-makers access and use shared, timely information?',
    interpretation:
      'Siloed records and reporting prevent timely coordination, duplicate work, and weaken clinical and management decisions.',
    action:
      'Define a minimum shared dataset, assign data stewardship, and implement practical interoperability and information-sharing standards.',
  },
  {
    id: 5,
    name: 'Financing and incentives',
    question:
      'How well do funding flows and payment incentives support coordinated, population-focused care?',
    interpretation:
      'Fragmented funding and misaligned incentives can reward isolated organizational activity instead of coordinated outcomes for populations.',
    action:
      'Map funding flows and incentives, identify the behaviors they encourage, and pilot pooled or aligned financing around a shared outcome.',
  },
  {
    id: 6,
    name: 'Workforce integration',
    question:
      'How well are health workers planned, deployed, and supported as one multidisciplinary workforce?',
    interpretation:
      'Separate workforce plans and professional silos can create shortages, duplication, weak teamwork, and poor continuity of care.',
    action:
      'Build a cross-organizational workforce plan for priority services. Strengthen multidisciplinary roles, training, supervision, and deployment.',
  },
  {
    id: 7,
    name: 'Procurement and supply chains',
    question:
      'How coordinated are purchasing, inventory, distribution, and availability of essential products?',
    interpretation:
      'Uncoordinated purchasing and limited inventory visibility contribute to stock-outs, waste, price variation, and unreliable service delivery.',
    action:
      'Create shared visibility of demand, inventory, suppliers, and distribution. Coordinate procurement for high-priority product categories.',
  },
  {
    id: 8,
    name: 'Quality and performance management',
    question:
      'How consistently does the system use shared standards, measures, and improvement methods?',
    interpretation:
      'Different standards and measures make it difficult to compare performance, learn across organizations, or improve the system as a whole.',
    action:
      'Agree on a small common set of standards and measures. Create a shared learning cycle and review performance variation and improvement actions together.',
  },
  {
    id: 9,
    name: 'Community and patient partnership',
    question:
      'How meaningfully are communities and patients involved in designing, governing, and evaluating care?',
    interpretation:
      'Limited participation risks designing services around institutional assumptions rather than lived experience, need, access, and trust.',
    action:
      'Give community and patient representatives defined roles in design and governance. Close the feedback loop and report what changed because of their participation.',
  },
  {
    id: 10,
    name: 'Emergency preparedness and system resilience',
    question:
      'How effectively do organizations coordinate risk planning, surge response, and recovery?',
    interpretation:
      'Separate plans and command structures can delay surge response, create resource conflicts, and weaken recovery.',
    action:
      'Align risk registers, incident command, mutual-aid arrangements, surge resources, and simulation exercises across organizations.',
  },
];

/** Ordered high-risk first, so `find` returns the correct band. */
export const RISK_BANDS = [
  { band: 'High fragmentation risk', min: 1.0, tone: 'm1' },
  { band: 'Moderate fragmentation risk', min: 2.0, tone: 'm2' },
  { band: 'Low-to-moderate fragmentation risk', min: 3.0, tone: 'm3' },
  { band: 'Low fragmentation risk', min: 3.5, tone: 'm4' },
];

const CLASSIFICATION = {
  1: 'Critical gap',
  2: 'Priority gap',
  3: 'Opportunity to strengthen',
  4: 'Current strength',
};

const RECOMMENDATION_PREFIX = {
  1: 'Start now',
  2: 'Prioritize',
  3: 'Strengthen',
  4: 'Sustain and scale',
};

const EXECUTIVE_SUMMARY = {
  'High fragmentation risk':
    'Your responses indicate structural fragmentation across important parts of the system. Coordination is likely to depend on informal relationships or isolated initiatives, creating risk for continuity, equity, performance, and resilience. Begin with the top three gaps and establish clear ownership for a focused 90-day improvement cycle.',
  'Moderate fragmentation risk':
    'Your responses show meaningful progress alongside material coordination gaps. Some integrated practices exist, but they may not yet be consistent, institutionalized, or system-wide. Focused action on the lowest-scoring domains can convert pockets of progress into a more reliable operating model.',
  'Low-to-moderate fragmentation risk':
    'Your responses indicate a generally coordinated system with specific weaknesses that still limit consistency or scale. Protect the areas that are working, then target the remaining gaps through clearer standards, shared measures, and stronger cross-organizational learning.',
  'Low fragmentation risk':
    'Your responses indicate strong integration across most domains. The priority is to sustain performance, document the operating model, test resilience, address any remaining variation, and scale transferable practices without creating new silos.',
};

export function domainById(id) {
  return DOMAINS.find((d) => d.id === id);
}

export function classificationFor(score) {
  return CLASSIFICATION[score];
}

export function recommendationPrefix(score) {
  return RECOMMENDATION_PREFIX[score];
}

export function bandFor(average) {
  return [...RISK_BANDS].reverse().find((b) => average >= b.min) ?? RISK_BANDS[0];
}

export function executiveSummaryFor(band) {
  return EXECUTIVE_SUMMARY[band];
}

/**
 * Validate a raw answers array. Returns `{ ok: true, answers }` or
 * `{ ok: false, error }`. Called on the server before anything is stored.
 */
export function validateAnswers(input) {
  if (!Array.isArray(input) || input.length !== TOTAL_DOMAINS) {
    return { ok: false, error: `Expected ${TOTAL_DOMAINS} answers.` };
  }
  const answers = input.map((v) => Number(v));
  const bad = answers.findIndex((v) => !Number.isInteger(v) || v < 1 || v > 4);
  if (bad !== -1) {
    return { ok: false, error: `Answer ${bad + 1} must be a whole number from 1 to 4.` };
  }
  return { ok: true, answers };
}

/**
 * Score a validated answers array.
 *
 * Priorities are the three weakest domains; ties break toward the lower
 * domain id so the same answers always produce the same report. Strengths
 * are domains scoring 4, or the single highest domain if none reached 4.
 */
export function scoreAnswers(answers) {
  const rawScore = answers.reduce((sum, v) => sum + v, 0);
  const overallAverage = Number((rawScore / TOTAL_DOMAINS).toFixed(2));
  const integrationPercent = Math.round((rawScore / (TOTAL_DOMAINS * 4)) * 100);
  const totalGap = TOTAL_DOMAINS * 4 - rawScore;

  const ranked = DOMAINS.map((d, i) => ({ id: d.id, score: answers[i] })).sort(
    (a, b) => a.score - b.score || a.id - b.id,
  );

  const priorityDomainIds = ranked.slice(0, 3).map((d) => d.id);

  const perfect = ranked.filter((d) => d.score === 4).map((d) => d.id);
  const strengthDomainIds = perfect.length
    ? perfect.sort((a, b) => a - b)
    : [ranked[ranked.length - 1].id];

  const { band: riskBand } = bandFor(overallAverage);

  return {
    rawScore,
    overallAverage,
    integrationPercent,
    totalGap,
    riskBand,
    priorityDomainIds,
    strengthDomainIds,
    scoringVersion: SCORING_VERSION,
    reportVersion: REPORT_VERSION,
  };
}

/** Expand a stored assessment into the rows the report renders. */
export function buildDomainRows(answers) {
  return DOMAINS.map((domain, i) => {
    const score = answers[i];
    return {
      id: domain.id,
      name: domain.name,
      question: domain.question,
      score,
      gap: 4 - score,
      classification: classificationFor(score),
      interpretation: domain.interpretation,
      action: domain.action,
      prefix: recommendationPrefix(score),
    };
  });
}

export function buildNinetyDayPlan(priorityDomainIds) {
  const [p1, p2, p3] = priorityDomainIds.map((id) => domainById(id).name);
  return [
    {
      label: 'Days 0 to 30',
      aim: 'Validate and own',
      items: [
        `Validate the findings for ${p1}, ${p2}, and ${p3} with relevant stakeholders.`,
        'Assign an executive sponsor.',
        `Assign owners for the three priority domains (${p1}, ${p2}, ${p3}).`,
        'Confirm baselines for the priority domains.',
        'Identify existing initiatives that can support the work.',
        'Agree on a small number of improvement measures.',
      ],
    },
    {
      label: 'Days 31 to 60',
      aim: 'Design and align',
      items: [
        `Co-design one or two practical interventions for ${p1} and ${p2}.`,
        'Define responsibilities and decision rights.',
        'Align governance and reporting.',
        'Identify quick wins and implementation barriers.',
        'Confirm the measures used to evaluate progress.',
      ],
    },
    {
      label: 'Days 61 to 90',
      aim: 'Pilot and decide',
      items: [
        `Launch a limited pilot for ${p1}.`,
        'Review early evidence.',
        'Document lessons.',
        'Resolve initial implementation barriers.',
        'Decide what should be adapted, stopped, sustained, or scaled.',
      ],
    },
  ];
}
