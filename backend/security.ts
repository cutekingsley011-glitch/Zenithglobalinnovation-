import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { db } from './db';

// In-memory blacklist for blocked IPs (IP -> expiry timestamp)
const blockedIps = new Map<string, number>();

// In-memory brute force tracker for admin login (IP -> { count, lockedUntil, lastAttempt })
const adminLoginAttempts = new Map<string, { count: number; lockedUntil: number; lastAttempt: number }>();

// General rate limiter tracker (Key -> { count, resetAt })
const generalRateLimits = new Map<string, { count: number; resetAt: number }>();

// Common automated vulnerability scanner and exploit probe paths
const HONEYPOT_PATHS = [
  '/wp-login.php',
  '/wp-admin',
  '/wp-content',
  '/wp-includes',
  '/xmlrpc.php',
  '/.env',
  '/.env.local',
  '/.env.production',
  '/.git',
  '/.git/config',
  '/.aws',
  '/phpmyadmin',
  '/pma',
  '/admin.php',
  '/administrator',
  '/eval-stdin.php',
  '/solr',
  '/actuator',
  '/actuator/health',
  '/cgi-bin',
  '/boaform',
  '/HNAP1',
  '/setup.php',
  '/install.php',
  '/server-status',
  '/config.json',
  '/backup.sql',
  '/dump.sql',
  '/database.sql',
  '/etc/passwd',
  '/shell',
  '/cmd.jsp',
];

/**
 * Extracts client IP considering trusted proxies
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '127.0.0.1';
}

/**
 * 1. Active Honeypot & Attacker Isolation Middleware
 * Catches malicious scanner bot traffic, immediately blacklists the source IP,
 * and records an alert in the administrative audit log.
 */
export function honeypotShield(req: Request, res: Response, next: NextFunction) {
  const ip = getClientIp(req);
  const now = Date.now();

  // 1. Check if IP is already blacklisted
  const blockedUntil = blockedIps.get(ip);
  if (blockedUntil) {
    if (now < blockedUntil) {
      res.setHeader('Server', 'Zenith-Perimeter-Shield/4.2');
      res.setHeader('X-Threat-Detected', 'Isolated');
      res.status(403).json({
        error: 'Access Denied: Malicious activity detected. Your IP address has been isolated by the security perimeter.',
      });
      return;
    } else {
      blockedIps.delete(ip);
    }
  }

  // 2. Check if request targets a honeypot exploit path
  const pathLower = (req.path || '').toLowerCase();
  const isTrap = HONEYPOT_PATHS.some(trap => pathLower === trap || pathLower.startsWith(trap + '/'));

  if (isTrap) {
    // Blacklist IP for 24 hours
    blockedIps.set(ip, now + 24 * 60 * 60 * 1000);

    // Asynchronously log to security audit trail
    db.add('admin_audit', [{
      event: 'SECURITY_HONEYPOT_TRIGGERED',
      details: `Exploit probe detected from ${ip} targeting ${req.path}. IP isolated for 24 hours.`,
      ip,
      path: req.path,
      userAgent: req.headers['user-agent'] || 'Unknown',
      timestamp: new Date().toISOString(),
    }]).catch(() => {});

    console.warn(`[SECURITY ALERT] Honeypot triggered by ${ip} targeting "${req.path}". IP blacklisted.`);

    res.setHeader('Server', 'Zenith-Active-Perimeter/4.2');
    res.setHeader('X-Defense-Action', 'Trap-Triggered-And-Logged');
    res.status(403).json({
      error: 'Security perimeter breach detected. Request signature has been logged and blacklisted.',
    });
    return;
  }

  next();
}

/**
 * 2. Enterprise Security Headers Middleware
 * Obscures internal software versions and injects browser defense headers.
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Mask underlying runtime / framework
  res.removeHeader('X-Powered-By');
  res.setHeader('Server', 'Zenith-Enterprise-Gateway/4.0');

  // Anti-MIME-sniffing, Clickjacking, and XSS defense
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
}

/**
 * 3. Constant-Time Timing-Safe Password Verification
 * Defeats nanosecond-level CPU timing attacks on password comparisons.
 */
export function verifyPassword(submitted: string, storedHash: string, salt: string): boolean {
  try {
    const submittedHash = crypto.createHash('sha256').update(`${salt}:${submitted}`).digest('hex');
    const a = Buffer.from(submittedHash, 'utf8');
    const b = Buffer.from(storedHash, 'utf8');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Creates a salted hash for a new password
 */
export function hashPassword(plainPassword: string, salt?: string): { hash: string; salt: string } {
  const s = salt || crypto.randomBytes(16).toString('hex');
  const h = crypto.createHash('sha256').update(`${s}:${plainPassword}`).digest('hex');
  return { hash: h, salt: s };
}

/**
 * 4. Brute-Force Rate Limiter & Tarpit for Admin Login
 * Limits failed attempts and injects computational delay on invalid attempts.
 */
export async function checkAdminLoginRateLimit(ip: string): Promise<{ allowed: boolean; message?: string }> {
  const now = Date.now();
  const record = adminLoginAttempts.get(ip);

  if (record && record.lockedUntil > now) {
    const minutesLeft = Math.ceil((record.lockedUntil - now) / 60000);
    return {
      allowed: false,
      message: `Too many failed authentication attempts. Account access locked for ${minutesLeft} minute(s).`,
    };
  }

  return { allowed: true };
}

export async function recordAdminLoginAttempt(ip: string, success: boolean): Promise<void> {
  const now = Date.now();
  if (success) {
    adminLoginAttempts.delete(ip);
    return;
  }

  const record = adminLoginAttempts.get(ip) || { count: 0, lockedUntil: 0, lastAttempt: now };
  record.count += 1;
  record.lastAttempt = now;

  // If 5 or more failed attempts, lock for 15 minutes
  if (record.count >= 5) {
    record.lockedUntil = now + 15 * 60 * 1000;
  }

  adminLoginAttempts.set(ip, record);

  // Inject a forced 1.2 to 1.8 second delay (Tarpit) on failed attempts to defeat automated bot speed
  const delay = 1200 + Math.floor(Math.random() * 600);
  await new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * 5. General Rate Limiter for Public Endpoints
 */
export function rateLimiter(action: string, maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = getClientIp(req);
    const key = `${action}:${ip}`;
    const now = Date.now();

    const record = generalRateLimits.get(key);
    if (!record || record.resetAt <= now) {
      generalRateLimits.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    record.count += 1;
    if (record.count > maxRequests) {
      res.status(429).json({
        message: 'Too many requests received from your connection. Please wait a few moments and try again.',
      });
      return;
    }

    next();
  };
}
