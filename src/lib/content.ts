export type Role = 'coordinator' | 'provider';

export interface ChecklistItem {
  text: string;
  critical?: boolean;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: string;
  keyPoint: string;
  whyItMatters: string;
  checklist: ChecklistItem[];
  policyReferences: string[];
  tips?: string[];
}

export interface Track {
  id: Role;
  title: string;
  description: string;
  icon: string;
  color: 'amber' | 'teal';
  modules: Module[];
}

export const tracks: Track[] = [
  {
    id: 'coordinator',
    title: 'Service Coordinators',
    description: 'For Initial Service Coordinators (ISC) and Ongoing Service Coordinators (OSC)',
    icon: 'clipboard',
    color: 'amber',
    modules: [
      {
        id: 'timelines',
        title: 'Critical Timelines',
        subtitle: 'The "Clocks" You Must Know',
        duration: '4 min',
        icon: 'clock',
        keyPoint: 'Every step in the EI process has a strict deadline. Missing these timelines is the #1 cause of compliance issues and audit findings.',
        whyItMatters: 'Timeline violations are tracked by the State. Repeated violations can result in agency sanctions, loss of contracts, and delayed services for children.',
        checklist: [
          { text: 'Contact family within 2 business days of ISC assignment', critical: true },
          { text: 'Meet with family within 7 calendar days of assignment', critical: true },
          { text: 'MDE completed within 30 days of referral', critical: true },
          { text: 'Initial IFSP meeting within 45 days of referral', critical: true },
          { text: 'Make-up sessions delivered within 2 weeks of missed session' },
          { text: 'Transition notification to CPSE at least 120 days before age 3', critical: true },
        ],
        policyReferences: ['Policy 1-A', 'Policy 5-C', 'Policy 10-A'],
        tips: [
          'Set calendar reminders for each deadline as soon as you receive a case',
          'Document all contact attempts, even unsuccessful ones',
          'If a deadline will be missed, file the Reason for Delay form BEFORE the deadline passes',
        ],
      },
      {
        id: 'referral',
        title: 'Referral & Intake',
        subtitle: 'Starting the Process Right',
        duration: '5 min',
        icon: 'user-plus',
        keyPoint: 'A proper referral contains all required information and triggers the 45-day clock. Your first contact with the family sets the tone for the entire relationship.',
        whyItMatters: 'Incomplete referrals cause delays. Poor first impressions lead to families disengaging from services.',
        checklist: [
          { text: 'Verify referral came through proper channels (EI-Hub or Referral Portal)', critical: true },
          { text: 'Confirm child is under 36 months and resides in NYC' },
          { text: 'Make first contact attempt within 2 business days' },
          { text: 'Document all contact attempts with dates and methods' },
          { text: 'Schedule in-person meeting within 7 days' },
          { text: 'Provide Welcome Packet to family at first meeting' },
          { text: 'Explain family rights and the EI process in their preferred language' },
        ],
        policyReferences: ['Policy 1-A'],
        tips: [
          'Always ask for the family\'s preferred language and communication method',
          'Have Welcome Packets ready in multiple languages',
          'If unable to reach family after multiple attempts, document thoroughly',
        ],
      },
      {
        id: 'foster-care',
        title: 'Foster Care & Surrogacy',
        subtitle: 'Special Requirements for ACS Cases',
        duration: '5 min',
        icon: 'shield',
        keyPoint: 'Foster parents CANNOT automatically sign consents. You must determine if a Surrogate Parent is needed IMMEDIATELY upon learning a child is in foster care.',
        whyItMatters: 'Services provided without proper consent are not legally authorized. This exposes the agency to liability and can invalidate the entire IFSP.',
        checklist: [
          { text: 'Immediately identify if child is in foster care or ACS custody', critical: true },
          { text: 'Determine who has legal authority to consent (birth parent, foster parent, or surrogate)', critical: true },
          { text: 'Use the Foster Care Packet forms (not standard forms)', critical: true },
          { text: 'Request Surrogate Parent appointment from Regional Office if needed' },
          { text: 'Document custody status in EI-Hub' },
          { text: 'Verify court orders if custody is contested' },
        ],
        policyReferences: ['Policy 2-A', 'Policy 2-B'],
        tips: [
          'When in doubt, contact your Regional Office immediately',
          'Keep a copy of the Foster Care Packet readily available',
          'Birth parents may retain consent rights even if child is in foster care - verify!',
        ],
      },
      {
        id: 'before-ifsp',
        title: 'Before the IFSP',
        subtitle: 'Setting Up for Success',
        duration: '4 min',
        icon: 'file-text',
        keyPoint: 'Before the IFSP meeting can happen, you must ensure all evaluations are complete, all consents are signed, and insurance information is collected.',
        whyItMatters: 'Missing documents delay the IFSP meeting, which delays services to the child. Insurance information is mandatory for billing.',
        checklist: [
          { text: 'Collect private insurance and/or Medicaid information', critical: true },
          { text: 'Upload copies of insurance cards to EI-Hub', critical: true },
          { text: 'Send Consent to Release Information to evaluation agency' },
          { text: 'Obtain prescription/script for PT, OT, or Nursing evaluations if recommended' },
          { text: 'Review MDE report before IFSP meeting' },
          { text: 'Ensure family understands evaluation results before IFSP meeting' },
        ],
        policyReferences: ['Policy 3-A', 'Policy 3-B'],
        tips: [
          'Create a checklist for each case and track document completion',
          'Remind families to bring insurance cards to your first meeting',
          'If family has no insurance, document this clearly in EI-Hub',
        ],
      },
      {
        id: 'ifsp-meeting',
        title: 'IFSP Meeting',
        subtitle: 'The Core Document',
        duration: '5 min',
        icon: 'users',
        keyPoint: 'The IFSP must be completed within 45 days of referral, must include specific required elements, and must be signed by the parent/guardian.',
        whyItMatters: 'The IFSP is the legal document authorizing services. Without a valid IFSP, services cannot begin. An incomplete IFSP will fail audit.',
        checklist: [
          { text: 'Hold meeting within 45 days of referral', critical: true },
          { text: 'Include all required participants (parent, SC, evaluator/provider)' },
          { text: 'Document present levels of development in all 5 domains' },
          { text: 'Write measurable outcomes with criteria for success' },
          { text: 'Specify service frequency, duration, location, and provider type' },
          { text: 'Obtain parent signature on IFSP', critical: true },
          { text: 'Provide family with copy of signed IFSP' },
          { text: 'Upload IFSP to EI-Hub within required timeframe' },
        ],
        policyReferences: ['Policy 5-A', 'Policy 5-B', 'Policy 5-C'],
        tips: [
          'Review the IFSP checklist before every meeting',
          'Schedule meetings at times convenient for families',
          'If parent cannot attend in person, telehealth participation is allowed',
        ],
      },
      {
        id: 'transition',
        title: 'Transition Planning',
        subtitle: 'The Age 3 "Cliff"',
        duration: '5 min',
        icon: 'arrow-right',
        keyPoint: 'Transition planning must begin at the IFSP closest to the child\'s 2nd birthday. CPSE must be notified at least 120 days before the child turns 3.',
        whyItMatters: 'EI services end at age 3 with NO exceptions. Children without proper transition planning may have a gap in services.',
        checklist: [
          { text: 'Begin transition planning at IFSP closest to age 2', critical: true },
          { text: 'Discuss transition options with family (CPSE, Head Start, other services)' },
          { text: 'Notify CPSE at least 120 days before child turns 3', critical: true },
          { text: 'Complete Transition Conference with family' },
          { text: 'Send required documentation to CPSE with parent consent' },
          { text: 'Document all transition activities in EI-Hub' },
        ],
        policyReferences: ['Policy 10-A', 'Policy 10-B', 'Policy 10-C'],
        tips: [
          'Set a calendar reminder for 7 months before child\'s 3rd birthday',
          'Explain to families that EI services END at age 3 - there is no extension',
          'Help families understand the difference between EI and CPSE services',
        ],
      },
      {
        id: 'insurance-billing',
        title: 'Insurance & Billing',
        subtitle: 'Getting Paid Right',
        duration: '3 min',
        icon: 'credit-card',
        keyPoint: 'Insurance information must be collected and verified for every family. Private insurance is billed first, then Medicaid, then state funds.',
        whyItMatters: 'Improper billing can result in claim denials, delayed payments, and audit findings. Families are NOT responsible for EI costs.',
        checklist: [
          { text: 'Collect insurance information at first family meeting', critical: true },
          { text: 'Upload copies of insurance cards to EI-Hub' },
          { text: 'Verify Medicaid eligibility' },
          { text: 'Document if family has no insurance' },
          { text: 'Explain to family that EI is at no cost to them' },
          { text: 'Update insurance information if it changes during services' },
        ],
        policyReferences: ['Policy 3-A'],
        tips: [
          'Families sometimes hesitate to provide insurance info - reassure them there is NO cost to them',
          'Check for Medicaid even if family has private insurance',
          'Insurance changes are common - ask about it at periodic reviews',
        ],
      },
    ],
  },
  {
    id: 'provider',
    title: 'Service Providers',
    description: 'For Evaluators, Physical Therapists, Occupational Therapists, Speech Therapists, and Special Instructors',
    icon: 'heart',
    color: 'teal',
    modules: [
      {
        id: 'timelines',
        title: 'Critical Timelines',
        subtitle: 'The "Clocks" You Must Know',
        duration: '4 min',
        icon: 'clock',
        keyPoint: 'Evaluations must be completed within 30 days of referral. Make-up sessions must be delivered within 2 weeks of a missed session.',
        whyItMatters: 'Timeline violations delay services for children and trigger compliance reviews. Repeated violations affect agency contracts.',
        checklist: [
          { text: 'MDE must be submitted within 30 days of referral', critical: true },
          { text: 'Begin services as soon as possible after IFSP is signed' },
          { text: 'Deliver make-up sessions within 2 weeks of missed session', critical: true },
          { text: 'Submit progress notes within required timeframe' },
          { text: 'Obtain new prescriptions before they expire' },
        ],
        policyReferences: ['Policy 4-A', 'Policy 6-A'],
        tips: [
          'Build buffer time into your schedule for make-up sessions',
          'Track prescription expiration dates in your calendar',
          'Communicate with the Service Coordinator if timelines are at risk',
        ],
      },
      {
        id: 'evaluation-requirements',
        title: 'Evaluation Requirements',
        subtitle: 'MDE Rules & Changes',
        duration: '5 min',
        icon: 'search',
        keyPoint: 'As of September 1, 2024, NO supplemental evaluations are allowed as part of the initial MDE. The MDE team must assess all 5 developmental domains. Only supplemental audiological evaluation is permitted if needed.',
        whyItMatters: 'Supplemental evaluations conducted as part of MDE will NOT be reimbursed. This is a major policy change - non-compliance results in denied claims.',
        checklist: [
          { text: 'Ensure MDE team can assess all 5 developmental domains', critical: true },
          { text: 'Do NOT conduct supplemental evaluations as part of initial MDE', critical: true },
          { text: 'Only audiological supplemental is permitted during MDE' },
          { text: 'Obtain prescription BEFORE conducting PT, OT, or Nursing evaluation', critical: true },
          { text: 'For speech with feeding concerns, obtain medical clearance' },
          { text: 'Submit completed evaluation to Regional Office within 30 days' },
        ],
        policyReferences: ['Policy 4-A', 'Policy 4-B'],
        tips: [
          'If a domain cannot be assessed, document the reason clearly',
          'Supplemental evaluations CAN be requested AFTER the initial MDE if needed',
          'Keep copies of prescriptions with your evaluation documentation',
        ],
      },
      {
        id: 'prescriptions',
        title: 'Prescription Requirements',
        subtitle: 'Scripts for PT, OT, and Nursing',
        duration: '4 min',
        icon: 'file-plus',
        keyPoint: 'Physical Therapy, Occupational Therapy, and Nursing services REQUIRE a written prescription (script) from a physician or Nurse Practitioner. Services without a valid script are NOT billable.',
        whyItMatters: 'No script = no payment. This applies to both evaluations AND ongoing services. Scripts must be renewed when frequency changes or at Annual IFSP.',
        checklist: [
          { text: 'Verify you have a valid script BEFORE providing PT, OT, or Nursing services', critical: true },
          { text: 'Script must include child name, DOB, diagnosis, and recommended service' },
          { text: 'Script must be signed and dated by physician or NP' },
          { text: 'Obtain new script when service frequency or duration changes', critical: true },
          { text: 'Obtain new script at Annual IFSP review', critical: true },
          { text: 'Keep copy of script in your records' },
        ],
        policyReferences: ['Policy 6-C'],
        tips: [
          'Work with the Service Coordinator to obtain scripts - this is often their responsibility',
          'Some physicians require specific forms - check with the prescribing office',
          'Track script expiration dates in a spreadsheet or calendar',
        ],
      },
      {
        id: 'telehealth',
        title: 'Telehealth Rules',
        subtitle: 'When It\'s Allowed',
        duration: '3 min',
        icon: 'video',
        keyPoint: 'Telehealth is NOT a default option. It is only permitted when: the family requests it, the child has complex medical needs preventing in-home visits, OR no in-person/bilingual provider is available.',
        whyItMatters: 'Unauthorized telehealth sessions may not be reimbursed. The preference is always for in-person, in the child\'s natural environment.',
        checklist: [
          { text: 'Verify telehealth is justified (family request, medical, or provider availability)', critical: true },
          { text: 'Document the reason for telehealth in session notes' },
          { text: 'Ensure family has adequate technology for telehealth' },
          { text: 'Provide in-person services when telehealth justification no longer applies' },
          { text: 'Follow all standard session documentation requirements' },
        ],
        policyReferences: ['Policy 6-B'],
        tips: [
          'In-person is always preferred - do not default to telehealth for convenience',
          'If family requests telehealth, document this request clearly',
          'Hybrid models (some telehealth, some in-person) are acceptable when justified',
        ],
      },
      {
        id: 'session-notes',
        title: 'Session Notes & Logs',
        subtitle: 'Documentation That Gets Paid',
        duration: '5 min',
        icon: 'edit',
        keyPoint: 'Every session requires a session note AND a parent/caregiver signature. Additionally, a Service Log must be maintained. No signature = not billable.',
        whyItMatters: 'Session notes are legal documents and proof of service delivery. Missing signatures are the most common reason for claim denials in audits.',
        checklist: [
          { text: 'Write a session note for EVERY session (including cancellations)', critical: true },
          { text: 'Obtain parent/caregiver signature on EVERY session note', critical: true },
          { text: 'Include date, start/end time, activities, and child response in notes' },
          { text: 'Document progress toward IFSP outcomes' },
          { text: 'Maintain a Service Log signed by parent', critical: true },
          { text: 'Submit notes within required timeframe' },
        ],
        policyReferences: ['Policy 6-A', 'Policy 6-D'],
        tips: [
          'Get the signature BEFORE you leave - never plan to "get it next time"',
          'Electronic signatures are acceptable if your agency\'s system supports them',
          'If parent is not present, document who was present and why parent was absent',
        ],
      },
      {
        id: 'makeup-sessions',
        title: 'Make-Up Sessions',
        subtitle: 'Handling Cancellations',
        duration: '3 min',
        icon: 'refresh-cw',
        keyPoint: 'When a session is cancelled (by provider or family), a make-up session must be offered and delivered within 2 weeks of the missed session.',
        whyItMatters: 'Children are entitled to all IFSP-authorized sessions. Failure to provide make-ups is a compliance violation and shortchanges the child.',
        checklist: [
          { text: 'Document all cancellations with reason (provider or family cancel)' },
          { text: 'Offer make-up session to family within 2 weeks', critical: true },
          { text: 'Document make-up offer and family response' },
          { text: 'If family declines make-up, document the declination' },
          { text: 'Deliver make-up within 2 weeks of original missed session', critical: true },
          { text: 'Do not "stack" multiple sessions in one day unless appropriate' },
        ],
        policyReferences: ['Policy 6-E'],
        tips: [
          'Keep your schedule flexible enough to accommodate make-ups',
          'Communicate with families about make-up scheduling as soon as possible',
          'If family repeatedly declines make-ups, inform the Service Coordinator',
        ],
      },
      {
        id: 'billing-compliance',
        title: 'Billing Compliance',
        subtitle: 'Avoiding Claim Denials',
        duration: '4 min',
        icon: 'check-circle',
        keyPoint: 'Every billable session must have: a valid IFSP authorizing the service, a session note, a parent signature, and (for PT/OT/Nursing) a valid prescription.',
        whyItMatters: 'Improperly documented sessions will be denied or recouped in audits. This directly affects your agency and your continued employment.',
        checklist: [
          { text: 'Verify service is authorized on current IFSP', critical: true },
          { text: 'Ensure prescription is valid (PT, OT, Nursing)', critical: true },
          { text: 'Complete session note with all required elements' },
          { text: 'Obtain parent/caregiver signature', critical: true },
          { text: 'Submit billing within required timeframe' },
          { text: 'Do NOT bill for sessions that were cancelled and not made up' },
        ],
        policyReferences: ['Policy 6-A', 'Policy 6-C'],
        tips: [
          'Create a pre-billing checklist and use it for every session',
          'When in doubt about billability, ask your supervisor BEFORE providing service',
          'Keep organized records - audits can look back several years',
        ],
      },
    ],
  },
];

// Quick reference content for printable cards
export const quickReference = {
  criticalTimelines: [
    { event: 'ISC contact family', deadline: '2 business days', from: 'ISC assignment' },
    { event: 'ISC meet family', deadline: '7 calendar days', from: 'ISC assignment' },
    { event: 'MDE completion', deadline: '30 calendar days', from: 'Referral date' },
    { event: 'Initial IFSP', deadline: '45 calendar days', from: 'Referral date' },
    { event: 'Make-up sessions', deadline: '2 weeks', from: 'Missed session' },
    { event: 'CPSE notification', deadline: '120 days before', from: 'Child turns 3' },
  ],
  keyForms: [
    { name: 'Reason for Delay', use: 'When ANY timeline will be missed' },
    { name: 'Session Note', use: 'Every session (including cancellations)' },
    { name: 'Service Log', use: 'Ongoing tracking, parent signature required' },
    { name: 'Foster Care Packet', use: 'Any child in foster care or ACS custody' },
    { name: 'Consent to Release', use: 'Sharing info with evaluation agency' },
    { name: 'Prescription/Script', use: 'Required for PT, OT, Nursing' },
  ],
  commonMistakes: [
    'Missing parent signature on session notes',
    'Conducting telehealth without proper justification',
    'Providing PT/OT/Nursing without valid script',
    'Allowing foster parent to sign without verifying authority',
    'Not filing Reason for Delay form before deadline passes',
    'Conducting supplemental evaluations during initial MDE',
    'Missing the 120-day CPSE notification deadline',
  ],
};

export function getTrack(role: Role): Track | undefined {
  return tracks.find(t => t.id === role);
}

export function getModule(role: Role, moduleId: string): Module | undefined {
  const track = getTrack(role);
  return track?.modules.find(m => m.id === moduleId);
}
