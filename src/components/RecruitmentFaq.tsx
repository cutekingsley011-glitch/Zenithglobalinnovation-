import React, { useEffect, useState, useRef } from 'react';
import {
  Search,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  X,
  Mail,
} from 'lucide-react';
import { api } from '../lib/api';
import {
  FAQ_CATEGORIES,
  queryFaqs,
  type FaqContext,
  type FaqItem,
} from '../../backend/faqsData';

interface RecruitmentFaqProps {
  context?: FaqContext;
  go: (page: string) => void;
  compact?: boolean;
  emitSchema?: boolean;
  heading?: string;
  subheading?: string;
}

const CONTEXT_COPY: Record<
  FaqContext,
  { kicker: string; heading: string; subheading: string }
> = {
  all: {
    kicker: 'RECRUITMENT KNOWLEDGE BASE',
    heading: 'Frequently Asked Questions',
    subheading:
      'Instant answers on compensation bands, application stages, reference tracking, global eligibility, and candidate data protection.',
  },
  seekers: {
    kicker: 'CANDIDATE RECRUITMENT FAQ',
    heading: 'Questions about applying at Zenith?',
    subheading:
      'Get immediate clarity on how salaries are determined, what happens after you apply, and how our 3–5 business day review works.',
  },
  careers: {
    kicker: 'HIRING & COMPENSATION FAQ',
    heading: 'Before you apply: quick answers',
    subheading:
      'Common questions from candidates browsing our 81 remote vacancies across executive, technical, and specialist tracks.',
  },
  track: {
    kicker: 'TRACKING & TIMELINE FAQ',
    heading: 'Questions about your application status?',
    subheading:
      'Review milestone timelines, shortlist onboarding instructions, and reference code recovery steps before emailing support.',
  },
  contact: {
    kicker: 'INSTANT SELF-SERVICE ANSWERS',
    heading: 'Find answers immediately before emailing',
    subheading:
      'Most recruitment, salary, and tracking questions are answered below without waiting for an email reply.',
  },
  clients: {
    kicker: 'PARTNERSHIP & TALENT FAQ',
    heading: 'Hiring & engagement questions',
    subheading:
      'Key details on how Zenith vets international talent, structures engagements, and manages remote compensation.',
  },
  home: {
    kicker: 'RECRUITMENT FAQ',
    heading: 'Common candidate questions',
    subheading:
      'Clear, upfront answers on our hiring process, salary determination, and global remote eligibility.',
  },
};

export function RecruitmentFaq({
  context = 'seekers',
  go,
  compact = false,
  emitSchema = false,
  heading,
  subheading,
}: RecruitmentFaqProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [categories, setCategories] = useState<string[]>(FAQ_CATEGORIES);
  const [totalCount, setTotalCount] = useState<number>(14);
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<Record<string, 'yes' | 'no'>>({});
  const requestSeq = useRef(0);

  const copy = CONTEXT_COPY[context] || CONTEXT_COPY.all;

  // Debounce search input cleanly
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 180);
    return () => clearTimeout(timer);
  }, [query]);

  // Dynamically load relevant questions from /api/faqs with resilient local fallback
  useEffect(() => {
    const seq = ++requestSeq.current;
    let cancelled = false;

    const loadFaqs = async () => {
      setLoading(true);
      const isFiltered = Boolean(debouncedQuery) || activeCategory !== 'All';
      const limit = compact && !isFiltered ? 6 : undefined;

      try {
        const searchParams = new URLSearchParams({ context });
        if (activeCategory !== 'All') searchParams.set('category', activeCategory);
        if (debouncedQuery) searchParams.set('q', debouncedQuery);
        if (limit) searchParams.set('limit', String(limit));

        const res = await api.get(`/api/faqs?${searchParams.toString()}`);
        if (cancelled || seq !== requestSeq.current) return;

        const payload = res.data;
        if (payload && Array.isArray(payload.faqs)) {
          setFaqs(payload.faqs);
          if (Array.isArray(payload.categories) && payload.categories.length > 0) {
            setCategories(payload.categories);
          }
          setTotalCount(Number(payload.totalCount) || payload.faqs.length);
          setFilteredCount(Number(payload.filteredCount) ?? payload.faqs.length);
          if (payload.faqs.length > 0) {
            setOpenIds(prev => {
              const hasAnyOpen = payload.faqs.some((item: FaqItem) => prev[item.id]);
              return hasAnyOpen ? prev : { [payload.faqs[0].id]: true };
            });
          }
          setLoading(false);
          return;
        }
      } catch {
        // Fallback smoothly to canonical shared FAQ query engine
      }

      if (cancelled || seq !== requestSeq.current) return;
      const fallback = queryFaqs({
        context,
        category: activeCategory === 'All' ? undefined : activeCategory,
        q: debouncedQuery || undefined,
        limit,
      });
      setFaqs(fallback.faqs);
      setCategories(fallback.categories);
      setTotalCount(fallback.totalCount);
      setFilteredCount(fallback.filteredCount);
      if (fallback.faqs.length > 0) {
        setOpenIds(prev => {
          const hasAnyOpen = fallback.faqs.some(item => prev[item.id]);
          return hasAnyOpen ? prev : { [fallback.faqs[0].id]: true };
        });
      }
      setLoading(false);
    };

    loadFaqs();
    return () => {
      cancelled = true;
    };
  }, [context, activeCategory, debouncedQuery, compact]);

  // Optionally emit Schema.org FAQPage JSON-LD on primary FAQ views (never conflicting with JobPosting)
  useEffect(() => {
    if (!emitSchema || typeof document === 'undefined' || faqs.length === 0) {
      return;
    }
    const scriptId = 'zenith-faq-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
    script.textContent = JSON.stringify(schema, null, 2);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [emitSchema, faqs]);

  const toggleItem = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allExpanded = faqs.length > 0 && faqs.every(item => Boolean(openIds[item.id]));

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIds({});
    } else {
      const next: Record<string, boolean> = {};
      faqs.forEach(item => {
        next[item.id] = true;
      });
      setOpenIds(next);
    }
  };

  const resetSearchAndCategory = () => {
    setQuery('');
    setDebouncedQuery('');
    setActiveCategory('All');
  };

  return (
    <div className="faq-wrapper">
      <div className="faq-header">
        <div>
          <span className="kicker">{copy.kicker}</span>
          <h2>{heading || copy.heading}</h2>
          <p>{subheading || copy.subheading}</p>
        </div>
        {faqs.length > 1 && (
          <button type="button" className="faq-toggle-all" onClick={toggleAll}>
            {allExpanded ? 'Collapse all' : 'Expand all'}
          </button>
        )}
      </div>

      {/* Live Dynamic Search */}
      <div className="faq-controls">
        <div className="faq-search">
          <Search size={17} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search recruitment questions (e.g. salary, after I apply, reference code, countries)..."
            aria-label="Search recruitment frequently asked questions"
          />
          {query && (
            <button
              type="button"
              className="faq-clear-icon"
              onClick={() => setQuery('')}
              aria-label="Clear FAQ search"
            >
              <X size={15} />
            </button>
          )}
          <span className="faq-count">
            {loading ? 'Loading...' : `${faqs.length} of ${totalCount}`}
          </span>
        </div>

        {/* Category Filter Tabs */}
        {!compact && (
          <div className="faq-tabs" role="tablist" aria-label="Filter FAQ by category">
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`faq-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Accordion List */}
      <div className="faq-list">
        {loading && faqs.length === 0 ? (
          Array.from({ length: compact ? 4 : 6 }).map((_, idx) => (
            <div key={idx} className="faq-skeleton" aria-hidden="true">
              <div className="faq-skeleton-line" />
            </div>
          ))
        ) : faqs.length === 0 ? (
          <div className="faq-empty">
            <HelpCircle size={32} color="#64748b" />
            <h3>No matching questions found</h3>
            <p>
              We couldn't find an FAQ matching &ldquo;{debouncedQuery}&rdquo;. Try another keyword or clear your filters.
            </p>
            <div className="faq-empty-actions">
              <button type="button" className="btn primary" onClick={resetSearchAndCategory}>
                Show All Questions
              </button>
              <button
                type="button"
                className="btn"
                style={{ background: '#ffffff', color: '#10243e', border: '1px solid #cbd5e1' }}
                onClick={() => go('contact')}
              >
                Ask Our Recruitment Team
              </button>
            </div>
          </div>
        ) : (
          faqs.map(item => {
            const isOpen = Boolean(openIds[item.id]);
            const vote = feedback[item.id];
            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="faq-trigger-text">
                    <span className="faq-category-label">{item.category}</span>
                    <strong>{item.question}</strong>
                  </div>
                  <ChevronDown size={19} className="faq-chevron" />
                </button>

                {isOpen && (
                  <div id={`faq-panel-${item.id}`} className="faq-panel">
                    <p>{item.answer}</p>

                    <div className="faq-panel-footer">
                      {item.action && (
                        <button
                          type="button"
                          className="faq-action-link"
                          onClick={() => go(item.action!.targetPage)}
                        >
                          {item.action.label} <ArrowRight size={14} />
                        </button>
                      )}

                      <div className="faq-feedback">
                        {vote === 'yes' ? (
                          <span className="faq-feedback-thanks">
                            <CheckCircle2 size={14} /> Glad this helped.
                          </span>
                        ) : vote === 'no' ? (
                          <div className="faq-escalation">
                            <span>
                              Need direct assistance? Include your <strong>ZGI reference code</strong> and{' '}
                              <strong>role title</strong> so we can resolve it in one reply.
                            </span>
                            <button
                              type="button"
                              className="faq-escalation-btn"
                              onClick={() => go('contact')}
                            >
                              <Mail size={13} /> Contact Support
                            </button>
                          </div>
                        ) : (
                          <>
                            <span>Was this helpful?</span>
                            <button
                              type="button"
                              onClick={() => setFeedback(prev => ({ ...prev, [item.id]: 'yes' }))}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setFeedback(prev => ({ ...prev, [item.id]: 'no' }))}
                            >
                              Still need help
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer CTA for compact views or full directory escalation */}
      <div className="faq-footer-bar">
        {compact && filteredCount < totalCount && !debouncedQuery ? (
          <>
            <span>
              Showing {faqs.length} key questions for this page ({totalCount} total in our recruitment knowledge base).
            </span>
            <button type="button" className="text-btn" onClick={() => go('faq')}>
              View all {totalCount} recruitment FAQs <ArrowRight size={15} />
            </button>
          </>
        ) : (
          <>
            <span>
              Already applied? Check live milestone updates anytime with your <code>ZGI-2026-XXXXXX</code> code.
            </span>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button type="button" className="text-btn" onClick={() => go('track')}>
                Track Application <ArrowRight size={15} />
              </button>
              {context !== 'contact' && (
                <button type="button" className="text-btn" onClick={() => go('contact')}>
                  Contact Support <ArrowRight size={15} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecruitmentFaq;
