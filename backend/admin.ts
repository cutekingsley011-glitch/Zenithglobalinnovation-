import { db } from './db';

export const ADMIN_EMAILS = ['zenithglobalinnovationhq@protonmail.com'];

export async function adminList() {
  const { items } = await db.list<Record<string, any>>('applications', { limit: 500 });
  const applications = items.map(x => ({
    id: x.id,
    reference: x.reference,
    name: x.name,
    email: x.email,
    jobId: x.jobId,
    jobTitle: x.jobTitle || x.desiredRole || x.desiredPosition || x.role || x.position,
    country: x.country || x.countryOfResidence,
    nationality: x.nationality,
    status: x.status || 'Application Received',
    submittedAt: x.submittedAt || x.createdAt,
    phone: x.phone,
    dob: x.dob,
    education: x.education,
    field: x.field || x.fieldOfStudy,
    experience: x.experience,
    expectedSalary: x.expectedSalary,
    availability: x.availability,
    address: x.address,
    gender: x.gender,
    certifications: x.certifications,
    employer: x.employer,
    currentTitle: x.currentTitle,
    resumeName: x.resumeName,
    resumePath: x.resumePath,
    signature: x.signature,
    preferredChannel: x.preferredChannel || 'Telegram',
    contactHandle: x.contactHandle || '',
    interviewChannel: x.interviewChannel || '',
    interviewContact: x.interviewContact || '',
    interviewDeadline: x.interviewDeadline || '',
    source: x.source || 'Direct',
    additionalRoles: Array.isArray(x.additionalRoles) ? x.additionalRoles : (x.additionalRoles ? [String(x.additionalRoles)] : []),
    emailSent: x.emailSent,
    emailError: x.emailError,
    adminNotes: Array.isArray(x.adminNotes) ? x.adminNotes : [],
  }));

  const byStatus: Record<string, number> = {};
  const byCountry: Record<string, number> = {};
  const byRole: Record<string, number> = {};
  const bySource: Record<string, number> = {};

  for (const r of applications) {
    const s = String(r.status || 'Application Received');
    const c = String(r.country || 'Unknown');
    const role = String(r.jobTitle || 'Unknown');
    const src = String(r.source || 'Direct');
    byStatus[s] = (byStatus[s] || 0) + 1;
    byCountry[c] = (byCountry[c] || 0) + 1;
    byRole[role] = (byRole[role] || 0) + 1;
    bySource[src] = (bySource[src] || 0) + 1;
  }

  return {
    applications,
    stats: {
      total: applications.length,
      today: applications.filter(
        r => String(r.submittedAt || '').slice(0, 10) === new Date().toISOString().slice(0, 10)
      ).length,
      byStatus,
      byCountry,
      byRole,
      bySource,
    },
  };
}

export async function adminGet(id: string) {
  const [item] = await db.get<Record<string, any>>('applications', [id]);
  return item || null;
}

export async function adminStatus(id: string, status: string, adminEmail?: string, extraData?: Record<string, any>) {
  const allowed = [
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
  if (!allowed.includes(status)) return false;

  const [item] = await db.get<Record<string, any>>('applications', [id]);
  if (!item) return false;

  const previous = String(item.status || 'Application Received');
  const updatedRecord = { ...item, status, ...(extraData || {}) };
  const ok = (await db.update('applications', [{ id, record: updatedRecord }]))[0];
  if (!ok) return false;

  await db.add('admin_audit', [
    {
      applicationId: id,
      reference: item.reference,
      action: 'Status changed',
      from: previous,
      to: status,
      adminEmail: adminEmail || ADMIN_EMAILS[0],
      createdAt: new Date().toISOString(),
    },
  ]);
  return true;
}

export async function adminAudit() {
  const { items } = await db.list('admin_audit', { limit: 100 });
  return items;
}

export async function adminAddNote(id: string, note: string, adminEmail: string) {
  const [item] = await db.get<Record<string, any>>('applications', [id]);
  if (!item) return false;

  const notes = Array.isArray(item.adminNotes) ? item.adminNotes : [];
  const entry = { note, adminEmail, createdAt: new Date().toISOString() };
  const ok = (await db.update('applications', [{ id, record: { ...item, adminNotes: [...notes, entry] } }]))[0];

  if (ok) {
    await db.add('admin_audit', [
      {
        applicationId: id,
        reference: item.reference,
        action: 'Admin note added',
        adminEmail,
        createdAt: entry.createdAt,
      },
    ]);
  }
  return Boolean(ok);
}
