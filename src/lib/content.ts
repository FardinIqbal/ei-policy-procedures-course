export type Role = 'coordinator' | 'provider';

export interface ChecklistItem {
  text: string;
  critical?: boolean;
}

export interface PolicyRef {
  policy: string;
  page: number;
  description?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: string;
  // Editorial content
  lede: string;
  narrative: string;
  pullQuote?: string;
  keyInsight: string;
  // Practical content
  checklist: ChecklistItem[];
  policyRefs: PolicyRef[];
  proTips?: string[];
  // Knowledge verification
  quiz?: QuizQuestion[];
}

export interface Track {
  id: Role;
  title: string;
  description: string;
  tagline: string;
  icon: string;
  color: 'amber' | 'teal';
  modules: Module[];
}

export const tracks: Track[] = [
  {
    id: 'coordinator',
    title: 'Service Coordinators',
    description: 'For Initial Service Coordinators (ISC) and Ongoing Service Coordinators (OSC)',
    tagline: 'You are the family\'s guide through the EI system',
    icon: 'clipboard',
    color: 'amber',
    modules: [
      {
        id: 'timelines',
        title: 'The Clocks Are Always Running',
        subtitle: 'Critical Timelines That Define Your Work',
        duration: '4 min',
        icon: 'clock',
        lede: 'In Early Intervention, time isn\'t just money - it\'s a child\'s development. Every deadline exists because research shows that earlier intervention leads to better outcomes. Miss a timeline, and you\'re not just risking an audit finding - you\'re potentially delaying critical support for a child during their most formative years.',
        narrative: `The moment a referral enters the system, six invisible clocks start ticking. These aren't arbitrary bureaucratic requirements - they're evidence-based standards designed to get children help as fast as possible.

**The 2-Day Clock** starts when you're assigned as ISC. Within 48 business hours, you must make contact with the family. Not "try to contact" - actually reach them. This urgency exists because families are often anxious and uncertain after a referral. Quick contact builds trust.

**The 7-Day Clock** gives you one week to meet the family in person. This face-to-face meeting is where the real work begins: explaining rights, gathering information, and starting to understand this family's unique situation.

**The 30-Day Clock** is for evaluations. The Multidisciplinary Evaluation (MDE) must be completed and submitted within 30 calendar days of referral. This tight window ensures children don't wait months to learn if they're eligible for services.

**The 45-Day Clock** is the big one. From referral to Initial IFSP meeting, you have 45 calendar days. This is the federal mandate. It's non-negotiable.

**The 2-Week Window** applies to make-up sessions. When a session is missed, the make-up must happen within 14 days. Not "scheduled" - delivered.

**The 120-Day Countdown** begins when a child approaches age 3. You must notify CPSE at least 120 days before the birthday. Miss this, and the child may have a gap in services when they age out of EI.`,
        pullQuote: 'Miss a timeline, and you\'re not just risking an audit - you\'re potentially delaying critical support during a child\'s most formative years.',
        keyInsight: 'Think of yourself as a project manager where the project is a child\'s development. Every deadline is a milestone that keeps the project on track.',
        checklist: [
          { text: 'Contact family within 2 business days of ISC assignment', critical: true },
          { text: 'Meet with family in person within 7 calendar days', critical: true },
          { text: 'Ensure MDE is completed within 30 days of referral', critical: true },
          { text: 'Hold Initial IFSP meeting within 45 days of referral', critical: true },
          { text: 'Coordinate make-up sessions within 2 weeks of missed sessions' },
          { text: 'Send CPSE notification at least 120 days before child turns 3', critical: true },
        ],
        policyRefs: [
          { policy: 'Policy 1-A', page: 3, description: 'Referral timelines and procedures' },
          { policy: 'Policy 5-C', page: 201, description: 'IFSP meeting requirements' },
          { policy: 'Policy 10-A', page: 445, description: 'Transition timeline requirements' },
        ],
        proTips: [
          'Create a case timeline template. The moment you get a new case, populate all deadline dates in your calendar with reminders set 3 days before each one.',
          'Document every contact attempt with date, time, method, and outcome. "Called, no answer, left voicemail" is documentation. "Tried to call" is not.',
          'If you see a deadline slipping, file the Reason for Delay form BEFORE the deadline passes, not after. Proactive documentation is always better than reactive explanations.',
        ],
        quiz: [
          {
            question: 'What is the maximum number of calendar days allowed from referral to the Initial IFSP meeting?',
            options: ['30 days', '45 days', '60 days', '90 days'],
            correctIndex: 1,
            explanation: 'The 45-day timeline is a federal mandate. From the date of referral, you have exactly 45 calendar days to complete the Initial IFSP meeting. This is non-negotiable.',
          },
          {
            question: 'How soon must an ISC make initial contact with a family after assignment?',
            options: ['24 hours', '2 business days', '7 calendar days', '2 weeks'],
            correctIndex: 1,
            explanation: 'Within 2 business days of ISC assignment, you must actually reach the family (not just attempt contact). Quick contact builds trust with families who are often anxious after a referral.',
          },
          {
            question: 'How many days before a child turns 3 must you notify CPSE for transition?',
            options: ['60 days', '90 days', '120 days', '180 days'],
            correctIndex: 2,
            explanation: 'CPSE notification must occur at least 120 days before the child\'s third birthday. Missing this deadline can create a gap in services when the child ages out of Early Intervention.',
          },
        ],
      },
      {
        id: 'referral',
        title: 'First Contact',
        subtitle: 'The Art of Starting Right',
        duration: '5 min',
        icon: 'user-plus',
        lede: 'Your first interaction with a family sets the tone for everything that follows. A parent who just learned their child might have a developmental delay is often scared, confused, and overwhelmed. You are their first point of human contact in a system they don\'t understand. How you show up in this moment matters enormously.',
        narrative: `A referral can come from many places: a pediatrician who noticed a speech delay, a worried grandparent, a daycare teacher, or a hospital NICU. By the time it reaches you, the family has likely been through an emotional journey just to get here.

**Your job in the first contact:**
- Introduce yourself as their guide through this process
- Explain what Early Intervention actually is (many families have no idea)
- Reassure them that EI services are free to families
- Schedule that first in-person meeting within 7 days
- Ask about their preferred language and communication style

**The Welcome Packet** is your most important tool. It contains:
- A letter explaining what happens next
- The "What Does Everyone Do in EI?" guide
- Family rights documentation
- FAQs about eligibility

Don't just hand it over - walk through it with them. The parent who understands the process becomes your partner in making sure their child gets help quickly.

**Language matters.** NYC is one of the most linguistically diverse places on Earth. If a family's preferred language isn't English, ensure all communications happen in their language. Welcome Packets are available in multiple languages. Request an interpreter for meetings if needed. A family that doesn't understand what's happening can't participate meaningfully in their child's care.`,
        pullQuote: 'A parent who just learned their child might have a developmental delay is scared, confused, and overwhelmed. You are their first point of human contact in a system they don\'t understand.',
        keyInsight: 'You\'re not just collecting information - you\'re building a relationship. The trust you establish now will determine how smoothly everything else goes.',
        checklist: [
          { text: 'Verify referral came through proper channels (EI-Hub or Referral Portal)', critical: true },
          { text: 'Confirm child is under 36 months and resides in NYC' },
          { text: 'Make first contact attempt within 2 business days', critical: true },
          { text: 'Document all contact attempts with dates, times, and methods' },
          { text: 'Schedule in-person meeting within 7 days' },
          { text: 'Ask about family\'s preferred language and communication method' },
          { text: 'Provide Welcome Packet in appropriate language at first meeting' },
          { text: 'Explain family rights and the EI process clearly' },
        ],
        policyRefs: [
          { policy: 'Policy 1-A', page: 3, description: 'Referral procedures and requirements' },
        ],
        proTips: [
          'Before your first call, take a breath. Your calm, confident tone will help an anxious parent feel like they\'re in good hands.',
          'Keep Welcome Packets in your top 5 languages readily available. Don\'t make families wait for materials to arrive.',
          'If you can\'t reach a family after multiple attempts, document thoroughly and escalate to your supervisor. Some families need extra outreach support.',
        ],
        quiz: [
          {
            question: 'What is the most important goal of your first contact with a family?',
            options: ['Collecting all required documents', 'Building trust and explaining the EI process', 'Scheduling all evaluations', 'Verifying insurance information'],
            correctIndex: 1,
            explanation: 'While documentation is important, the first contact is primarily about building trust and helping an anxious family understand they\'re in good hands. A parent who trusts you becomes your partner in the process.',
          },
          {
            question: 'What should you do if a family\'s preferred language isn\'t English?',
            options: ['Proceed in English and speak slowly', 'Request an interpreter and provide materials in their language', 'Have them bring their own translator', 'Refer them to a different service coordinator'],
            correctIndex: 1,
            explanation: 'Language access is a right. Ensure all communications happen in the family\'s preferred language - Welcome Packets are available in multiple languages, and interpreters should be requested for meetings.',
          },
          {
            question: 'Within how many days must you schedule an in-person meeting with a new family?',
            options: ['2 business days', '5 calendar days', '7 calendar days', '14 calendar days'],
            correctIndex: 2,
            explanation: 'You must meet the family in person within 7 calendar days of assignment. This face-to-face meeting is where you explain rights, gather information, and begin understanding the family\'s unique situation.',
          },
        ],
      },
      {
        id: 'foster-care',
        title: 'When ACS Is Involved',
        subtitle: 'Navigating Foster Care Complexities',
        duration: '5 min',
        icon: 'shield',
        lede: 'Here\'s a mistake that can invalidate an entire IFSP: assuming a foster parent can sign consent forms. They often can\'t. When a child is in foster care or known to ACS, the rules about who can make decisions for that child are different - and getting this wrong has serious legal consequences.',
        narrative: `Children in foster care are among the most vulnerable in the EI system. They may have experienced trauma, instability, and multiple placements. They also come with a complex web of legal relationships that you must understand.

**The Consent Question**

When a child enters foster care, parental rights don't automatically transfer to the foster parent. The biological parent may retain the right to consent to services. Or a court may have terminated parental rights. Or the child may need a Surrogate Parent appointed specifically to make educational decisions.

You cannot assume. You must verify.

**The Three Scenarios:**

1. **Biological parent retains rights:** Even if the child lives with a foster family, the biological parent may still have legal authority to consent. Contact the caseworker to verify.

2. **Foster parent has authority:** In some cases, the foster parent has been granted specific authority to consent to EI services. Get this in writing.

3. **Surrogate Parent needed:** If neither biological nor foster parent has authority, you must request a Surrogate Parent appointment from the Regional Office. This person will make educational decisions on behalf of the child.

**The Foster Care Packet**

Never use standard forms for a child in foster care. There's a specific Foster Care Packet with forms designed for this situation. Using the wrong forms creates documentation that may not be legally valid.

**Working with Education Liaisons**

Foster care agencies have Education Liaisons or Foster Care Case Planners. These are your partners. They understand the child's custody situation and can help you navigate the consent question. Build these relationships.`,
        pullQuote: 'Assuming a foster parent can sign consent forms is a mistake that can invalidate an entire IFSP.',
        keyInsight: 'In foster care cases, always ask "Who has legal authority to consent?" before proceeding with any paperwork.',
        checklist: [
          { text: 'Immediately identify if child is in foster care or ACS custody', critical: true },
          { text: 'Determine who has legal authority to consent (verify, don\'t assume)', critical: true },
          { text: 'Use Foster Care Packet forms, not standard forms', critical: true },
          { text: 'Contact Education Liaison/Foster Care Case Planner' },
          { text: 'Request Surrogate Parent appointment if needed' },
          { text: 'Document custody status in EI-Hub' },
          { text: 'Verify court orders if custody is contested or unclear' },
        ],
        policyRefs: [
          { policy: 'Policy 2-A', page: 24, description: 'Determining need for Surrogate Parent' },
          { policy: 'Policy 2-B', page: 41, description: 'Release of foster care information' },
        ],
        proTips: [
          'Keep the Foster Care Packet easily accessible. When you need it, you need it fast.',
          'When in doubt, call your Regional Office immediately. It\'s better to ask than to guess wrong.',
          'Birth parents may retain consent rights even when the child is in foster care. Always verify the current custody status.',
        ],
        quiz: [
          {
            question: 'A child in foster care needs an IFSP. Who should sign the consent forms?',
            options: ['The foster parent automatically', 'Whoever the caseworker says', 'You must verify who has legal authority to consent', 'The biological parent automatically'],
            correctIndex: 2,
            explanation: 'Never assume who can consent. You must verify the current custody status - it could be the biological parent, foster parent with specific authority, or a Surrogate Parent may need to be appointed.',
          },
          {
            question: 'What forms should you use for a child in foster care?',
            options: ['Standard EI forms', 'Foster Care Packet forms', 'Either set of forms is acceptable', 'Modified standard forms'],
            correctIndex: 1,
            explanation: 'Always use the Foster Care Packet forms for children in foster care. Standard forms may not be legally valid for these cases.',
          },
          {
            question: 'What is a Surrogate Parent in the EI context?',
            options: ['The foster parent', 'A court-appointed guardian', 'A person appointed to make educational decisions for the child', 'A biological relative'],
            correctIndex: 2,
            explanation: 'A Surrogate Parent is specifically appointed by the Regional Office to make educational decisions on behalf of a child when neither the biological nor foster parent has authority to consent.',
          },
        ],
      },
      {
        id: 'before-ifsp',
        title: 'Setting the Stage',
        subtitle: 'What Must Happen Before the IFSP Meeting',
        duration: '4 min',
        icon: 'file-text',
        lede: 'The IFSP meeting is the main event, but it can only succeed if you\'ve done the prep work. Think of yourself as a producer preparing for a show - every document, every consent, every piece of information needs to be in place before the curtain rises.',
        narrative: `The 45-day timeline to IFSP feels long until you realize how much needs to happen within it. Evaluations must be completed. Insurance must be verified. Consents must be signed. If any piece is missing when you sit down for the IFSP meeting, you may have to delay - and delays mean children waiting longer for services.

**The Insurance Imperative**

This might seem like administrative busywork, but insurance information is critical. EI services are billed in a specific order: private insurance first, then Medicaid, then state funds. Without accurate insurance information, claims get denied, payments get delayed, and the financial sustainability of the whole program suffers.

Families sometimes hesitate to provide insurance information, worried about costs. Reassure them clearly: **EI services are free to families.** Insurance is billed, but families never see a bill. No copays. No deductibles for EI. Ever.

**Prescriptions for Certain Evaluations**

If the evaluation team recommends PT, OT, or Nursing evaluation, you need a prescription (script) from a physician or Nurse Practitioner before those evaluations can happen. Speech evaluations with a feeding component need medical clearance. Don't let missing prescriptions delay your timeline.

**The Consent to Release**

Before evaluators can share their findings with you, the family must sign a Consent to Release Information. Get this signed early in the process.

**Prepare the Family**

Before the IFSP meeting, make sure the family understands what the evaluation found. Don't let them walk into the meeting hearing complex developmental information for the first time. A prepared family can participate meaningfully in planning their child's services.`,
        pullQuote: 'EI services are free to families. Insurance is billed, but families never see a bill. No copays. No deductibles. Ever.',
        keyInsight: 'The IFSP meeting is like a show - it only succeeds if you\'ve done the prep work. Missing documents mean delays, and delays mean children waiting.',
        checklist: [
          { text: 'Collect private insurance and/or Medicaid information', critical: true },
          { text: 'Upload copies of insurance cards to EI-Hub', critical: true },
          { text: 'Send Consent to Release Information to evaluation agency' },
          { text: 'Obtain prescription for PT, OT, or Nursing evaluations if recommended' },
          { text: 'Review MDE report before IFSP meeting' },
          { text: 'Meet with family to review evaluation results before IFSP meeting' },
          { text: 'Ensure all required documents are in EI-Hub' },
        ],
        policyRefs: [
          { policy: 'Policy 3-A', page: 60, description: 'ISC responsibilities before IFSP' },
          { policy: 'Policy 3-B', page: 89, description: 'Choice and approval of evaluations' },
        ],
        proTips: [
          'Create a case checklist template with every required document. Check items off as you get them.',
          'Ask about insurance at your very first meeting with the family. Don\'t wait.',
          'If the family has no insurance, document this clearly in EI-Hub. "No insurance" is different from "insurance not collected."',
        ],
        quiz: [
          {
            question: 'What should you tell families who are worried about providing insurance information?',
            options: ['Their insurance rates may increase', 'They will receive a bill for any uncovered services', 'EI services are completely free to families - no copays, no deductibles, no bills', 'They can choose not to provide it'],
            correctIndex: 2,
            explanation: 'EI services are free to families. Insurance is billed, but families never see a bill. No copays. No deductibles. Ever. This is protected by law.',
          },
          {
            question: 'When is a prescription required for an evaluation?',
            options: ['For all evaluations', 'Only for speech evaluations', 'For PT, OT, or Nursing evaluations', 'Never - prescriptions are only for services'],
            correctIndex: 2,
            explanation: 'If the evaluation team recommends PT, OT, or Nursing evaluation, you need a prescription from a physician or Nurse Practitioner before those evaluations can happen.',
          },
          {
            question: 'Why should you review the MDE report with the family BEFORE the IFSP meeting?',
            options: ['It\'s a regulatory requirement', 'So they don\'t hear complex developmental information for the first time at the meeting', 'To give them time to dispute the findings', 'To get their signature earlier'],
            correctIndex: 1,
            explanation: 'A prepared family can participate meaningfully in planning. Don\'t let them walk into the IFSP meeting hearing complex developmental information for the first time.',
          },
        ],
      },
      {
        id: 'ifsp-meeting',
        title: 'The IFSP',
        subtitle: 'The Document That Authorizes Everything',
        duration: '5 min',
        icon: 'users',
        lede: 'The Individualized Family Service Plan is the legal heart of Early Intervention. Without a signed IFSP, services cannot begin. An incomplete IFSP will fail an audit. A well-crafted IFSP becomes a roadmap for helping a child develop and a family feel supported.',
        narrative: `The IFSP isn't just paperwork - it's a plan co-created with the family for how their child will receive support. Done well, it reflects the family's priorities, the child's needs, and a realistic path forward.

**The 45-Day Mandate**

Federal law requires the Initial IFSP meeting within 45 calendar days of referral. This is not flexible. If you're approaching day 45 without an IFSP meeting scheduled, you have a problem.

**Required Participants**

The meeting must include:
- The parent or guardian (the family is always central)
- You, the Service Coordinator
- The evaluator who assessed the child (or someone who can speak to the evaluation results)
- Any service providers who will be working with the child

If someone can't attend in person, telehealth participation is acceptable.

**What the IFSP Must Contain**

- Present levels of development in all 5 domains (cognitive, physical, communication, social/emotional, adaptive)
- Family's concerns, priorities, and resources
- Measurable outcomes with criteria for determining progress
- Specific services: type, frequency, duration, location, and who provides them
- Start date for services
- Transition planning (even at the initial IFSP, you note that transition will happen before age 3)

**The Parent Signature**

The IFSP is not complete until the parent signs it. A parent who doesn't understand what they're signing isn't truly consenting. Make sure they understand every service, every outcome, and what their role will be.`,
        pullQuote: 'The IFSP isn\'t just paperwork - it\'s a plan co-created with the family for how their child will receive support.',
        keyInsight: 'A well-written IFSP is specific and measurable. "Improve speech" is not an outcome. "Child will use 10 functional words by 6-month review" is an outcome.',
        checklist: [
          { text: 'Hold meeting within 45 days of referral', critical: true },
          { text: 'Ensure all required participants are present (or on telehealth)' },
          { text: 'Document present levels of development in all 5 domains' },
          { text: 'Record family\'s concerns, priorities, and resources' },
          { text: 'Write measurable outcomes with specific criteria' },
          { text: 'Specify service frequency, duration, location, and provider type' },
          { text: 'Obtain parent signature on IFSP', critical: true },
          { text: 'Provide family with copy of signed IFSP' },
          { text: 'Upload completed IFSP to EI-Hub within required timeframe' },
        ],
        policyRefs: [
          { policy: 'Policy 5-A', page: 196, description: 'IFSP development requirements' },
          { policy: 'Policy 5-B', page: 198, description: 'IFSP content requirements' },
          { policy: 'Policy 5-C', page: 201, description: 'IFSP meeting procedures' },
        ],
        proTips: [
          'Review the IFSP checklist before every meeting. It\'s easy to miss a required element when you\'re focused on the conversation.',
          'Schedule meetings at times convenient for families, not just convenient for providers. Evening and weekend availability matters.',
          'If you sense a family doesn\'t understand something, stop and explain. An IFSP signed in confusion isn\'t a meaningful consent.',
        ],
        quiz: [
          {
            question: 'Which of the following is an example of a well-written IFSP outcome?',
            options: ['Improve speech', 'Get better at communication', 'Child will use 10 functional words by 6-month review', 'Work on language skills'],
            correctIndex: 2,
            explanation: 'IFSP outcomes must be specific and measurable. "Child will use 10 functional words by 6-month review" includes what, how many, and when - making progress trackable.',
          },
          {
            question: 'Who MUST be present at an IFSP meeting?',
            options: ['Only the Service Coordinator', 'Parent and Service Coordinator only', 'Parent, Service Coordinator, and someone who can speak to evaluation results', 'All providers who will deliver services'],
            correctIndex: 2,
            explanation: 'Required participants include the parent/guardian, the Service Coordinator, and someone who can speak to the evaluation results (evaluator or representative). Providers are optional but valuable.',
          },
          {
            question: 'When is the IFSP considered complete?',
            options: ['When all services are documented', 'When the Service Coordinator signs it', 'When the parent signs it', 'When it\'s uploaded to EI-Hub'],
            correctIndex: 2,
            explanation: 'The IFSP is not complete until the parent signs it. Services cannot begin until this happens. A parent who doesn\'t understand what they\'re signing isn\'t truly consenting.',
          },
        ],
      },
      {
        id: 'transition',
        title: 'The Age 3 Cliff',
        subtitle: 'Transition Planning Before It\'s Too Late',
        duration: '5 min',
        icon: 'arrow-right',
        lede: 'Early Intervention services end the day a child turns 3. There is no extension. No exception. No grace period. If you haven\'t prepared the family for this transition, you\'ll leave them stranded at the most vulnerable moment.',
        narrative: `This is perhaps the most emotionally difficult part of the EI work. A family has built relationships with their service coordinator and therapists. The child has been making progress. And then, on the third birthday, it all ends.

The transition to CPSE (Committee on Preschool Special Education) or other services doesn't happen automatically. It requires planning, paperwork, and a family that understands what's coming.

**When Transition Planning Begins**

Start at the IFSP meeting closest to the child's 2nd birthday. This gives you roughly a year to prepare.

**The 120-Day Notification**

At least 120 days before the child turns 3, you must notify CPSE that a child is transitioning. This isn't optional. Missing this deadline can create a gap in services where the child has aged out of EI but isn't yet enrolled in CPSE.

**The Transition Conference**

Meet with the family specifically to discuss transition. Cover:
- What happens when EI ends
- Options: CPSE services, Head Start, community programs
- What the CPSE evaluation process looks like
- What the family needs to do to ensure continuity

**Emotional Preparation**

Families often don't realize EI has an expiration date until transition conversations begin. Some react with anxiety. Some with denial. Some with anger at "the system." Be prepared for these emotions. Validate them. Then help the family focus on what needs to happen next.`,
        pullQuote: 'Early Intervention services end the day a child turns 3. There is no extension. No exception. No grace period.',
        keyInsight: 'Transition isn\'t an event - it\'s a process that takes a year. Start at age 2, not at age 2 years and 11 months.',
        checklist: [
          { text: 'Begin transition planning at IFSP closest to age 2', critical: true },
          { text: 'Discuss all transition options with family (CPSE, Head Start, other)' },
          { text: 'Send notification to CPSE at least 120 days before child turns 3', critical: true },
          { text: 'Hold Transition Conference with family' },
          { text: 'Obtain parent consent before sending records to CPSE' },
          { text: 'Document all transition activities in EI-Hub' },
          { text: 'Prepare family emotionally for the end of EI services' },
        ],
        policyRefs: [
          { policy: 'Policy 10-A', page: 445, description: 'Transition planning requirements' },
          { policy: 'Policy 10-B', page: 458, description: 'CPSE notification procedures' },
          { policy: 'Policy 10-C', page: 462, description: 'Transition conference requirements' },
        ],
        proTips: [
          'Set a calendar reminder for 7 months before every child\'s 3rd birthday. That\'s your signal to verify CPSE notification has been sent.',
          'EI and CPSE are different systems. Help families understand that CPSE services may look different, but support continues.',
          'Some families will want to deny that transition is coming. Gentle persistence is key. They need to face this to prepare for it.',
        ],
        quiz: [
          {
            question: 'When should transition planning begin for a child in Early Intervention?',
            options: ['At age 2.5', 'At the IFSP meeting closest to age 2', '120 days before turning 3', '90 days before turning 3'],
            correctIndex: 1,
            explanation: 'Start transition planning at the IFSP meeting closest to the child\'s 2nd birthday. This gives you roughly a year to prepare - transition is a process, not an event.',
          },
          {
            question: 'What happens to EI services when a child turns 3?',
            options: ['Services continue for 6 more months', 'Services automatically transfer to CPSE', 'Services end completely on the birthday', 'Services continue until CPSE starts'],
            correctIndex: 2,
            explanation: 'EI services end the day a child turns 3. There is no extension, no exception, no grace period. If transition planning wasn\'t done, the child may have a gap in services.',
          },
          {
            question: 'How many days before a child turns 3 must CPSE be notified?',
            options: ['60 days', '90 days', '120 days', '180 days'],
            correctIndex: 2,
            explanation: 'You must notify CPSE at least 120 days before the child\'s third birthday. Missing this deadline can create a gap where the child ages out of EI but isn\'t enrolled in CPSE.',
          },
        ],
      },
      {
        id: 'insurance-billing',
        title: 'Following the Money',
        subtitle: 'Insurance, Billing, and Why It Matters',
        duration: '3 min',
        icon: 'credit-card',
        lede: 'Families never pay for Early Intervention. But someone does. Understanding the billing flow helps you understand why insurance collection isn\'t bureaucratic busywork - it\'s what keeps the program financially viable.',
        narrative: `EI services are billed in a specific cascade:

1. **Private insurance** is billed first
2. **Medicaid** covers what private insurance doesn't
3. **State funds** fill remaining gaps

When insurance information is missing or incorrect, claims get denied. Denied claims don't just disappear - they either get resubmitted (creating administrative burden) or written off (reducing program funding).

**The Family's Perspective**

Many families are understandably nervous about providing insurance information. They've had experiences where "we'll bill your insurance" meant surprise bills arriving months later.

Be clear: **There is no cost to families for EI services.** Period. No copays. No deductibles. No bills. Insurance companies cannot raise premiums or cancel coverage because of EI billing. This is protected by law.

**What You Need to Collect**

- Primary insurance card (front and back)
- Medicaid card if applicable
- Policy holder information

Upload these to EI-Hub. If information changes (new job, new insurance), update the system.

**When There's No Insurance**

Not every family has insurance. That's okay - the child still receives services. Document "no insurance" clearly in EI-Hub so the billing team knows to process the claim correctly.`,
        pullQuote: 'There is no cost to families for EI services. No copays. No deductibles. No bills. This is protected by law.',
        keyInsight: 'Insurance collection isn\'t paperwork for its own sake - it\'s what keeps the EI program funded so the next child can receive services.',
        checklist: [
          { text: 'Collect insurance information at first family meeting', critical: true },
          { text: 'Upload copies of insurance cards (front and back) to EI-Hub' },
          { text: 'Verify Medicaid eligibility' },
          { text: 'Document clearly if family has no insurance' },
          { text: 'Reassure family that EI is free to them' },
          { text: 'Update insurance information when it changes' },
        ],
        policyRefs: [
          { policy: 'Policy 3-A', page: 60, description: 'Insurance collection requirements' },
        ],
        proTips: [
          'If a family hesitates to share insurance info, acknowledge their concern, then clearly explain the no-cost protection.',
          'Check for Medicaid even if the family has private insurance. Many families are eligible for both.',
          'Ask about insurance changes at every periodic review. Job changes and life changes often bring new coverage.',
        ],
        quiz: [
          {
            question: 'What is the billing order for EI services?',
            options: ['State funds first, then Medicaid, then private insurance', 'Private insurance first, then Medicaid, then state funds', 'Medicaid first, then private insurance, then state funds', 'State funds cover everything'],
            correctIndex: 1,
            explanation: 'EI services are billed in a specific cascade: private insurance first, then Medicaid covers what private insurance doesn\'t, then state funds fill remaining gaps.',
          },
          {
            question: 'A family has no insurance. What happens?',
            options: ['The child cannot receive EI services', 'The family must pay out of pocket', 'The child receives services and state funds cover the cost', 'Services are delayed until insurance is obtained'],
            correctIndex: 2,
            explanation: 'Not every family has insurance, and that\'s okay - the child still receives services. Document "no insurance" clearly in EI-Hub so billing is processed correctly.',
          },
          {
            question: 'Why is accurate insurance collection important?',
            options: ['To bill families correctly', 'To ensure the EI program remains financially sustainable', 'To determine service eligibility', 'To report to federal agencies'],
            correctIndex: 1,
            explanation: 'When insurance information is missing or incorrect, claims get denied. This creates administrative burden and reduces program funding, affecting the ability to serve future children.',
          },
        ],
      },
    ],
  },
  {
    id: 'provider',
    title: 'Service Providers',
    description: 'For Evaluators, Physical Therapists, Occupational Therapists, Speech Therapists, and Special Instructors',
    tagline: 'You deliver the services that change children\'s lives',
    icon: 'heart',
    color: 'teal',
    modules: [
      {
        id: 'timelines',
        title: 'Deadlines That Define Quality',
        subtitle: 'The Timelines Every Provider Must Know',
        duration: '4 min',
        icon: 'clock',
        lede: 'Every timeline in Early Intervention exists because research shows that faster service delivery leads to better outcomes. When you meet deadlines, you\'re not just staying compliant - you\'re maximizing the developmental window where intervention makes the biggest difference.',
        narrative: `As a provider, you're working within a system that's obsessed with speed for good reason. The brain develops rapidly in the first three years of life. Every week of delay is a week of development that could have been supported.

**The 30-Day Evaluation Clock**

When you're part of an MDE team, the evaluation must be completed and submitted within 30 calendar days of the child's referral. Not 30 days from when you were assigned - 30 days from the original referral date. This means the clock may already be running when you get the case.

**The Make-Up Window**

When a session is cancelled - by you or by the family - you have 2 weeks to deliver a make-up session. Not to schedule it. To deliver it. This means you need flexibility in your schedule to accommodate make-ups.

**Prescription Expiration**

If you provide PT, OT, or Nursing services, you work under a prescription (script). Prescriptions don't last forever. When the service authorization changes (different frequency, different duration) or at the Annual IFSP, you need a new script. Track expiration dates.

**Progress Notes**

Session notes must be submitted within the timeframe specified by your agency. Don't let documentation pile up - it creates risk if notes are needed for an audit or due process.`,
        pullQuote: 'Every week of delay is a week of development that could have been supported.',
        keyInsight: 'Build make-up capacity into your schedule from the start. If you\'re fully booked with no flexibility, you\'ll fail the 2-week make-up window every time.',
        checklist: [
          { text: 'Complete MDE evaluations within 30 days of referral', critical: true },
          { text: 'Begin services as soon as possible after IFSP is signed' },
          { text: 'Deliver make-up sessions within 2 weeks of missed session', critical: true },
          { text: 'Submit progress notes within required timeframe' },
          { text: 'Track prescription expiration dates and renew before they lapse', critical: true },
        ],
        policyRefs: [
          { policy: 'Policy 4-A', page: 109, description: 'Evaluation timeline requirements' },
          { policy: 'Policy 6-A', page: 253, description: 'Service delivery standards' },
        ],
        proTips: [
          'When you receive an evaluation assignment, immediately check when the referral date was. Calculate your actual remaining time.',
          'Keep a running list of prescription expiration dates. Review it monthly.',
          'Communicate with the Service Coordinator the moment you see a timeline at risk. They may be able to help.',
        ],
        quiz: [
          {
            question: 'The 30-day evaluation clock starts from:',
            options: ['When you receive the assignment', 'The child\'s referral date', 'When you first meet the family', 'When the IFSP meeting is scheduled'],
            correctIndex: 1,
            explanation: 'The 30-day clock runs from the original referral date, not when you were assigned. The clock may already be running when you get the case.',
          },
          {
            question: 'How long do you have to deliver a make-up session after a cancellation?',
            options: ['1 week', '2 weeks', '30 days', 'By the next billing cycle'],
            correctIndex: 1,
            explanation: 'You have 2 weeks to deliver (not just schedule) a make-up session. This means you need flexibility in your schedule to accommodate make-ups.',
          },
          {
            question: 'When do PT/OT/Nursing prescriptions need to be renewed?',
            options: ['Every 6 months', 'Only at the Annual IFSP', 'When service authorization changes or at Annual IFSP', 'Only when the physician requests it'],
            correctIndex: 2,
            explanation: 'Prescriptions need renewal when service frequency or duration changes, or at the Annual IFSP. Track expiration dates carefully.',
          },
        ],
      },
      {
        id: 'evaluation-requirements',
        title: 'The MDE Revolution',
        subtitle: 'Major Changes You Must Understand',
        duration: '5 min',
        icon: 'search',
        lede: 'September 1, 2024 changed everything about how initial evaluations work. If you\'re still operating under the old rules, you\'re making unbillable mistakes. The new policy is clear: no supplemental evaluations during the initial MDE.',
        narrative: `Before the policy change, it was common to have an MDE team evaluate a child, identify a speech delay, and then bring in a separate speech pathologist for a supplemental evaluation. That practice is now explicitly prohibited.

**The New Rule**

The MDE team must assess all 5 developmental domains:
- Cognitive development
- Physical development (including vision and hearing)
- Communication development
- Social-emotional development
- Adaptive development

If your MDE team can't assess a domain, you need a team that can. You cannot fill gaps with supplemental evaluations as part of the initial MDE process.

**The One Exception**

Supplemental audiological evaluation is permitted during the MDE if needed. That's it. No other supplementals.

**After the MDE**

Once the initial MDE is complete and the child is found eligible, supplemental evaluations CAN be requested if the IFSP team determines they're needed. The prohibition is specifically about the initial MDE process.

**Why This Changed**

The State found that supplemental evaluations were being used too liberally, adding cost and delay to the process without always adding clinical value. The new rule pushes MDE teams to be comprehensive from the start.`,
        pullQuote: 'If you conduct a supplemental evaluation as part of the initial MDE, you will not be reimbursed. Period.',
        keyInsight: 'The rule change isn\'t about limiting evaluation - it\'s about ensuring MDE teams are comprehensive from the start rather than piecemealing assessments together.',
        checklist: [
          { text: 'Ensure your MDE team can assess all 5 developmental domains', critical: true },
          { text: 'Do NOT conduct supplemental evaluations as part of initial MDE', critical: true },
          { text: 'Only audiological supplemental is permitted during MDE' },
          { text: 'Obtain prescription BEFORE conducting PT, OT, or Nursing evaluation', critical: true },
          { text: 'For speech with feeding concerns, obtain medical clearance first' },
          { text: 'Submit completed evaluation to Regional Office within 30 days' },
        ],
        policyRefs: [
          { policy: 'Policy 4-A', page: 109, description: 'MDE requirements and prohibited practices' },
          { policy: 'Policy 4-B', page: 115, description: 'Supplemental evaluation rules' },
        ],
        proTips: [
          'Before accepting an MDE assignment, verify your team\'s composition can cover all 5 domains.',
          'If you can\'t fully assess a domain, document exactly why (child was sick, couldn\'t complete tasks, etc.) rather than leaving it blank.',
          'Remember: supplemental evaluations ARE allowed after the initial MDE, just not during it.',
        ],
        quiz: [
          {
            question: 'What changed about supplemental evaluations as of September 1, 2024?',
            options: ['They became more common', 'They are now prohibited during the initial MDE', 'They require additional authorization', 'They must be completed within 15 days'],
            correctIndex: 1,
            explanation: 'No supplemental evaluations are permitted during the initial MDE process (except audiological). The MDE team must be comprehensive enough to assess all 5 developmental domains.',
          },
          {
            question: 'How many developmental domains must the MDE team assess?',
            options: ['3 domains', '4 domains', '5 domains', 'Depends on the child\'s needs'],
            correctIndex: 2,
            explanation: 'The MDE must assess all 5 domains: cognitive, physical (including vision/hearing), communication, social-emotional, and adaptive development.',
          },
          {
            question: 'What is the ONLY type of supplemental evaluation permitted during the initial MDE?',
            options: ['Speech evaluation', 'PT evaluation', 'Audiological evaluation', 'Psychological evaluation'],
            correctIndex: 2,
            explanation: 'Supplemental audiological evaluation is the only exception permitted during the initial MDE. No other supplementals are allowed until after eligibility is determined.',
          },
        ],
      },
      {
        id: 'prescriptions',
        title: 'The Script Is Your License',
        subtitle: 'Prescription Requirements That Protect You',
        duration: '4 min',
        icon: 'file-plus',
        lede: 'No script, no payment. It\'s that simple. If you provide PT, OT, or Nursing services without a valid prescription, you\'ve worked for free - and possibly exposed yourself to liability. The script isn\'t bureaucracy; it\'s what authorizes your clinical work.',
        narrative: `A prescription for EI services must come from a physician or Nurse Practitioner. It must be specific and current. And without it, your services are not authorized.

**What the Script Must Include**

- Child's name and date of birth
- Diagnosis or reason for services
- Type of service recommended (PT, OT, Nursing)
- Frequency and duration (e.g., "OT 2x/week for 60 minutes")
- Physician/NP signature and date

**When You Need a New Script**

- Before you start services (obviously)
- When service frequency or duration changes
- At the Annual IFSP review
- When the original script expires (check the date)

**Who Gets the Script?**

Typically, the Service Coordinator works with the family and physician to obtain prescriptions. But you should verify that a valid script exists before you provide services. If there's no script, don't start. Escalate to the SC.

**Speech and Feeding**

Speech therapy doesn't require a prescription unless there's a feeding component. If you'll be working on oral motor skills, swallowing, or feeding issues, you need medical clearance first. A child with undiagnosed dysphagia is a safety risk.`,
        pullQuote: 'If you provide PT, OT, or Nursing services without a valid prescription, you\'ve worked for free.',
        keyInsight: 'Think of the prescription as your clinical license for that specific child. Without it, you\'re not authorized to provide services, regardless of what the IFSP says.',
        checklist: [
          { text: 'Verify valid script exists BEFORE providing PT, OT, or Nursing services', critical: true },
          { text: 'Confirm script includes child name, DOB, diagnosis, service type, frequency' },
          { text: 'Verify script is signed and dated by physician or NP' },
          { text: 'Obtain new script when frequency or duration changes', critical: true },
          { text: 'Obtain new script at Annual IFSP review', critical: true },
          { text: 'Keep copy of current script in your records' },
          { text: 'For speech with feeding component, obtain medical clearance', critical: true },
        ],
        policyRefs: [
          { policy: 'Policy 6-C', page: 263, description: 'Prescription requirements for services' },
        ],
        proTips: [
          'Create a script tracking spreadsheet. For each child, track service type, script date, expiration, and when you need to request renewal.',
          'If the SC hasn\'t provided a script and the IFSP is about to start, advocate loudly. Don\'t let timeline pressure push you into unbillable work.',
          'Prescriptions from out-of-state physicians may have different requirements. When in doubt, verify with your agency.',
        ],
        quiz: [
          {
            question: 'Which services require a prescription before you can provide them?',
            options: ['All EI services', 'PT, OT, and Nursing', 'Only PT and OT', 'Only services over 30 minutes'],
            correctIndex: 1,
            explanation: 'PT, OT, and Nursing services require a valid prescription from a physician or Nurse Practitioner. Speech therapy only requires medical clearance if there\'s a feeding component.',
          },
          {
            question: 'What happens if you provide PT services without a valid prescription?',
            options: ['You get a warning', 'The service is billable but flagged', 'The service is not billable and you worked for free', 'The prescription can be obtained later'],
            correctIndex: 2,
            explanation: 'No script, no payment. Services provided without a valid prescription are not authorized and cannot be billed. You\'ve worked for free and may have liability exposure.',
          },
          {
            question: 'When does speech therapy require medical clearance?',
            options: ['Always', 'Never - speech doesn\'t need prescriptions', 'When there\'s a feeding component', 'Only for children under 12 months'],
            correctIndex: 2,
            explanation: 'Speech therapy doesn\'t require a prescription unless there\'s a feeding component. Working on oral motor skills, swallowing, or feeding requires medical clearance first.',
          },
        ],
      },
      {
        id: 'telehealth',
        title: 'Telehealth Is the Exception',
        subtitle: 'Understanding When Remote Services Are Permitted',
        duration: '3 min',
        icon: 'video',
        lede: 'In-person, in the child\'s natural environment - that\'s the gold standard for Early Intervention. Telehealth is not a convenience option you can choose because it fits your schedule better. It\'s a backup for specific, documentable circumstances.',
        narrative: `The pandemic normalized video calls for everything. But EI services are designed to happen where children live and learn - their homes, their daycares, their daily environments. Telehealth removes providers from that natural context.

**When Telehealth Is Allowed**

1. **The family requests it.** If a family prefers telehealth, document their request and provide services remotely.

2. **Complex medical needs.** Some children have medical conditions that make in-home visits risky (immunocompromised, infectious conditions, etc.).

3. **No in-person provider available.** If there's no provider who can serve the child in person - particularly for bilingual services in less common languages - telehealth may be the only way to deliver services.

**When Telehealth Is NOT Allowed**

- Provider convenience
- Traffic or distance concerns
- General preference for remote work
- "We've always done it this way since COVID"

**Documentation Is Key**

If you're providing telehealth, your session note must document WHY. "Family request" or "No bilingual provider available in borough" - something specific. Notes without justification will be questioned in audits.

**When Circumstances Change**

If the justification for telehealth no longer applies (family moves closer to a provider, medical condition resolves), transition back to in-person services.`,
        pullQuote: 'Telehealth is not a convenience option you can choose because it fits your schedule better.',
        keyInsight: 'Always ask yourself: "If an auditor asked why this session was telehealth, what would I say?" If you don\'t have a compliant answer, provide services in person.',
        checklist: [
          { text: 'Verify telehealth is justified before providing remote services', critical: true },
          { text: 'Document specific reason for telehealth in every session note' },
          { text: 'Confirm family has adequate technology (device, internet, space)' },
          { text: 'Transition to in-person when telehealth justification no longer applies' },
          { text: 'Follow all standard documentation requirements for telehealth sessions' },
        ],
        policyRefs: [
          { policy: 'Policy 6-B', page: 258, description: 'Telehealth service delivery requirements' },
        ],
        proTips: [
          'If a family requests telehealth, get the request in writing (even an email) and keep it with your documentation.',
          'Hybrid approaches (some telehealth, some in-person) can work when justified. Not every session needs the same modality.',
          'Technology fails. Have a backup plan for when video calls don\'t work.',
        ],
        quiz: [
          {
            question: 'Which of the following is a valid reason for providing telehealth instead of in-person services?',
            options: ['Provider prefers working from home', 'Traffic was heavy that day', 'Family requested telehealth', 'It\'s more efficient for the provider'],
            correctIndex: 2,
            explanation: 'Valid telehealth justifications include: family request, complex medical needs, or no in-person provider available. Provider convenience is never a valid reason.',
          },
          {
            question: 'What must be documented in every telehealth session note?',
            options: ['Nothing extra - same as in-person notes', 'The specific reason why telehealth was used', 'The technology platform used', 'The family\'s internet speed'],
            correctIndex: 1,
            explanation: 'Every telehealth session note must document WHY telehealth was used. Notes without justification will be questioned in audits.',
          },
          {
            question: 'What is the gold standard for EI service delivery?',
            options: ['Telehealth for efficiency', 'In-person, in the child\'s natural environment', 'Clinic-based services', 'Whatever the family prefers'],
            correctIndex: 1,
            explanation: 'EI services are designed to happen where children live and learn - their homes, daycares, and daily environments. Telehealth is an exception, not the default.',
          },
        ],
      },
      {
        id: 'session-notes',
        title: 'No Signature, No Payment',
        subtitle: 'Documentation That Actually Gets Reimbursed',
        duration: '5 min',
        icon: 'edit',
        lede: 'The single most common reason for claim denials in EI audits? Missing parent signatures on session notes. You can provide excellent therapy, help a child make real progress, and still not get paid because the documentation wasn\'t complete.',
        narrative: `Session notes serve multiple purposes:
- Clinical record of what happened in the session
- Evidence for billing that services were provided
- Legal documentation if questions arise later
- Communication tool for the IFSP team

**What Every Session Note Must Include**

- Date of session
- Start and end time
- Location (home, daycare, telehealth)
- Who was present
- Activities performed
- Child's response and progress toward IFSP outcomes
- Parent/caregiver signature

**The Signature Requirement**

This is non-negotiable. The parent or caregiver present at the session must sign the note. Not sign later. Not sign a stack of notes at the end of the month. Sign that day, that session.

Electronic signatures are acceptable if your agency's system supports them. But "I'll get it next time" is not acceptable.

**What If Parent Isn't There?**

If the parent/guardian wasn't present (child is at daycare, for example), document who WAS present (daycare teacher, grandmother, etc.) and why the parent was absent. You may need that person's signature instead, depending on your agency's policy.

**The Service Log**

In addition to individual session notes, maintain a Service Log - a running record of all sessions delivered. This log must also be signed by the parent periodically.

**Cancellation Documentation**

Cancelled sessions need documentation too. Note the date, who cancelled (provider or family), and why. Cancelled sessions that aren't documented are invisible sessions - and invisible sessions can't be made up on paper.`,
        pullQuote: 'The single most common reason for claim denials in EI audits? Missing parent signatures.',
        keyInsight: 'Get the signature before you leave. Every time. No exceptions. The note isn\'t complete until it\'s signed.',
        checklist: [
          { text: 'Write a session note for EVERY session including cancellations', critical: true },
          { text: 'Obtain parent/caregiver signature on EVERY session note', critical: true },
          { text: 'Include date, start/end time, location, attendees, activities' },
          { text: 'Document child\'s response and progress toward IFSP outcomes' },
          { text: 'Maintain Service Log with periodic parent signature', critical: true },
          { text: 'Submit notes within required timeframe' },
          { text: 'Document cancellations with date, who cancelled, and reason' },
        ],
        policyRefs: [
          { policy: 'Policy 6-A', page: 253, description: 'Session documentation requirements' },
          { policy: 'Policy 6-D', page: 268, description: 'Service log requirements' },
        ],
        proTips: [
          'Build signature collection into your session ending ritual. Pack up, review progress with parent, get signature, leave.',
          'If you\'re doing telehealth, have a system for electronic signatures. Verbal "yes I approve" is not a signature.',
          'Don\'t let notes pile up. Write them the same day while the session is fresh.',
        ],
        quiz: [
          {
            question: 'What is the single most common reason for claim denials in EI audits?',
            options: ['Missing prescriptions', 'Incorrect billing codes', 'Missing parent signatures on session notes', 'Late submissions'],
            correctIndex: 2,
            explanation: 'Missing parent signatures are the most common audit finding. The parent or caregiver must sign the session note that day, that session - not later, not in a batch.',
          },
          {
            question: 'What elements must EVERY session note include?',
            options: ['Just the date and activities', 'Date, time, location, attendees, activities, progress, and parent signature', 'Activities and parent signature only', 'Date and progress notes'],
            correctIndex: 1,
            explanation: 'Complete session notes include: date, start/end time, location, who was present, activities performed, child\'s response/progress toward IFSP outcomes, and parent signature.',
          },
          {
            question: 'Do cancelled sessions need documentation?',
            options: ['No - only completed sessions need notes', 'Yes - note the date, who cancelled, and why', 'Only if the provider cancelled', 'Only if there were 3+ cancellations'],
            correctIndex: 1,
            explanation: 'Cancelled sessions need documentation too. Note the date, who cancelled (provider or family), and why. Undocumented cancellations are invisible and can\'t be properly tracked.',
          },
        ],
      },
      {
        id: 'makeup-sessions',
        title: 'Making Good on Missed Sessions',
        subtitle: 'The 2-Week Rule for Cancellations',
        duration: '3 min',
        icon: 'refresh-cw',
        lede: 'When a session doesn\'t happen, a child misses out on development support they\'re entitled to receive. The 2-week make-up window isn\'t about paperwork - it\'s about making sure children get the services their IFSP promises.',
        narrative: `Sessions get cancelled. Providers get sick. Children get sick. Families have emergencies. Weather happens. The question isn't whether cancellations will occur - it's how you respond when they do.

**The Rule**

When a session is missed, you must offer AND deliver a make-up within 2 weeks of the original missed session. This means:
- If Tuesday's session is cancelled, the make-up must be delivered by 2 weeks from that Tuesday
- "Offered" alone isn't enough - the make-up must actually happen
- If the family declines multiple make-up offers, document each declination

**What Gets Cancelled**

Track who initiated the cancellation:
- **Provider cancellation:** You were sick, had a conflict, couldn't make it
- **Family cancellation:** They weren't home, child was sick, conflict

Both types require make-ups, but tracking who cancelled helps identify patterns.

**The Stacking Problem**

Don't stack multiple make-ups in a single day unless clinically appropriate. A child who normally gets 30-minute speech sessions twice a week shouldn't receive two 30-minute sessions back-to-back. That's not good therapy - that's administratively convenient therapy.

**When Families Keep Cancelling**

If a family repeatedly cancels and declines make-ups, this is information the Service Coordinator needs. There may be underlying issues (transportation, work schedule, discomfort with services) that need to be addressed.`,
        pullQuote: 'Children are entitled to all IFSP-authorized sessions. Failure to provide make-ups shortchanges the child.',
        keyInsight: 'Build make-up capacity into your schedule from day one. If you\'re fully booked, you\'re set up to fail the 2-week window.',
        checklist: [
          { text: 'Document all cancellations with date, who cancelled, and reason' },
          { text: 'Offer make-up session to family immediately', critical: true },
          { text: 'Deliver make-up within 2 weeks of original missed session', critical: true },
          { text: 'Document make-up offer and family response' },
          { text: 'If family declines, document the declination' },
          { text: 'Avoid stacking multiple sessions inappropriately' },
          { text: 'Alert Service Coordinator if family repeatedly misses/declines' },
        ],
        policyRefs: [
          { policy: 'Policy 6-E', page: 274, description: 'Make-up session requirements' },
        ],
        proTips: [
          'Keep 1-2 "make-up slots" open each week specifically for rescheduling. Don\'t fill every hour.',
          'When you cancel, immediately propose alternative times. Don\'t leave the make-up scheduling to later.',
          'If patterns emerge (every Tuesday gets cancelled), discuss schedule changes with the SC and family.',
        ],
        quiz: [
          {
            question: 'Within what timeframe must a make-up session be DELIVERED (not just scheduled)?',
            options: ['1 week', '2 weeks', '30 days', 'Before the next billing cycle'],
            correctIndex: 1,
            explanation: 'Make-up sessions must be delivered within 2 weeks of the original missed session. "Offered" alone isn\'t enough - the make-up must actually happen.',
          },
          {
            question: 'Why is tracking who initiated each cancellation important?',
            options: ['For billing purposes only', 'To assign blame', 'To identify patterns that may indicate underlying issues', 'It\'s not important'],
            correctIndex: 2,
            explanation: 'Tracking whether provider or family cancelled helps identify patterns. Frequent family cancellations may indicate underlying issues (transportation, schedule, discomfort) that need addressing.',
          },
          {
            question: 'Is it acceptable to stack two make-up sessions back-to-back in one day?',
            options: ['Yes, always', 'Yes, if the family agrees', 'Only if clinically appropriate for the child', 'Never'],
            correctIndex: 2,
            explanation: 'Don\'t stack make-ups unless clinically appropriate. A child who normally gets 30-minute sessions twice a week shouldn\'t receive back-to-back sessions - that\'s administratively convenient but not good therapy.',
          },
        ],
      },
      {
        id: 'billing-compliance',
        title: 'Getting Paid for What You Do',
        subtitle: 'The Elements of a Billable Session',
        duration: '4 min',
        icon: 'check-circle',
        lede: 'Every element of compliance we\'ve discussed converges here. Timeline? Check. Prescription? Check. Session note? Check. Signature? Check. Miss any one element, and that session you worked hard to deliver becomes unbillable.',
        narrative: `Billing isn't just an administrative afterthought - it's the verification that you did everything right. A billable session is proof that all the pieces came together.

**The Billing Checklist**

Before a session can be billed, verify:

1. **IFSP Authorization:** Is this service currently authorized on a valid IFSP? Services delivered before the IFSP is signed or after it expires are not billable.

2. **Prescription (for PT/OT/Nursing):** Is there a current, valid script? Check the date. Check that it covers the current frequency.

3. **Session Note:** Is the note complete with all required elements? Date, time, location, activities, progress, attendees?

4. **Parent Signature:** Did the parent/caregiver sign the session note? This is the piece that gets missed most often.

5. **Telehealth Justification:** If the session was telehealth, is the reason documented?

**What Happens in an Audit**

Auditors will pull random sessions and verify each element. One missing piece = claim denied = payment recouped. For sessions already paid, your agency may have to return the money.

**The Bigger Picture**

When you get billing right, several things happen:
- You get paid
- Your agency stays financially healthy
- The EI program stays funded
- Future children can receive services

When you get billing wrong repeatedly, the consequences compound.`,
        pullQuote: 'Billing isn\'t just administrative - it\'s verification that you did everything right.',
        keyInsight: 'Before you bill, run through the checklist: IFSP, prescription, note, signature, telehealth justification. Missing any one means starting over.',
        checklist: [
          { text: 'Verify service is currently authorized on valid IFSP', critical: true },
          { text: 'Confirm prescription is valid (PT, OT, Nursing)', critical: true },
          { text: 'Complete session note with all required elements' },
          { text: 'Obtain parent/caregiver signature', critical: true },
          { text: 'Document telehealth justification if applicable' },
          { text: 'Submit billing within required timeframe' },
          { text: 'Do NOT bill for cancelled sessions without make-ups' },
        ],
        policyRefs: [
          { policy: 'Policy 6-A', page: 253, description: 'Billable session requirements' },
          { policy: 'Policy 6-C', page: 263, description: 'Prescription requirements' },
        ],
        proTips: [
          'Create a personal pre-billing checklist. Before submitting each session, verify every element.',
          'If you\'re unsure whether something is billable, ask your supervisor BEFORE providing the service.',
          'Keep your own records organized. Audits can look back several years. You need to be able to find documentation from 2022 if asked.',
        ],
        quiz: [
          {
            question: 'Before billing a PT session, which elements must ALL be in place?',
            options: ['Just the session note and signature', 'IFSP authorization, valid prescription, complete session note, and parent signature', 'IFSP authorization and session note only', 'Prescription and progress notes'],
            correctIndex: 1,
            explanation: 'A billable session requires: current IFSP authorization, valid prescription (for PT/OT/Nursing), complete session note with all elements, and parent signature. Missing any one makes the session unbillable.',
          },
          {
            question: 'What happens during an EI audit if documentation is incomplete?',
            options: ['You get a warning', 'Claim is denied and payment may be recouped', 'You can submit the missing documentation', 'Nothing - audits are just reviews'],
            correctIndex: 1,
            explanation: 'Auditors verify each element. One missing piece = claim denied = payment recouped. For sessions already paid, your agency may have to return the money.',
          },
          {
            question: 'Can you bill for a session provided before the IFSP is signed?',
            options: ['Yes, if the family verbally agreed', 'Yes, as long as you document it', 'No - services before IFSP signing are not billable', 'Yes, with supervisor approval'],
            correctIndex: 2,
            explanation: 'Services delivered before the IFSP is signed are not billable. The IFSP must be signed and current for services to be authorized and billable.',
          },
        ],
      },
    ],
  },
];

// Quick reference content for printable cards
export const quickReference = {
  criticalTimelines: [
    { event: 'ISC contacts family', deadline: '2 business days', from: 'ISC assignment' },
    { event: 'ISC meets family in person', deadline: '7 calendar days', from: 'ISC assignment' },
    { event: 'MDE completed & submitted', deadline: '30 calendar days', from: 'Referral date' },
    { event: 'Initial IFSP meeting held', deadline: '45 calendar days', from: 'Referral date' },
    { event: 'Make-up session delivered', deadline: '2 weeks', from: 'Missed session date' },
    { event: 'CPSE notification sent', deadline: '120 days before', from: 'Child turns 3' },
  ],
  keyForms: [
    { name: 'Reason for Delay Form', use: 'When ANY timeline will be missed - file BEFORE deadline' },
    { name: 'Session Note', use: 'Every session (including cancellations) - must have parent signature' },
    { name: 'Service Log', use: 'Ongoing tracking of all sessions - requires periodic parent signature' },
    { name: 'Foster Care Packet', use: 'Any child in foster care or known to ACS - never use standard forms' },
    { name: 'Consent to Release', use: 'Before sharing information with evaluation agency' },
    { name: 'Prescription/Script', use: 'Required for PT, OT, Nursing services - must be current' },
  ],
  commonMistakes: [
    'Missing parent signature on session notes (most common audit finding)',
    'Providing telehealth without documented justification',
    'Providing PT/OT/Nursing without valid, current prescription',
    'Allowing foster parent to sign consent without verifying legal authority',
    'Filing Reason for Delay form AFTER the deadline has passed',
    'Conducting supplemental evaluations during initial MDE (prohibited since Sept 2024)',
    'Missing the 120-day CPSE notification deadline for transition',
  ],
  glossary: [
    { term: 'EI', definition: 'Early Intervention - A system of services for infants and toddlers with developmental delays or disabilities, from birth to age 3.' },
    { term: 'IFSP', definition: 'Individualized Family Service Plan - The legal document that authorizes and outlines all EI services for a child and family.' },
    { term: 'MDE', definition: 'Multidisciplinary Evaluation - A comprehensive assessment of a child\'s development across all 5 domains, conducted by a team of qualified evaluators.' },
    { term: 'ISC', definition: 'Initial Service Coordinator - The coordinator assigned to a family from referral through the initial IFSP meeting.' },
    { term: 'OSC', definition: 'Ongoing Service Coordinator - The coordinator who works with the family after the initial IFSP, managing services and reviews.' },
    { term: 'CPSE', definition: 'Committee on Preschool Special Education - The school district committee that provides services for children ages 3-5 after they age out of EI.' },
    { term: 'PT', definition: 'Physical Therapy - Services addressing gross motor skills, balance, coordination, and mobility.' },
    { term: 'OT', definition: 'Occupational Therapy - Services addressing fine motor skills, self-help skills, and sensory processing.' },
    { term: 'SLP', definition: 'Speech-Language Pathology - Services addressing communication, language development, and feeding/swallowing.' },
    { term: 'SI', definition: 'Special Instruction - Developmental services provided by a special educator to support overall development.' },
    { term: 'ACS', definition: 'Administration for Children\'s Services - NYC agency responsible for child welfare and foster care.' },
    { term: 'EI-Hub', definition: 'The electronic system used to manage EI cases, documentation, and billing in NYC.' },
    { term: 'Script', definition: 'Prescription - A written order from a physician or nurse practitioner required for PT, OT, and Nursing services.' },
    { term: 'Natural Environment', definition: 'The settings where a child naturally spends time (home, daycare, community) where EI services should be provided.' },
    { term: 'Surrogate Parent', definition: 'A person appointed by the Regional Office to make educational decisions for a child in foster care when no parent or guardian has authority.' },
  ],
  policyJumpPoints: [
    { label: 'Referral Procedures', page: 3, policy: 'Policy 1-A' },
    { label: 'Surrogate Parent', page: 24, policy: 'Policy 2-A' },
    { label: 'Foster Care Info Release', page: 41, policy: 'Policy 2-B' },
    { label: 'ISC Responsibilities', page: 60, policy: 'Policy 3-A' },
    { label: 'Evaluation Requirements', page: 109, policy: 'Policy 4-A' },
    { label: 'IFSP Development', page: 196, policy: 'Policy 5-A' },
    { label: 'IFSP Content', page: 198, policy: 'Policy 5-B' },
    { label: 'IFSP Meeting Procedures', page: 201, policy: 'Policy 5-C' },
    { label: 'Service Delivery', page: 253, policy: 'Policy 6-A' },
    { label: 'Telehealth Services', page: 258, policy: 'Policy 6-B' },
    { label: 'Prescription Requirements', page: 263, policy: 'Policy 6-C' },
    { label: 'Service Log', page: 268, policy: 'Policy 6-D' },
    { label: 'Make-up Sessions', page: 274, policy: 'Policy 6-E' },
    { label: 'Transition Planning', page: 445, policy: 'Policy 10-A' },
    { label: 'CPSE Notification', page: 458, policy: 'Policy 10-B' },
  ],
};

export function getTrack(role: Role): Track | undefined {
  return tracks.find(t => t.id === role);
}

export function getModule(role: Role, moduleId: string): Module | undefined {
  const track = getTrack(role);
  return track?.modules.find(m => m.id === moduleId);
}
