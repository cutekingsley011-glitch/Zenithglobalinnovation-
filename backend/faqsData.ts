export type FaqContext = 'all' | 'seekers' | 'careers' | 'track' | 'contact' | 'clients' | 'home';

export type FaqCategory =
  | 'Application Process'
  | 'Compensation & Contracts'
  | 'Tracking & Timelines'
  | 'Global Eligibility'
  | 'Security & Privacy';

export interface FaqAction {
  label: string;
  targetPage: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  contexts: FaqContext[];
  priority: number;
  tags: string[];
  action?: FaqAction;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  'Application Process',
  'Compensation & Contracts',
  'Tracking & Timelines',
  'Global Eligibility',
  'Security & Privacy',
];

export const RECRUITMENT_FAQS: FaqItem[] = [
  {
    id: 'after-apply',
    question: 'What happens after I apply?',
    answer:
      'Immediately after submitting your application, our system records your dossier, sends an automated confirmation email, and assigns a unique tracking reference code (formatted as ZGI-2026-XXXXXX). Our recruitment specialists review your credentials, resume, and role fit within 3–5 business days. Shortlisted candidates advance to structured screening, role-specific assessment, and client interviews—with every milestone updated live in our Application Tracker.',
    category: 'Application Process',
    contexts: ['all', 'seekers', 'careers', 'track', 'contact', 'home'],
    priority: 1,
    tags: ['apply', 'next steps', 'process', 'stages', 'timeline', 'reference', 'after applying'],
    action: { label: 'Track Application Status', targetPage: 'track' },
  },
  {
    id: 'salary-determination',
    question: 'How are salaries determined?',
    answer:
      'Every Zenith Global Innovation role displays transparent USD annual, weekly, and hourly compensation ranges upfront—spanning $65,000 to $285,000 annually depending on role tier and specialization. Final offers are calibrated within the published band based on your seniority, demonstrable impact, technical or leadership track record, interview and assessment performance, and client engagement scope. Select Customer Success & Sales Leadership positions also include commission potential up to $50,000.',
    category: 'Compensation & Contracts',
    contexts: ['all', 'seekers', 'careers', 'contact', 'home'],
    priority: 2,
    tags: ['salary', 'pay', 'compensation', 'rates', 'hourly', 'weekly', 'annual', 'commission', 'offer', 'usd'],
    action: { label: 'Browse All 81 Roles & Salary Bands', targetPage: 'careers' },
  },
  {
    id: 'check-application-status',
    question: 'How do I check my application status?',
    answer:
      'You do not need to email support for routine status updates. Visit our Track Application page and enter your candidate reference code (ZGI-2026-XXXXXX) from your confirmation screen or email. The tracker displays real-time progress across all five recruitment milestones—Application Received, Under Review / Shortlisted, Assessment, Interview / Final Review, and Offer—along with any next-step onboarding instructions.',
    category: 'Tracking & Timelines',
    contexts: ['all', 'track', 'seekers', 'contact'],
    priority: 3,
    tags: ['status', 'track', 'reference code', 'zgi', 'update', 'progress', 'check'],
    action: { label: 'Open Application Tracker', targetPage: 'track' },
  },
  {
    id: 'eligible-countries',
    question: 'Which countries are eligible to apply for remote roles?',
    answer:
      'All 81 published vacancies are 100% remote (telecommute) and open to qualified professionals across 68+ supported countries spanning North America, the United Kingdom, Europe, Africa (including Nigeria, South Africa, Kenya, Ghana, and Egypt), Asia-Pacific, the Middle East, and Latin America. Candidates should be able to collaborate reliably across client time zones and comply with local remote work and tax regulations.',
    category: 'Global Eligibility',
    contexts: ['all', 'seekers', 'careers', 'contact', 'home'],
    priority: 4,
    tags: ['countries', 'remote', 'location', 'nigeria', 'uk', 'us', 'canada', 'india', 'international', 'worldwide', 'telecommute'],
  },
  {
    id: 'zero-applicant-fees',
    question: 'Does Zenith Global Innovation charge any fees to applicants?',
    answer:
      'No. Zenith Global Innovation never charges candidates fees to apply, undergo vetting, access assessments, or participate in interviews. All executive search and remote staffing fees are paid exclusively by our enterprise client organizations. Official correspondence is issued only through our verified portal and zenithglobalinnovationhq@protonmail.com.',
    category: 'Application Process',
    contexts: ['all', 'seekers', 'careers', 'contact', 'home'],
    priority: 5,
    tags: ['fees', 'cost', 'free', 'scam', 'legitimate', 'verified', 'payment', 'charge'],
  },
  {
    id: 'lost-reference-or-email',
    question: 'I did not receive a confirmation email or misplaced my reference code. What should I do?',
    answer:
      'First, check your Spam, Junk, or Promotions folder for an email from Zenith Global Innovation containing your ZGI-2026-XXXXXX tracking code. If you still cannot locate it after 15 minutes, contact us once with your full name, the exact email address used on your application, the job title applied for, and your submission date so our team can retrieve and resend your code in a single reply.',
    category: 'Tracking & Timelines',
    contexts: ['all', 'track', 'contact', 'seekers'],
    priority: 6,
    tags: ['confirmation', 'email', 'missing', 'lost', 'reference', 'spam', 'resend'],
    action: { label: 'Contact Support', targetPage: 'contact' },
  },
  {
    id: 'hiring-timeline',
    question: 'How long does the full recruitment process take from application to offer?',
    answer:
      'Initial credential and resume evaluation is guaranteed within 3–5 business days of submission. For candidates who advance past initial review, role-specific screening, practical or executive assessments, and client interviews typically span 10–15 business days, meaning most placements move from application to formal written offer within 2–3 weeks.',
    category: 'Tracking & Timelines',
    contexts: ['all', 'seekers', 'track', 'careers'],
    priority: 7,
    tags: ['how long', 'timeline', 'days', 'weeks', 'waiting', 'response time', 'review'],
  },
  {
    id: 'full-time-vs-contract',
    question: 'What is the difference between Full-time and Contract roles?',
    answer:
      'Most of our active openings (73 roles across Executive, Technical, Marketing, Finance, Operations, Customer Success, and Support teams) are structured as long-term Full-time remote positions. Specialized Consulting Roles (8 roles) are structured as dedicated remote Contract engagements with defined deliverables and transparent USD annualized/hourly compensation bands. You can filter directly by Full-time or Contract on the Careers page.',
    category: 'Compensation & Contracts',
    contexts: ['all', 'careers', 'seekers'],
    priority: 8,
    tags: ['full-time', 'contract', 'contractor', 'employment type', 'consulting'],
    action: { label: 'Filter Roles by Type', targetPage: 'careers' },
  },
  {
    id: 'multiple-applications',
    question: 'Can I apply for more than one open position?',
    answer:
      'Yes. Inside every job application form, you can optionally select additional roles where your background is a strong fit for multi-role consideration without submitting duplicate resumes. We recommend focusing on the 1–3 roles that best align with your core specialization and seniority so reviewers can evaluate your strongest match accurately.',
    category: 'Application Process',
    contexts: ['all', 'careers', 'seekers'],
    priority: 9,
    tags: ['multiple', 'more than one', 'multi-role', 'duplicate', 'several jobs'],
  },
  {
    id: 'shortlisted-interview-steps',
    question: 'What happens if my status changes to Shortlisted or Interview?',
    answer:
      'When your status updates to Shortlisted or Interview, both your email notification and the Track Application portal display your assigned recruitment channel, recruiter handle, onboarding window, and required reference quote. Always quote your ZGI-2026-XXXXXX reference code when connecting with your assigned recruiter so your file is verified immediately.',
    category: 'Tracking & Timelines',
    contexts: ['all', 'track', 'seekers'],
    priority: 10,
    tags: ['shortlisted', 'interview', 'recruiter', 'channel', 'onboarding', 'screening'],
    action: { label: 'Check Shortlist Instructions', targetPage: 'track' },
  },
  {
    id: 'resume-and-qualifications',
    question: 'What resume formats and academic qualifications are accepted?',
    answer:
      'We accept PDF, DOC, and DOCX resumes up to 10 MB, and you can also attach portfolio or LinkedIn links. Required credentials vary by role tier: executive, engineering, and finance leadership roles typically prefer a bachelor’s degree or equivalent advanced experience, while administrative, entry-level technical, and specialist roles accept OND/HND, diplomas, professional certifications, or strong demonstrable portfolios.',
    category: 'Application Process',
    contexts: ['all', 'seekers', 'careers'],
    priority: 11,
    tags: ['resume', 'cv', 'pdf', 'degree', 'hnd', 'ond', 'qualification', 'diploma', 'experience'],
  },
  {
    id: 'international-payouts',
    question: 'How are international remote salaries paid?',
    answer:
      'Compensation bands are benchmarked in US Dollars (USD) across annual, weekly, and hourly schedules for global transparency. Final payroll cadence, currency disbursement (USD wire, local direct deposit, or international contractor payout), and statutory documentation are finalized directly in your written employment or consulting agreement prior to your start date.',
    category: 'Compensation & Contracts',
    contexts: ['all', 'seekers', 'careers', 'clients'],
    priority: 12,
    tags: ['salary', 'payout', 'currency', 'payroll', 'bank', 'wire', 'international pay', 'usd'],
  },
  {
    id: 'data-privacy-security',
    question: 'How does Zenith protect my resume and personal data?',
    answer:
      'All application submissions and uploaded resumes are encrypted in transit via 256-bit TLS 1.3 and stored with strict role-based access controls limited to authorized recruitment reviewers. We never sell or broker applicant records to third-party advertisers. You may request access, updates, or permanent deletion of your applicant dossier at any time under GDPR, UK GDPR, and CCPA rights.',
    category: 'Security & Privacy',
    contexts: ['all', 'seekers', 'contact', 'track'],
    priority: 13,
    tags: ['privacy', 'security', 'ssl', 'gdpr', 'delete', 'erasure', 'data', 'resume privacy'],
    action: { label: 'Read Privacy Policy', targetPage: 'privacy' },
  },
  {
    id: 'enterprise-client-hiring',
    question: 'How can employers and enterprise clients hire remote talent through Zenith?',
    answer:
      'Organizations seeking pre-vetted remote executives, engineers, analysts, or specialists can submit role requirements through our For Clients page or Contact form. Our New York, London, Singapore, and Toronto teams coordinate role scoping, present vetted candidate shortlists aligned to your timezone and budget, and formalize terms under a Master Services Agreement (MSA).',
    category: 'Global Eligibility',
    contexts: ['all', 'clients', 'contact'],
    priority: 14,
    tags: ['clients', 'employer', 'hire', 'partnership', 'company', 'staffing', 'enterprise'],
    action: { label: 'Explore Employer Partnerships', targetPage: 'clients' },
  },
];

export interface FaqQueryOptions {
  context?: FaqContext;
  category?: string;
  q?: string;
  limit?: number;
}

export function queryFaqs(options: FaqQueryOptions = {}) {
  const ctx: FaqContext = options.context || 'all';
  const cat = (options.category || '').trim();
  const q = (options.q || '').trim().toLowerCase();
  const limit = options.limit && options.limit > 0 ? options.limit : undefined;

  let list = [...RECRUITMENT_FAQS];

  // When searching by keyword, search across ALL FAQs regardless of page context so candidates always find answers
  if (!q && ctx !== 'all') {
    const contextMatched = list.filter(item => item.contexts.includes(ctx));
    if (contextMatched.length > 0) {
      list = contextMatched;
    }
  }

  if (cat && cat.toLowerCase() !== 'all') {
    list = list.filter(item => item.category.toLowerCase() === cat.toLowerCase());
  }

  if (q) {
    const terms = q.split(/\s+/).filter(Boolean);
    list = list.filter(item => {
      const haystack = `${item.question} ${item.answer} ${item.category} ${item.tags.join(' ')}`.toLowerCase();
      return terms.every(t => haystack.includes(t));
    });
  }

  // Sort: context-matching first when searching, then priority ascending
  list.sort((a, b) => {
    if (ctx !== 'all') {
      const aMatch = a.contexts.includes(ctx) ? 0 : 1;
      const bMatch = b.contexts.includes(ctx) ? 0 : 1;
      if (aMatch !== bMatch) return aMatch - bMatch;
    }
    return a.priority - b.priority;
  });

  const filteredCount = list.length;
  const faqs = limit ? list.slice(0, limit) : list;

  return {
    faqs,
    categories: FAQ_CATEGORIES,
    totalCount: RECRUITMENT_FAQS.length,
    filteredCount,
    context: ctx,
    lastUpdated: '2026-11-18',
  };
}
