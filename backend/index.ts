import { Router, Request, Response } from 'express';
import path from 'path';
import dns from 'dns';
import crypto from 'crypto';
import { db } from './db';
import { storage } from './storage';
import { secrets } from './secrets';
import { adminList, adminGet, adminStatus, adminAudit, adminAddNote } from './admin';
import {
  getClientIp,
  checkAdminLoginRateLimit,
  recordAdminLoginAttempt,
  verifyPassword,
  hashPassword,
  rateLimiter,
} from './security';

const ADMIN_EMAIL = 'zenithglobalinnovationhq@protonmail.com';

export const createToken = async (password: string) => {
  const data = new TextEncoder().encode(`${ADMIN_EMAIL}|${password}|zenith-admin-v1`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(x => x.toString(16).padStart(2, '0')).join('');
};

export const isValidAdminToken = async (token: string): Promise<boolean> => {
  if (!token) return false;
  try {
    // 1. Check persistent sessions stored in database
    const { items } = await db.list('admin_sessions', { limit: 100 });
    const session = items.find(s => s.token === token);
    if (session) {
      // Check if session is expired (7 days)
      const createdAt = new Date(session.createdAt).getTime();
      const now = Date.now();
      if (now - createdAt < 7 * 24 * 60 * 60 * 1000) {
        return true;
      }
    }

    // 2. Fallback check for legacy token if env password is configured
    try {
      const password = await secrets.readSecret('ZENITH_ADMIN_PASSWORD');
      if (password) {
        const expected = await createToken(password);
        if (token === expected) return true;
      }
    } catch {}

    return false;
  } catch {
    return false;
  }
};

const requireAdminSession = async (req: Request): Promise<boolean> => {
  const token = String(
    req.body?.token ||
    req.headers['x-zenith-admin-token'] ||
    req.headers['authorization']?.replace(/^Bearer\s+/i, '') ||
    ''
  );
  return isValidAdminToken(token);
};

type JobRecord = {
  id?: string;
  title: string;
  sector: string;
  location: string;
  type: string;
  featured?: boolean;
};

const seedJobs: JobRecord[] = [
  { title: 'Chief Technology Officer (CTO)', sector: 'Executive & Leadership Positions', location: 'Remote · Global', type: 'Full-time', featured: true },
  { title: 'Senior Full Stack Developer', sector: 'Senior Technical Roles', location: 'Remote · Global', type: 'Full-time', featured: true },
  { title: 'Creative Director', sector: 'Marketing & Creative Leadership', location: 'Remote · Global', type: 'Full-time', featured: true },
  { title: 'Senior Financial Analyst', sector: 'Finance & Business Intelligence', location: 'Remote · Global', type: 'Full-time' },
  { title: 'Senior Operations Manager', sector: 'Operations & HR Leadership', location: 'Remote · Global', type: 'Full-time' },
  { title: 'Senior Management Consultant', sector: 'Specialized Consulting Roles', location: 'Remote · Global', type: 'Contract' },
  { title: 'Customer Success Director', sector: 'Customer Success & Sales Leadership', location: 'Remote · Global', type: 'Full-time' },
  { title: 'Senior Product Manager', sector: 'Additional High-Value Roles', location: 'Remote · Global', type: 'Full-time' }
];

async function ensureJobs() {
  const existing = await db.list<JobRecord>('jobs', { limit: 100 });
  if (existing.items.length) return existing.items;
  const ids = await db.add('jobs', seedJobs);
  return seedJobs.map((j, i) => ({ ...j, id: ids[i] || `seed-${i}` }));
}

export const apiRouter = Router();

// Healthcheck
apiRouter.get('/_healthcheck', (_req: Request, res: Response) => {
  res.json({ message: 'Success' });
});

// Live Email Verification Endpoint (Rate limited to prevent automated email harvesting)
apiRouter.post('/verify-email', rateLimiter('verify-email', 60, 10 * 60 * 1000), async (req: Request, res: Response) => {
  const email = String(req.body?.email || '').trim();
  if (!email) {
    res.status(400).json({ valid: false, message: 'Email address is required.' });
    return;
  }

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!EMAIL_REGEX.test(email) || !email.includes('@')) {
    res.json({ valid: false, message: 'Please enter a complete email address (e.g. name@domain.com).' });
    return;
  }

  const parts = email.toLowerCase().split('@');
  if (parts.length !== 2) {
    res.json({ valid: false, message: 'Invalid email structure.' });
    return;
  }

  const [localPart, domain] = parts;

  // Typo detection for major webmail providers
  const COMMON_TYPOS: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmaill.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'yaho.com': 'yahoo.com',
    'yahooo.com': 'yahoo.com',
    'yhaoo.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmaill.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outloo.com': 'outlook.com',
    'protonmial.com': 'protonmail.com',
    'icoud.com': 'icloud.com',
  };

  if (COMMON_TYPOS[domain]) {
    res.json({
      valid: false,
      typo: true,
      suggested: `${localPart}@${COMMON_TYPOS[domain]}`,
      message: `Possible domain typo. Did you mean ${localPart}@${COMMON_TYPOS[domain]}?`,
    });
    return;
  }

  // Disposable / throwaway domain list
  const DISPOSABLE_DOMAINS = new Set([
    'mailinator.com',
    'tempmail.com',
    '10minutemail.com',
    'trashmail.com',
    'guerrillamail.com',
    'sharklasers.com',
    'getairmail.com',
    'throwawaymail.com',
    'temp-mail.org',
  ]);

  if (DISPOSABLE_DOMAINS.has(domain)) {
    res.json({
      valid: false,
      message: 'Temporary or disposable email domains are not accepted. Please use a permanent email address.',
    });
    return;
  }

  const tld = domain.split('.').pop() || '';
  if (tld.length < 2 || !domain.includes('.')) {
    res.json({ valid: false, message: 'Please include a valid domain extension (e.g. .com, .org, .net).' });
    return;
  }

  // Username Gibberish & Keyboard-Mash Detection
  const cleanUser = localPart.toLowerCase().replace(/[^a-z]/g, '');
  if (cleanUser.length >= 7) {
    // 1. Check excessive consecutive consonants (6 or more consonants in a row, e.g. "sjkejdhdhdbdbdnd")
    if (/[bcdfghjklmnpqrstvwxyz]{6,}/i.test(cleanUser)) {
      if (!cleanUser.includes('schmidt')) {
        res.json({
          valid: false,
          message: 'This email username contains random or invalid character sequences. Please enter a real, active email address.',
        });
        return;
      }
    }

    // 2. Check vowel distribution (words >= 7 characters must contain reasonable vowel proportion)
    const vowels = (cleanUser.match(/[aeiouy]/gi) || []).length;
    const vowelRatio = vowels / cleanUser.length;
    if (vowelRatio < 0.15) {
      res.json({
        valid: false,
        message: 'This email address appears to be random keyboard input. Please enter a genuine email address.',
      });
      return;
    }
  }

  // 3. Repeated character patterns (e.g. "bdbdbdbd", "hahahaha", "asdfasdf")
  if (/([a-z0-9]{2,})\1{2,}/i.test(localPart)) {
    res.json({
      valid: false,
      message: 'This email username contains repetitive character patterns. Please enter a genuine email address.',
    });
    return;
  }

  // 4. Common keyboard walk sequences
  const KEYBOARD_MASH = ['qwerty', 'asdfgh', 'zxcvbn', '123456', 'sdfghj'];
  for (const pattern of KEYBOARD_MASH) {
    if (cleanUser.includes(pattern)) {
      res.json({
        valid: false,
        message: 'This email address contains a keyboard sequence. Please provide your real email address.',
      });
      return;
    }
  }


  // Live DNS MX check with 2.5s timeout
  try {
    const mxLookup = dns.promises.resolveMx(domain);
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500));
    const mxRecords = await Promise.race([mxLookup, timeoutPromise]);

    if (mxRecords === null) {
      // Timeout occurred, fallback to format valid
      res.json({ valid: true, domain, fallback: true, message: 'Email address format verified.' });
      return;
    }

    if (Array.isArray(mxRecords) && mxRecords.length > 0) {
      res.json({
        valid: true,
        domain,
        message: 'Active deliverable email address verified.',
      });
    } else {
      res.json({
        valid: false,
        message: `The domain "${domain}" does not appear to accept incoming emails.`,
      });
    }
  } catch (err: any) {
    if (err?.code === 'ENOTFOUND' || err?.code === 'ENODATA' || err?.code === 'SERVFAIL') {
      res.json({
        valid: false,
        message: `The email domain "${domain}" does not exist or has no active mail servers.`,
      });
    } else {
      // Network or internal DNS error: allow user to proceed
      res.json({ valid: true, domain, fallback: true, message: 'Email address format verified.' });
    }
  }
});


// Admin Login (Hardened with Tarpit Delay, Rate Limiting, and Constant-Time Verification)
apiRouter.post('/admin/login', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  try {
    // 1. Enforce IP-based brute force protection
    const rateCheck = await checkAdminLoginRateLimit(ip);
    if (!rateCheck.allowed) {
      res.status(429).json({ message: rateCheck.message });
      return;
    }

    const b = req.body as Record<string, unknown>;
    const email = String(b.email || ADMIN_EMAIL).trim().toLowerCase();
    const password = String(b.password || '');

    if (email !== ADMIN_EMAIL) {
      await recordAdminLoginAttempt(ip, false);
      res.status(401).json({ message: 'Invalid administrator credentials' });
      return;
    }

    // 2. Fetch stored salted hash from database
    let authenticated = false;
    const { items: secItems } = await db.list('admin_security', { limit: 10 });
    const secRecord = secItems[0];

    if (secRecord && secRecord.passwordHash && secRecord.salt) {
      authenticated = verifyPassword(password, String(secRecord.passwordHash), String(secRecord.salt));
    } else {
      // Fallback check against environment variable if set
      const envPass = process.env.ZENITH_ADMIN_PASSWORD;
      if (envPass && envPass.trim() !== '') {
        authenticated = (password === envPass.trim());
      }
    }

    if (!authenticated) {
      // Record failed attempt and activate tarpit delay (1200ms - 1800ms) to frustrate brute-force scanners
      await recordAdminLoginAttempt(ip, false);
      res.status(401).json({ message: 'Invalid administrator credentials' });
      return;
    }

    // Success: reset rate limit tracking for this IP
    await recordAdminLoginAttempt(ip, true);

    // Generate high-entropy 256-bit cryptographically random session token
    const token = crypto.randomBytes(32).toString('hex');
    await db.add('admin_sessions', [{
      token,
      email: ADMIN_EMAIL,
      ip,
      createdAt: new Date().toISOString()
    }]);

    // Record login event in security audit log
    await db.add('admin_audit', [{
      event: 'ADMIN_LOGIN_SUCCESS',
      details: `Administrator authenticated successfully from IP ${ip}`,
      ip,
      timestamp: new Date().toISOString()
    }]).catch(() => {});

    res.json({ authenticated: true, token, email: ADMIN_EMAIL });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || 'Internal login error' });
  }
});

// Admin Change Password (Protected Endpoint)
apiRouter.post('/admin/change-password', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  if (!(await requireAdminSession(req))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }

  const b = req.body as Record<string, unknown>;
  const currentPassword = String(b.currentPassword || '');
  const newPassword = String(b.newPassword || '');

  if (!newPassword || newPassword.length < 8) {
    res.status(400).json({ message: 'New password must be at least 8 characters in length.' });
    return;
  }

  try {
    const { items: secItems } = await db.list('admin_security', { limit: 10 });
    const secRecord = secItems[0];

    let currentValid = false;
    if (secRecord && secRecord.passwordHash && secRecord.salt) {
      currentValid = verifyPassword(currentPassword, String(secRecord.passwordHash), String(secRecord.salt));
    } else {
      const envPass = process.env.ZENITH_ADMIN_PASSWORD;
      if (envPass && envPass.trim() !== '') {
        currentValid = (currentPassword === envPass.trim());
      }
    }

    if (!currentValid) {
      res.status(401).json({ message: 'Current password verification failed.' });
      return;
    }

    // Hash new password with cryptographically fresh salt
    const { hash, salt } = hashPassword(newPassword);

    // Save into database
    if (secRecord && secRecord.id) {
      await db.delete('admin_security', [secRecord.id]);
    }
    await db.add('admin_security', [{
      id: 'sec_admin_cred',
      salt,
      passwordHash: hash,
      updatedAt: new Date().toISOString()
    }]);

    // Audit log
    await db.add('admin_audit', [{
      event: 'ADMIN_PASSWORD_UPDATED',
      details: `Administrator password changed from IP ${ip}`,
      ip,
      timestamp: new Date().toISOString()
    }]).catch(() => {});

    res.json({ success: true, message: 'Administrator password updated successfully.' });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || 'Failed to update password' });
  }
});

// Admin Verify Token
apiRouter.post('/admin/verify', async (req: Request, res: Response) => {
  const token = String(req.body?.token || '');
  const valid = await isValidAdminToken(token);
  if (valid) {
    res.json({ authenticated: true, email: ADMIN_EMAIL });
  } else {
    res.status(401).json({ authenticated: false, message: 'Invalid or expired session' });
  }
});

// Admin Logout
apiRouter.post('/admin/logout', async (req: Request, res: Response) => {
  try {
    const token = String(req.body?.token || req.headers['x-zenith-admin-token'] || '');
    if (token) {
      const { items } = await db.list('admin_sessions', { limit: 100 });
      const matched = items.filter(s => s.token === token).map(s => String(s.id));
      if (matched.length) {
        await db.delete('admin_sessions', matched);
      }
    }
  } catch {}
  res.json({ signedOut: true });
});

// Admin Applications List (GET and POST supported)
apiRouter.get('/admin/applications', async (req: Request, res: Response) => {
  if (!(await requireAdminSession(req))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const result = await adminList();
  res.json(result);
});

apiRouter.post('/admin/applications', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const result = await adminList();
  res.json(result);
});

// Admin Single Application
apiRouter.get('/admin/applications/:id', async (req: Request, res: Response) => {
  if (!(await requireAdminSession(req))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const application = await adminGet(req.params.id);
  if (!application) {
    res.status(404).json({ message: 'Application not found' });
    return;
  }
  res.json({ application });
});

apiRouter.post('/admin/applications/:id', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const application = await adminGet(req.params.id);
  if (!application) {
    res.status(404).json({ message: 'Application not found' });
    return;
  }
  res.json({ application });
});

// Helper for Brevo Status Update Email
export async function sendStatusUpdateEmail(
  applicantEmail: string,
  applicantName: string,
  role: string,
  reference: string,
  newStatus: string,
  customNote?: string,
  interviewChannel?: string,
  interviewContact?: string,
  interviewDeadline?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    let apiKey = '';
    try {
      apiKey = await secrets.readSecret('BREVO_API_KEY');
    } catch {}

    if (!apiKey) {
      return { success: false, error: 'BREVO_API_KEY is not configured in environment' };
    }

    const isInterview = newStatus === 'Shortlisted' || newStatus === 'Interview';
    const channel = interviewChannel || 'Telegram';
    const contact = interviewContact || '@ZenithTalentLead';
    const deadline = interviewDeadline || '48 hours';

    // Build direct click link
    let directLink = 'mailto:zenithglobalinnovationhq@protonmail.com';
    const channelLower = channel.toLowerCase();
    if (channelLower.includes('telegram')) {
      const handleClean = contact.replace('@', '').trim();
      directLink = `https://t.me/${handleClean}`;
    } else if (channelLower.includes('whatsapp')) {
      const phoneClean = contact.replace(/[^0-9]/g, '');
      directLink = `https://wa.me/${phoneClean}?text=Hello%2C%20I%20am%20contacting%20you%20regarding%20my%20Zenith%20Global%20Innovation%20interview%20allocation%20under%20reference%20${reference}.`;
    } else if (channelLower.includes('zangi')) {
      const zangiNum = contact.replace(/[^0-9]/g, '');
      directLink = zangiNum ? `https://zangi.com/dl?number=${zangiNum}` : 'https://zangi.com';
    } else if (contact.startsWith('http')) {
      directLink = contact;
    }

    const buttonColor = channelLower.includes('whatsapp') ? '#16a34a' : channelLower.includes('zangi') ? '#ea580c' : '#2563eb';

    let subject = `Application Update: ${newStatus} — ${role} | ${reference}`;
    let htmlContent = '';

    if (isInterview) {
      subject = `ACTION REQUIRED: Congratulations on Advancing to Direct Interview — ${role} | ${reference}`;
      htmlContent = `
<div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:620px;margin:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.06);color:#0f172a">
  <!-- Executive Header -->
  <div style="background:#10243e;padding:32px 36px;color:#ffffff;text-align:left">
    <div style="display:inline-block;padding:4px 12px;background:rgba(217,119,6,0.25);border:1px solid #d97706;border-radius:6px;font-size:11px;font-weight:800;color:#fcd34d;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px">
      CANDIDATE SELECTION NOTICE · DIRECT INTERVIEW ALLOCATION
    </div>
    <div style="font-size:24px;font-weight:800;letter-spacing:-0.02em;margin:0 0 6px">ZENITH GLOBAL INNOVATION</div>
    <div style="font-size:13px;opacity:0.85">Connecting Talent Across Continents · New York · London · Singapore · Toronto</div>
  </div>

  <div style="padding:36px">
    <!-- Big Congratulations Hero -->
    <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:12px;padding:20px;margin-bottom:28px">
      <div style="font-size:18px;font-weight:800;color:#166534;margin-bottom:6px">
        🎉 Congratulations, ${applicantName}!
      </div>
      <p style="margin:0;font-size:14px;color:#15803d;line-height:1.6">
        Following a thorough review of your professional submission, the hiring committee has officially selected your profile to advance to the <strong>Direct Executive Screening & Technical Interview</strong> stage for <strong>${role}</strong>.
      </p>
    </div>

    <p style="font-size:14px;line-height:1.7;color:#334155;margin:0 0 20px">
      Out of thousands of international candidates evaluated for this intake, your background demonstrated the exact caliber of competence, autonomous execution, and technical discipline required by our global corporate clients.
    </p>

    <!-- Urgency Notice -->
    <div style="background:#fffbeb;border:1.5px solid #f59e0b;border-radius:10px;padding:16px 20px;margin-bottom:28px">
      <div style="font-size:12px;font-weight:800;color:#b45309;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">
        ⏱ STRICT ${deadline.toUpperCase()} CONFIRMATION DEADLINE
      </div>
      <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6">
        Due to active corporate staffing timelines, your interview allocation is reserved for <strong>${deadline}</strong>. Unconfirmed interview slots are promptly reallocated to alternate finalists on our talent waitlist.
      </p>
    </div>

    <!-- The Handover & Interview Directive Box -->
    <div style="background:#0f172a;color:#ffffff;border-radius:14px;padding:26px;margin-bottom:28px">
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#38bdf8;margin-bottom:10px">
        ACTION REQUIRED · DIRECT RECRUITER CONTACT HANDOVER
      </div>
      <p style="margin:0 0 16px;font-size:14px;color:#cbd5e1;line-height:1.6">
        To conduct your real-time interview, verify your credentials, and receive the official <strong>Zenith Company Onboarding Dossier & Role Specification Brief</strong>, you must contact our Senior Talent Lead directly:
      </p>
      
      <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:16px;margin-bottom:20px">
        <div style="margin-bottom:8px;font-size:13px">
          <span style="color:#94a3b8">Assigned Interview Platform:</span> 
          <strong style="color:#ffffff;margin-left:6px">${channel}</strong>
        </div>
        <div style="margin-bottom:8px;font-size:13px">
          <span style="color:#94a3b8">Recruiter Direct Contact:</span> 
          <strong style="color:#38bdf8;margin-left:6px;font-size:15px">${contact}</strong>
        </div>
        <div style="font-size:13px">
          <span style="color:#94a3b8">Official Verification Code to Quote:</span> 
          <strong style="color:#fcd34d;font-family:monospace;font-size:15px;margin-left:6px;background:rgba(0,0,0,0.3);padding:2px 8px;border-radius:4px">${reference}</strong>
        </div>
      </div>

      ${channelLower.includes('zangi') ? `
      <div style="background:rgba(234,88,12,0.15);border:1px solid #ea580c;border-radius:8px;padding:12px 14px;margin-bottom:20px;font-size:12.5px;color:#fed7aa;line-height:1.5">
        💬 <strong>Zangi Safe Messenger Instructions:</strong> Open your Zangi app on your mobile device or desktop, search or add recruiter number <strong>${contact}</strong>, and send your reference code (<strong>${reference}</strong>) to immediately start your onboarding briefing.
      </div>` : ''}

      <div style="text-align:center">
        <a href="${directLink}" target="_blank" style="display:inline-block;background:${buttonColor};color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;padding:14px 28px;border-radius:8px;letter-spacing:0.02em">
          Connect with Recruiter on ${channel} Now →
        </a>
      </div>
    </div>

    <!-- Official Reference Details -->
    <div style="padding:18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:24px">
      <p style="margin:0 0 8px;font-size:13px;color:#475569"><strong>Candidate Name:</strong> ${applicantName}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#475569"><strong>Role Applied:</strong> ${role}</p>
      <p style="margin:0;font-size:13px;color:#475569"><strong>Current Stage:</strong> <span style="font-weight:800;color:#1e40af">${newStatus}</span></p>
    </div>

    ${customNote ? `<div style="padding:16px;background:#eff6ff;border-left:4px solid #2563eb;margin-bottom:24px;border-radius:4px"><strong style="display:block;margin-bottom:6px;color:#1e40af;font-size:13px">Recruitment Team Briefing Note:</strong><p style="margin:0;color:#1e3a8a;font-size:13px;line-height:1.6">${customNote}</p></div>` : ''}

    <p style="font-size:13px;color:#64748b;line-height:1.6;margin:0 0 20px">
      During your direct screening session, your interviewer will review your technical portfolio, confirm remuneration terms, answer questions regarding day-to-day operations, and provide the official company documents.
    </p>

    <div style="border-top:1px solid #e2e8f0;padding-top:20px;font-size:12px;color:#64748b">
      <p style="margin:0 0 4px"><strong>Zenith Global Innovation Recruitment Directorate</strong></p>
      <p style="margin:0 0 4px">Headquarters: New York, USA · London · Singapore · Toronto</p>
      <p style="margin:0">Official Contact: <a href="mailto:zenithglobalinnovationhq@protonmail.com" style="color:#2563eb;text-decoration:none">zenithglobalinnovationhq@protonmail.com</a></p>
    </div>
  </div>
</div>`;
    } else {
      // Standard executive stage update template
      htmlContent = `
<div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:620px;margin:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.06);color:#0f172a">
  <div style="padding:28px 32px;background:#10243e;color:#fff">
    <div style="font-size:20px;font-weight:700">ZENITH GLOBAL INNOVATION</div>
    <div style="margin-top:6px;font-size:12px;opacity:.85">Connecting Talent Across Continents · New York · London · Singapore · Toronto</div>
  </div>
  <div style="padding:32px">
    <p style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 14px">Dear ${applicantName},</p>
    <p style="font-size:14px;line-height:1.6;color:#334155;margin:0 0 20px">
      We are pleased to provide you with an official update regarding your candidacy for the <strong>${role}</strong> position at Zenith Global Innovation.
    </p>
    <div style="padding:18px;background:#f8fafc;border:1px solid #dfe6ee;border-radius:10px;margin-bottom:20px">
      <p style="margin:0 0 8px;font-size:13px"><strong>Application Reference:</strong> <span style="font-family:monospace;color:#0f172a">${reference}</span></p>
      <p style="margin:0 0 8px;font-size:13px"><strong>Position:</strong> ${role}</p>
      <p style="margin:0;font-size:13px"><strong>Updated Stage:</strong> <span style="display:inline-block;padding:4px 12px;background:#e0f2fe;color:#0369a1;border-radius:999px;font-weight:700">${newStatus}</span></p>
    </div>
    ${customNote ? `<div style="padding:16px;background:#eff6ff;border-left:4px solid #2563eb;margin-bottom:20px;border-radius:4px"><strong style="display:block;margin-bottom:6px;color:#1e40af;font-size:13px">Recruitment Team Note:</strong><p style="margin:0;color:#1e3a8a;font-size:13px;line-height:1.6">${customNote}</p></div>` : ''}
    <p style="font-size:13px;color:#64748b;line-height:1.6">You can check the live progress of your application at any time using your application reference code on our portal.</p>
    <p style="font-size:13px;color:#64748b;line-height:1.6">For management or general enquiries, contact <a href="mailto:zenithglobalinnovationhq@protonmail.com" style="color:#2563eb;text-decoration:none">zenithglobalinnovationhq@protonmail.com</a>.</p>
    <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:20px;font-size:12px;color:#64748b">
      <strong>Talent Acquisition Directorate</strong><br>Zenith Global Innovation
    </div>
  </div>
</div>`;
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Zenith Global Innovation',
          email: 'zenithglobalinnovationhq@protonmail.com',
        },
        to: [{ email: applicantEmail, name: applicantName }],
        subject,
        htmlContent,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const detail = await response.text().catch(() => '');
      return { success: false, error: `Brevo rejected notification (HTTP ${response.status}): ${detail.slice(0, 200)}` };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to dispatch update email' };
  }
}

// Admin Update Status
apiRouter.put('/admin/applications/:id/status', async (req: Request, res: Response) => {
  if (!(await requireAdminSession(req))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const status = String(req.body?.status || '');
  const notifyApplicant = Boolean(req.body?.notifyApplicant);
  const customNote = req.body?.customNote ? String(req.body.customNote) : undefined;
  const interviewChannel = req.body?.interviewChannel ? String(req.body.interviewChannel) : undefined;
  const interviewContact = req.body?.interviewContact ? String(req.body.interviewContact) : undefined;
  const interviewDeadline = req.body?.interviewDeadline ? String(req.body.interviewDeadline) : undefined;

  const extraData: Record<string, any> = {};
  if (interviewChannel) extraData.interviewChannel = interviewChannel;
  if (interviewContact) extraData.interviewContact = interviewContact;
  if (interviewDeadline) extraData.interviewDeadline = interviewDeadline;

  const ok = await adminStatus(req.params.id, status, ADMIN_EMAIL, extraData);
  if (!ok) {
    res.status(400).json({ message: 'Unable to update application status' });
    return;
  }

  let emailSent = false;
  let emailError = '';
  if (notifyApplicant) {
    const item = await adminGet(req.params.id);
    if (item && item.email) {
      const result = await sendStatusUpdateEmail(
        String(item.email),
        String(item.name || 'Applicant'),
        String(item.jobTitle || item.desiredRole || 'Position'),
        String(item.reference),
        status,
        customNote,
        interviewChannel || item.interviewChannel || item.preferredChannel,
        interviewContact || item.interviewContact,
        interviewDeadline || item.interviewDeadline
      );
      emailSent = result.success;
      emailError = result.error || '';
    }
  }

  res.json({ updated: true, status, emailSent, emailError });
});

apiRouter.post('/admin/applications/:id/status', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const status = String(b.status || '');
  const notifyApplicant = Boolean(b.notifyApplicant);
  const customNote = b.customNote ? String(b.customNote) : undefined;
  const interviewChannel = b.interviewChannel ? String(b.interviewChannel) : undefined;
  const interviewContact = b.interviewContact ? String(b.interviewContact) : undefined;
  const interviewDeadline = b.interviewDeadline ? String(b.interviewDeadline) : undefined;

  const extraData: Record<string, any> = {};
  if (interviewChannel) extraData.interviewChannel = interviewChannel;
  if (interviewContact) extraData.interviewContact = interviewContact;
  if (interviewDeadline) extraData.interviewDeadline = interviewDeadline;

  const ok = await adminStatus(req.params.id, status, ADMIN_EMAIL, extraData);
  if (!ok) {
    res.status(400).json({ message: 'Unable to update application status' });
    return;
  }

  let emailSent = false;
  let emailError = '';
  if (notifyApplicant) {
    const item = await adminGet(req.params.id);
    if (item && item.email) {
      const result = await sendStatusUpdateEmail(
        String(item.email),
        String(item.name || 'Applicant'),
        String(item.jobTitle || item.desiredRole || 'Position'),
        String(item.reference),
        status,
        customNote,
        interviewChannel || item.interviewChannel || item.preferredChannel,
        interviewContact || item.interviewContact,
        interviewDeadline || item.interviewDeadline
      );
      emailSent = result.success;
      emailError = result.error || '';
    }
  }

  res.json({ updated: true, status, emailSent, emailError });
});

// Admin Add Note
apiRouter.post('/admin/applications/:id/note', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const note = String(b.note || '').trim();
  if (!note) {
    res.status(400).json({ message: 'Note is required' });
    return;
  }
  const ok = await adminAddNote(req.params.id, note, ADMIN_EMAIL);
  if (ok) {
    res.json({ saved: true });
  } else {
    res.status(400).json({ message: 'Unable to save note' });
  }
});

// Admin Audit Log
apiRouter.get('/admin/audit', async (req: Request, res: Response) => {
  if (!(await requireAdminSession(req))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  res.json({ events: await adminAudit() });
});

apiRouter.post('/admin/audit', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  res.json({ events: await adminAudit() });
});

// Admin Brevo Integration Status & Diagnostics
apiRouter.post('/admin/brevo/status', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }

  let apiKey = '';
  try {
    apiKey = await secrets.readSecret('BREVO_API_KEY');
  } catch {}

  if (!apiKey) {
    res.json({
      configured: false,
      valid: false,
      senderEmail: ADMIN_EMAIL,
      message: 'BREVO_API_KEY is not configured in the server environment (.env).',
    });
    return;
  }

  try {
    const accRes = await fetch('https://api.brevo.com/v3/account', {
      headers: { 'api-key': apiKey, 'Accept': 'application/json' },
    });

    if (!accRes.ok) {
      const errText = await accRes.text().catch(() => '');
      res.json({
        configured: true,
        valid: false,
        senderEmail: ADMIN_EMAIL,
        statusCode: accRes.status,
        error: `Brevo rejected key (HTTP ${accRes.status}): ${errText.slice(0, 200)}`,
      });
      return;
    }

    const accData: any = await accRes.json().catch(() => ({}));

    // Check sender verification
    let senderVerified = false;
    try {
      const sendersRes = await fetch('https://api.brevo.com/v3/senders', {
        headers: { 'api-key': apiKey, 'Accept': 'application/json' },
      });
      if (sendersRes.ok) {
        const sendersData: any = await sendersRes.json().catch(() => ({ senders: [] }));
        const list = Array.isArray(sendersData.senders) ? sendersData.senders : [];
        senderVerified = list.some((s: any) => String(s.email).toLowerCase() === ADMIN_EMAIL.toLowerCase() && s.active);
      }
    } catch {}

    res.json({
      configured: true,
      valid: true,
      senderEmail: ADMIN_EMAIL,
      senderVerified,
      accountEmail: accData.email || '',
      companyName: accData.companyName || '',
      plan: accData.plan || [],
      message: 'Brevo API connection active and authenticated.',
    });
  } catch (err: any) {
    res.json({
      configured: true,
      valid: false,
      senderEmail: ADMIN_EMAIL,
      error: `Connection failure to Brevo API: ${err?.message || 'Network error'}`,
    });
  }
});

// Admin Send Test Email via Brevo
apiRouter.post('/admin/brevo/test', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }

  let apiKey = '';
  try {
    apiKey = await secrets.readSecret('BREVO_API_KEY');
  } catch {}

  if (!apiKey) {
    res.status(400).json({ success: false, message: 'BREVO_API_KEY is not configured.' });
    return;
  }

  const recipient = String(b.recipientEmail || ADMIN_EMAIL).trim();

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Zenith Global Innovation',
          email: ADMIN_EMAIL,
        },
        to: [{ email: recipient, name: 'Zenith Administrator' }],
        subject: `[Test] Brevo Integration Verification — Zenith Global Innovation`,
        htmlContent: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#0f172a">
            <div style="background:#10243e;padding:24px;color:#fff">
              <h2 style="margin:0">Zenith Global Innovation</h2>
              <p style="margin:4px 0 0;font-size:12px;opacity:0.85">Recruitment Operations · Brevo Integration Diagnostic</p>
            </div>
            <div style="padding:24px;border:1px solid #e2e8f0;border-top:none">
              <p>Hello,</p>
              <p>This is a test notification confirming that the <strong>Brevo Transactional Email API</strong> is properly authenticated and operating successfully for Zenith Global Innovation.</p>
              <div style="background:#f1f5f9;padding:16px;border-radius:8px;font-size:13px;margin:20px 0">
                <p style="margin:0 0 6px"><strong>Sender:</strong> ${ADMIN_EMAIL}</p>
                <p style="margin:0 0 6px"><strong>Recipient:</strong> ${recipient}</p>
                <p style="margin:0"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              </div>
              <p style="font-size:12px;color:#64748b">Automatic candidate application confirmations and stage progression updates will now be dispatched without interruption.</p>
            </div>
          </div>
        `,
      }),
    });

    if (response.ok) {
      const data: any = await response.json().catch(() => ({}));
      res.json({
        success: true,
        messageId: data.messageId || 'ok',
        recipient,
        message: `Test email successfully dispatched to ${recipient}`,
      });
    } else {
      const errText = await response.text().catch(() => '');
      res.status(400).json({
        success: false,
        statusCode: response.status,
        error: `Brevo dispatch failed: ${errText.slice(0, 300)}`,
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Failed to dispatch email' });
  }
});

// Admin Update Brevo API Key
apiRouter.post('/admin/brevo/key', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }

  const rawKey = String(b.apiKey || '').trim();
  if (!rawKey) {
    res.status(400).json({ message: 'API Key is required' });
    return;
  }

  try {
    await secrets.writeSecret('BREVO_API_KEY', rawKey);

    // Verify key with Brevo API
    const accRes = await fetch('https://api.brevo.com/v3/account', {
      headers: { 'api-key': rawKey, 'Accept': 'application/json' },
    });

    if (accRes.ok) {
      const accData: any = await accRes.json().catch(() => ({}));
      res.json({
        success: true,
        valid: true,
        message: `Brevo API key saved and verified! Connected to ${accData.email || 'account'}.`,
        accountEmail: accData.email,
      });
    } else {
      const errText = await accRes.text().catch(() => '');
      res.json({
        success: true,
        valid: false,
        warning: `Key saved to server, but Brevo returned HTTP ${accRes.status}: ${errText.slice(0, 200)}`,
      });
    }
  } catch (err: any) {
    res.status(500).json({ message: err?.message || 'Failed to update Brevo API key' });
  }
});

// Jobs
apiRouter.get('/jobs', async (_req: Request, res: Response) => {
  try {
    const jobs = await ensureJobs();
    res.json({ jobs });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || 'Failed to fetch jobs' });
  }
});

// Resume Upload
apiRouter.post('/resumes', async (req: Request, res: Response) => {
  try {
    const b = req.body as Record<string, unknown>;
    if (!b.filename || !b.content || !b.contentType) {
      res.status(400).json({ message: 'Resume file is required' });
      return;
    }
    const name = String(b.filename).replace(/[^a-zA-Z0-9._-]/g, '_');
    const resumePath = `applications/resumes/${Date.now()}-${name}`;
    const [ok] = await storage.write([{
      path: resumePath,
      content: String(b.content),
      contentType: String(b.contentType)
    }]);

    if (!ok) {
      res.status(500).json({ message: 'Could not securely store resume' });
      return;
    }
    res.status(201).json({ path: resumePath });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || 'Failed to process resume' });
  }
});

// View / Download Resume Attachment
apiRouter.get('/resumes/file/*', async (req: Request, res: Response) => {
  try {
    const filePath = req.params[0];
    if (!filePath) {
      res.status(400).send('File path required');
      return;
    }
    const file = await storage.read(filePath);
    if (!file) {
      res.status(404).send('Resume file not found');
      return;
    }
    res.setHeader('Content-Type', file.contentType);
    res.setHeader('Content-Disposition', `inline; filename="${path.basename(filePath)}"`);
    res.send(file.buffer);
  } catch (err) {
    res.status(500).send('Error retrieving file');
  }
});

// Submit Application (Rate limited to prevent submission floods/bot abuse)
apiRouter.post('/applications', rateLimiter('submit-app', 12, 15 * 60 * 1000), async (req: Request, res: Response) => {
  try {
    const b = req.body as Record<string, unknown>;
    const missing: string[] = [];

    if (!b.name || String(b.name).trim() === '') missing.push('Full legal name');
    if (!b.email || String(b.email).trim() === '') missing.push('Email address');
    if (!b.phone || String(b.phone).trim() === '') missing.push('Primary phone number');
    if (!b.country || String(b.country).trim() === '') missing.push('Country of residence');
    if (!b.nationality || String(b.nationality).trim() === '') missing.push('Nationality');
    if (!b.dob || String(b.dob).trim() === '') missing.push('Date of birth');
    if (!b.gender || String(b.gender).trim() === '') missing.push('Gender');
    if (!b.address || String(b.address).trim() === '') missing.push('Residential address');
    if (!b.availability || String(b.availability).trim() === '') missing.push('Availability / start date');
    if (!b.education || String(b.education).trim() === '') missing.push('Education level');
    if (!b.field || String(b.field).trim() === '') missing.push('Field of study');
    if (!b.resumePath && !b.resumeName) missing.push('Resume / CV document');
    if (!b.resumePath && b.resumeName) b.resumePath = b.resumeName;
    if (!b.signature || String(b.signature).trim() === '') missing.push('Digital signature');

    if (!b.preferredChannel || String(b.preferredChannel).trim() === '') {
      b.preferredChannel = 'Telegram';
    }
    if (!b.contactHandle || String(b.contactHandle).trim() === '') {
      missing.push('Interview contact handle (Telegram @username, WhatsApp number, or Zangi ID)');
    }

    if (missing.length > 0) {
      res.status(400).json({
        message: `Please complete the following required field${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}.`,
        missingFields: missing,
      });
      return;
    }

    const emailStr = String(b.email || '').trim().toLowerCase();
    const [localPart] = emailStr.split('@');
    const cleanUser = (localPart || '').replace(/[^a-z]/g, '');
    if (
      (cleanUser.length >= 7 && /[bcdfghjklmnpqrstvwxyz]{6,}/i.test(cleanUser) && !cleanUser.includes('schmidt')) ||
      /([a-z0-9]{2,})\1{2,}/i.test(localPart || '')
    ) {
      res.status(400).json({
        message: 'The submitted email address appears to contain random or invalid character patterns. Please provide a valid, active email address.',
        missingFields: ['Email address'],
      });
      return;
    }

    b.expectedSalary = b.expectedSalary && String(b.expectedSalary).trim() !== '' ? String(b.expectedSalary).trim() : 'Open / Negotiable';
    b.employer = b.employer && String(b.employer).trim() !== '' ? String(b.employer).trim() : 'Not specified';
    b.currentTitle = b.currentTitle && String(b.currentTitle).trim() !== '' ? String(b.currentTitle).trim() : 'Not specified';

    const reference = 'ZGI-2026-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    const submittedAt = new Date().toISOString();
    const responseBy = new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10);
    const preferredChannel = String(b.preferredChannel || 'Telegram');
    const contactHandle = String(b.contactHandle || '').trim();
    const source = String(b.source || 'Direct').trim();
    const additionalRoles = Array.isArray(b.additionalRoles)
      ? b.additionalRoles.filter(Boolean)
      : b.additionalRoles
      ? [String(b.additionalRoles)]
      : [];

    const initialRecord = {
      ...b,
      preferredChannel,
      contactHandle,
      source: source || 'Direct',
      additionalRoles,
      reference,
      status: 'Application Received',
      submittedAt,
      estimatedResponseDate: responseBy,
      companyEmail: 'zenithglobalinnovationhq@protonmail.com',
      emailSent: false,
      emailError: '',
    };

    const [id] = await db.add('applications', [initialRecord]);
    if (!id) {
      res.status(500).json({ message: 'Could not save application' });
      return;
    }

    // Attempt Brevo transactional email
    let emailSent = false;
    let emailError = '';
    const applicantName = String(b.name);
    const role = String(b.jobTitle || b.desiredRole || b.jobId);

    try {
      let apiKey = '';
      try {
        apiKey = await secrets.readSecret('BREVO_API_KEY');
      } catch {}

      if (!apiKey) {
        emailError = 'Brevo API key not configured (BREVO_API_KEY environment variable required)';
        console.warn('Application saved. Transactional confirmation email skipped: BREVO_API_KEY is not configured.');
      } else {
        const htmlContent = `
<div style="font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.05);color:#0f172a">
  <div style="background:linear-gradient(135deg,#0a192f 0%,#1e3a5f 100%);padding:36px 32px;color:#ffffff;text-align:left">
    <div style="display:inline-block;padding:4px 12px;background:rgba(217,119,6,0.25);border:1px solid #f59e0b;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#fef3c7;margin-bottom:12px">
      ● Official Candidate Intake · Priority Fast-Track
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#ffffff">ZENITH GLOBAL INNOVATION</h1>
    <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;letter-spacing:0.3px">Global Workforce & Strategic Talent Operations · Confidential</p>
  </div>

  <div style="padding:32px 32px 24px">
    <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px">
      <h3 style="margin:0 0 4px;font-size:16px;color:#15803d;font-weight:700">Congratulations, ${applicantName}</h3>
      <p style="margin:0;font-size:13px;color:#166534;line-height:1.5">
        Your candidate dossier for the position of <strong>${role}</strong> has been logged into our executive intake registry. Due to the high caliber of your submitted credentials, your profile has been tagged for accelerated qualification review.
      </p>
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:24px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:12px">Candidate Profile Credentials</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr>
          <td style="padding:6px 0;color:#64748b;width:40%">Application Reference:</td>
          <td style="padding:6px 0;font-family:monospace;font-weight:800;color:#0a192f;font-size:14px">${reference}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#64748b">Target Position:</td>
          <td style="padding:6px 0;font-weight:600;color:#0f172a">${role}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#64748b">Current Pipeline Stage:</td>
          <td style="padding:6px 0;font-weight:700;color:#2563eb">Application Received & Under Executive Review</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#64748b">Registered Interview Channel:</td>
          <td style="padding:6px 0;font-weight:700;color:#0f172a">${preferredChannel} (${contactHandle})</td>
        </tr>
      </table>
    </div>

    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:18px 20px;margin-bottom:24px">
      <div style="font-size:13px;font-weight:700;color:#92400e;margin-bottom:4px">⚠️ Critical Hiring Notice — Limited Quota Allocation</div>
      <p style="margin:0;font-size:12px;color:#78350f;line-height:1.55">
        Zenith Global Innovation conducts structured, highly competitive screening cycles. Once our Talent Assessment committee completes credential verification, shortlisted candidates are issued exclusive interview access windows. <strong>Please keep your ${preferredChannel} account active and accessible at ${contactHandle}.</strong>
      </p>
    </div>

    <p style="font-size:13px;line-height:1.6;color:#334155;margin-bottom:20px">
      Our executive committee completes stage assessments within <strong>3–5 business days</strong>. Should your profile progress to the shortlist, you will receive real-time instructions to connect directly with your assigned recruitment director.
    </p>

    <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:28px">
      <p style="font-size:11px;color:#64748b;line-height:1.6;margin:0 0 10px">
        Official corporate communications: <a href="mailto:zenithglobalinnovationhq@protonmail.com" style="color:#2563eb;text-decoration:none">zenithglobalinnovationhq@protonmail.com</a><br>
        Zenith Global Innovation · International Human Capital Management
      </p>
      <p style="font-size:10px;color:#94a3b8;margin:0">
        This notification was generated automatically for reference ${reference}. Do not reply directly to this automated transactional notice.
      </p>
    </div>
  </div>
</div>`;

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            sender: {
              name: 'Zenith Global Innovation',
              email: 'zenithglobalinnovationhq@protonmail.com',
            },
            to: [{ email: String(b.email), name: applicantName }],
            subject: `Congratulations — Priority Review Intake Confirmed | ${role} (${reference})`,
            htmlContent,
          }),
        });

        if (response.ok) {
          emailSent = true;
          console.log(`Confirmation email sent via Brevo to ${b.email} for application ${reference}`);
        } else {
          const detail = await response.text().catch(() => '');
          emailError = `Brevo rejected confirmation email (HTTP ${response.status})${detail ? `: ${detail.slice(0, 300)}` : ''}`;
          console.error(emailError);
        }
      }
    } catch (err: any) {
      emailError = err?.message || 'Brevo email delivery error';
      console.error(emailError);
    }

    // Persist email status update
    await db.update('applications', [{
      id,
      record: {
        ...initialRecord,
        emailSent,
        emailError,
      },
    }]);

    res.status(201).json({
      id,
      reference,
      status: 'Application Received',
      submittedAt,
      estimatedResponseDate: responseBy,
      expectedTimeline: '3-5 business days',
      companyEmail: 'zenithglobalinnovationhq@protonmail.com',
      emailSent,
      emailError: emailSent ? '' : emailError,
    });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || 'Failed to submit application' });
  }
});

// Query Application by Reference (Case-insensitive)
apiRouter.get('/applications/:reference', async (req: Request, res: Response) => {
  try {
    const rawRef = String(req.params.reference || '').trim().toUpperCase();
    const { items } = await db.list('applications', { limit: 1000 });
    const item = items.find(x => String(x.reference || '').trim().toUpperCase() === rawRef);
    if (!item) {
      res.status(404).json({ message: 'Application not found. Please verify your reference number.' });
      return;
    }

    // Mask name for privacy: "A*** M***"
    const rawName = String(item.name || '').trim();
    const maskedName = rawName
      ? rawName
          .split(' ')
          .map(part => (part.length > 1 ? `${part[0]}${'*'.repeat(Math.min(part.length - 1, 4))}` : part))
          .join(' ')
      : 'Applicant';

    res.json({
      reference: item.reference,
      status: item.status || 'Application Received',
      submittedAt: item.submittedAt,
      estimatedResponseDate: item.estimatedResponseDate,
      jobTitle: item.jobTitle || item.desiredRole,
      applicantName: maskedName,
      country: item.country,
      preferredChannel: item.preferredChannel,
      interviewChannel: item.interviewChannel,
      interviewContact: item.interviewContact,
      interviewDeadline: item.interviewDeadline,
      companyEmail: 'zenithglobalinnovationhq@protonmail.com',
    });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || 'Error querying application' });
  }
});

// Admin Client Inquiries / Leads Management
apiRouter.get('/admin/leads', async (req: Request, res: Response) => {
  if (!(await requireAdminSession(req))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const { items } = await db.list('leads', { limit: 500 });
  res.json({ leads: items });
});

apiRouter.post('/admin/leads', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const { items } = await db.list('leads', { limit: 500 });
  res.json({ leads: items });
});

apiRouter.post('/admin/leads/:id/status', async (req: Request, res: Response) => {
  const b = req.body as Record<string, unknown>;
  const t = String(b.token || '');
  if (!(await isValidAdminToken(t))) {
    res.status(401).json({ message: 'Administrator authentication required' });
    return;
  }
  const nextStatus = String(b.status || 'Contacted');
  const [lead] = await db.get('leads', [req.params.id]);
  if (!lead) {
    res.status(404).json({ message: 'Lead not found' });
    return;
  }
  const ok = (await db.update('leads', [{ id: req.params.id, record: { ...lead, status: nextStatus, updatedBy: ADMIN_EMAIL, updatedAt: new Date().toISOString() } }]))[0];
  if (ok) {
    res.json({ updated: true, status: nextStatus });
  } else {
    res.status(400).json({ message: 'Failed to update lead status' });
  }
});

// Contact Leads (Public submission with rate limiting)
apiRouter.post('/leads', rateLimiter('client-lead', 10, 15 * 60 * 1000), async (req: Request, res: Response) => {
  try {
    const b = req.body as Record<string, unknown>;
    if (!b.name || !b.email || !b.message) {
      res.status(400).json({ message: 'Name, email and message are required' });
      return;
    }
    const [id] = await db.add('leads', [{
      ...b,
      status: 'New',
      createdAt: new Date().toISOString()
    }]);
    if (!id) {
      res.status(500).json({ message: 'Could not save request' });
      return;
    }
    res.status(201).json({ id, received: true });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || 'Error saving lead' });
  }
});

// Job Alerts
apiRouter.post('/job-alerts', async (req: Request, res: Response) => {
  try {
    const b = req.body as Record<string, unknown>;
    const email = String(b.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      res.status(400).json({ message: 'A valid email is required' });
      return;
    }

    const [subscriptionId] = await db.add('job_alerts', [{
      email,
      country: String(b.country || 'Any country'),
      category: String(b.category || 'All roles'),
      createdAt: new Date().toISOString(),
      active: true,
    }]);

    if (!subscriptionId) {
      res.status(500).json({ message: 'Could not create job alert' });
      return;
    }

    let confirmationSent = false;
    try {
      const apiKey = await secrets.readSecret('BREVO_API_KEY');
      if (apiKey) {
        const html = `
<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#18283d">
  <div style="padding:28px 30px;background:#10243e;color:#fff">
    <strong>ZENITH GLOBAL INNOVATION</strong>
    <div style="font-size:12px;margin-top:6px">Connecting Talent Across Continents</div>
  </div>
  <div style="padding:30px">
    <p>Your Zenith Global Innovation job alert is now active.</p>
    <p><strong>Category:</strong> ${String(b.category || 'All roles')}<br><strong>Country:</strong> ${String(b.country || 'Any country')}</p>
    <p>We will use this subscription to notify you when relevant opportunities become available.</p>
    <p>For enquiries: <a href="mailto:zenithglobalinnovationhq@protonmail.com">zenithglobalinnovationhq@protonmail.com</a></p>
  </div>
</div>`;
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            sender: {
              name: 'Zenith Global Innovation',
              email: 'zenithglobalinnovationhq@protonmail.com',
            },
            to: [{ email }],
            subject: 'Your Zenith Global Innovation job alert is active',
            htmlContent: html,
          }),
        });
        confirmationSent = response.ok;
      }
    } catch {}

    res.status(201).json({ subscriptionId, subscribed: true, confirmationSent });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || 'Error processing job alert' });
  }
});

// Profile stub
apiRouter.get('/profile', async (_req: Request, res: Response) => {
  res.json({ email: ADMIN_EMAIL, name: 'Zenith Administrator' });
});
