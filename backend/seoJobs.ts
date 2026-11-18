import seoData from './seoJobsData.json';
import builtAssets from './builtAssets.json';

export interface SeoJobEntry {
  slug: string;
  title: string;
  url: string;
  focus?: string;
  metaDescription?: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  baseSalary: {
    '@type': string;
    currency: string;
    value: {
      '@type': string;
      minValue: number;
      maxValue: number;
      unitText: string;
    };
  };
  applicantLocationRequirements: Array<{ '@type': string; name: string }>;
}

const allJobs: SeoJobEntry[] = (seoData as any).jobs || [];
const organizationNode: any = (seoData as any).organization || {};
const websiteNode: any = (seoData as any).website || {};

function normalizeSlug(input: string): string {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeHtml(text: string): string {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function findSeoJob(rawQuery: string): SeoJobEntry | undefined {
  if (!rawQuery) return undefined;
  const clean = normalizeSlug(rawQuery);
  if (!clean) return undefined;

  // 1. Exact slug or title match
  const exact = allJobs.find(
    j => normalizeSlug(j.slug) === clean || normalizeSlug(j.title) === clean
  );
  if (exact) return exact;

  // 2. Suffix match for sector-prefixed IDs, preferring the longest matching slug
  const suffixMatches = allJobs
    .filter(j => {
      const s = normalizeSlug(j.slug);
      return clean.endsWith(`-${s}`);
    })
    .sort((a, b) => b.slug.length - a.slug.length);
  if (suffixMatches.length > 0) return suffixMatches[0];

  // 3. Fallback partial match (e.g. legacy ?job=Chief-Technology-Officer without -CTO)
  return allJobs.find(j => {
    const s = normalizeSlug(j.slug);
    return clean.includes(s) || s.includes(clean);
  });
}

export function renderJobDetailHtml(job: SeoJobEntry, options?: { isDev?: boolean }): string {
  const canonicalUrl = `https://www.zenithglobalinnovation.com.ng/jobs/${encodeURIComponent(job.slug)}`;
  const minPay = job.baseSalary?.value?.minValue ?? 85000;
  const maxPay = job.baseSalary?.value?.maxValue ?? 180000;
  const salaryFormatted = `$${minPay.toLocaleString()}–$${maxPay.toLocaleString()} USD/yr`;
  const empTypeLabel = job.employmentType === 'CONTRACTOR' ? 'Contract · 100% Remote' : 'Full-time · 100% Remote';

  const pageTitle = `${job.title} – Remote (${salaryFormatted}) | Zenith Global Innovation`;
  const metaDesc =
    job.metaDescription ||
    `Remote ${job.title} (${salaryFormatted}, ${empTypeLabel}) focused on ${job.focus || 'high-impact global delivery'}. Apply directly at Zenith Global Innovation.`;

  const jobPostingNode = {
    '@type': 'JobPosting',
    '@id': `${canonicalUrl}#jobposting`,
    title: job.title,
    url: canonicalUrl,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      '@id': 'https://www.zenithglobalinnovation.com.ng/#organization',
      name: 'Zenith Global Innovation',
      sameAs: 'https://www.zenithglobalinnovation.com.ng',
      logo: 'https://www.zenithglobalinnovation.com.ng/logo.png',
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements:
      ((seoData as any).acceptedCountries && (seoData as any).acceptedCountries.length > 0)
        ? (seoData as any).acceptedCountries
        : job.applicantLocationRequirements,
    baseSalary: job.baseSalary,
    directApply: true,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Zenith Global Innovation',
      value: job.slug,
    },
  };

  const graphPayload = {
    '@context': 'https://schema.org',
    '@graph': [organizationNode, websiteNode, jobPostingNode],
  };

  const assets = builtAssets as { cssHrefs?: string[]; jsSrcs?: string[] };
  const cssTags = (assets.cssHrefs || [])
    .map(href => `<link rel="stylesheet" crossorigin href="${escapeHtml(href)}">`)
    .join('\n    ');

  const jsTags = options?.isDev
    ? `<script type="module" src="/src/main.tsx"></script>`
    : (assets.jsSrcs && assets.jsSrcs.length > 0
        ? assets.jsSrcs
            .map(src => `<script type="module" crossorigin src="${escapeHtml(src)}"></script>`)
            .join('\n    ')
        : `<script type="module" src="/src/main.tsx"></script>`);

  const postedDateDisplay = job.datePosted.slice(0, 10);

  return `<!doctype html>
<html lang="en">
  <head>
    <script>
      window.addEventListener('unhandledrejection', function(event) {
        if (event && event.reason) {
          var msg = event.reason.message || (typeof event.reason === 'string' ? event.reason : '');
          if (msg && (msg.indexOf('WebSocket') !== -1 || msg.indexOf('vite:ws') !== -1)) {
            event.preventDefault();
            if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
          }
        }
      });
      window.addEventListener('error', function(event) {
        if (event && event.message && (event.message.indexOf('WebSocket') !== -1 || event.message.indexOf('vite:ws') !== -1)) {
          event.preventDefault();
          if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
        }
      });
    </script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(metaDesc)}" />
    <meta name="keywords" content="${escapeHtml(job.title)}, remote career, executive staffing, Zenith Global Innovation, Google for Jobs, remote ${escapeHtml(empTypeLabel)}" />
    <meta name="author" content="Zenith Global Innovation" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#10243e" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

    <!-- OpenGraph Metadata -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:site_name" content="Zenith Global Innovation" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(metaDesc)}" />
    <meta property="og:image" content="https://www.zenithglobalinnovation.com.ng/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(job.title)} – Zenith Global Innovation" />

    <!-- Twitter / X Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />
    <meta name="twitter:image" content="https://www.zenithglobalinnovation.com.ng/og-image.jpg" />

    <!-- Single-Job Google for Jobs JSON-LD Structured Data -->
    <script id="zenith-ssr-job-jsonld" data-job-slug="${escapeHtml(job.slug)}" type="application/ld+json">
    ${JSON.stringify(graphPayload, null, 2)}
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    ${cssTags}
  </head>
  <body>
    <div id="root">
      <header style="padding: 16px 20px; background: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 960px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <a href="https://www.zenithglobalinnovation.com.ng/" style="display: inline-flex; align-items: center; text-decoration: none;">
            <img src="/logo.png" alt="Zenith Global Innovation" style="height: 38px; width: auto; display: block;" />
          </a>
          <a href="https://www.zenithglobalinnovation.com.ng/" style="color: #2563eb; font-weight: 700; font-size: 13px; text-decoration: none;">← Browse All 81 Open Roles</a>
        </div>
      </header>

      <main style="max-width: 960px; margin: 0 auto; padding: 36px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a;">
        <div style="margin-bottom: 12px; font-size: 12px; font-weight: 700; color: #2563eb; text-transform: uppercase;">
          ${escapeHtml(empTypeLabel)} · Posted ${escapeHtml(postedDateDisplay)}
        </div>
        <h1 style="font-size: 32px; font-weight: 800; margin: 0 0 14px; color: #0f172a;">
          ${escapeHtml(job.title)}
        </h1>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
          <strong style="color: #1e3a8a; font-size: 18px;">Compensation: ${escapeHtml(salaryFormatted)}</strong>
          <div style="font-size: 13px; color: #334155; margin-top: 4px;">
            100% Remote (Telecommute) · Direct Application Enabled · Assessment Response in 3–5 Business Days
          </div>
        </div>

        <article style="font-size: 15px; line-height: 1.7; color: #334155;">
          ${job.description}
        </article>

        <section style="margin-top: 32px; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Verified Employer &amp; Global Hubs</h2>
          <p style="margin: 0 0 10px; font-size: 13px; color: #475569;">
            Google Cloud Partner Verified · Meta Verified Business · BBB Accredited Business (A+ Rating) · 256-Bit SSL Encrypted Intake
          </p>
          <p style="margin: 0; font-size: 12.5px; color: #64748b;">
            Offices: New York (245 West 29th Street, 1350 Avenue of the Americas, 400 Park Avenue South) · London (82 Great Eastern Street, 152 City Road) · Singapore (10 Marina Boulevard, 1 Raffles Place) · Toronto (88 Queen's Quay West, 199 Bay Street)
          </p>
        </section>
      </main>
    </div>
    ${jsTags}
  </body>
</html>`;
}
