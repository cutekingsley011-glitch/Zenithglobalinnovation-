import React, { useMemo, useState, useEffect } from 'react';
import { api } from './lib/api';
import AdminDashboard from './AdminDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Globe2,
  Menu,
  Search,
  ShieldCheck,
  Building2,
  Award,
  Clock,
  Mail,
  MapPin,
  X,
  FileText,
  ChevronRight,
  Lock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

type Pay = { annual: string; weekly: string; hourly: string; commission?: string };
type Job = { id: string; title: string; sector: string; location: string; type: string; pay: Pay };
type Detail = {
  focus: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  success: string;
};

const pay: Record<string, Pay> = {
  'Executive & Leadership Positions': { annual: '$125,000 - $285,000', weekly: '$2,400 - $5,480', hourly: '$60 - $137' },
  'Senior Technical Roles': { annual: '$115,000 - $225,000', weekly: '$2,210 - $4,330', hourly: '$55 - $108' },
  'Marketing & Creative Leadership': { annual: '$95,000 - $185,000', weekly: '$1,825 - $3,560', hourly: '$46 - $89' },
  'Finance & Business Intelligence': { annual: '$105,000 - $195,000', weekly: '$2,020 - $3,750', hourly: '$50 - $94' },
  'Operations & HR Leadership': { annual: '$90,000 - $175,000', weekly: '$1,730 - $3,365', hourly: '$43 - $84' },
  'Specialized Consulting Roles': { annual: '$110,000 - $250,000', weekly: '$2,115 - $4,805', hourly: '$53 - $120' },
  'Customer Success & Sales Leadership': { annual: '$85,000 - $180,000', weekly: '$1,635 - $3,460', hourly: '$41 - $87', commission: 'Plus commission potential up to $50,000' },
  'Additional High-Value Roles': { annual: '$95,000 - $190,000', weekly: '$1,825 - $3,650', hourly: '$46 - $91' },
  'Administrative Solutions': { annual: '$65,000 - $95,000', weekly: '$1,250 - $1,825', hourly: '$31 - $46' },
  'Digital Marketing Services': { annual: '$75,000 - $110,000', weekly: '$1,440 - $2,115', hourly: '$36 - $53' },
  'Technical Services': { annual: '$85,000 - $140,000', weekly: '$1,635 - $2,690', hourly: '$41 - $67' },
  'Financial Services': { annual: '$80,000 - $135,000', weekly: '$1,540 - $2,595', hourly: '$38 - $65' }
};

const groups: Record<string, string[]> = {
  'Executive & Leadership Positions': [
    'Chief Technology Officer (CTO)',
    'Chief Marketing Officer (CMO)',
    'Chief Operations Officer (COO)',
    'Director of Digital Transformation',
    'Vice President of Business Development',
    'Senior Project Manager',
    'Product Strategy Lead',
    'Change Management Consultant'
  ],
  'Senior Technical Roles': [
    'Senior Full Stack Developer',
    'Lead Software Architect',
    'Senior DevOps Engineer',
    'Principal Cloud Engineer',
    'Senior Cybersecurity Analyst',
    'Lead Data Scientist',
    'Senior Machine Learning Engineer',
    'Blockchain Solutions Architect',
    'Senior Database Administrator',
    'Principal UX/UI Designer'
  ],
  'Marketing & Creative Leadership': [
    'Senior Digital Marketing Manager',
    'Brand Strategy Director',
    'Senior Content Strategist',
    'Creative Director',
    'Senior SEO Specialist',
    'Marketing Automation Lead',
    'Senior Growth Hacker',
    'E-commerce Strategy Manager'
  ],
  'Finance & Business Intelligence': [
    'Senior Financial Analyst',
    'Business Intelligence Manager',
    'Senior Investment Analyst',
    'Risk Management Consultant',
    'Senior Compliance Officer',
    'Treasury Manager',
    'Financial Planning & Analysis Lead',
    'Senior Tax Consultant'
  ],
  'Operations & HR Leadership': [
    'Senior Operations Manager',
    'Director of Remote Workforce Management',
    'Senior HR Business Partner',
    'Talent Acquisition Lead',
    'Organizational Development Consultant',
    'Senior Learning & Development Specialist',
    'Employee Experience Manager',
    'Workforce Analytics Lead'
  ],
  'Specialized Consulting Roles': [
    'Senior Management Consultant',
    'Digital Transformation Consultant',
    'Process Improvement Specialist',
    'Senior Business Analyst',
    'IT Strategy Consultant',
    'Customer Experience Consultant',
    'Supply Chain Optimization Expert',
    'Senior Data Privacy Consultant'
  ],
  'Customer Success & Sales Leadership': [
    'Senior Account Manager',
    'Customer Success Director',
    'Senior Sales Strategist',
    'Key Account Manager',
    'Client Relationship Manager',
    'Senior Business Development Manager',
    'Sales Operations Lead'
  ],
  'Additional High-Value Roles': [
    'Senior Research Analyst',
    'Corporate Trainer',
    'Senior Legal Counsel',
    'Senior Procurement Specialist',
    'Quality Assurance Lead',
    'Senior Compliance Auditor',
    'Corporate Communications Manager',
    'Senior Product Manager'
  ],
  'Administrative Solutions': [
    'Virtual Assistant',
    'Executive Assistant',
    'Customer Service Representative',
    'Data Entry Specialist'
  ],
  'Digital Marketing Services': [
    'Social Media Manager',
    'Content Creator',
    'SEO Specialist',
    'Email Marketing Coordinator'
  ],
  'Technical Services': [
    'IT Support Specialist',
    'Junior Developer',
    'Web Designer',
    'Digital Project Manager'
  ],
  'Financial Services': [
    'Bookkeeper',
    'Payroll Administrator',
    'Accounts Receivable Specialist',
    'Financial Analyst'
  ]
};

const focus: Record<string, string> = {
  'Chief Technology Officer (CTO)': 'enterprise technology strategy, architecture, engineering leadership, cybersecurity and long-term technical investment',
  'Chief Marketing Officer (CMO)': 'global brand strategy, demand generation, positioning, customer acquisition and marketing performance',
  'Chief Operations Officer (COO)': 'company-wide operating discipline, service delivery, process excellence, workforce performance and scalable execution',
  'Director of Digital Transformation': 'business process modernization, technology adoption, automation and measurable digital change',
  'Vice President of Business Development': 'strategic partnerships, enterprise pipeline growth, market expansion and high-value commercial relationships',
  'Senior Project Manager': 'complex project planning, delivery governance, stakeholder coordination, budgets, risks and milestones',
  'Product Strategy Lead': 'product vision, market opportunity, customer insight, portfolio priorities and commercial product strategy',
  'Change Management Consultant': 'organizational change, stakeholder readiness, communication, adoption planning and transformation outcomes',
  'Senior Full Stack Developer': 'end-to-end web application engineering across frontend, backend, APIs, databases and production delivery',
  'Lead Software Architect': 'technical architecture, engineering standards, system design, scalability and architectural decision-making',
  'Senior DevOps Engineer': 'CI/CD, cloud infrastructure, observability, automation, reliability and secure software delivery',
  'Principal Cloud Engineer': 'cloud architecture, migration, infrastructure automation, scalability, resilience and cost optimization',
  'Senior Cybersecurity Analyst': 'security monitoring, threat analysis, incident response, vulnerability management and security controls',
  'Lead Data Scientist': 'advanced analytics, predictive modeling, experimentation and data-driven business decision support',
  'Senior Machine Learning Engineer': 'production machine learning systems, model deployment, data pipelines, evaluation and MLOps',
  'Blockchain Solutions Architect': 'distributed ledger architecture, smart-contract ecosystems, integration design and enterprise blockchain solutions',
  'Senior Database Administrator': 'database reliability, performance tuning, backup strategy, security and high-availability operations',
  'Principal UX/UI Designer': 'user research, interaction design, visual systems, accessibility and product experience leadership',
  'Senior Digital Marketing Manager': 'multi-channel campaigns, performance marketing, audience growth, analytics and digital acquisition',
  'Brand Strategy Director': 'brand positioning, identity, messaging, market differentiation and global brand governance',
  'Senior Content Strategist': 'editorial strategy, content planning, audience journeys, thought leadership and measurable content performance',
  'Creative Director': 'creative vision, campaign concepts, brand expression, creative teams and quality standards',
  'Senior SEO Specialist': 'technical SEO, content optimization, search visibility, keyword strategy and organic growth',
  'Marketing Automation Lead': 'lifecycle marketing, CRM automation, segmentation, lead nurturing and campaign operations',
  'Senior Growth Hacker': 'rapid experimentation, acquisition loops, conversion optimization and scalable growth channels',
  'E-commerce Strategy Manager': 'digital commerce strategy, merchandising, conversion, customer journeys and online revenue growth',
  'Senior Financial Analyst': 'financial modeling, forecasting, variance analysis, reporting and management decision support',
  'Business Intelligence Manager': 'BI strategy, dashboards, data governance, analytics delivery and executive reporting',
  'Senior Investment Analyst': 'investment research, valuation, financial modeling, market analysis and investment recommendations',
  'Risk Management Consultant': 'enterprise risk identification, controls, scenario analysis and risk mitigation programs',
  'Senior Compliance Officer': 'regulatory compliance, policy implementation, monitoring, controls and compliance reporting',
  'Treasury Manager': 'cash management, liquidity planning, banking relationships, funding and treasury controls',
  'Financial Planning & Analysis Lead': 'budgeting, forecasting, scenario planning, performance analysis and executive financial insight',
  'Senior Tax Consultant': 'tax planning, compliance, research, advisory analysis and coordination of tax obligations',
  'Senior Operations Manager': 'daily operating performance, service quality, process improvement, resource planning and team leadership',
  'Director of Remote Workforce Management': 'distributed workforce strategy, remote operating models, productivity, engagement and workforce governance',
  'Senior HR Business Partner': 'strategic HR partnership, workforce planning, employee relations, performance and organizational effectiveness',
  'Talent Acquisition Lead': 'recruitment strategy, sourcing, selection, employer branding and hiring quality',
  'Organizational Development Consultant': 'organizational design, leadership development, culture, capability building and change initiatives',
  'Senior Learning & Development Specialist': 'learning strategy, training programs, skills development, facilitation and learning measurement',
  'Employee Experience Manager': 'employee journey, engagement programs, workplace culture, feedback and retention initiatives',
  'Workforce Analytics Lead': 'people analytics, workforce planning, reporting, forecasting and evidence-based talent decisions',
  'Senior Management Consultant': 'executive advisory, business analysis, strategic recommendations and transformation execution',
  'Digital Transformation Consultant': 'digital operating models, technology-enabled process redesign, adoption and transformation roadmaps',
  'Process Improvement Specialist': 'process mapping, root-cause analysis, workflow redesign, lean improvement and measurable efficiency',
  'Senior Business Analyst': 'business requirements, process analysis, stakeholder discovery, solution definition and delivery support',
  'IT Strategy Consultant': 'technology roadmaps, IT operating models, investment priorities, governance and business alignment',
  'Customer Experience Consultant': 'customer journey design, service improvement, voice-of-customer insight and experience strategy',
  'Supply Chain Optimization Expert': 'supply chain performance, planning, procurement flows, inventory and operational optimization',
  'Senior Data Privacy Consultant': 'privacy governance, data protection programs, risk assessments, controls and regulatory readiness',
  'Senior Account Manager': 'strategic account ownership, client retention, expansion opportunities and executive relationship management',
  'Customer Success Director': 'customer outcomes, retention strategy, adoption, renewal performance and success team leadership',
  'Senior Sales Strategist': 'sales strategy, segmentation, pipeline performance, consultative selling and revenue planning',
  'Key Account Manager': 'high-value account planning, relationship development, commercial growth and client satisfaction',
  'Client Relationship Manager': 'client partnership, service coordination, issue resolution and relationship health',
  'Senior Business Development Manager': 'prospecting, enterprise opportunities, partnerships, proposals and revenue growth',
  'Sales Operations Lead': 'sales processes, CRM discipline, forecasting, performance analytics and commercial enablement',
  'Senior Research Analyst': 'structured research, market intelligence, data analysis, evidence synthesis and executive-ready insights',
  'Corporate Trainer': 'professional training design, facilitation, curriculum development and measurable capability improvement',
  'Senior Legal Counsel': 'commercial legal advice, contract review, legal risk management and business-facing counsel',
  'Senior Procurement Specialist': 'supplier sourcing, procurement processes, negotiation, vendor performance and cost management',
  'Quality Assurance Lead': 'quality strategy, testing standards, defect prevention, audit readiness and continuous improvement',
  'Senior Compliance Auditor': 'independent compliance testing, control evaluation, evidence review, findings and remediation tracking',
  'Corporate Communications Manager': 'internal communications, corporate messaging, executive communications, reputation and stakeholder engagement',
  'Senior Product Manager': 'product strategy, roadmap ownership, customer needs, cross-functional delivery and product performance',
  'Virtual Assistant': 'calendar management, correspondence, scheduling, research, administrative coordination and remote executive support',
  'Executive Assistant': 'high-trust executive support, complex scheduling, meeting preparation, travel coordination and confidential administration',
  'Customer Service Representative': 'customer inquiries, issue resolution, service quality, accurate documentation and positive customer experiences',
  'Data Entry Specialist': 'accurate data capture, validation, record maintenance, document processing and information quality',
  'Social Media Manager': 'social strategy, publishing, community management, campaign execution and channel performance',
  'Content Creator': 'original digital content, storytelling, creative production, editorial consistency and audience engagement',
  'SEO Specialist': 'keyword research, on-page optimization, technical improvements, content briefs and search performance',
  'Email Marketing Coordinator': 'email campaigns, segmentation, automation support, testing, deliverability and performance reporting',
  'IT Support Specialist': 'technical troubleshooting, user support, device and software assistance and service-desk resolution',
  'Junior Developer': 'frontend or backend implementation, bug fixing, code quality, testing and supervised product delivery',
  'Web Designer': 'responsive web interfaces, visual design, usability, accessibility and design-to-development handoff',
  'Digital Project Manager': 'digital project coordination, timelines, requirements, vendors, stakeholder communication and delivery quality',
  'Bookkeeper': 'transaction recording, reconciliations, ledger accuracy and routine financial reporting',
  'Payroll Administrator': 'payroll preparation, employee records, deductions, compliance checks and payroll issue resolution',
  'Accounts Receivable Specialist': 'invoice management, collections, payment reconciliation, aging analysis and customer account accuracy',
  'Financial Analyst': 'financial reporting, modeling, budgeting, variance analysis and business performance insight'
};

const academicFor = (title: string, sector: string) => {
  if (['Virtual Assistant', 'Customer Service Representative', 'Data Entry Specialist'].includes(title)) {
    return "A minimum of a secondary-school qualification or OND/Certificate is acceptable; an HND, diploma or bachelor's degree in Business Administration, Office Administration, Communications, Management or a related discipline is an advantage.";
  }
  if (['Junior Developer', 'Web Designer'].includes(title)) {
    return "A minimum of an OND/HND, diploma or bachelor's degree in Computer Science, Software Engineering, Information Technology, Web Development, Graphic Design, Interaction Design or a related technical/design discipline; equivalent professional training may also be considered.";
  }
  if (['Bookkeeper', 'Payroll Administrator', 'Accounts Receivable Specialist'].includes(title)) {
    return "A minimum of an OND/HND or bachelor's degree in Accounting, Finance, Economics, Business Administration or a related discipline; accounting certifications or professional training are strongly valued.";
  }
  if (sector === 'Financial Services' || sector === 'Finance & Business Intelligence') {
    return "A bachelor's degree in Accounting, Finance, Economics, Business, Mathematics, Statistics or a closely related discipline is normally required; HND/OND plus substantial relevant experience and recognized professional qualifications may be considered for appropriate positions.";
  }
  if (sector === 'Senior Technical Roles') {
    return "A bachelor's degree in Computer Science, Software Engineering, Information Technology, Cybersecurity, Data Science, Mathematics, Engineering or a related technical discipline is preferred; HND/OND, recognized technical diplomas and substantial demonstrable experience may be considered for suitable roles.";
  }
  if (sector === 'Marketing & Creative Leadership' || sector === 'Digital Marketing Services') {
    return "A bachelor's degree in Marketing, Mass Communication, Communications, Advertising, Public Relations, Business, Media, English or a related discipline is preferred; HND/OND or recognized professional training may be accepted where experience and a strong portfolio demonstrate equivalent capability.";
  }
  if (sector === 'Operations & HR Leadership' || sector === 'Administrative Solutions') {
    return "A bachelor's degree in Business Administration, Human Resources, Management, Industrial Relations, Public Administration, Psychology or a related discipline is preferred; HND/OND or an equivalent diploma with relevant experience may be considered for appropriate positions.";
  }
  if (sector === 'Specialized Consulting Roles') {
    return "A bachelor's degree in Business Administration, Management, Economics, Engineering, Information Systems, Data/Analytics, Law or another discipline relevant to the consulting specialty is preferred; HND/OND or professional qualifications plus strong consulting experience may be considered.";
  }
  if (sector === 'Customer Success & Sales Leadership') {
    return "A bachelor's degree in Business Administration, Marketing, Communications, Sales, Economics, Management or a related discipline is preferred; HND/OND or equivalent professional qualifications may be considered with substantial client-facing or commercial experience.";
  }
  if (sector === 'Additional High-Value Roles') {
    return "A bachelor's degree, HND or equivalent professional qualification in the discipline most relevant to the position is preferred. For specialized roles, relevant postgraduate study, professional certification or a recognized industry qualification may strengthen an application.";
  }
  return "A bachelor's degree, HND, OND, diploma or recognized professional qualification in a field related to the position is preferred, with equivalent practical experience considered where appropriate.";
};

const roleDetails: Record<string, Detail> = Object.fromEntries(
  Object.entries(focus).map(([title, f]) => {
    const sector = Object.entries(groups).find(([, rs]) => rs.includes(title))?.[0] || 'Additional High-Value Roles';
    const academic = academicFor(title, sector);
    return [
      title,
      {
        focus: f,
        overview:
          `The ${title} is a high-impact professional opportunity focused on ${f}. You will support Zenith Global Innovation clients and distributed teams by turning business priorities into reliable, measurable outcomes. This is not simply a task-completion position: you are expected to understand the purpose behind your work, exercise sound judgment, communicate clearly, take ownership and contribute ideas that improve results. The role requires maturity, accountability and the ability to maintain professional standards while working remotely. ` +
          `In this position, you will work with colleagues, clients and stakeholders across different time zones. Depending on the assignment, your work may include independent delivery, analysis, planning, reporting, documentation, client communication, cross-functional coordination and continuous improvement. You will be trusted to organize competing priorities, protect confidential information, meet agreed deadlines and raise important issues early. The strongest candidates will combine the right academic foundation with practical capability and a demonstrated record of dependable professional performance.`,
        responsibilities: [
          `Own day-to-day priorities and deliverables connected to ${f}, translating broad business objectives into practical work plans, milestones and measurable outcomes.`,
          `Apply the specialist knowledge expected of a ${title} to analyze situations, identify opportunities or risks, make evidence-based recommendations and take appropriate action.`,
          `Collaborate with clients, colleagues and senior stakeholders through professional written and verbal communication, keeping relevant people informed and escalating material issues promptly.`,
          `Maintain accurate records, documentation, reports, project materials or operational information relevant to the role while protecting confidential company and client information.`,
          `Monitor quality, performance and agreed targets; investigate gaps, solve problems and recommend practical improvements that make processes, services or products more effective.`,
          `Work effectively in a distributed environment by managing time, meetings, deadlines and competing priorities independently while remaining accountable for agreed results.`
        ],
        qualifications: [
          academic,
          `Demonstrated professional experience relevant to ${title}, with the depth of experience expected for the seniority of the position and evidence of responsibility for real deliverables or business outcomes.`,
          `Strong command of the tools, methods, systems and professional practices normally used in this specialty, together with a willingness to learn client-specific systems and workflows.`,
          `Strong written and verbal communication, professional judgment, attention to detail, confidentiality and the ability to explain complex information clearly to specialist and non-specialist stakeholders.`,
          `Ability to work independently in a remote environment, manage competing priorities, meet deadlines and maintain dependable communication across international teams and time zones.`
        ],
        success: `Success in this position means becoming a trusted professional partner: delivering high-quality work consistently, meeting agreed objectives, solving problems before they become larger issues, communicating with maturity and creating measurable value through ${f}.`
      }
    ];
  })
);

const jobs: Job[] = Object.entries(groups).flatMap(([sector, roles]) =>
  roles.map((title, i) => ({
    id: `${sector}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title,
    sector,
    location: i % 3 === 0 ? 'Remote · Global' : i % 3 === 1 ? 'Remote · North America' : 'Remote · International',
    type: sector === 'Specialized Consulting Roles' ? 'Contract' : 'Full-time',
    pay: pay[sector]
  }))
);

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'Switzerland', 'Singapore', 'United Arab Emirates', 'Saudi Arabia', 'Qatar',
  'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Japan', 'Netherlands', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria', 'New Zealand', 'Ireland',
  'Luxembourg', 'Liechtenstein', 'Monaco', 'Iceland', 'Hong Kong', 'Cayman Islands',
  'Bermuda', 'Gibraltar', 'Jersey', 'Guernsey', 'Isle of Man', 'Israel', 'South Korea',
  'Taiwan', 'Italy', 'Spain', 'Portugal', 'Malta', 'Cyprus', 'Estonia', 'Czech Republic',
  'Poland', 'Greece', 'Hungary', 'Romania', 'South Africa', 'Nigeria', 'Kenya',
  'Ghana', 'Egypt', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia',
  'India', 'Pakistan', 'Philippines', 'Malaysia', 'Indonesia', 'Thailand',
  'Vietnam', 'Turkey', 'Other'
];

export default function App() {
  const [currentHash, setCurrentHash] = useState(() => {
    try {
      return typeof window !== 'undefined' ? window.location.hash : '';
    } catch {
      return '';
    }
  });

  const [page, setPage] = useState<string>(() => {
    try {
      return typeof window !== 'undefined' && window.location.hash === '#admin' ? 'admin' : 'home';
    } catch {
      return 'home';
    }
  });

  const [source, setSource] = useState<string>(() => {
    try {
      if (typeof window === 'undefined') return 'Direct';
      const p = new URLSearchParams(window.location.search);
      const s = p.get('source') || p.get('utm_source') || p.get('ref') || sessionStorage.getItem('zenith_source');
      if (s) {
        sessionStorage.setItem('zenith_source', s);
        return s;
      }
    } catch {}
    return 'Direct';
  });

  const [search, setSearch] = useState('');
  const [trackingRef, setTrackingRef] = useState('');
  const [selected, setSelected] = useState<Job | null>(null);
  const [toast, setToast] = useState('');
  const [menu, setMenu] = useState(false);

  // Helper to find a job by ID, title, or slug
  const findJobMatch = (query: string): Job | undefined => {
    if (!query) return undefined;
    const clean = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return jobs.find(
      j =>
        j.id.toLowerCase() === query.trim().toLowerCase() ||
        j.id.toLowerCase().replace(/[^a-z0-9]+/g, '-') === clean ||
        j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === clean ||
        j.id.toLowerCase().includes(clean) ||
        clean.includes(j.id.toLowerCase())
    );
  };

  // Detect URL parameters on load (?job=... and ?track=... and ?source=...)
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const jobParam = p.get('job');
      if (jobParam) {
        const found = findJobMatch(jobParam);
        if (found) {
          setSelected(found);
        }
      }
      const trackParam = p.get('track') || p.get('reference');
      if (trackParam) {
        setPage('track');
        setTrackingRef(trackParam.trim().toUpperCase());
      }
      const pageParam = p.get('page');
      if (pageParam && ['home', 'careers', 'about', 'services', 'seekers', 'clients', 'track', 'contact'].includes(pageParam)) {
        setPage(pageParam);
      }
    } catch {}
  }, []);

  const openJob = (job: Job) => {
    setSelected(job);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('job', job.id);
      if (source && source !== 'Direct') {
        url.searchParams.set('source', source);
      }
      window.history.replaceState({}, '', url.toString());
    } catch {}
  };

  const closeJob = () => {
    setSelected(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('job');
      window.history.replaceState({}, '', url.toString());
    } catch {}
  };

  useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = window.location.hash;
        setCurrentHash(hash);
        if (hash === '#admin') {
          setPage('admin');
        } else if (page === 'admin' && hash !== '#admin') {
          setPage('home');
        }
      } catch {}
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [page]);

  const filtered = useMemo(
    () => jobs.filter(j => `${j.title} ${j.sector}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const go = (p: string, ref?: string) => {
    setPage(p);
    if (ref !== undefined) setTrackingRef(ref);
    setMenu(false);
    if (p === 'admin') {
      try {
        window.location.hash = '#admin';
        setCurrentHash('#admin');
      } catch {}
    } else {
      try {
        if (window.location.hash === '#admin') {
          window.location.hash = '';
          setCurrentHash('');
        }
      } catch {}
    }
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const isAdminView = page === 'admin' || currentHash === '#admin';

  if (isAdminView) {
    return (
      <ErrorBoundary onReset={() => go('home')}>
        <AdminDashboard onExit={() => go('home')} />
      </ErrorBoundary>
    );
  }

  return (
    <div className="site">
      <header className="nav">
        <button className="brand" onClick={() => go('home')}>
          <b>Z</b>
          <span>
            ZENITH GLOBAL
            <small>INNOVATION</small>
          </span>
        </button>

        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">
          {menu ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={menu ? 'open' : ''}>
          {[
            ['home', 'Home'],
            ['about', 'About'],
            ['services', 'Services'],
            ['careers', 'Careers'],
            ['seekers', 'For Job Seekers'],
            ['track', 'Track Application'],
            ['clients', 'For Clients'],
            ['blog', 'Blog'],
            ['contact', 'Contact'],
          ].map(([k, v]) => (
            <button key={k} onClick={() => go(k)} className={page === k ? 'active' : ''}>
              {v}
            </button>
          ))}
          <button
            onClick={() => go('admin')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              fontSize: '12px',
              marginLeft: '4px',
              cursor: 'pointer',
            }}
            title="Management Login"
          >
            <Lock size={13} /> Admin
          </button>
        </nav>
      </header>

      {page === 'home' && <Home go={go} open={openJob} />}
      {page === 'careers' && <Careers search={search} setSearch={setSearch} open={openJob} />}
      {page === 'about' && <About go={go} />}
      {page === 'cookies' && <CookiePolicy go={go} />}
      {page === 'services' && (
        <Services go={go} />
      )}
      {page === 'seekers' && (
        <Seekers go={go} />
      )}
      {page === 'track' && (
        <TrackApplication initialRef={trackingRef} go={go} />
      )}
      {page === 'clients' && (
        <Clients go={go} />
      )}
      {page === 'blog' && (
        <Blog />
      )}
      {page === 'contact' && <Contact />}

      {selected && (
        <JobModal
          job={selected}
          close={closeJob}
          source={source}
          toast={setToast}
          onTrack={(ref: string) => go('track', ref)}
          onExploreMore={() => {
            closeJob();
            go('careers');
          }}
        />
      )}

      {toast && (
        <div className="toast">
          <Check size={18} />
          <span>{toast}</span>
        </div>
      )}

      <footer>
        <div style={{ maxWidth: '360px' }}>
          <b>ZENITH GLOBAL INNOVATION</b>
          <span>Connecting Talent Across Continents · Established 2019</span>
          <div style={{ marginTop: '10px', fontSize: '11px', color: '#64748b', lineHeight: 1.5 }}>
            Headquarters: New York, NY · International operations: London, Singapore, Toronto
          </div>
          <div style={{ marginTop: '14px' }}>
            <button
              onClick={() => go('admin')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#64748b',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '11px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              <Lock size={12} /> Management Portal Login
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '8px', fontSize: '12.5px' }}>
          <strong style={{ color: '#0f172a', marginBottom: '4px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Corporate & Legal
          </strong>
          <a onClick={() => go('about')} style={{ color: '#475569', cursor: 'pointer', textDecoration: 'none' }}>About Zenith</a>
          <a onClick={() => go('careers')} style={{ color: '#475569', cursor: 'pointer', textDecoration: 'none' }}>Open Positions</a>
          <a onClick={() => go('track')} style={{ color: '#475569', cursor: 'pointer', textDecoration: 'none' }}>Track Application</a>
          <a onClick={() => go('cookies')} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>Cookie Policy & Preferences</a>
        </div>

        <div className="footer-contact">
          <strong>Management & General Enquiries</strong>
          <a href="mailto:zenithglobalinnovationhq@protonmail.com">zenithglobalinnovationhq@protonmail.com</a>
          <small>
            Official company contact · General enquiries · Candidate records, complaints & compliance correspondence
          </small>
        </div>
      </footer>
    </div>
  );
}

function Home({ go, open }: { go: (p: string) => void; open: (j: Job) => void }) {
  return (
    <>
      <section className="hero">
        <div>
          <span className="kicker">GLOBAL REMOTE TALENT PARTNER · EST. 2019</span>
          <h1>
            Exceptional talent.<br />
            <em>Limitless</em> possibilities.
          </h1>
          <p>
            We connect thoroughly vetted professionals with ambitious companies worldwide, creating remote teams built for long-term success.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={() => go('careers')}>
              Explore opportunities <ArrowRight size={16} />
            </button>
            <button
              className="btn"
              style={{ background: '#ffffff', color: '#10243e', border: '1px solid #cbd5e1' }}
              onClick={() => go('track')}
            >
              Track Application <Search size={15} />
            </button>
          </div>
        </div>
        <div className="hero-card">
          <Globe2 size={44} />
          <span>GLOBAL TALENT NETWORK</span>
          <strong>4,800+</strong>
          <small>Vetted professionals across 30+ countries</small>
        </div>
      </section>

      <section className="section light">
        <div className="head">
          <div>
            <span className="kicker">WE ARE HIRING</span>
            <h2>
              Roles built for <em>impact.</em>
            </h2>
          </div>
          <button className="text-btn" onClick={() => go('careers')}>
            View all {jobs.length} roles <ArrowRight size={16} />
          </button>
        </div>
        <div className="job-grid">
          {jobs.slice(0, 8).map(j => (
            <JobCard key={j.id} job={j} open={() => open(j)} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="head">
          <div>
            <span className="kicker">WHY ZENITH GLOBAL INNOVATION</span>
            <h2>Built on rigorous standards and human connection.</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '32px', border: '1px solid #e2e8f0', borderRadius: '18px', background: '#ffffff' }}>
            <Building2 size={36} color="#2563eb" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', margin: '0 0 10px', color: '#0f172a' }}>Global Headquarters & Presence</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Headquartered in New York with established operations in London, Singapore and Toronto, serving companies and candidates across international borders.
            </p>
          </div>
          <div style={{ padding: '32px', border: '1px solid #e2e8f0', borderRadius: '18px', background: '#ffffff' }}>
            <Award size={36} color="#2563eb" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', margin: '0 0 10px', color: '#0f172a' }}>Thorough Professional Vetting</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Every candidate is assessed for academic credentials, practical competence, professional judgment, and autonomous remote reliability.
            </p>
          </div>
          <div style={{ padding: '32px', border: '1px solid #e2e8f0', borderRadius: '18px', background: '#ffffff' }}>
            <Clock size={36} color="#2563eb" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', margin: '0 0 10px', color: '#0f172a' }}>Dedicated Recruitment Care</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Every submitted application receives a unique tracking reference, formal confirmation, and careful assessment within 3–5 business days.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Careers({
  search,
  setSearch,
  open,
}: {
  search: string;
  setSearch: (s: string) => void;
  open: (j: Job) => void;
}) {
  const [alertDone, setAlertDone] = useState(false);
  const [alertBusy, setAlertBusy] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertCountry, setAlertCountry] = useState('Any country');
  const [alertCategory, setAlertCategory] = useState('All roles');

  const filtered = jobs.filter(j => `${j.title} ${j.sector}`.toLowerCase().includes(search.toLowerCase()));

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    setAlertBusy(true);
    try {
      await api.post('/api/job-alerts', {
        email: alertEmail,
        country: alertCountry,
        category: alertCategory,
      });
      setAlertDone(true);
      setAlertEmail('');
    } catch {
      // handled
    } finally {
      setAlertBusy(false);
    }
  }

  return (
    <>
      <section className="page-hero">
        <span className="kicker">WE ARE HIRING</span>
        <h1>
          Senior talent.<br />
          <em>Global opportunity.</em>
        </h1>
        <p>
          Open positions across leadership, technology, marketing, finance, operations, consulting, customer success and specialist functions.
        </p>
      </section>

      <section className="section light">
        <div className="search">
          <Search size={18} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search a role, sector or keyword..."
          />
          <span>{filtered.length} positions</span>
        </div>

        <div className="all-jobs">
          {filtered.map(j => (
            <JobCard key={j.id} job={j} open={() => open(j)} />
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <p style={{ fontSize: '16px', margin: 0 }}>No positions match "{search}". Try searching for another keyword or sector.</p>
              <button
                onClick={() => setSearch('')}
                className="btn primary"
                style={{ marginTop: '16px' }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <section className="job-alert">
          <div>
            <span className="kicker" style={{ color: '#60a5fa' }}>JOB ALERTS</span>
            <h2>Be first to know about new opportunities.</h2>
            <p>Subscribe for relevant Zenith Global Innovation openings by category and country.</p>
          </div>
          {alertDone ? (
            <div className="alert-success">
              <Check size={28} />
              <b>You are subscribed.</b>
              <span>We will send relevant opportunity alerts to your email.</span>
            </div>
          ) : (
            <form onSubmit={subscribe}>
              <input
                type="email"
                value={alertEmail}
                onChange={e => setAlertEmail(e.target.value)}
                placeholder="Professional email address"
                required
              />
              <select value={alertCategory} onChange={e => setAlertCategory(e.target.value)}>
                <option>All roles</option>
                {Object.keys(groups).map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select value={alertCountry} onChange={e => setAlertCountry(e.target.value)}>
                <option>Any country</option>
                {countries.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <button className="btn primary" disabled={alertBusy}>
                {alertBusy ? 'Subscribing...' : 'Activate job alerts'} <ArrowRight size={16} />
              </button>
            </form>
          )}
        </section>
      </section>
    </>
  );
}

function JobCard({ job, open }: { job: Job; open: () => void }) {
  return (
    <button className="job-card" onClick={open}>
      <BriefcaseBusiness size={22} />
      <div>
        <small>{job.sector}</small>
        <h3>{job.title}</h3>
        <p>
          {job.location} · {job.type}
        </p>
        <b>{job.pay.annual} / year</b>
      </div>
      <ArrowRight size={18} />
    </button>
  );
}

function JobModal({
  job,
  close,
  source,
  toast,
  onTrack,
  onExploreMore,
}: {
  job: Job;
  close: () => void;
  source?: string;
  toast: (s: string) => void;
  onTrack?: (ref: string) => void;
  onExploreMore?: () => void;
}) {
  const [apply, setApply] = useState(false);
  const [sent, setSent] = useState(false);
  const [confirmation, setConfirmation] = useState<{ reference: string; estimatedResponseDate: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formAlert, setFormAlert] = useState<string>('');
  const [selectedAdditionalRoles, setSelectedAdditionalRoles] = useState<string[]>([]);
  const [showMultiRole, setShowMultiRole] = useState(false);
  const [copiedDirectLink, setCopiedDirectLink] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<'Telegram' | 'WhatsApp' | 'Zangi'>('Telegram');
  const [emailValue, setEmailValue] = useState('');
  const [emailChecking, setEmailChecking] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    checked: boolean;
    valid: boolean;
    message: string;
    suggested?: string;
  } | null>(null);
  const d = roleDetails[job.title];

  // Live Email Checker Effect (Debounced 400ms)
  useEffect(() => {
    if (!emailValue.trim()) {
      setEmailStatus(null);
      setEmailChecking(false);
      return;
    }

    const timer = setTimeout(async () => {
      const trimmed = emailValue.trim();
      if (!trimmed.includes('@') || trimmed.length < 5) {
        setEmailStatus({
          checked: true,
          valid: false,
          message: 'Please enter a complete email address (e.g. name@domain.com)',
        });
        return;
      }

      setEmailChecking(true);
      try {
        const res = await api.post('/api/verify-email', { email: trimmed });
        setEmailStatus({
          checked: true,
          valid: Boolean(res.data?.valid),
          message: res.data?.message || (res.data?.valid ? 'Active deliverable email address verified.' : 'Invalid email address.'),
          suggested: res.data?.suggested,
        });
        if (res.data?.valid) {
          clearError('email');
        }
      } catch {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
        setEmailStatus({
          checked: true,
          valid,
          message: valid ? 'Email address format verified.' : 'Please enter a valid email address.',
        });
      } finally {
        setEmailChecking(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [emailValue]);

  const copyDirectJobLink = () => {
    try {
      const shareUrl = `${window.location.origin}/?job=${encodeURIComponent(job.id)}${source && source !== 'Direct' ? `&source=${encodeURIComponent(source)}` : ''}`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedDirectLink(true);
      toast('Shareable direct application link copied to clipboard!');
      setTimeout(() => setCopiedDirectLink(false), 3000);
    } catch {}
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  const clearError = (field: string) => {
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (formAlert) setFormAlert('');
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormAlert('');
    const form = e.currentTarget;
    const fd = new FormData(form);

    const newErrors: Record<string, string> = {};

    const check = (key: string, label: string) => {
      const val = fd.get(key);
      if (!val || String(val).trim() === '') {
        newErrors[key] = `${label} is required`;
      }
    };

    check('name', 'Full legal name');
    check('dob', 'Date of birth');
    check('gender', 'Gender');
    check('nationality', 'Nationality');
    check('country', 'Country of residence');
    check('address', 'Complete residential address');
    check('phone', 'Primary phone number');

    const emailVal = emailValue.trim() || String(fd.get('email') || '').trim();
    if (!emailVal) {
      newErrors['email'] = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      newErrors['email'] = 'Please enter a valid email address (e.g. name@domain.com)';
    } else if (emailStatus && emailStatus.checked && !emailStatus.valid) {
      newErrors['email'] = emailStatus.message || 'Please enter a valid, deliverable email address';
    }

    // Expected salary is optional - not checked
    check('availability', 'Availability / start date');
    check('contactHandle', 'Interview contact handle (Telegram username, WhatsApp number, or Zangi ID)');
    check('education', 'Education level completed');
    check('field', 'Field of study');
    check('experience', 'Years of experience');
    // Employer and currentTitle are removed - not checked

    const file = fd.get('resume') as File | null;
    if (!file || !file.name || file.size === 0) {
      newErrors['resume'] = 'Resume / CV file is mandatory. Please select a document';
    } else if (file.size > 8 * 1024 * 1024) {
      newErrors['resume'] = 'File size exceeds maximum 8MB limit';
    }

    check('signature', 'Digital signature');

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setFormAlert(`Please complete the ${Object.keys(newErrors).length} required field(s) highlighted with red borders below.`);
      
      const firstKey = Object.keys(newErrors)[0];
      setTimeout(() => {
        const el = form.querySelector(`[name="${firstKey}"]`) as HTMLElement;
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.focus?.();
        }
      }, 60);
      return;
    }

    setFieldErrors({});

    try {
      setBusy(true);

      const fileSizeStr = file ? (file.size >= 1048576 ? `${(file.size / 1048576).toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`) : '';
      const payload = {
        jobId: job.id,
        jobTitle: job.title,
        resumePath: file!.name,
        resumeName: file!.name,
        resumeSize: fileSizeStr,
        source: source || 'Direct',
        additionalRoles: selectedAdditionalRoles,
        ...Object.fromEntries(fd.entries()),
      };

      const result = await api.post('/api/applications', payload);

      setConfirmation({
        reference: result.data?.reference || `ZGI-2026-${Date.now().toString(36).toUpperCase()}`,
        estimatedResponseDate: result.data?.estimatedResponseDate || 'Within 3-5 business days',
      });
      setSent(true);
      toast('Application received — your profile is now with the Zenith talent team.');
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || 'We could not submit the application. Please verify every required field and try again.';
      setFormAlert(msg);
      toast(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={close} aria-label="Close modal">
          <X size={20} />
        </button>

        {sent ? (
          <div className="success">
            <Check size={48} />
            <span className="kicker">APPLICATION CONFIRMED</span>
            <h2>Application received.</h2>
            <p>
              Your complete application for <b>{job.title}</b> has been successfully submitted to the Zenith Global Innovation talent team.
            </p>
            <div className="confirmation-card">
              <strong>{confirmation?.reference}</strong>
              <small>APPLICATION REFERENCE NUMBER</small>
              <span>
                Status: <b>Application Received</b>
              </span>
              <span>
                Expected response: <b>3–5 business days</b>
              </span>
              <span>
                Estimated response date: <b>{confirmation?.estimatedResponseDate}</b>
              </span>
            </div>
            <p className="note">
              Please retain your reference number for all future correspondence. For management, complaints or general enquiries, contact{' '}
              <a href="mailto:zenithglobalinnovationhq@protonmail.com">zenithglobalinnovationhq@protonmail.com</a>.
            </p>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', margin: '20px 0', textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                🌟 Maximize your hiring consideration
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
                Zenith allows candidates to be concurrently evaluated for multiple positions across our executive, engineering, marketing, and consulting pipelines.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
              <button className="btn primary" onClick={close}>
                Done
              </button>
              {onExploreMore && (
                <button
                  className="btn"
                  style={{ background: '#0a192f', color: '#ffffff', border: 'none' }}
                  onClick={onExploreMore}
                >
                  Apply for More Roles <ArrowRight size={16} />
                </button>
              )}
              {confirmation?.reference && onTrack && (
                <button
                  className="btn"
                  style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}
                  onClick={() => {
                    close();
                    onTrack(confirmation.reference);
                  }}
                >
                  Track This Application <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        ) : !apply ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', flexWrap: 'wrap' }}>
              <div>
                <span className="kicker">
                  {job.sector} · {job.type}
                </span>
                <h2>{job.title}</h2>
              </div>
              <button
                type="button"
                className="btn"
                onClick={copyDirectJobLink}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#1e293b',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '6px 12px',
                }}
              >
                {copiedDirectLink ? '✓ Copied Link!' : '📋 Share Job Link'}
              </button>
            </div>
            <p className="lead">{d?.overview}</p>

            <div className="salary">
              <b>
                {job.pay.annual}
                <small>Annual salary</small>
              </b>
              <b>
                {job.pay.weekly}
                <small>Weekly pay</small>
              </b>
              <b>
                {job.pay.hourly}
                <small>Hourly rate</small>
              </b>
              {job.pay.commission && <span>{job.pay.commission}</span>}
            </div>

            <section>
              <h4>What you will do</h4>
              <ul>
                {d?.responsibilities.map(x => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4>What we are looking for</h4>
              <p className="section-intro">
                Zenith looks for the right combination of academic foundation, relevant practical experience, professional judgment and role-specific capability. Equivalent qualifications may be considered when a candidate can demonstrate substantial, directly relevant experience and strong evidence of competence.
              </p>
              <ul>
                {d?.qualifications.map(x => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4>What success looks like</h4>
              <p>{d?.success}</p>
            </section>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button className="btn primary" style={{ flex: 1, minWidth: '220px' }} onClick={() => setApply(true)}>
                Apply for this role <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="btn"
                onClick={copyDirectJobLink}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#1e293b',
                  fontSize: '13px',
                }}
              >
                {copiedDirectLink ? '✓ Link Copied!' : '📋 Copy Shareable Link'}
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="kicker">APPLICATION · {job.title}</span>
            <h2>Complete your application.</h2>
            <p className="note">
              Every field below is mandatory. Please provide accurate professional information, upload your resume/CV and complete the digital signature before submitting.
            </p>

            <form onSubmit={submit} className="form" noValidate>
              {formAlert && (
                <div
                  style={{
                    gridColumn: '1 / -1',
                    background: '#fef2f2',
                    border: '1.5px solid #ef4444',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    color: '#991b1b',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.1)',
                  }}
                >
                  <AlertCircle size={22} color="#dc2626" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ color: '#b91c1c' }}>{formAlert}</div>
                    <div style={{ fontSize: '11px', fontWeight: 500, color: '#7f1d1d', marginTop: '3px' }}>
                      Please review the fields outlined with a red line below and provide the required information.
                    </div>
                  </div>
                </div>
              )}

              <h4>Personal information</h4>
              <label className={fieldErrors.name ? 'has-error' : ''}>
                Full legal name <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="name"
                  className={fieldErrors.name ? 'input-error' : ''}
                  onChange={() => clearError('name')}
                  placeholder="As shown on government ID"
                />
                {fieldErrors.name && <span className="field-error-text">⚠ {fieldErrors.name}</span>}
              </label>
              <label className={fieldErrors.dob ? 'has-error' : ''}>
                Date of birth <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="dob"
                  type="date"
                  className={fieldErrors.dob ? 'input-error' : ''}
                  onChange={() => clearError('dob')}
                />
                {fieldErrors.dob && <span className="field-error-text">⚠ {fieldErrors.dob}</span>}
              </label>
              <label className={fieldErrors.gender ? 'has-error' : ''}>
                Gender <span style={{ color: '#ef4444' }}>*</span>
                <select
                  name="gender"
                  className={fieldErrors.gender ? 'input-error' : ''}
                  onChange={() => clearError('gender')}
                >
                  <option value="">Select gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
                {fieldErrors.gender && <span className="field-error-text">⚠ {fieldErrors.gender}</span>}
              </label>
              <label className={fieldErrors.nationality ? 'has-error' : ''}>
                Nationality <span style={{ color: '#ef4444' }}>*</span>
                <select
                  name="nationality"
                  className={fieldErrors.nationality ? 'input-error' : ''}
                  onChange={() => clearError('nationality')}
                >
                  <option value="">Select nationality</option>
                  {countries.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {fieldErrors.nationality && <span className="field-error-text">⚠ {fieldErrors.nationality}</span>}
              </label>
              <label className={fieldErrors.country ? 'has-error' : ''}>
                Country of residence <span style={{ color: '#ef4444' }}>*</span>
                <select
                  name="country"
                  className={fieldErrors.country ? 'input-error' : ''}
                  onChange={() => clearError('country')}
                >
                  <option value="">Select country</option>
                  {countries.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {fieldErrors.country && <span className="field-error-text">⚠ {fieldErrors.country}</span>}
              </label>
              <label className={`wide ${fieldErrors.address ? 'has-error' : ''}`}>
                Complete residential address <span style={{ color: '#ef4444' }}>*</span>
                <textarea
                  name="address"
                  className={fieldErrors.address ? 'input-error' : ''}
                  onChange={() => clearError('address')}
                  placeholder="Street address, city, state/province, postal code"
                />
                {fieldErrors.address && <span className="field-error-text">⚠ {fieldErrors.address}</span>}
              </label>
              <label className={fieldErrors.phone ? 'has-error' : ''}>
                Primary phone number <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="phone"
                  className={fieldErrors.phone ? 'input-error' : ''}
                  onChange={() => clearError('phone')}
                  placeholder="+1 (555) 000-0000"
                />
                {fieldErrors.phone && <span className="field-error-text">⚠ {fieldErrors.phone}</span>}
              </label>
              <div className="wide" style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '6px', marginBottom: '2px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} color="#2563eb" />
                  Important: Valid and Active Email Address
                </span>
                <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: '#64748b', lineHeight: 1.4 }}>
                  Make sure this is a real and active email address. Your official tracking reference code, screening updates, and interview schedule are sent here.
                </p>
              </div>

              <label className={fieldErrors.email || (emailStatus && emailStatus.checked && !emailStatus.valid) ? 'has-error' : ''}>
                Email address <span style={{ color: '#ef4444' }}>*</span>
                <div style={{ position: 'relative' }}>
                  <input
                    name="email"
                    type="email"
                    value={emailValue}
                    className={
                      fieldErrors.email || (emailStatus && emailStatus.checked && !emailStatus.valid)
                        ? 'input-error'
                        : emailStatus && emailStatus.valid
                        ? 'input-valid'
                        : ''
                    }
                    onChange={e => {
                      setEmailValue(e.target.value);
                      clearError('email');
                    }}
                    placeholder="e.g. name@gmail.com, name@yahoo.com, name@domain.com"
                    autoComplete="email"
                  />
                  {emailChecking && (
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: '#64748b' }}>
                      Checking...
                    </span>
                  )}
                  {emailStatus && !emailChecking && emailStatus.valid && (
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#16a34a' }}>
                      <CheckCircle2 size={16} />
                    </span>
                  )}
                </div>

                {emailStatus && !emailChecking && (
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      marginTop: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '4px',
                      color: emailStatus.valid ? '#16a34a' : '#dc2626',
                    }}
                  >
                    {emailStatus.valid ? (
                      <>✓ {emailStatus.message}</>
                    ) : (
                      <>
                        <span>⚠ {emailStatus.message}</span>
                        {emailStatus.suggested && (
                          <button
                            type="button"
                            onClick={() => {
                              setEmailValue(emailStatus.suggested!);
                              clearError('email');
                            }}
                            style={{
                              background: '#eff6ff',
                              border: '1px solid #bfdbfe',
                              color: '#1d4ed8',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              marginLeft: '4px',
                            }}
                          >
                            Click here to use {emailStatus.suggested}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
                {fieldErrors.email && !emailStatus && <span className="field-error-text">⚠ {fieldErrors.email}</span>}
              </label>

              <div className="wide" style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0 }}>Interview communication channel</h4>
                  <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>Direct Screening Handover</span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0', lineHeight: 1.5 }}>
                  Shortlisted candidates are paired directly with an executive recruitment director for real-time screening, role file distribution, and scheduling. Select your preferred channel below.
                </p>
              </div>

              <label className={fieldErrors.preferredChannel ? 'has-error' : ''}>
                Preferred platform <span style={{ color: '#ef4444' }}>*</span>
                <select
                  name="preferredChannel"
                  value={selectedChannel}
                  className={fieldErrors.preferredChannel ? 'input-error' : ''}
                  onChange={e => {
                    setSelectedChannel(e.target.value as 'Telegram' | 'WhatsApp' | 'Zangi');
                    clearError('preferredChannel');
                  }}
                >
                  <option value="Telegram">Telegram (@username)</option>
                  <option value="WhatsApp">WhatsApp (Direct Number)</option>
                  <option value="Zangi">Zangi Safe Messenger (Zangi Number / ID)</option>
                </select>
                {fieldErrors.preferredChannel && <span className="field-error-text">⚠ {fieldErrors.preferredChannel}</span>}
              </label>

              <label className={fieldErrors.contactHandle ? 'has-error' : ''}>
                {selectedChannel === 'Telegram' && 'Your Telegram handle'}
                {selectedChannel === 'WhatsApp' && 'Your WhatsApp phone number'}
                {selectedChannel === 'Zangi' && 'Your Zangi Number / Zangi ID'}
                <span style={{ color: '#ef4444' }}> *</span>
                <input
                  name="contactHandle"
                  className={fieldErrors.contactHandle ? 'input-error' : ''}
                  onChange={() => clearError('contactHandle')}
                  placeholder={
                    selectedChannel === 'Telegram'
                      ? 'e.g. @your_username'
                      : selectedChannel === 'WhatsApp'
                      ? 'e.g. +1 (555) 019-2834 (with country code)'
                      : 'e.g. 10-1234-5678 or 1012345678'
                  }
                />
                {fieldErrors.contactHandle && <span className="field-error-text">⚠ {fieldErrors.contactHandle}</span>}
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                  {selectedChannel === 'Telegram' && 'Enter your Telegram username starting with @ for direct executive screening.'}
                  {selectedChannel === 'WhatsApp' && 'Include country code (+1, +44, etc.) for direct telephone and messaging connection.'}
                  {selectedChannel === 'Zangi' && 'Provide your 9–10 digit numeric Zangi Number or ID for private, end-to-end encrypted screening.'}
                </span>
              </label>

              <h4>Professional information</h4>
              <label>
                Desired position / role
                <input name="desiredRole" value={job.title} readOnly style={{ background: '#f8fafc', color: '#64748b' }} />
              </label>

              <div className="wide multi-role-container" style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ flex: '1 1 240px' }}>
                    <strong style={{ fontSize: '13px', color: '#0f172a', display: 'block' }}>🌟 Apply for additional roles with this submission?</strong>
                    <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#64748b' }}>
                      Maximize your hiring potential — our committee will evaluate your resume for complementary open positions at no extra effort.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="multi-role-toggle-btn"
                    onClick={() => setShowMultiRole(!showMultiRole)}
                    style={{
                      background: showMultiRole ? '#e2e8f0' : '#eff6ff',
                      color: showMultiRole ? '#334155' : '#1d4ed8',
                      border: `1px solid ${showMultiRole ? '#cbd5e1' : '#bfdbfe'}`,
                      borderRadius: '8px',
                      padding: '7px 14px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {showMultiRole ? 'Hide Options' : '+ Select More Roles'}
                  </button>
                </div>

                {showMultiRole && (
                  <div
                    className="multi-role-grid"
                    style={{
                      marginTop: '12px',
                      paddingTop: '10px',
                      borderTop: '1px dashed #cbd5e1',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '8px',
                      maxHeight: '220px',
                      overflowY: 'auto',
                    }}
                  >
                    {jobs
                      .filter(other => other.id !== job.id)
                      .slice(0, 16)
                      .map(other => {
                        const isChecked = selectedAdditionalRoles.includes(other.title);
                        return (
                          <label
                            key={other.id}
                            className="multi-role-item"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              background: isChecked ? '#eff6ff' : '#ffffff',
                              border: `1.5px solid ${isChecked ? '#3b82f6' : '#e2e8f0'}`,
                              padding: '9px 12px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: isChecked ? 700 : 500,
                              color: isChecked ? '#1d4ed8' : '#334155',
                              margin: 0,
                              boxShadow: isChecked ? '0 1px 3px rgba(59, 130, 246, 0.15)' : 'none',
                              transition: 'all 0.15s ease-in-out',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setSelectedAdditionalRoles(prev =>
                                  isChecked ? prev.filter(r => r !== other.title) : [...prev, other.title]
                                );
                              }}
                              style={{ width: '16px', height: '16px', cursor: 'pointer', margin: 0 }}
                            />
                            <span>{other.title}</span>
                          </label>
                        );
                      })}
                  </div>
                )}
                {selectedAdditionalRoles.length > 0 && (
                  <div style={{ marginTop: '10px', fontSize: '11.5px', color: '#15803d', fontWeight: 600, background: '#f0fdf4', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                    ✓ Included for concurrent consideration: {selectedAdditionalRoles.join(', ')}
                  </div>
                )}
              </div>
              <label>
                Expected salary range (Optional)
                <input
                  name="expectedSalary"
                  placeholder={`e.g. ${job.pay.annual} or Open`}
                />
                <small>Optional — you can leave blank to discuss compensation during your screening interview.</small>
              </label>
              <label className={fieldErrors.availability ? 'has-error' : ''}>
                Availability / start date <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="availability"
                  type="date"
                  className={fieldErrors.availability ? 'input-error' : ''}
                  onChange={() => clearError('availability')}
                />
                {fieldErrors.availability && <span className="field-error-text">⚠ {fieldErrors.availability}</span>}
              </label>
              <label className={fieldErrors.education ? 'has-error' : ''}>
                Highest level of education completed <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="education"
                  className={fieldErrors.education ? 'input-error' : ''}
                  onChange={() => clearError('education')}
                  placeholder="Bachelor's, Master's, HND, OND, etc."
                />
                {fieldErrors.education && <span className="field-error-text">⚠ {fieldErrors.education}</span>}
              </label>
              <label className={fieldErrors.field ? 'has-error' : ''}>
                Field of study <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="field"
                  className={fieldErrors.field ? 'input-error' : ''}
                  onChange={() => clearError('field')}
                  placeholder="Computer Science, Finance, Marketing, etc."
                />
                {fieldErrors.field && <span className="field-error-text">⚠ {fieldErrors.field}</span>}
              </label>
              <label className="wide">
                Certifications and professional qualifications (Optional)
                <textarea
                  name="certifications"
                  placeholder="List professional licenses, industry accreditations, or enter 'N/A' if none..."
                />
              </label>
              <label className={fieldErrors.experience ? 'has-error' : ''}>
                Years of relevant experience <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="experience"
                  type="number"
                  min="0"
                  className={fieldErrors.experience ? 'input-error' : ''}
                  onChange={() => clearError('experience')}
                  placeholder="e.g. 5"
                />
                {fieldErrors.experience && <span className="field-error-text">⚠ {fieldErrors.experience}</span>}
              </label>
              <label className={`wide ${fieldErrors.resume ? 'has-error' : ''}`}>
                Resume / CV (Mandatory) <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className={fieldErrors.resume ? 'input-error' : ''}
                  onChange={() => clearError('resume')}
                />
                <small>Supported formats: PDF, DOC or DOCX · maximum file size: 8MB</small>
                {fieldErrors.resume && <span className="field-error-text">⚠ {fieldErrors.resume}</span>}
              </label>

              <h4>Digital declaration & submission</h4>
              <label className={fieldErrors.signature ? 'has-error' : ''}>
                Digital signature <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="signature"
                  className={fieldErrors.signature ? 'input-error' : ''}
                  onChange={() => clearError('signature')}
                  placeholder="Type your full legal name to sign"
                />
                {fieldErrors.signature && <span className="field-error-text">⚠ {fieldErrors.signature}</span>}
              </label>
              <label className={fieldErrors.applicationDate ? 'has-error' : ''}>
                Date of application <span style={{ color: '#ef4444' }}>*</span>
                <input
                  name="applicationDate"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className={fieldErrors.applicationDate ? 'input-error' : ''}
                  onChange={() => clearError('applicationDate')}
                />
                {fieldErrors.applicationDate && <span className="field-error-text">⚠ {fieldErrors.applicationDate}</span>}
              </label>

              <button className="btn primary full" disabled={busy}>
                {busy ? 'Submitting secure application...' : 'Submit complete application'} <ArrowRight size={16} />
              </button>
            </form>

            <button className="back" onClick={() => setApply(false)}>
              ← Back to full role description
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Services({ go }: { go: (p: string) => void }) {
  return (
    <>
      <section className="page-hero">
        <span className="kicker">BUSINESS SOLUTIONS & STAFFING</span>
        <h1>
          The right people.<br />
          <em>The right way.</em>
        </h1>
        <p>
          Remote staffing and business solutions across administrative, digital marketing, technical and financial functions, supported by careful vetting and long-term partnership.
        </p>
      </section>

      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {Object.entries(groups).slice(0, 6).map(([category, roles]) => (
            <div key={category} style={{ border: '1px solid #e2e8f0', borderRadius: '18px', padding: '32px', background: '#ffffff' }}>
              <span className="kicker">{category}</span>
              <h3 style={{ fontSize: '20px', margin: '8px 0 16px', color: '#0f172a' }}>{category}</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                Pre-vetted professionals ready to integrate into your international workflows with senior oversight.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {roles.slice(0, 4).map(r => (
                  <span key={r} style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: '#334155' }}>
                    {r}
                  </span>
                ))}
              </div>
              <button className="text-btn" onClick={() => go('careers')}>
                View roles in this sector <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Seekers({ go }: { go: (p: string) => void }) {
  return (
    <>
      <section className="page-hero">
        <span className="kicker">FOR JOB SEEKERS</span>
        <h1>
          Work globally.<br />
          <em>Grow intentionally.</em>
        </h1>
        <p>
          Explore professional opportunities, build your profile and access resources designed for successful remote careers across North America, Europe and Asia-Pacific.
        </p>
      </section>

      <section className="section light">
        <div style={{ maxWidth: '840px', margin: '0 auto', display: 'grid', gap: '24px' }}>
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', margin: '0 0 12px', color: '#0f172a' }}>1. Transparent Compensation</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              Every Zenith role clearly advertises annual salary ranges, weekly earnings, and hourly rates so candidates know expectations from day one.
            </p>
          </div>
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', margin: '0 0 12px', color: '#0f172a' }}>2. Fair Evaluation & Response Window</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              Every application is formally assigned an official tracking reference and reviewed by our recruitment team with guaranteed feedback within 3–5 business days.
            </p>
          </div>
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', margin: '0 0 12px', color: '#0f172a' }}>3. Global Flexibility</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              Collaborate remotely with international teams while enjoying stability, professional mentorship, and career advancement.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={() => go('careers')}>
              Browse All Open Positions <ArrowRight size={16} />
            </button>
            <button
              className="btn"
              style={{ background: '#ffffff', color: '#10243e', border: '1px solid #cbd5e1' }}
              onClick={() => go('track')}
            >
              Track Application Progress <Search size={15} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Clients({ go }: { go: (p: string) => void }) {
  return (
    <>
      <section className="page-hero">
        <span className="kicker">FOR CLIENT COMPANIES</span>
        <h1>
          Build a team<br />
          <em>without borders.</em>
        </h1>
        <p>
          Tell Zenith what you need and our talent specialists will identify professionals aligned with your strategic goals, tech stacks, and team culture.
        </p>
      </section>

      <section className="section">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <ShieldCheck size={56} color="#2563eb" style={{ margin: '0 auto 20px' }} />
          <h2 style={{ fontSize: '32px', color: '#0f172a', margin: '0 0 16px' }}>
            Senior Remote Staffing Without the Overhead
          </h2>
          <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', marginBottom: '32px' }}>
            We handle sourcing, vetting, compliance, and ongoing talent performance management so you can focus on building your business.
          </p>
          <button className="btn primary" onClick={() => go('contact')}>
            Partner with Zenith <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
}

function Blog() {
  const posts = [
    {
      title: 'Navigating Remote Collaboration Across Four Continents',
      date: 'October 14, 2026',
      excerpt: 'How leading distributed enterprises bridge asynchronous communication, cultural alignment, and shared goals.',
    },
    {
      title: 'The Evolution of Specialized Consulting in Modern Staffing',
      date: 'September 28, 2026',
      excerpt: 'Why organizations are shifting towards project-based, specialized domain leadership to accelerate transformation.',
    },
    {
      title: 'Evaluating Remote Talent: Beyond Resumes to Autonomous Reliability',
      date: 'September 12, 2026',
      excerpt: 'Key indicators that differentiate high-performing remote leaders from traditional office-bound employees.',
    },
  ];

  return (
    <>
      <section className="page-hero">
        <span className="kicker">INSIGHTS & RESOURCES</span>
        <h1>
          Ideas for the<br />
          <em>modern workforce.</em>
        </h1>
        <p>Insights on remote work, career development, global talent and building high-performing distributed teams.</p>
      </section>

      <section className="section light">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', maxWidth: '1100px', margin: 'auto' }}>
          {posts.map((p, i) => (
            <article key={i} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{p.date}</span>
              <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '12px 0' }}>{p.title}</h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', flex: 1, margin: '0 0 16px' }}>{p.excerpt}</p>
              <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Read article <ChevronRight size={14} />
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function About({ go }: { go: (p: string) => void }) {
  return (
    <>
      <section className="page-hero">
        <span className="kicker">ABOUT ZENITH GLOBAL INNOVATION</span>
        <h1>
          People first.<br />
          <em>Possibility always.</em>
        </h1>
        <p>
          Since 2019, Zenith Global Innovation has connected high-caliber professionals with forward-thinking organizations across New York, London, Singapore and Toronto.
        </p>
      </section>

      <section className="section">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <ShieldCheck size={52} color="#2563eb" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '32px', color: '#0f172a', margin: '0 0 16px' }}>
              Global by design. <em>Human at heart.</em>
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.8', maxWidth: '720px', margin: '0 auto' }}>
              Our model combines rigorous credential assessment, clear remuneration transparency, autonomous remote collaboration, and long-term enterprise partnerships.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <div style={{ background: '#f8fafc', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'inline-flex', padding: '10px', background: '#eff6ff', borderRadius: '10px', color: '#2563eb', marginBottom: '14px' }}>
                <Globe2 size={24} />
              </div>
              <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 10px' }}>Worldwide Reach</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Operations spanning North America, Europe, the Middle East, and Asia-Pacific. We bridge borders to match companies with qualified professionals in real time.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'inline-flex', padding: '10px', background: '#ecfdf5', borderRadius: '10px', color: '#16a34a', marginBottom: '14px' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 10px' }}>Executive Vetting</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Structured multi-stage screening evaluating technical capability, autonomous delivery, and international team leadership before client placement.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'inline-flex', padding: '10px', background: '#fef3c7', borderRadius: '10px', color: '#d97706', marginBottom: '14px' }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 10px' }}>Guaranteed 3–5 Day Response</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Every applicant receives an official tracking reference with live stage progress and scheduled review windows. No candidate is left in the dark.
              </p>
            </div>
          </div>

          {/* Compliance & Cookie Policy Banner in About Section */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0a192f 0%, #1e3a5f 100%)',
              borderRadius: '20px',
              padding: '36px 40px',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              boxShadow: '0 12px 30px rgba(10, 25, 47, 0.15)',
            }}
          >
            <div style={{ maxWidth: '580px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', marginBottom: '8px' }}>
                <FileText size={14} /> Data Protection & Cookie Governance
              </div>
              <h3 style={{ margin: '0 0 10px', fontSize: '22px', color: '#ffffff', fontWeight: 800 }}>
                Cookie Policy & Privacy Transparency
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6 }}>
                Zenith Global Innovation adheres to strict global data governance (GDPR & CCPA). Learn how we use essential cookies, protect candidate data, and respect your browser privacy.
              </p>
            </div>
            <div>
              <button
                className="btn primary"
                onClick={() => go('cookies')}
                style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '14px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
              >
                Read Cookie Policy <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CookiePolicy({ go }: { go: (p: string) => void }) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => {
    try {
      return localStorage.getItem('zenith_analytics_cookies') !== 'disabled';
    } catch {
      return true;
    }
  });
  const [savedFeedback, setSavedFeedback] = useState(false);

  const toggleAnalytics = () => {
    const next = !analyticsEnabled;
    setAnalyticsEnabled(next);
    try {
      localStorage.setItem('zenith_analytics_cookies', next ? 'enabled' : 'disabled');
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 3000);
    } catch {}
  };

  return (
    <>
      <section className="page-hero">
        <span className="kicker">LEGAL & PRIVACY GOVERNANCE</span>
        <h1>Cookie Policy</h1>
        <p>
          Transparent disclosure on how Zenith Global Innovation uses cookies and browser storage to deliver secure, frictionless recruitment operations.
        </p>
      </section>

      <section className="section light">
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gap: '32px' }}>
          
          {/* Interactive Preferences Card */}
          <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#2563eb" /> Manage Your Cookie Preferences
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
              Customize your browser storage settings for Zenith Global Innovation. Essential cookies required for security and application integrity cannot be disabled.
            </p>

            <div style={{ display: 'grid', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ maxWidth: '580px' }}>
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>Strictly Essential Cookies</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Required for CSRF security, resume uploads, application submission tokens, and tracking reference lookups.</p>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '4px 10px', borderRadius: '999px', letterSpacing: '0.05em' }}>
                  ALWAYS ACTIVE
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ maxWidth: '580px' }}>
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>Referral Source & Performance Attribution</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Remembers where you discovered our job listings (e.g. LinkedIn, RemoteOK) to optimize recruitment pipelines.</p>
                </div>
                <button
                  type="button"
                  onClick={toggleAnalytics}
                  style={{
                    background: analyticsEnabled ? '#2563eb' : '#e2e8f0',
                    color: analyticsEnabled ? '#ffffff' : '#64748b',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {analyticsEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>

            {savedFeedback && (
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#15803d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> Preferences successfully updated.
              </div>
            )}
          </div>

          {/* Policy Text Blocks */}
          <div style={{ background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'grid', gap: '24px', lineHeight: 1.7, fontSize: '14px', color: '#475569' }}>
            <div>
              <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 10px' }}>1. Introduction</h2>
              <p style={{ margin: 0 }}>
                Zenith Global Innovation ("we," "our," or "us") is dedicated to safeguarding the privacy and personal information of applicants, clients, and website visitors. This Cookie Policy explains how cookies, local browser storage, and related technologies are utilized on our career and recruitment portal.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 10px' }}>2. What Are Cookies?</h2>
              <p style={{ margin: 0 }}>
                Cookies are small data files placed on your computer, tablet, or smartphone when you visit a website. Modern web applications also utilize browser <code>sessionStorage</code> and <code>localStorage</code> to ensure seamless state preservation, such as remembering your application reference code or active job filters without requiring recurring server logins.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 10px' }}>3. How Zenith Uses Cookies & Local Storage</h2>
              <ul style={{ paddingLeft: '20px', margin: '8px 0 0', display: 'grid', gap: '8px' }}>
                <li><strong>Application Intake Integrity:</strong> Retains active form progress and uploaded resume metadata while you complete your submission.</li>
                <li><strong>Application Tracking:</strong> Remembers your unique reference code (e.g. <code>ZGI-2026-XXXXXX</code>) so you can return to check review status without friction.</li>
                <li><strong>Referral Source Attribution:</strong> Captures incoming campaign parameters (e.g. <code>?source=linkedin</code> or <code>?source=remoteok</code>) to identify high-performing recruitment channels.</li>
                <li><strong>Administrative Security:</strong> Authenticates corporate directors accessing the private recruitment management portal (#admin).</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 10px' }}>4. No Third-Party Ad Networks or Data Brokering</h2>
              <p style={{ margin: 0 }}>
                Zenith Global Innovation does not sell, rent, or monetize candidate data. We do not place third-party advertising tracking pixels (such as commercial ad trackers) on our website. All candidate data collected through applications is strictly utilized for employment evaluation.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 10px' }}>5. Managing and Disabling Cookies</h2>
              <p style={{ margin: 0 }}>
                You have the right to accept or refuse cookies. You can configure your browser settings to decline or delete cookies at any time. Please note that disabling essential cookies may impact specific portal features, such as application tracking status lookups.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 10px' }}>6. Questions & Data Protection Officer Contact</h2>
              <p style={{ margin: 0 }}>
                If you have questions regarding this Cookie Policy, your privacy rights, or request deletion of your applicant records, please contact our Legal & Privacy Directorate:
              </p>
              <div style={{ marginTop: '12px', background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }}>
                <strong>Zenith Global Innovation Legal & Compliance</strong><br />
                Email: <a href="mailto:zenithglobalinnovationhq@protonmail.com" style={{ color: '#2563eb', textDecoration: 'none' }}>zenithglobalinnovationhq@protonmail.com</a><br />
                Headquarters: New York, NY · United States<br />
                Operations: London · Singapore · Toronto
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn primary" onClick={() => go('careers')}>
                Explore Careers <ArrowRight size={16} />
              </button>
              <button className="btn" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a' }} onClick={() => go('about')}>
                About Zenith Global
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Contact() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  return (
    <>
      <section className="page-hero">
        <span className="kicker">CONTACT</span>
        <h1>
          Let's make<br />
          <em>something work.</em>
        </h1>
        <p>Reach Zenith Global Innovation for hiring, careers, complaints and partnership enquiries.</p>
      </section>

      <section className="section contact">
        <div>
          <b>Official Company Email</b>
          <a href="mailto:zenithglobalinnovationhq@protonmail.com">zenithglobalinnovationhq@protonmail.com</a>
          <b>General Enquiries & Management</b>
          <span>For general enquiries, complaints, management correspondence and company-related matters.</span>
          <b>Headquarters</b>
          <span>New York, NY · United States</span>
          <b>International Operational Centers</b>
          <span>London · Singapore · Toronto</span>
        </div>

        {done ? (
          <div className="success">
            <Check size={44} />
            <h2>Message received.</h2>
            <p>Our talent and partnership team will review your message and respond shortly.</p>
          </div>
        ) : (
          <form
            className="form"
            onSubmit={async e => {
              e.preventDefault();
              setSubmitting(true);
              setFormError('');
              const fd = new FormData(e.currentTarget);
              try {
                await api.post('/api/leads', {
                  name: fd.get('name'),
                  email: fd.get('email'),
                  company: fd.get('company'),
                  message: fd.get('message'),
                  kind: 'contact',
                });
                setDone(true);
              } catch (err: any) {
                setFormError(err?.response?.data?.message || 'Failed to submit message. Please check all fields.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {formError && (
              <div style={{ gridColumn: '1 / -1', background: '#fef2f2', color: '#b91c1c', padding: '12px 14px', borderRadius: '8px', fontSize: '13px', border: '1px solid #fecaca' }}>
                {formError}
              </div>
            )}
            <label>
              Full name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email address
              <input name="email" type="email" required placeholder="your.email@example.com" />
            </label>
            <label>
              Company / Organization
              <input name="company" required placeholder="Organization name" />
            </label>
            <label className="wide">
              Message or inquiry
              <textarea name="message" required placeholder="How can Zenith assist your team or career?" />
            </label>
            <button className="btn primary full" disabled={submitting}>
              {submitting ? 'Sending inquiry...' : 'Send request'} <ArrowRight size={16} />
            </button>
          </form>
        )}
      </section>
    </>
  );
}

function TrackApplication({
  initialRef,
  go,
}: {
  initialRef?: string;
  go: (p: string, ref?: string) => void;
}) {
  const [refInput, setRefInput] = useState(initialRef || '');
  const [loading, setLoading] = useState(false);
  const [appData, setAppData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const performLookup = async (targetRef?: string) => {
    const r = (targetRef !== undefined ? targetRef : refInput).trim();
    if (!r) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.get(`/api/applications/${encodeURIComponent(r)}`);
      setAppData(res.data);
    } catch (err: any) {
      setAppData(null);
      setErrorMsg(
        err?.response?.data?.message ||
          `No application record found for reference "${r}". Please verify your reference code.`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      setRefInput(initialRef);
      performLookup(initialRef);
    }
  }, [initialRef]);

  // Map 10 pipeline statuses to 5 visual milestones
  const getStageNumber = (status: string) => {
    switch (status) {
      case 'Application Received':
        return 1;
      case 'Under Review':
      case 'Shortlisted':
        return 2;
      case 'Assessment Sent':
      case 'Assessment Completed':
        return 3;
      case 'Interview':
      case 'Final Review':
        return 4;
      case 'Offer':
      case 'Hired':
      case 'Rejected':
        return 5;
      default:
        return 1;
    }
  };

  const currentStage = appData ? getStageNumber(appData.status) : 0;

  const stages = [
    {
      num: 1,
      title: 'Application Received',
      desc: 'Complete application, resume and declarations safely logged in database.',
    },
    {
      num: 2,
      title: 'Recruitment Review',
      desc: 'Screening of academic qualifications and relevant professional experience.',
    },
    {
      num: 3,
      title: 'Assessment & Verification',
      desc: 'Evaluation of domain competencies, credentials, and portfolio.',
    },
    {
      num: 4,
      title: 'Interviews',
      desc: 'Direct discussions with hiring leaders and talent directors.',
    },
    {
      num: 5,
      title: 'Final Decision & Offer',
      desc: 'Candidate selection, formal contract preparation, and placement.',
    },
  ];

  return (
    <>
      <section className="page-hero">
        <span className="kicker">CANDIDATE SELF-SERVICE PORTAL</span>
        <h1>
          Track your<br />
          <em>application status.</em>
        </h1>
        <p>
          Enter your unique Zenith application reference (e.g. <b>ZGI-2026-XXXXXX</b>) to verify real-time recruitment pipeline progress.
        </p>
      </section>

      <section className="section light">
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Search Form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              performLookup();
            }}
            style={{
              display: 'flex',
              gap: '12px',
              background: '#ffffff',
              padding: '12px 16px',
              borderRadius: '16px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 20px rgba(16, 36, 62, 0.05)',
              marginBottom: '36px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px' }}>
              <Search size={20} color="#64748b" />
              <input
                value={refInput}
                onChange={e => setRefInput(e.target.value.toUpperCase())}
                placeholder="Enter Reference (e.g. ZGI-2026-60J5E3)"
                style={{
                  border: 0,
                  outline: 0,
                  width: '100%',
                  fontSize: '15px',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  color: '#0f172a',
                }}
              />
            </div>
            <button className="btn primary" disabled={loading} style={{ padding: '12px 24px' }}>
              {loading ? 'Verifying...' : 'Check Status'} <ArrowRight size={16} />
            </button>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div
              style={{
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '16px',
                padding: '24px',
                color: '#991b1b',
                marginBottom: '32px',
              }}
            >
              <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '15px', display: 'block', marginBottom: '4px' }}>
                  Application Not Located
                </strong>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#b91c1c' }}>
                  {errorMsg} If you recently submitted your application, please confirm you copied the full tracking code from your confirmation screen or email.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px' }}>
                  Need assistance? Contact{' '}
                  <a href="mailto:zenithglobalinnovationhq@protonmail.com" style={{ color: '#2563eb', fontWeight: 700 }}>
                    zenithglobalinnovationhq@protonmail.com
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {appData && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: '0 10px 40px rgba(16, 36, 62, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '24px',
                  marginBottom: '32px',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <span className="kicker">OFFICIAL APPLICATION RECORD</span>
                  <h2 style={{ fontSize: '26px', margin: '4px 0', color: '#0f172a' }}>
                    {appData.jobTitle}
                  </h2>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b', marginTop: '6px', flexWrap: 'wrap' }}>
                    <span>
                      Reference: <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{appData.reference}</strong>
                    </span>
                    <span>
                      Applicant: <strong>{appData.applicantName}</strong>
                    </span>
                    <span>
                      Country: <strong>{appData.country || 'International'}</strong>
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontWeight: 800,
                      background:
                        appData.status === 'Hired' || appData.status === 'Offer'
                          ? '#dcfce7'
                          : appData.status === 'Rejected'
                          ? '#fee2e2'
                          : '#eff6ff',
                      color:
                        appData.status === 'Hired' || appData.status === 'Offer'
                          ? '#15803d'
                          : appData.status === 'Rejected'
                          ? '#b91c1c'
                          : '#1d4ed8',
                      border: '1px solid currentColor',
                    }}
                  >
                    ● {appData.status}
                  </span>
                </div>
              </div>

              {(appData.status === 'Shortlisted' || appData.status === 'Interview') && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, #0a192f 0%, #1e3a5f 100%)',
                    borderRadius: '16px',
                    padding: '24px 28px',
                    color: '#ffffff',
                    marginBottom: '32px',
                    boxShadow: '0 10px 25px rgba(10, 25, 47, 0.15)',
                  }}
                >
                  <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: '#fef3c7', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                    ● Official Action Required · Candidate Shortlisted
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                    Congratulations! Your Profile Has Advanced to Stage Screening
                  </h3>
                  <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    Due to your high credential score, you have been assigned directly to our recruitment team for initial screening, company files distribution, and interview onboarding.
                  </p>

                  <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '16px', marginBottom: '18px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Assigned Channel:</span>
                        <strong>{appData.interviewChannel || appData.preferredChannel || 'Telegram'}</strong>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Recruiter Handle:</span>
                        <strong style={{ color: '#60a5fa' }}>{appData.interviewContact || '@ZenithTalentLead'}</strong>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Access Window:</span>
                        <strong style={{ color: '#fbbf24' }}>{appData.interviewDeadline || 'Within 48 hours'}</strong>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Required Reference Quote:</span>
                        <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', color: '#f8fafc', fontWeight: 800 }}>{appData.reference}</code>
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const ch = (appData.interviewChannel || appData.preferredChannel || 'Telegram').toLowerCase();
                    const isWa = ch.includes('whatsapp');
                    const isZangi = ch.includes('zangi');
                    const rawContact = String(appData.interviewContact || (isWa ? '+18004923684' : isZangi ? '10-9988-7766' : '@ZenithTalentLead'));
                    const zangiNum = rawContact.replace(/[^0-9]/g, '');
                    const link = isWa
                      ? `https://wa.me/${rawContact.replace(/[^0-9]/g, '')}?text=Hello%2C%20quoting%20reference%20${appData.reference}%20for%20my%20Zenith%20interview.`
                      : isZangi
                      ? (zangiNum ? `https://zangi.com/dl?number=${zangiNum}` : 'https://zangi.com')
                      : `https://t.me/${rawContact.replace(/^@/, '')}`;
                    const bg = isWa ? '#16a34a' : isZangi ? '#ea580c' : '#2563eb';
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: bg,
                              color: '#ffffff',
                              padding: '10px 20px',
                              borderRadius: '10px',
                              fontWeight: 700,
                              textDecoration: 'none',
                              fontSize: '13px',
                            }}
                          >
                            Message Screening Director on {appData.interviewChannel || appData.preferredChannel || 'Telegram'} <ArrowRight size={16} />
                          </a>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                            Strict 48-hour deadline applies to secure your interview slot.
                          </span>
                        </div>
                        {isZangi && (
                          <div style={{ background: 'rgba(234, 88, 12, 0.15)', border: '1px solid #ea580c', borderRadius: '8px', padding: '10px 14px', marginTop: '4px', fontSize: '12px', color: '#fed7aa', lineHeight: 1.5 }}>
                            💬 <strong>Zangi Safe Messenger Instructions:</strong> Open your Zangi app, tap <em>New Chat / Add Contact</em>, search Recruiter Number <strong>{rawContact}</strong>, and send your reference code <strong>{appData.reference}</strong>.
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 5-Step Visual Stepper */}
              <h3 style={{ fontSize: '17px', color: '#0f172a', marginBottom: '20px' }}>
                Recruitment Progress Pipeline
              </h3>
              <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                {stages.map(st => {
                  const isDone = currentStage > st.num;
                  const isCurrent = currentStage === st.num;
                  return (
                    <div
                      key={st.num}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'flex-start',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: isCurrent ? '#eff6ff' : isDone ? '#f8fafc' : '#ffffff',
                        border: `1px solid ${isCurrent ? '#3b82f6' : isDone ? '#bbf7d0' : '#e2e8f0'}`,
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '13px',
                          fontWeight: 800,
                          flexShrink: 0,
                          background: isDone ? '#22c55e' : isCurrent ? '#2563eb' : '#e2e8f0',
                          color: isDone || isCurrent ? '#ffffff' : '#64748b',
                        }}
                      >
                        {isDone ? '✓' : st.num}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <strong
                            style={{
                              fontSize: '14px',
                              color: isCurrent ? '#1e40af' : '#0f172a',
                            }}
                          >
                            {st.title}
                          </strong>
                          {isCurrent && (
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              Current Stage
                            </span>
                          )}
                          {isDone && (
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a' }}>
                              Completed
                            </span>
                          )}
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Review Timeline Details Box */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                }}
              >
                <div>
                  <small style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Submission Timestamp
                  </small>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#0f172a', fontWeight: 600 }}>
                    {appData.submittedAt ? new Date(appData.submittedAt).toLocaleDateString() : '—'}
                  </p>
                </div>
                <div>
                  <small style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Expected Review Timeline
                  </small>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#0f172a', fontWeight: 600 }}>
                    3–5 business days
                  </p>
                </div>
                <div>
                  <small style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Estimated Response Date
                  </small>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#2563eb', fontWeight: 700 }}>
                    {appData.estimatedResponseDate || 'Within review window'}
                  </p>
                </div>
                <div>
                  <small style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Official Recruitment Contact
                  </small>
                  <p style={{ margin: '4px 0 0', fontSize: '12px' }}>
                    <a href="mailto:zenithglobalinnovationhq@protonmail.com" style={{ color: '#2563eb', textDecoration: 'none' }}>
                      zenithglobalinnovationhq@protonmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Guidance Box when no search yet */}
          {!appData && !errorMsg && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '36px',
                textAlign: 'center',
              }}
            >
              <FileText size={44} color="#2563eb" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 10px' }}>
                How Zenith Tracks Your Candidacy
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.7', maxWidth: '580px', margin: '0 auto 24px' }}>
                Every applicant receives a persistent reference code formatted as <code>ZGI-2026-XXXXXX</code>. As our talent directors and corporate hiring managers assess qualifications, interview candidates, and make hiring decisions, all stage transitions reflect live here.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn primary" onClick={() => go('careers')}>
                  Browse Open Positions <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
