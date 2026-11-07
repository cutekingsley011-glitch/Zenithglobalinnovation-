/**
 * Zenith Global Innovation - Schema.org & Google for Jobs Validation Layer
 * Validates JSON-LD metadata embedded in index.html to guarantee strict compliance
 * with Google Search Console Rich Results and Google for Jobs crawler specifications.
 */

export interface ValidationIssue {
  field: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
}

export interface ValidatedJobPosting {
  title: string;
  url: string;
  datePosted: string;
  validThrough: string;
  salary: string;
  employmentType: string;
  directApply: boolean;
  isRemote: boolean;
  status: 'valid' | 'warning' | 'error';
  issues: ValidationIssue[];
}

export interface ValidatedOffice {
  city: string;
  region: string;
  country: string;
  addresses: string[];
}

export interface SchemaValidationReport {
  timestamp: string;
  totalJobs: number;
  validJobsCount: number;
  readinessScore: number;
  isGoogleRichResultsEligible: boolean;
  organizationName: string;
  organizationUrl: string;
  organizationEmail: string;
  offices: ValidatedOffice[];
  jobs: ValidatedJobPosting[];
  globalIssues: ValidationIssue[];
}

export const OFFICIAL_CORPORATE_OFFICES: ValidatedOffice[] = [
  {
    city: 'New York',
    region: 'NY',
    country: 'United States',
    addresses: [
      '245 West 29th Street, Suite 1204, New York, NY 10001',
      '1350 Avenue of the Americas, Floor 3, New York, NY 10018',
      '400 Park Avenue South, Suite 800, New York, NY 10022',
    ],
  },
  {
    city: 'London',
    region: 'Greater London',
    country: 'United Kingdom',
    addresses: [
      '82 Great Eastern Street, London EC2A 4NE',
      '152 City Road, London EC1V 9BD',
    ],
  },
  {
    city: 'Singapore',
    region: 'Singapore',
    country: 'Singapore',
    addresses: [
      '10 Marina Boulevard, Level 39, Singapore 018956',
      '1 Raffles Place, Tower 2, Singapore 049315',
    ],
  },
  {
    city: 'Toronto',
    region: 'ON',
    country: 'Canada',
    addresses: [
      "88 Queen's Quay West, Suite 1900, Toronto, ON M5V 2T6",
      '199 Bay Street, Commerce Court West, Toronto, ON M5H 2N2',
    ],
  },
];

export function validateSchemaGraph(rawJsonLd?: string | object): SchemaValidationReport {
  let parsed: any = null;
  const globalIssues: ValidationIssue[] = [];

  try {
    if (!rawJsonLd && typeof document !== 'undefined') {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script && script.textContent) {
        parsed = JSON.parse(script.textContent);
      }
    } else if (typeof rawJsonLd === 'string') {
      parsed = JSON.parse(rawJsonLd);
    } else if (typeof rawJsonLd === 'object') {
      parsed = rawJsonLd;
    }
  } catch (err: any) {
    globalIssues.push({
      field: 'JSON-LD Parser',
      severity: 'error',
      message: `Failed to parse JSON-LD: ${err.message}`,
    });
  }

  if (!parsed) {
    return {
      timestamp: new Date().toISOString(),
      totalJobs: 0,
      validJobsCount: 0,
      readinessScore: 0,
      isGoogleRichResultsEligible: false,
      organizationName: 'Zenith Global Innovation',
      organizationUrl: 'https://www.zenithglobalinnovation.com.ng',
      organizationEmail: 'zenithglobalinnovationhq@protonmail.com',
      offices: OFFICIAL_CORPORATE_OFFICES,
      jobs: [],
      globalIssues: [
        {
          field: 'Schema Graph',
          severity: 'error',
          message: 'No JSON-LD structured data script found in document head.',
        },
      ],
    };
  }

  const graph: any[] = Array.isArray(parsed['@graph'])
    ? parsed['@graph']
    : Array.isArray(parsed)
    ? parsed
    : [parsed];

  // Validate Organization
  const org = graph.find(item => item['@type'] === 'Organization');
  let orgName = 'Zenith Global Innovation';
  let orgUrl = 'https://www.zenithglobalinnovation.com.ng';
  let orgEmail = 'zenithglobalinnovationhq@protonmail.com';

  if (!org) {
    globalIssues.push({
      field: 'Organization',
      severity: 'warning',
      message: 'No Organization schema node found in graph.',
    });
  } else {
    orgName = org.name || orgName;
    orgUrl = org.url || orgUrl;
    orgEmail = org.email || orgEmail;
  }

  // Validate JobPostings
  const jobNodes = graph.filter(item => item['@type'] === 'JobPosting');
  const now = new Date();

  const validatedJobs: ValidatedJobPosting[] = jobNodes.map(j => {
    const issues: ValidationIssue[] = [];

    // Title validation
    if (!j.title || typeof j.title !== 'string' || j.title.trim().length < 3) {
      issues.push({
        field: 'title',
        severity: 'error',
        message: 'Missing or invalid job title.',
      });
    }

    // URL validation
    if (!j.url || typeof j.url !== 'string' || !j.url.startsWith('http')) {
      issues.push({
        field: 'url',
        severity: 'error',
        message: 'Missing valid canonical job URL.',
      });
    }

    // Description validation
    if (!j.description || typeof j.description !== 'string' || j.description.length < 50) {
      issues.push({
        field: 'description',
        severity: 'error',
        message: 'Description must be rich HTML and at least 50 characters.',
      });
    } else if (!j.description.includes('<p>') && !j.description.includes('<ul>')) {
      issues.push({
        field: 'description',
        severity: 'warning',
        message: 'Google for Jobs recommends HTML formatting (<p>, <ul>, <li>) for optimal display.',
      });
    }

    // datePosted validation
    if (!j.datePosted || isNaN(Date.parse(j.datePosted))) {
      issues.push({
        field: 'datePosted',
        severity: 'error',
        message: 'Missing or invalid ISO-8601 datePosted timestamp.',
      });
    }

    // validThrough validation
    let validThroughDate: Date | null = null;
    if (!j.validThrough || isNaN(Date.parse(j.validThrough))) {
      issues.push({
        field: 'validThrough',
        severity: 'error',
        message: 'Missing or invalid ISO-8601 validThrough expiration date.',
      });
    } else {
      validThroughDate = new Date(j.validThrough);
      if (validThroughDate < now) {
        issues.push({
          field: 'validThrough',
          severity: 'error',
          message: 'Job posting expiration date is in the past; Google will unindex expired roles.',
        });
      }
    }

    // Remote & Telecommute check
    const isRemote = j.jobLocationType === 'TELECOMMUTE';
    if (!isRemote && !j.jobLocation) {
      issues.push({
        field: 'jobLocationType',
        severity: 'error',
        message: 'Remote roles must specify jobLocationType: "TELECOMMUTE" or provide a physical jobLocation.',
      });
    }

    // Salary validation
    let salaryText = 'Competitive';
    if (j.baseSalary) {
      const val = j.baseSalary.value?.value || j.baseSalary.value;
      const curr = j.baseSalary.currency || 'USD';
      if (typeof val === 'number') {
        salaryText = `$${val.toLocaleString()} ${curr}/yr`;
      }
    } else {
      issues.push({
        field: 'baseSalary',
        severity: 'warning',
        message: 'Job postings with explicit baseSalary receive significantly higher Google for Jobs ranking.',
      });
    }

    // Direct apply validation
    const directApply = Boolean(j.directApply);
    if (!directApply) {
      issues.push({
        field: 'directApply',
        severity: 'warning',
        message: 'Setting directApply: true displays a prominent "Apply directly on Zenith" button in Google Search.',
      });
    }

    // Status calculation
    const hasError = issues.some(i => i.severity === 'error');
    const hasWarning = issues.some(i => i.severity === 'warning');
    const status: 'valid' | 'warning' | 'error' = hasError ? 'error' : hasWarning ? 'warning' : 'valid';

    return {
      title: j.title || 'Untitled Role',
      url: j.url || '',
      datePosted: j.datePosted || '',
      validThrough: j.validThrough || '',
      salary: salaryText,
      employmentType: j.employmentType || 'FULL_TIME',
      directApply,
      isRemote,
      status,
      issues,
    };
  });

  const validJobsCount = validatedJobs.filter(j => j.status === 'valid' || j.status === 'warning').length;
  const perfectlyValidCount = validatedJobs.filter(j => j.status === 'valid').length;
  
  let readinessScore = 0;
  if (validatedJobs.length > 0) {
    readinessScore = Math.round(
      ((perfectlyValidCount * 1.0 + (validJobsCount - perfectlyValidCount) * 0.8) / validatedJobs.length) * 100
    );
  }

  const isGoogleRichResultsEligible = readinessScore >= 80 && validatedJobs.every(j => j.status !== 'error');

  return {
    timestamp: new Date().toISOString(),
    totalJobs: validatedJobs.length,
    validJobsCount,
    readinessScore,
    isGoogleRichResultsEligible,
    organizationName: orgName,
    organizationUrl: orgUrl,
    organizationEmail: orgEmail,
    offices: OFFICIAL_CORPORATE_OFFICES,
    jobs: validatedJobs,
    globalIssues,
  };
}

// Auto-run validation in browser and attach to window for debugging & crawler testing
if (typeof window !== 'undefined') {
  try {
    (window as any).__ZENITH_SCHEMA_REPORT__ = validateSchemaGraph();
  } catch {}
}
