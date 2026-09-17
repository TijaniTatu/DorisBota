/**
 * Privacy notice content.
 *
 * Ported from the prototype. Sections 9 and 11 were rewritten because the
 * infrastructure described there no longer exists — responses are now held in
 * a managed Postgres database and email is sent through Resend, not through
 * the prototype's hosted platform. A privacy notice that describes the wrong
 * system is worse than none, so those two sections state the current
 * arrangements. Everything else is unchanged and remains Doris's own text.
 *
 * This notice should be reviewed by Doris (and, ideally, counsel) before the
 * site goes live: section 8 still does not state an actual retention period.
 */

export const VERSION = 'Version 1.1';
export const ISSUED = 'Issued 13 September 2026';
export const NEXT_REVIEW = 'Next review 13 September 2027';

export const INTRO =
  'This notice explains what happens to the information you provide when you complete the Fragmentation Pulse Check or the full Health Systems Fragmentation Diagnostic.';

export const SECTIONS = [
  {
    n: 1,
    title: 'Who is responsible for your information',
    body: [
      'The data controller for this diagnostic is Doris Bota, operating as an independent consultancy practice based in Nairobi, Kenya. The controller determines why your information is collected and how it is used.',
    ],
  },
  {
    n: 2,
    title: 'What this notice covers',
    body: [
      'This notice applies to two instruments:',
      'The Fragmentation Pulse Check, a three-question self-assessment circulated openly.',
      'The Health Systems Fragmentation Diagnostic, the fuller self-assessment provided as a pre-read before a scheduled scoping conversation.',
      'This notice does not cover any other website, platform, or service you may reach through a link.',
    ],
  },
  {
    n: 3,
    title: 'What information is collected',
    sub: [
      {
        heading: 'Information you provide directly',
        items: [
          'Your name.',
          'Your work email address.',
          'Your organisation and your role or title.',
          'The country or region your work covers.',
          'Your answers to the assessment questions.',
          'Any optional phone number or context notes you choose to add.',
        ],
      },
      {
        heading: 'Information collected automatically',
        items: [
          'The date and time of submission is recorded. No advertising or analytics cookies are set. The hosting provider may set strictly necessary cookies as part of operating the site, governed by that provider’s own terms.',
        ],
      },
      {
        heading: 'Information that is not collected',
        items: [
          'The diagnostic does not ask for patient data, clinical records, financial account details, national identification numbers, or any special category personal data as defined under the Data Protection Act, 2019. Please do not enter any such information in free text fields.',
        ],
      },
    ],
  },
  {
    n: 4,
    title: 'Why the information is collected',
    body: [
      'Your information is used for the following purposes, and no others:',
      'To calculate and return your maturity band result across the domains of the Integrated Health Systems Transformation Framework.',
      'To identify your weakest domains, which is the point the instrument is designed to surface.',
      'To prepare for a scoping conversation, where you have requested one, so that the conversation begins from your actual situation rather than from generic questions.',
      'To improve the diagnostic instrument itself, using patterns across responses rather than individual answers.',
      'Your information is not used to build a marketing list, to profile you for advertising, or to generate automated decisions that produce legal or similarly significant effects.',
    ],
  },
  {
    n: 5,
    title: 'The legal basis for collecting it',
    body: [
      'Processing is carried out on the basis of your consent, given when you tick the consent box on the form. You may withdraw consent at any time by writing to the address in section 1. Withdrawal does not affect processing that already took place while consent was in force.',
      'Where you and the consultancy go on to enter into a contract, information necessary to perform that contract is processed on the basis of contractual necessity rather than consent.',
    ],
  },
  {
    n: 6,
    title: 'Who can see your responses',
    body: [
      'Individual responses are read by Doris Bota only.',
      'Your information is not shared with any donor, employer, ministry, partner organisation, or any other third party. It is not sold, rented, or exchanged under any circumstances.',
    ],
  },
  {
    n: 7,
    title: 'How information about your institution is treated',
    body: [
      'This point matters more than most in this notice, because the diagnostic asks you to make an honest assessment of weaknesses in your own institution.',
      'Your institution is never named, identified, or made identifiable in any capability statement, proposal, presentation, article, social media post, or other public or client-facing material without your prior written permission.',
      'Where patterns across multiple respondents are described publicly, they are aggregated and anonymised so that no individual respondent or institution can be identified. An example of permitted use is a statement that a majority of respondents in a given region scored lowest on governance and institutionalisation. An example of what will not happen is any statement attributing a score, weakness, or quotation to a named institution.',
    ],
  },
  {
    n: 8,
    title: 'How long information is kept',
    body: [
      'Retention periods are reviewed annually. Where you request deletion earlier, your information is deleted on request as set out in section 10.',
    ],
  },
  {
    n: 9,
    title: 'Where information is stored',
    body: [
      'This website is hosted by Vercel. Responses are stored in a managed Postgres database, and report emails are delivered through Resend. These providers operate infrastructure that may be located outside Kenya, including in the United States and the European Union, which means your information may be transferred across borders.',
      'Each provider maintains appropriate safeguards for such transfers, including standard contractual clauses. The consultancy relies on those safeguards, together with your consent, as the basis for transfer under section 48 of the Data Protection Act, 2019.',
    ],
  },
  {
    n: 10,
    title: 'Your rights',
    body: [
      'Under the Data Protection Act, 2019 of Kenya, and under the General Data Protection Regulation where it applies to you, you have the following rights:',
      'To be informed of how your information is used, which is the purpose of this notice.',
      'To access a copy of the information held about you.',
      'To correct information that is inaccurate or incomplete.',
      'To request deletion of your information.',
      'To object to processing, or to request that processing be restricted.',
      'To receive your information in a portable format.',
      'To withdraw consent at any time.',
      'To exercise any of these rights, write to dbota@integratedhealthsystemstransformation.com. Requests are acknowledged within seven days and completed within thirty days. There is no charge.',
    ],
  },
  {
    n: 11,
    title: 'Security',
    body: [
      'Responses are transmitted over an encrypted connection and stored in a database that is not publicly reachable. Administrative access to responses requires a separate credential held only by the consultant named in section 1, and report links are unguessable tokens rather than sequential identifiers.',
      'Files containing responses are not stored on shared drives, personal devices without encryption, or unmanaged cloud storage.',
      'No system is entirely without risk. Where a breach occurs that is likely to result in real risk to your rights and freedoms, you will be notified and the Office of the Data Protection Commissioner will be informed within seventy-two hours, as required by law.',
    ],
  },
  {
    n: 12,
    title: 'What this diagnostic is and is not',
    body: [
      'The diagnostic is a structured self-assessment tool. It reflects your own perception of your institution at a point in time.',
      'It is not a clinical assessment, an audit, an accreditation instrument, a formal evaluation, or a compliance review. The result carries no regulatory standing and should not be presented as an external verification of institutional performance.',
    ],
  },
  {
    n: 13,
    title: 'Persons under eighteen',
    body: [
      'The diagnostic is designed for practising professionals and is not directed at persons under the age of eighteen. Information is not knowingly collected from anyone in that group. Where such information is identified, it is deleted.',
    ],
  },
  {
    n: 14,
    title: 'Changes to this notice',
    body: [
      'This notice may be updated. The version date below always shows when it was last changed. Where a change materially alters how your information is used, previous respondents are notified directly.',
    ],
  },
  {
    n: 15,
    title: 'Questions and complaints',
    body: [
      'Questions about this notice, or about how your information has been handled, should go to dbota@integratedhealthsystemstransformation.com in the first instance. A response is provided within seven days.',
      'Where you are not satisfied with the response, you may lodge a complaint with the Office of the Data Protection Commissioner of Kenya at www.odpc.go.ke. Where you are located in the European Economic Area or the United Kingdom, you may also complain to your national supervisory authority.',
    ],
  },
];
