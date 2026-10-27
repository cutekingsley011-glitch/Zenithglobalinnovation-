import { useEffect, useMemo, useState } from 'react';
import { api } from './lib/api';
import { safeStorage } from './lib/storage';
import './admin.css';

const STATUSES = [
  'Application Received',
  'Under Review',
  'Shortlisted',
  'Assessment Sent',
  'Assessment Completed',
  'Interview',
  'Final Review',
  'Offer',
  'Hired',
  'Rejected',
];

interface AdminDashboardProps {
  onExit?: () => void;
}

export default function AdminDashboard({ onExit }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'leads' | 'pipeline' | 'analytics' | 'links'>('overview');
  const [rows, setRows] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [selected, setSelected] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [leadQuery, setLeadQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(() => safeStorage.getItem('zenith_admin_token') || '');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');
  const [drawerFeedback, setDrawerFeedback] = useState<{ text: string; isError?: boolean } | null>(null);

  // Job Board Link Generator state
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [selectedLinkRole, setSelectedLinkRole] = useState('');
  const [selectedLinkSource, setSelectedLinkSource] = useState('linkedin');
  const [customSourceTag, setCustomSourceTag] = useState('');
  const [linkCopiedMsg, setLinkCopiedMsg] = useState<string | null>(null);
  const [linkRoleQuery, setLinkRoleQuery] = useState('');

  // Status update email notification state
  const [selectedNextStatus, setSelectedNextStatus] = useState('');
  const [notifyCandidate, setNotifyCandidate] = useState(true);
  const [stageCustomNote, setStageCustomNote] = useState('');
  const [stageInterviewChannel, setStageInterviewChannel] = useState<'Telegram' | 'WhatsApp' | 'Zangi'>('Telegram');
  const [stageInterviewContact, setStageInterviewContact] = useState('@ZenithTalentLead');
  const [stageInterviewDeadline, setStageInterviewDeadline] = useState('Within 48 hours of receipt');
  const [updatingStage, setUpdatingStage] = useState(false);

  // Brevo transactional email status
  const [brevoInfo, setBrevoInfo] = useState<any>(null);
  const [checkingBrevo, setCheckingBrevo] = useState(false);
  const [testEmailSending, setTestEmailSending] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<string | null>(null);
  const [newBrevoKey, setNewBrevoKey] = useState('');
  const [savingBrevoKey, setSavingBrevoKey] = useState(false);
  const [brevoKeyFeedback, setBrevoKeyFeedback] = useState<{ text: string; isError?: boolean } | null>(null);

  const saveBrevoKey = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newBrevoKey.trim() || !token) return;
    setSavingBrevoKey(true);
    setBrevoKeyFeedback(null);
    try {
      const res = await api.post('/api/admin/brevo/key', { token, apiKey: newBrevoKey.trim() });
      if (res.data?.valid) {
        setBrevoKeyFeedback({ text: '✓ API Key verified and active!' });
        setNewBrevoKey('');
        await checkBrevoStatus();
      } else {
        setBrevoKeyFeedback({
          text: res.data?.warning || res.data?.message || 'Key saved, but verification failed.',
          isError: true,
        });
        await checkBrevoStatus();
      }
    } catch (err: any) {
      setBrevoKeyFeedback({
        text: err?.response?.data?.message || err?.message || 'Failed to update API key',
        isError: true,
      });
    } finally {
      setSavingBrevoKey(false);
    }
  };

  const checkBrevoStatus = async (activeToken?: string) => {
    const t = activeToken || token;
    if (!t) return;
    setCheckingBrevo(true);
    try {
      const res = await api.post('/api/admin/brevo/status', { token: t });
      setBrevoInfo(res.data);
    } catch (err: any) {
      setBrevoInfo({ configured: true, valid: false, error: err?.message || 'Failed to check status' });
    } finally {
      setCheckingBrevo(false);
    }
  };

  const sendTestBrevoEmail = async () => {
    if (!token) return;
    setTestEmailSending(true);
    setTestEmailResult(null);
    try {
      const res = await api.post('/api/admin/brevo/test', {
        token,
        recipientEmail: 'zenithglobalinnovationhq@protonmail.com',
      });
      setTestEmailResult(res.data?.message || 'Test email dispatched successfully!');
      await checkBrevoStatus();
    } catch (err: any) {
      setTestEmailResult(err?.response?.data?.error || err?.message || 'Test dispatch failed.');
    } finally {
      setTestEmailSending(false);
    }
  };

  const load = async (activeToken?: string) => {
    const t = activeToken || token;
    if (!t) return;
    setLoading(true);
    try {
      const [rApps, rLeads, rJobs] = await Promise.all([
        api.post('/api/admin/applications', { token: t }),
        api.post('/api/admin/leads', { token: t }).catch(() => ({ data: { leads: [] } })),
        api.get('/api/jobs').catch(() => ({ data: { jobs: [] } })),
      ]);
      setRows(rApps.data?.applications || []);
      setStats(rApps.data?.stats || {});
      setLeads(rLeads.data?.leads || []);
      if (rJobs.data?.jobs && rJobs.data.jobs.length > 0) {
        setAllJobs(rJobs.data.jobs);
        setSelectedLinkRole(prev => prev || rJobs.data.jobs[0].id || rJobs.data.jobs[0].title);
      }
    } catch (err: any) {
      console.error('Failed to load applications:', err);
      if (err?.response?.status === 401) {
        safeStorage.removeItem('zenith_admin_token');
        setToken('');
        setErrorMsg('Your session has expired. Please sign in again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      load(token);
      checkBrevoStatus(token);
    }
  }, [token]);

  useEffect(() => {
    if (selected) {
      setSelectedNextStatus(selected.status || STATUSES[0]);
      setStageCustomNote('');
      const pref = selected.preferredChannel;
      const prefChannel: 'Telegram' | 'WhatsApp' | 'Zangi' =
        pref === 'WhatsApp' ? 'WhatsApp' : pref === 'Zangi' ? 'Zangi' : 'Telegram';
      setStageInterviewChannel(prefChannel);
      const defaultContact =
        prefChannel === 'WhatsApp' ? '+1 (800) 492-3684' : prefChannel === 'Zangi' ? '10-9988-7766' : '@ZenithTalentLead';
      setStageInterviewContact(selected.interviewContact || defaultContact);
      setStageInterviewDeadline(selected.interviewDeadline || 'Within 48 hours of receipt');
    }
  }, [selected]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    try {
      const r = await api.post('/api/admin/login', {
        email: 'zenithglobalinnovationhq@protonmail.com',
        password,
      });
      const newToken = r.data.token;
      safeStorage.setItem('zenith_admin_token', newToken);
      setToken(newToken);
      setPassword('');
      await load(newToken);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || 'Unable to sign in. Please verify administrator credentials.');
    }
  }

  async function submitStatusUpdate() {
    if (!selected || !selectedNextStatus) return;
    setDrawerFeedback(null);
    setUpdatingStage(true);
    const isInterviewStage = selectedNextStatus === 'Shortlisted' || selectedNextStatus === 'Interview';
    try {
      const res = await api.post(`/api/admin/applications/${selected.id}/status`, {
        token,
        status: selectedNextStatus,
        notifyApplicant: notifyCandidate,
        customNote: stageCustomNote.trim() || undefined,
        interviewChannel: isInterviewStage ? stageInterviewChannel : undefined,
        interviewContact: isInterviewStage ? stageInterviewContact.trim() : undefined,
        interviewDeadline: isInterviewStage ? stageInterviewDeadline.trim() : undefined,
      });

      await load();
      setSelected({
        ...selected,
        status: selectedNextStatus,
        interviewChannel: isInterviewStage ? stageInterviewChannel : selected.interviewChannel,
        interviewContact: isInterviewStage ? stageInterviewContact.trim() : selected.interviewContact,
        interviewDeadline: isInterviewStage ? stageInterviewDeadline.trim() : selected.interviewDeadline,
      });

      if (res.data?.emailSent) {
        setDrawerFeedback({
          text: `Status updated to "${selectedNextStatus}" and update email dispatched via Brevo to ${selected.email}.`,
        });
      } else if (notifyCandidate) {
        setDrawerFeedback({
          text: `Status updated to "${selectedNextStatus}". Notification note: ${res.data?.emailError || 'Brevo API key not configured'}`,
        });
      } else {
        setDrawerFeedback({
          text: `Status updated to "${selectedNextStatus}". Candidate notification skipped per selection.`,
        });
      }

      setStageCustomNote('');
      setTimeout(() => setDrawerFeedback(null), 6000);
    } catch (err: any) {
      setDrawerFeedback({
        text: err?.response?.data?.message || 'Failed to update recruitment status',
        isError: true,
      });
    } finally {
      setUpdatingStage(false);
    }
  }

  async function updateLeadStatus(id: string, nextStatus: string) {
    try {
      await api.post(`/api/admin/leads/${id}/status`, { token, status: nextStatus });
      await load();
    } catch (err: any) {
      console.error(err);
    }
  }

  async function addNote() {
    if (!selected || !note.trim()) return;
    setDrawerFeedback(null);
    try {
      await api.post(`/api/admin/applications/${selected.id}/note`, { token, note });
      const newEntry = {
        note,
        adminEmail: 'zenithglobalinnovationhq@protonmail.com',
        createdAt: new Date().toISOString(),
      };
      setSelected({
        ...selected,
        adminNotes: [...(selected.adminNotes || []), newEntry],
      });
      setNote('');
      setDrawerFeedback({ text: 'Internal note saved successfully.' });
      setTimeout(() => setDrawerFeedback(null), 4000);
      await load();
    } catch (err: any) {
      setDrawerFeedback({
        text: err?.response?.data?.message || 'Failed to save note',
        isError: true,
      });
    }
  }

  function exportCsv() {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Role',
      'Country',
      'Nationality',
      'Reference',
      'Status',
      'Expected Salary',
      'Availability',
      'Submitted',
      'Email Sent',
    ];
    const lines = [
      headers,
      ...filtered.map(r => [
        r.name,
        r.email,
        r.phone,
        r.jobTitle,
        r.country,
        r.nationality,
        r.reference,
        r.status,
        r.expectedSalary,
        r.availability,
        r.submittedAt,
        r.emailSent ? 'Yes' : 'No',
      ]),
    ].map(a => a.map(v => '"' + String(v ?? '').replaceAll('"', '""') + '"').join(','));

    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenith-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = useMemo(
    () =>
      rows.filter(
        r =>
          (!query ||
            [r.name, r.email, r.reference, r.jobTitle, r.country, r.nationality, r.source, r.preferredChannel].some(v =>
              String(v || '').toLowerCase().includes(query.toLowerCase())
            )) &&
          (status === 'All' || r.status === status) &&
          (sourceFilter === 'All' || String(r.source || 'Direct').toLowerCase() === sourceFilter.toLowerCase())
      ),
    [rows, query, status, sourceFilter]
  );

  const filteredLeads = useMemo(
    () =>
      leads.filter(l =>
        !leadQuery ||
        [l.name, l.email, l.company, l.message].some(v =>
          String(v || '').toLowerCase().includes(leadQuery.toLowerCase())
        )
      ),
    [leads, leadQuery]
  );

  if (!token) {
    return (
      <div className="admin-gate">
        <form className="admin-card" onSubmit={login}>
          <b>ZG</b>
          <h1>Zenith Admin</h1>
          <p>Secure Recruitment Management Portal</p>
          <div className="admin-account">
            <small>ADMINISTRATOR ACCOUNT</small>
            <strong>Zenith Global Innovation</strong>
            <span>zenithglobalinnovationhq@protonmail.com</span>
          </div>
          <label>
            Administrator Password
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="Enter administrator password"
              required
            />
          </label>
          {errorMsg && <div className="admin-error">{errorMsg}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
            <button type="submit" className="admin-primary">
              Sign In to Dashboard
            </button>
            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="admin-secondary"
                style={{ width: '100%' }}
              >
                ← Return to Public Website
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside>
        <div className="admin-logo">
          <b>ZG</b>
          <span>
            ZENITH<small>ADMINISTRATION</small>
          </span>
        </div>
        <div className="admin-nav">
          <span
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </span>
          <span
            className={activeTab === 'applications' ? 'active' : ''}
            onClick={() => setActiveTab('applications')}
          >
            Applications ({rows.length})
          </span>
          <span
            className={activeTab === 'leads' ? 'active' : ''}
            onClick={() => setActiveTab('leads')}
          >
            Client Inquiries ({leads.length})
          </span>
          <span
            className={activeTab === 'pipeline' ? 'active' : ''}
            onClick={() => setActiveTab('pipeline')}
          >
            Recruitment Pipeline
          </span>
          <span
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </span>
          <span
            className={activeTab === 'links' ? 'active' : ''}
            onClick={() => setActiveTab('links')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <span>🔗 Job Board Links</span>
            <span style={{ fontSize: '10px', background: '#dbeafe', color: '#1d4ed8', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>Sharing</span>
          </span>
          <span
            onClick={() => {
              if (onExit) onExit();
              else {
                try {
                  window.location.hash = '';
                } catch {}
              }
            }}
          >
            Exit to Website
          </span>
        </div>
        <button
          onClick={async () => {
            try {
              await api.post('/api/admin/logout', { token });
            } finally {
              safeStorage.removeItem('zenith_admin_token');
              setToken('');
              if (onExit) onExit();
            }
          }}
          className="admin-secondary"
        >
          Sign out
        </button>
      </aside>

      <main>
        <header className="admin-header">
          <div>
            <small>RECRUITMENT COMMAND CENTER</small>
            <h1>
              {activeTab === 'leads'
                ? 'Client Staffing Inquiries'
                : activeTab === 'pipeline'
                ? 'Recruitment Pipeline'
                : activeTab === 'analytics'
                ? 'Talent Demographics & Analytics'
                : 'Applications overview'}
            </h1>
            <p>
              {activeTab === 'leads'
                ? 'Review prospective corporate clients, talent requests and partnerships.'
                : 'Monitor applications, candidate stages and automated notifications in real-time.'}
            </p>
          </div>
          <em>● Secure Admin Verified</em>
        </header>

        {/* Top KPI Metrics Bar */}
        <section className="metrics">
          {[
            ['Total Applications', stats.total ?? rows.length],
            ['Today', stats.today ?? 0],
            ['Under Review', stats.byStatus?.['Under Review'] ?? 0],
            ['Shortlisted', stats.byStatus?.['Shortlisted'] ?? 0],
            ['Interviews', stats.byStatus?.['Interview'] ?? 0],
            ['Client Inquiries', leads.length],
          ].map(([a, b]) => (
            <div key={String(a)}>
              <small>{a}</small>
              <strong>{b}</strong>
            </div>
          ))}
        </section>

        {/* Brevo Transactional Email Integration Status Card */}
        <section
          style={{
            background: brevoInfo?.valid ? '#f0fdf4' : '#fffbeb',
            border: `1px solid ${brevoInfo?.valid ? '#bbf7d0' : '#fde68a'}`,
            borderRadius: '16px',
            padding: '20px 24px',
            margin: '0 0 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: brevoInfo?.valid ? '#16a34a' : '#d97706',
                }}
              />
              <strong style={{ fontSize: '14px', color: '#0f172a' }}>
                Brevo Transactional Email Integration
              </strong>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: brevoInfo?.valid ? '#dcfce7' : '#fef3c7',
                  color: brevoInfo?.valid ? '#15803d' : '#92400e',
                }}
              >
                {brevoInfo?.valid ? 'Connected' : 'Action Required in Brevo'}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
              {brevoInfo?.valid ? (
                <>
                  Verified sender: <strong>{brevoInfo?.senderEmail}</strong> · Account:{' '}
                  <strong>{brevoInfo?.accountEmail}</strong> · Transactional emails active.
                </>
              ) : brevoInfo?.error && brevoInfo.error.includes('unrecognised IP address') ? (
                <>
                  API Key recognized! Brevo requires IP authorization:{' '}
                  <a
                    href="https://app.brevo.com/security/authorised_ips"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    Authorize server IP in Brevo Security Settings
                  </a>{' '}
                  (or disable IP restriction for cloud hosting).
                </>
              ) : brevoInfo?.error && (brevoInfo.error.includes('Key not found') || brevoInfo.error.includes('unauthorized')) ? (
                <>
                  <strong style={{ color: '#b91c1c' }}>API Key Inactive or Paused by Brevo:</strong>{' '}
                  Brevo has temporarily paused sending on your account for review (which revokes API keys), or this key was deleted. Once you reply to Brevo's email and your account is unpaused, or if you create a new key in Brevo (<em>SMTP & API → API Keys</em>), paste it below to reconnect.
                </>
              ) : (
                brevoInfo?.error || 'Checking Brevo transactional email connection...'
              )}
            </p>

            {/* Inline Key Update Form */}
            <form onSubmit={saveBrevoKey} style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Paste active Brevo API Key (xkeysib-...)"
                value={newBrevoKey}
                onChange={e => setNewBrevoKey(e.target.value)}
                style={{
                  padding: '7px 12px',
                  fontSize: '12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  minWidth: '260px',
                  flex: 1,
                  fontFamily: 'monospace',
                }}
              />
              <button
                type="submit"
                className="admin-primary"
                disabled={savingBrevoKey || !newBrevoKey.trim()}
                style={{ fontSize: '12px', padding: '7px 14px' }}
              >
                {savingBrevoKey ? 'Verifying...' : 'Save & Connect Key'}
              </button>
            </form>

            {brevoKeyFeedback && (
              <p style={{ margin: '8px 0 0', fontSize: '12px', fontWeight: 600, color: brevoKeyFeedback.isError ? '#dc2626' : '#16a34a' }}>
                {brevoKeyFeedback.text}
              </p>
            )}

            {testEmailResult && (
              <p style={{ margin: '8px 0 0', fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>
                {testEmailResult}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              className="admin-secondary"
              onClick={() => checkBrevoStatus()}
              disabled={checkingBrevo}
              style={{ fontSize: '12px', padding: '8px 14px' }}
            >
              {checkingBrevo ? 'Checking...' : 'Check Connection'}
            </button>
            {brevoInfo?.valid && (
              <button
                className="admin-primary"
                onClick={sendTestBrevoEmail}
                disabled={testEmailSending}
                style={{ fontSize: '12px', padding: '8px 14px' }}
              >
                {testEmailSending ? 'Sending...' : 'Send Test Email'}
              </button>
            )}
          </div>
        </section>

        {/* TAB 1: OVERVIEW & APPLICATIONS */}
        {(activeTab === 'overview' || activeTab === 'applications') && (
          <>
            <section className="admin-toolbar">
              <div>
                <b>Management tools</b>
                <span>Filter and export candidate records for internal management.</span>
              </div>
              <div className="admin-actions">
                <button className="admin-secondary" onClick={() => load()} disabled={loading}>
                  {loading ? 'Refreshing...' : 'Refresh applications'}
                </button>
                <button className="admin-primary" onClick={exportCsv}>
                  Export CSV
                </button>
              </div>
            </section>

            <section className="admin-panel">
              <div className="panel-head">
                <div>
                  <h2>Applicant database</h2>
                  <p>
                    {filtered.length} of {rows.length} total records
                  </p>
                </div>
                <div className="filters">
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search name, email, role, country or reference"
                  />
                  <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option>All</option>
                    {STATUSES.map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
                    <option value="All">All Sources</option>
                    <option value="Direct">Direct Website</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="remoteok">RemoteOK</option>
                    <option value="indeed">Indeed</option>
                    <option value="telegram">Telegram</option>
                    <option value="weworkremotely">We Work Remotely</option>
                    <option value="wellfound">Wellfound</option>
                    <option value="reddit">Reddit</option>
                  </select>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Role</th>
                      <th>Source</th>
                      <th>Country</th>
                      <th>Reference</th>
                      <th>Submitted</th>
                      <th>Status</th>
                      <th>Confirmation</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(r => (
                      <tr key={r.id}>
                        <td>
                          <b>{r.name || 'Unnamed applicant'}</b>
                          <small>{r.email}</small>
                          {r.contactHandle && (
                            <div style={{ marginTop: '4px' }}>
                              <span
                                style={{
                                  fontSize: '10px',
                                  background: r.preferredChannel === 'WhatsApp' ? '#dcfce7' : r.preferredChannel === 'Zangi' ? '#ffedd5' : '#e0f2fe',
                                  color: r.preferredChannel === 'WhatsApp' ? '#15803d' : r.preferredChannel === 'Zangi' ? '#c2410c' : '#0369a1',
                                  padding: '2px 7px',
                                  borderRadius: '4px',
                                  fontWeight: 700,
                                  display: 'inline-block',
                                }}
                              >
                                {r.preferredChannel || 'Telegram'}: {r.contactHandle}
                              </span>
                            </div>
                          )}
                        </td>
                        <td>{r.jobTitle || '—'}</td>
                        <td>
                          <span
                            style={{
                              fontSize: '11px',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontWeight: 700,
                              background:
                                r.source === 'linkedin'
                                  ? '#e0f2fe'
                                  : r.source === 'remoteok'
                                  ? '#fee2e2'
                                  : r.source === 'telegram'
                                  ? '#e0f2fe'
                                  : r.source === 'indeed'
                                  ? '#fef3c7'
                                  : '#f1f5f9',
                              color:
                                r.source === 'linkedin'
                                  ? '#0369a1'
                                  : r.source === 'remoteok'
                                  ? '#dc2626'
                                  : r.source === 'telegram'
                                  ? '#0284c7'
                                  : r.source === 'indeed'
                                  ? '#b45309'
                                  : '#475569',
                              textTransform: 'capitalize',
                              display: 'inline-block',
                            }}
                          >
                            {r.source || 'Direct'}
                          </span>
                        </td>
                        <td>{r.country || '—'}</td>
                        <td>
                          <code
                            style={{
                              fontSize: '11px',
                              background: '#f1f5f9',
                              padding: '2px 6px',
                              borderRadius: '4px',
                            }}
                          >
                            {r.reference || '—'}
                          </code>
                        </td>
                        <td>{r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : '—'}</td>
                        <td>
                          <span className="admin-status">{r.status || 'Application Received'}</span>
                        </td>
                        <td>
                          {r.emailSent ? (
                            <span style={{ color: '#16a34a', fontSize: '11px', fontWeight: 600 }}>
                              ✓ Sent
                            </span>
                          ) : (
                            <span
                              style={{ color: '#d97706', fontSize: '11px', fontWeight: 600 }}
                              title={r.emailError || 'Brevo not configured'}
                            >
                              Pending / Skipped
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            className="view-btn"
                            onClick={async () => {
                              try {
                                const x = await api.post(`/api/admin/applications/${r.id}`, { token });
                                setSelected(x.data?.application || r);
                              } catch {
                                setSelected(r);
                              }
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <p className="empty">
                    {rows.length === 0
                      ? 'No applications submitted yet. Complete a role application on the website to see it appear here.'
                      : 'No applications match your search criteria.'}
                  </p>
                )}
              </div>
            </section>
          </>
        )}

        {/* TAB 2: CLIENT INQUIRIES / LEADS */}
        {activeTab === 'leads' && (
          <section className="admin-panel">
            <div className="panel-head">
              <div>
                <h2>Corporate staffing inquiries</h2>
                <p>{filteredLeads.length} total client submissions</p>
              </div>
              <div className="filters">
                <input
                  value={leadQuery}
                  onChange={e => setLeadQuery(e.target.value)}
                  placeholder="Search company, name or email..."
                />
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Client / Contact</th>
                    <th>Company</th>
                    <th>Inquiry Message</th>
                    <th>Date Received</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(l => (
                    <tr key={l.id}>
                      <td>
                        <b>{l.name}</b>
                        <small>{l.email}</small>
                      </td>
                      <td>
                        <b>{l.company}</b>
                      </td>
                      <td style={{ maxWidth: '340px' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                          {l.message}
                        </p>
                      </td>
                      <td>{l.createdAt ? new Date(l.createdAt).toLocaleDateString() : '—'}</td>
                      <td>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: l.status === 'Contacted' ? '#dcfce7' : '#eff6ff',
                            color: l.status === 'Contacted' ? '#15803d' : '#1d4ed8',
                          }}
                        >
                          {l.status || 'New'}
                        </span>
                      </td>
                      <td>
                        <select
                          value={l.status || 'New'}
                          onChange={e => updateLeadStatus(l.id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '12px',
                          }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Discussion">In Discussion</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredLeads.length === 0 && (
                <p className="empty">No client inquiries found matching your search.</p>
              )}
            </div>
          </section>
        )}

        {/* TAB: JOB BOARD LINKS & DISTRIBUTION GENERATOR */}
        {activeTab === 'links' && (
          <section className="admin-panel">
            <div className="panel-head">
              <div>
                <h2>Remote Job Board Link Generator & Sharing</h2>
                <p>Generate direct shareable application links for LinkedIn, RemoteOK, Indeed, Telegram, and job aggregators. Direct links take candidates straight into that role's application modal.</p>
              </div>
            </div>

            {/* Link Builder Tool */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '24px', margin: '20px 0 28px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    1. Select Job Position
                  </label>
                  <select
                    value={selectedLinkRole}
                    onChange={e => setSelectedLinkRole(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                  >
                    {allJobs.map(j => (
                      <option key={j.id || j.title} value={j.id || j.title}>
                        {j.title} ({j.sector})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    2. Select Destination Platform (Source Tag)
                  </label>
                  <select
                    value={selectedLinkSource}
                    onChange={e => setSelectedLinkSource(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                  >
                    <option value="linkedin">LinkedIn (Remote Job Post)</option>
                    <option value="remoteok">RemoteOK</option>
                    <option value="indeed">Indeed Remote</option>
                    <option value="weworkremotely">We Work Remotely</option>
                    <option value="telegram">Telegram Job Channel</option>
                    <option value="wellfound">Wellfound (AngelList)</option>
                    <option value="reddit">Reddit (r/remotework / r/forhire)</option>
                    <option value="direct">Direct Website (No Tag)</option>
                    <option value="custom">Custom Tag...</option>
                  </select>
                </div>

                {selectedLinkSource === 'custom' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Custom Source Tag
                    </label>
                    <input
                      type="text"
                      value={customSourceTag}
                      onChange={e => setCustomSourceTag(e.target.value)}
                      placeholder="e.g. newsletter-oct or x-post"
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                    />
                  </div>
                )}
              </div>

              {/* Generated URL Box */}
              {(() => {
                const currentJob = allJobs.find(j => (j.id || j.title) === selectedLinkRole) || allJobs[0];
                const jobId = currentJob?.id || 'chief-technology-officer-cto';
                const effectiveSource = selectedLinkSource === 'custom' ? (customSourceTag.trim() || 'custom') : selectedLinkSource;
                const origin = typeof window !== 'undefined' ? window.location.origin : 'https://zenithglobalinnovation.com';
                const generatedUrl = `${origin}/?job=${encodeURIComponent(jobId)}${effectiveSource && effectiveSource !== 'direct' ? `&source=${encodeURIComponent(effectiveSource)}` : ''}`;

                return (
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Generated Direct Application Link:
                    </label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        readOnly
                        value={generatedUrl}
                        style={{
                          flex: 1,
                          minWidth: '280px',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          fontFamily: 'monospace',
                          fontSize: '13px',
                          color: '#0f172a',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedUrl);
                          setLinkCopiedMsg(`Copied direct link for "${currentJob?.title || 'selected role'}"!`);
                          setTimeout(() => setLinkCopiedMsg(null), 3500);
                        }}
                        style={{
                          padding: '12px 20px',
                          borderRadius: '8px',
                          background: '#16a34a',
                          color: '#ffffff',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                      >
                        📋 Copy Shareable Link
                      </button>
                      <a
                        href={generatedUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: '12px 16px',
                          borderRadius: '8px',
                          background: '#eff6ff',
                          color: '#1d4ed8',
                          border: '1px solid #bfdbfe',
                          fontWeight: 700,
                          fontSize: '13px',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}
                      >
                        Test Open ↗
                      </a>
                    </div>
                    {linkCopiedMsg && (
                      <div style={{ marginTop: '10px', fontSize: '13px', color: '#15803d', fontWeight: 700 }}>
                        ✓ {linkCopiedMsg}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Tactical Free Remote Job Posting Playbook */}
            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '14px', padding: '22px 26px', margin: '0 0 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>🚀</span>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#166534' }}>
                  Zero-Cost Organic Applicant Distribution Playbook
                </h3>
              </div>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#14532d', lineHeight: 1.6 }}>
                How to drive hundreds of high-quality remote candidates to your Zenith platform without spending money on ads:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '12.5px', color: '#14532d' }}>
                <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: '#166534', marginBottom: '4px' }}>
                    1. LinkedIn "Comment for Link" Organic Loop
                  </strong>
                  <p style={{ margin: 0, lineHeight: 1.55, color: '#334155' }}>
                    Post the role overview with high pay on personal LinkedIn profiles. Say: <em>"We are hiring 100% remote across global timezones ($185k/yr). Comment 'INTERESTED' and I will DM you the direct fast-track link."</em> The LinkedIn algorithm rewards comments and pushes your post to thousands of feeds organically.
                  </p>
                </div>
                <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: '#166534', marginBottom: '4px' }}>
                    2. High-Volume Telegram Remote Channels
                  </strong>
                  <p style={{ margin: 0, lineHeight: 1.55, color: '#334155' }}>
                    Telegram has massive channels like @RemoteJobs, @TechRemoteJobs, and @WorldwideRemote with 50,000+ to 200,000+ members each. Community admins repost legitimate remote openings with direct apply links for free when formatted cleanly.
                  </p>
                </div>
                <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: '#166534', marginBottom: '4px' }}>
                    3. Reddit r/remotework & r/forhire
                  </strong>
                  <p style={{ margin: 0, lineHeight: 1.55, color: '#334155' }}>
                    Post using title format: <code>[HIRING] [REMOTE] [Title] - $185k/yr</code>. Job seekers on Reddit love transparent salaries, no degree gatekeeping, and fast direct application links.
                  </p>
                </div>
                <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: '#166534', marginBottom: '4px' }}>
                    4. Free Remote Aggregators
                  </strong>
                  <p style={{ margin: 0, lineHeight: 1.55, color: '#334155' }}>
                    Submit to Wellfound (AngelList), RemoteOK community RSS, Remotive free tier, and Jobspresso. Set the application button to your custom Zenith <code>?job=...&source=...</code> URL to track every click.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Copy Directory for All Active Positions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a' }}>All Active Positions & Quick-Copy Links ({allJobs.length})</h3>
              <input
                type="text"
                placeholder="Filter roles by title or sector..."
                value={linkRoleQuery}
                onChange={e => setLinkRoleQuery(e.target.value)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '280px', fontSize: '13px' }}
              />
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Sector</th>
                    <th>Annual Salary</th>
                    <th>Quick Copy Links</th>
                  </tr>
                </thead>
                <tbody>
                  {allJobs
                    .filter(j => !linkRoleQuery || `${j.title} ${j.sector}`.toLowerCase().includes(linkRoleQuery.toLowerCase()))
                    .map(j => {
                      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://zenithglobalinnovation.com';
                      const linkLinkedIn = `${origin}/?job=${encodeURIComponent(j.id || j.title)}&source=linkedin`;
                      const linkRemoteOK = `${origin}/?job=${encodeURIComponent(j.id || j.title)}&source=remoteok`;
                      const linkDirect = `${origin}/?job=${encodeURIComponent(j.id || j.title)}`;

                      return (
                        <tr key={j.id || j.title}>
                          <td><strong>{j.title}</strong></td>
                          <td><small>{j.sector}</small></td>
                          <td><span style={{ color: '#16a34a', fontWeight: 700 }}>{j.pay?.annual || '$140k - $220k'}</span></td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(linkLinkedIn);
                                  setLinkCopiedMsg(`Copied LinkedIn link for "${j.title}"!`);
                                  setTimeout(() => setLinkCopiedMsg(null), 3000);
                                }}
                                style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', cursor: 'pointer', fontWeight: 600 }}
                              >
                                📋 LinkedIn
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(linkRemoteOK);
                                  setLinkCopiedMsg(`Copied RemoteOK link for "${j.title}"!`);
                                  setTimeout(() => setLinkCopiedMsg(null), 3000);
                                }}
                                style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer', fontWeight: 600 }}
                              >
                                📋 RemoteOK
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(linkDirect);
                                  setLinkCopiedMsg(`Copied Direct link for "${j.title}"!`);
                                  setTimeout(() => setLinkCopiedMsg(null), 3000);
                                }}
                                style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: 600 }}
                              >
                                📋 Direct
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: PIPELINE & ANALYTICS */}
        {(activeTab === 'overview' || activeTab === 'pipeline' || activeTab === 'analytics') && (
          <section className="admin-panels">
            <div className="admin-panel">
              <h2>Applications by country</h2>
              {Object.keys(stats.byCountry || {}).length === 0 && <p className="empty">No data available yet.</p>}
              {Object.entries(stats.byCountry || {})
                .slice(0, 8)
                .map(([k, v]: any) => (
                  <div className="bar" key={k}>
                    <span>{k}</span>
                    <b>{v}</b>
                    <i>
                      <em
                        style={{
                          width: `${Math.min(100, (Number(v) / Math.max(1, stats.total || rows.length)) * 100)}%`,
                        }}
                      />
                    </i>
                  </div>
                ))}
            </div>
            <div className="admin-panel">
              <h2>Recruitment pipeline stages</h2>
              {STATUSES.map(s => {
                const count = stats.byStatus?.[s] || 0;
                return (
                  <div className="pipeline" key={s}>
                    <span>{s}</span>
                    <b>{count}</b>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Candidate Profile Drawer */}
        {selected && (
          <div className="drawer-bg" onClick={() => setSelected(null)}>
            <div className="drawer" onClick={e => e.stopPropagation()}>
              <button className="drawer-close" onClick={() => setSelected(null)}>
                ×
              </button>
              <small>CANDIDATE PROFILE</small>
              <h2>{selected.name}</h2>
              <p>
                Reference: <b>{selected.reference}</b>
              </p>

              {drawerFeedback && (
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '16px',
                    background: drawerFeedback.isError ? '#fef2f2' : '#f0fdf4',
                    color: drawerFeedback.isError ? '#b91c1c' : '#15803d',
                    border: `1px solid ${drawerFeedback.isError ? '#fecaca' : '#bbf7d0'}`,
                  }}
                >
                  {drawerFeedback.text}
                </div>
              )}

              {/* Resume Attachment Box */}
              {(selected.resumeName || selected.resumePath) && (
                <div className="drawer-attachment" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '12px' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#0f172a', fontSize: '13px' }}>📄 {selected.resumeName || selected.resumePath}</strong>
                    <small style={{ color: '#64748b', fontSize: '11.5px' }}>
                      {selected.resumeSize ? `Size: ${selected.resumeSize} · ` : ''}Document registered for {selected.preferredChannel || 'Telegram/WhatsApp/Zangi'} interview screening
                    </small>
                  </div>
                  <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
                    Verified Attached
                  </span>
                </div>
              )}

              {/* Email Delivery Diagnostics */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  marginBottom: '18px',
                }}
              >
                <small
                  style={{
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    color: '#64748b',
                  }}
                >
                  Confirmation Email Status
                </small>
                <div style={{ marginTop: '6px', fontSize: '13px' }}>
                  {selected.emailSent ? (
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>
                      ✓ Delivered via Brevo transactional email
                    </span>
                  ) : (
                    <div>
                      <span style={{ color: '#d97706', fontWeight: 700 }}>
                        ⚠ Not sent / unverified
                      </span>
                      {selected.emailError && (
                        <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>
                          Diagnostic log: {selected.emailError}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Candidate Info Grid */}
              <div className="details">
                <div
                  style={{
                    gridColumn: '1 / -1',
                    background: '#f0fdf4',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1.5px solid #86efac',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>
                      Registered Interview Channel
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                      {selected.preferredChannel || 'Telegram'}: {selected.contactHandle || 'Not provided'}
                    </div>
                    {selected.interviewContact && (
                      <div style={{ fontSize: '11px', color: '#166534', marginTop: '3px' }}>
                        Assigned recruiter: <strong>{selected.interviewContact}</strong> ({selected.interviewChannel || selected.preferredChannel}) · Window: {selected.interviewDeadline || '48h'}
                      </div>
                    )}
                  </div>
                  {selected.contactHandle && (
                    <a
                      href={
                        selected.preferredChannel === 'WhatsApp'
                          ? `https://wa.me/${selected.contactHandle.replace(/[^0-9]/g, '')}`
                          : selected.preferredChannel === 'Zangi'
                          ? (selected.contactHandle.replace(/[^0-9]/g, '') ? `https://zangi.com/dl?number=${selected.contactHandle.replace(/[^0-9]/g, '')}` : 'https://zangi.com')
                          : `https://t.me/${selected.contactHandle.replace(/^@/, '')}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        background: selected.preferredChannel === 'WhatsApp' ? '#16a34a' : selected.preferredChannel === 'Zangi' ? '#ea580c' : '#0284c7',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                      }}
                    >
                      Open {selected.preferredChannel || 'Telegram'} Direct Chat ↗
                    </a>
                  )}
                </div>

                <div>
                  <small>Role Applied</small>
                  <span>{selected.jobTitle || selected.desiredRole || '—'}</span>
                </div>
                <div>
                  <small>Application Source</small>
                  <span style={{ fontWeight: 700, color: '#0369a1', textTransform: 'capitalize' }}>
                    {selected.source || 'Direct Website'}
                  </span>
                </div>
                {selected.additionalRoles && selected.additionalRoles.length > 0 && (
                  <div style={{ gridColumn: '1 / -1', background: '#eff6ff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                    <small style={{ color: '#1e40af', fontWeight: 700, textTransform: 'uppercase', fontSize: '10px' }}>
                      Multi-Role Consideration Requested ({selected.additionalRoles.length})
                    </small>
                    <div style={{ fontSize: '13px', color: '#1e3a8a', fontWeight: 600, marginTop: '4px' }}>
                      {selected.additionalRoles.join(' · ')}
                    </div>
                  </div>
                )}
                <div>
                  <small>Email</small>
                  <span>{selected.email || '—'}</span>
                </div>
                <div>
                  <small>Phone Number</small>
                  <span>{selected.phone || '—'}</span>
                </div>
                <div>
                  <small>Country of Residence</small>
                  <span>{selected.country || '—'}</span>
                </div>
                <div>
                  <small>Nationality</small>
                  <span>{selected.nationality || '—'}</span>
                </div>
                <div>
                  <small>Date of Birth</small>
                  <span>{selected.dob || '—'}</span>
                </div>
                <div>
                  <small>Gender</small>
                  <span>{selected.gender || '—'}</span>
                </div>
                <div>
                  <small>Education Completed</small>
                  <span>{selected.education || '—'}</span>
                </div>
                <div>
                  <small>Field of Study</small>
                  <span>{selected.field || '—'}</span>
                </div>
                <div>
                  <small>Years Experience</small>
                  <span>{selected.experience || '—'}</span>
                </div>
                <div>
                  <small>Current Employer</small>
                  <span>{selected.employer || '—'}</span>
                </div>
                <div>
                  <small>Current Job Title</small>
                  <span>{selected.currentTitle || '—'}</span>
                </div>
                <div>
                  <small>Expected Salary</small>
                  <span>{selected.expectedSalary || '—'}</span>
                </div>
                <div>
                  <small>Availability Date</small>
                  <span>{selected.availability || '—'}</span>
                </div>
                <div>
                  <small>Digital Signature</small>
                  <span>{selected.signature || '—'}</span>
                </div>
                <div>
                  <small>Submission Timestamp</small>
                  <span>
                    {selected.submittedAt ? new Date(selected.submittedAt).toLocaleString() : '—'}
                  </span>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <small>Complete Residential Address</small>
                  <span>{selected.address || '—'}</span>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <small>Certifications & Qualifications</small>
                  <span>{selected.certifications || 'None recorded'}</span>
                </div>
              </div>

              {/* Status Update with Brevo Automation Option */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '14px',
                  padding: '20px',
                  margin: '24px 0',
                }}
              >
                <h3 style={{ fontSize: '15px', margin: '0 0 12px', color: '#0f172a' }}>
                  Update Recruitment Pipeline Stage
                </h3>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Select Next Stage
                  <select
                    value={selectedNextStatus}
                    onChange={e => setSelectedNextStatus(e.target.value)}
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: '6px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                    }}
                  >
                    {STATUSES.map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>

                {(selectedNextStatus === 'Shortlisted' || selectedNextStatus === 'Interview') && (
                  <div
                    style={{
                      margin: '14px 0',
                      padding: '16px',
                      background: '#f0fdf4',
                      border: '1.5px solid #86efac',
                      borderRadius: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '16px' }}>🎯</span>
                      <strong style={{ fontSize: '13px', color: '#166534' }}>
                        Executive Interview Handover & Direct Screening Protocol
                      </strong>
                    </div>
                    <p style={{ margin: '0 0 12px', fontSize: '12px', color: '#14532d', lineHeight: 1.5 }}>
                      The candidate will receive an urgent executive invitation email congratulating them, instructing them to message the recruiter handle below within their strict window, and quote their reference code (<code>{selected.reference}</code>) for screening, company files, and interview onboarding.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '4px' }}>
                          Screening Platform
                        </label>
                        <select
                          value={stageInterviewChannel}
                          onChange={e => {
                            const val = e.target.value as 'Telegram' | 'WhatsApp' | 'Zangi';
                            setStageInterviewChannel(val);
                            if (val === 'Telegram') {
                              if (stageInterviewContact.includes('+') || stageInterviewContact.startsWith('10-')) {
                                setStageInterviewContact('@ZenithTalentLead');
                              }
                            } else if (val === 'WhatsApp') {
                              if (stageInterviewContact.startsWith('@') || stageInterviewContact.startsWith('10-')) {
                                setStageInterviewContact('+1 (800) 492-3684');
                              }
                            } else if (val === 'Zangi') {
                              if (stageInterviewContact.startsWith('@') || stageInterviewContact.includes('+')) {
                                setStageInterviewContact('10-9988-7766');
                              }
                            }
                          }}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            border: '1px solid #86efac',
                            fontSize: '12px',
                            background: '#fff',
                            color: '#0f172a',
                          }}
                        >
                          <option value="Telegram">Telegram Direct Chat</option>
                          <option value="WhatsApp">WhatsApp Official Direct</option>
                          <option value="Zangi">Zangi Safe Messenger</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '4px' }}>
                          Recruiter Handle / Number
                        </label>
                        <input
                          type="text"
                          value={stageInterviewContact}
                          onChange={e => setStageInterviewContact(e.target.value)}
                          placeholder={
                            stageInterviewChannel === 'Telegram'
                              ? '@ZenithTalentLead'
                              : stageInterviewChannel === 'WhatsApp'
                              ? '+1 (800) 492-3684'
                              : 'Zangi ID / Number (e.g. 10-9988-7766)'
                          }
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            border: '1px solid #86efac',
                            fontSize: '12px',
                            background: '#fff',
                            color: '#0f172a',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '4px' }}>
                        Interview Access Window (Urgency Deadline)
                      </label>
                      <input
                        type="text"
                        value={stageInterviewDeadline}
                        onChange={e => setStageInterviewDeadline(e.target.value)}
                        placeholder="Within 48 hours of receipt"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          border: '1px solid #86efac',
                          fontSize: '12px',
                          background: '#fff',
                          color: '#0f172a',
                        }}
                      />
                    </div>
                  </div>
                )}

                <div style={{ margin: '14px 0' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: '#1e3a8a',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={notifyCandidate}
                      onChange={e => setNotifyCandidate(e.target.checked)}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    Send automated notification email to candidate ({selected.email}) via Brevo
                  </label>
                </div>

                {notifyCandidate && (
                  <div style={{ margin: '10px 0' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                      Optional custom note to include in email
                      <textarea
                        value={stageCustomNote}
                        onChange={e => setStageCustomNote(e.target.value)}
                        placeholder="e.g. We would like to invite you for a 45-minute technical video interview next week..."
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          marginTop: '4px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          fontSize: '12px',
                          minHeight: '60px',
                        }}
                      />
                    </label>
                  </div>
                )}

                <button
                  className="admin-primary"
                  onClick={submitStatusUpdate}
                  disabled={updatingStage || selectedNextStatus === selected.status}
                  style={{ marginTop: '10px' }}
                >
                  {updatingStage ? 'Updating & Notifying...' : 'Update Stage & Notify Candidate'}
                </button>
              </div>

              {/* Internal Notes */}
              <div className="admin-notes">
                <h3>Internal management notes</h3>
                {(selected.adminNotes || []).length === 0 && (
                  <p style={{ color: '#94a3b8', fontSize: '12px' }}>
                    No notes added yet for this candidate.
                  </p>
                )}
                {(selected.adminNotes || []).map((n: any, i: number) => (
                  <div key={i}>
                    <small>
                      {n.createdAt ? new Date(n.createdAt).toLocaleString() : ''} ·{' '}
                      {n.adminEmail || 'Admin'}
                    </small>
                    <p>{n.note}</p>
                  </div>
                ))}
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Add an internal note about this candidate..."
                />
                <button className="admin-primary" onClick={addNote}>
                  Save note
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
