// api/serverless.ts
import express from "express";

// backend/index.ts
import { Router } from "express";
import path4 from "path";
import dns from "dns";
import crypto2 from "crypto";

// backend/db.ts
import fs from "fs";
import path from "path";
var isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
var BUNDLED_DB_FILE = path.resolve(process.cwd(), "data", "db.json");
var DATA_DIR = isVercel ? "/tmp" : path.resolve(process.cwd(), "data");
var DB_FILE = isVercel ? path.join("/tmp", "db.json") : path.join(DATA_DIR, "db.json");
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch {
}
var defaultSchema = {
  applications: [],
  jobs: [],
  admin_audit: [],
  leads: [],
  job_alerts: [],
  admin_sessions: [],
  admin_security: [
    {
      id: "sec_admin_cred",
      salt: "zgi_sec_salt_2026",
      passwordHash: "fb2a4168334a02aee93e2ffa05eed0e2c22e8eeb191a91ed85a6061696eb5f47",
      updatedAt: "2026-10-26T10:53:27.415Z"
    }
  ]
};
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      if (isVercel && fs.existsSync(BUNDLED_DB_FILE)) {
        try {
          const initial = fs.readFileSync(BUNDLED_DB_FILE, "utf-8");
          fs.writeFileSync(DB_FILE, initial, "utf-8");
          return { ...defaultSchema, ...JSON.parse(initial) };
        } catch {
        }
      }
      writeDb(defaultSchema);
      return { ...defaultSchema };
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return { ...defaultSchema, ...parsed };
  } catch (err) {
    console.error("Error reading database, using default structure:", err);
    return { ...defaultSchema };
  }
}
function writeDb(data) {
  const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
  try {
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    if (fs.existsSync(tmpFile)) {
      try {
        fs.unlinkSync(tmpFile);
      } catch {
      }
    }
    console.warn("Filesystem write notice:", err);
  }
}
function generateId(prefix = "rec") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}
var db = {
  async list(collection, options) {
    const data = readDb();
    const items = data[collection] || [];
    const limit = options?.limit || 1e3;
    return { items: items.slice(0, limit) };
  },
  async get(collection, ids) {
    const data = readDb();
    const items = data[collection] || [];
    const idSet = new Set(ids.map(String));
    const found = items.filter((item) => idSet.has(String(item.id)));
    return found;
  },
  async add(collection, records) {
    const data = readDb();
    if (!data[collection]) {
      data[collection] = [];
    }
    const generatedIds = [];
    for (const record of records) {
      const rec = record;
      const id = rec.id || generateId(collection.slice(0, 3));
      const newRecord = { ...rec, id };
      data[collection].unshift(newRecord);
      generatedIds.push(id);
    }
    writeDb(data);
    return generatedIds;
  },
  async update(collection, updates) {
    const data = readDb();
    const items = data[collection] || [];
    const results = [];
    for (const { id, record } of updates) {
      const index = items.findIndex((item) => String(item.id) === String(id));
      if (index !== -1) {
        items[index] = { ...items[index], ...record, id };
        results.push(true);
      } else {
        results.push(false);
      }
    }
    if (results.some(Boolean)) {
      data[collection] = items;
      writeDb(data);
    }
    return results;
  },
  async delete(collection, ids) {
    const data = readDb();
    const items = data[collection] || [];
    const idSet = new Set(ids.map(String));
    const initialLength = items.length;
    data[collection] = items.filter((item) => !idSet.has(String(item.id)));
    const deletedCount = initialLength - data[collection].length;
    if (deletedCount > 0) {
      writeDb(data);
    }
    return ids.map((id) => idSet.has(id));
  }
};

// backend/storage.ts
import fs2 from "fs";
import path2 from "path";
var isVercel2 = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
var STORAGE_ROOT = isVercel2 ? "/tmp/storage" : path2.resolve(process.cwd(), "data", "storage");
try {
  if (!fs2.existsSync(STORAGE_ROOT)) {
    fs2.mkdirSync(STORAGE_ROOT, { recursive: true });
  }
} catch {
}
var storage = {
  async write(files) {
    const results = [];
    for (const file of files) {
      try {
        const safeRelative = file.path.replace(/\.\./g, "").replace(/^\/+/, "");
        const targetPath = path2.join(STORAGE_ROOT, safeRelative);
        const parentDir = path2.dirname(targetPath);
        if (!fs2.existsSync(parentDir)) {
          fs2.mkdirSync(parentDir, { recursive: true });
        }
        let buffer;
        if (/^[A-Za-z0-9+/=]+$/.test(file.content) && file.content.length % 4 === 0) {
          buffer = Buffer.from(file.content, "base64");
        } else {
          buffer = Buffer.from(file.content, "utf-8");
        }
        fs2.writeFileSync(targetPath, buffer);
        const metaPath = `${targetPath}.meta.json`;
        fs2.writeFileSync(
          metaPath,
          JSON.stringify({
            contentType: file.contentType || "application/octet-stream",
            size: buffer.length,
            uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
            originalPath: file.path
          }, null, 2)
        );
        results.push(true);
      } catch (err) {
        console.error("Failed to write storage file:", file.path, err);
        results.push(false);
      }
    }
    return results;
  },
  async read(filePath) {
    try {
      const safeRelative = filePath.replace(/\.\./g, "").replace(/^\/+/, "");
      const targetPath = path2.join(STORAGE_ROOT, safeRelative);
      if (!fs2.existsSync(targetPath)) return null;
      const buffer = fs2.readFileSync(targetPath);
      let contentType = "application/octet-stream";
      const metaPath = `${targetPath}.meta.json`;
      if (fs2.existsSync(metaPath)) {
        try {
          const meta = JSON.parse(fs2.readFileSync(metaPath, "utf-8"));
          if (meta.contentType) contentType = meta.contentType;
        } catch {
        }
      }
      return { buffer, contentType };
    } catch (err) {
      console.error("Failed to read storage file:", filePath, err);
      return null;
    }
  },
  getStorageRoot() {
    return STORAGE_ROOT;
  }
};

// backend/secrets.ts
import dotenv from "dotenv";
import fs3 from "fs";
import path3 from "path";
dotenv.config();
var secrets = {
  async readSecret(key) {
    try {
      const envPath = path3.resolve(process.cwd(), ".env");
      if (fs3.existsSync(envPath)) {
        const parsed = dotenv.parse(fs3.readFileSync(envPath, "utf8"));
        if (parsed[key] && parsed[key].trim() !== "") {
          process.env[key] = parsed[key].trim();
          return parsed[key].trim();
        }
      }
    } catch {
    }
    const val = process.env[key];
    if (val && val.trim() !== "") {
      return val.trim();
    }
    if (key === "ZENITH_ADMIN_PASSWORD") {
      const p = process.env.ZENITH_ADMIN_PASSWORD;
      if (p && p.trim() !== "") return p.trim();
      return "";
    }
    if (key === "BREVO_API_KEY") {
      return process.env.BREVO_API_KEY || "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";
    }
    throw new Error(`Secret ${key} is not configured`);
  },
  async writeSecret(key, value) {
    const trimmed = value.trim();
    process.env[key] = trimmed;
    try {
      const envPath = path3.resolve(process.cwd(), ".env");
      let lines = [];
      if (fs3.existsSync(envPath)) {
        lines = fs3.readFileSync(envPath, "utf8").split("\n");
      }
      let found = false;
      const updatedLines = lines.map((line) => {
        if (line.startsWith(`${key}=`)) {
          found = true;
          return `${key}="${trimmed}"`;
        }
        return line;
      });
      if (!found) {
        updatedLines.push(`${key}="${trimmed}"`);
      }
      fs3.writeFileSync(envPath, updatedLines.filter((l) => l !== void 0).join("\n").trim() + "\n", "utf8");
    } catch (err) {
      console.error(`Failed to persist secret ${key} to .env:`, err);
    }
  }
};

// backend/admin.ts
var ADMIN_EMAILS = ["zenithglobalinnovationhq@protonmail.com"];
async function adminList() {
  const { items } = await db.list("applications", { limit: 500 });
  const applications = items.map((x) => ({
    id: x.id,
    reference: x.reference,
    name: x.name,
    email: x.email,
    jobId: x.jobId,
    jobTitle: x.jobTitle || x.desiredRole || x.desiredPosition || x.role || x.position,
    country: x.country || x.countryOfResidence,
    nationality: x.nationality,
    status: x.status || "Application Received",
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
    preferredChannel: x.preferredChannel || "Telegram",
    contactHandle: x.contactHandle || "",
    interviewChannel: x.interviewChannel || "",
    interviewContact: x.interviewContact || "",
    interviewDeadline: x.interviewDeadline || "",
    source: x.source || "Direct",
    additionalRoles: Array.isArray(x.additionalRoles) ? x.additionalRoles : x.additionalRoles ? [String(x.additionalRoles)] : [],
    emailSent: x.emailSent,
    emailError: x.emailError,
    adminNotes: Array.isArray(x.adminNotes) ? x.adminNotes : []
  }));
  const byStatus = {};
  const byCountry = {};
  const byRole = {};
  const bySource = {};
  for (const r of applications) {
    const s = String(r.status || "Application Received");
    const c = String(r.country || "Unknown");
    const role = String(r.jobTitle || "Unknown");
    const src = String(r.source || "Direct");
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
        (r) => String(r.submittedAt || "").slice(0, 10) === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
      ).length,
      byStatus,
      byCountry,
      byRole,
      bySource
    }
  };
}
async function adminGet(id) {
  const [item] = await db.get("applications", [id]);
  return item || null;
}
async function adminStatus(id, status, adminEmail, extraData) {
  const allowed = [
    "Application Received",
    "Under Review",
    "Shortlisted",
    "Assessment Sent",
    "Assessment Completed",
    "Interview",
    "Final Review",
    "Offer",
    "Hired",
    "Rejected"
  ];
  if (!allowed.includes(status)) return false;
  const [item] = await db.get("applications", [id]);
  if (!item) return false;
  const previous = String(item.status || "Application Received");
  const updatedRecord = { ...item, status, ...extraData || {} };
  const ok = (await db.update("applications", [{ id, record: updatedRecord }]))[0];
  if (!ok) return false;
  await db.add("admin_audit", [
    {
      applicationId: id,
      reference: item.reference,
      action: "Status changed",
      from: previous,
      to: status,
      adminEmail: adminEmail || ADMIN_EMAILS[0],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ]);
  return true;
}
async function adminAudit() {
  const { items } = await db.list("admin_audit", { limit: 100 });
  return items;
}
async function adminAddNote(id, note, adminEmail) {
  const [item] = await db.get("applications", [id]);
  if (!item) return false;
  const notes = Array.isArray(item.adminNotes) ? item.adminNotes : [];
  const entry = { note, adminEmail, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  const ok = (await db.update("applications", [{ id, record: { ...item, adminNotes: [...notes, entry] } }]))[0];
  if (ok) {
    await db.add("admin_audit", [
      {
        applicationId: id,
        reference: item.reference,
        action: "Admin note added",
        adminEmail,
        createdAt: entry.createdAt
      }
    ]);
  }
  return Boolean(ok);
}

// backend/security.ts
import crypto from "crypto";
var blockedIps = /* @__PURE__ */ new Map();
var adminLoginAttempts = /* @__PURE__ */ new Map();
var generalRateLimits = /* @__PURE__ */ new Map();
var HONEYPOT_PATHS = [
  "/wp-login.php",
  "/wp-admin",
  "/wp-content",
  "/wp-includes",
  "/xmlrpc.php",
  "/.env",
  "/.env.local",
  "/.env.production",
  "/.git",
  "/.git/config",
  "/.aws",
  "/phpmyadmin",
  "/pma",
  "/admin.php",
  "/administrator",
  "/eval-stdin.php",
  "/solr",
  "/actuator",
  "/actuator/health",
  "/cgi-bin",
  "/boaform",
  "/HNAP1",
  "/setup.php",
  "/install.php",
  "/server-status",
  "/config.json",
  "/backup.sql",
  "/dump.sql",
  "/database.sql",
  "/etc/passwd",
  "/shell",
  "/cmd.jsp"
];
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "127.0.0.1";
}
function honeypotShield(req, res, next) {
  const ip = getClientIp(req);
  const now = Date.now();
  const blockedUntil = blockedIps.get(ip);
  if (blockedUntil) {
    if (now < blockedUntil) {
      res.setHeader("Server", "Zenith-Perimeter-Shield/4.2");
      res.setHeader("X-Threat-Detected", "Isolated");
      res.status(403).json({
        error: "Access Denied: Malicious activity detected. Your IP address has been isolated by the security perimeter."
      });
      return;
    } else {
      blockedIps.delete(ip);
    }
  }
  const pathLower = (req.path || "").toLowerCase();
  const isTrap = HONEYPOT_PATHS.some((trap) => pathLower === trap || pathLower.startsWith(trap + "/"));
  if (isTrap) {
    blockedIps.set(ip, now + 24 * 60 * 60 * 1e3);
    db.add("admin_audit", [{
      event: "SECURITY_HONEYPOT_TRIGGERED",
      details: `Exploit probe detected from ${ip} targeting ${req.path}. IP isolated for 24 hours.`,
      ip,
      path: req.path,
      userAgent: req.headers["user-agent"] || "Unknown",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }]).catch(() => {
    });
    console.warn(`[SECURITY ALERT] Honeypot triggered by ${ip} targeting "${req.path}". IP blacklisted.`);
    res.setHeader("Server", "Zenith-Active-Perimeter/4.2");
    res.setHeader("X-Defense-Action", "Trap-Triggered-And-Logged");
    res.status(403).json({
      error: "Security perimeter breach detected. Request signature has been logged and blacklisted."
    });
    return;
  }
  next();
}
function securityHeaders(req, res, next) {
  res.removeHeader("X-Powered-By");
  res.setHeader("Server", "Zenith-Enterprise-Gateway/4.0");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
}
function verifyPassword(submitted, storedHash, salt) {
  try {
    const submittedHash = crypto.createHash("sha256").update(`${salt}:${submitted}`).digest("hex");
    const a = Buffer.from(submittedHash, "utf8");
    const b = Buffer.from(storedHash, "utf8");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
function hashPassword(plainPassword, salt) {
  const s = salt || crypto.randomBytes(16).toString("hex");
  const h = crypto.createHash("sha256").update(`${s}:${plainPassword}`).digest("hex");
  return { hash: h, salt: s };
}
async function checkAdminLoginRateLimit(ip) {
  const now = Date.now();
  const record = adminLoginAttempts.get(ip);
  if (record && record.lockedUntil > now) {
    const minutesLeft = Math.ceil((record.lockedUntil - now) / 6e4);
    return {
      allowed: false,
      message: `Too many failed authentication attempts. Account access locked for ${minutesLeft} minute(s).`
    };
  }
  return { allowed: true };
}
async function recordAdminLoginAttempt(ip, success) {
  const now = Date.now();
  if (success) {
    adminLoginAttempts.delete(ip);
    return;
  }
  const record = adminLoginAttempts.get(ip) || { count: 0, lockedUntil: 0, lastAttempt: now };
  record.count += 1;
  record.lastAttempt = now;
  if (record.count >= 5) {
    record.lockedUntil = now + 15 * 60 * 1e3;
  }
  adminLoginAttempts.set(ip, record);
  const delay = 1200 + Math.floor(Math.random() * 600);
  await new Promise((resolve) => setTimeout(resolve, delay));
}
function rateLimiter(action, maxRequests, windowMs) {
  return (req, res, next) => {
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
        message: "Too many requests received from your connection. Please wait a few moments and try again."
      });
      return;
    }
    next();
  };
}

// backend/index.ts
var ADMIN_EMAIL = "zenithglobalinnovationhq@protonmail.com";
var HMAC_SECRET = process.env.ADMIN_SESSION_SECRET || "zgi_admin_session_key_2026_zenith_secure";
var generateAdminSessionToken = (email = ADMIN_EMAIL) => {
  const ts = Date.now().toString();
  const sig = crypto2.createHmac("sha256", HMAC_SECRET).update(`${email}|${ts}`).digest("hex");
  return `${ts}.${sig}`;
};
var verifyAdminSessionToken = (token) => {
  if (!token || !token.includes(".")) return false;
  const [tsStr, sig] = token.split(".");
  const ts = parseInt(tsStr, 10);
  if (isNaN(ts)) return false;
  if (Date.now() - ts > 7 * 24 * 60 * 60 * 1e3) return false;
  const expectedSig = crypto2.createHmac("sha256", HMAC_SECRET).update(`${ADMIN_EMAIL}|${tsStr}`).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expectedSig, "hex");
    return a.length === b.length && crypto2.timingSafeEqual(a, b);
  } catch {
    return false;
  }
};
var createToken = async (password) => {
  const data = new TextEncoder().encode(`${ADMIN_EMAIL}|${password}|zenith-admin-v1`);
  const digest = await crypto2.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((x) => x.toString(16).padStart(2, "0")).join("");
};
var isValidAdminToken = async (token) => {
  if (!token) return false;
  if (verifyAdminSessionToken(token)) return true;
  try {
    const { items } = await db.list("admin_sessions", { limit: 100 });
    const session = items.find((s) => s.token === token);
    if (session) {
      const createdAt = new Date(session.createdAt).getTime();
      const now = Date.now();
      if (now - createdAt < 7 * 24 * 60 * 60 * 1e3) {
        return true;
      }
    }
    try {
      const password = await secrets.readSecret("ZENITH_ADMIN_PASSWORD");
      if (password) {
        const expected = await createToken(password);
        if (token === expected) return true;
      }
    } catch {
    }
    return false;
  } catch {
    return false;
  }
};
var requireAdminSession = async (req) => {
  const token = String(
    req.body?.token || req.headers["x-zenith-admin-token"] || req.headers["authorization"]?.replace(/^Bearer\s+/i, "") || ""
  );
  return isValidAdminToken(token);
};
var seedJobs = [
  { title: "Chief Technology Officer (CTO)", sector: "Executive & Leadership Positions", location: "Remote \xB7 Global", type: "Full-time", featured: true },
  { title: "Senior Full Stack Developer", sector: "Senior Technical Roles", location: "Remote \xB7 Global", type: "Full-time", featured: true },
  { title: "Creative Director", sector: "Marketing & Creative Leadership", location: "Remote \xB7 Global", type: "Full-time", featured: true },
  { title: "Senior Financial Analyst", sector: "Finance & Business Intelligence", location: "Remote \xB7 Global", type: "Full-time" },
  { title: "Senior Operations Manager", sector: "Operations & HR Leadership", location: "Remote \xB7 Global", type: "Full-time" },
  { title: "Senior Management Consultant", sector: "Specialized Consulting Roles", location: "Remote \xB7 Global", type: "Contract" },
  { title: "Customer Success Director", sector: "Customer Success & Sales Leadership", location: "Remote \xB7 Global", type: "Full-time" },
  { title: "Senior Product Manager", sector: "Additional High-Value Roles", location: "Remote \xB7 Global", type: "Full-time" }
];
async function ensureJobs() {
  const existing = await db.list("jobs", { limit: 100 });
  if (existing.items.length) return existing.items;
  const ids = await db.add("jobs", seedJobs);
  return seedJobs.map((j, i) => ({ ...j, id: ids[i] || `seed-${i}` }));
}
var apiRouter = Router();
apiRouter.get("/_healthcheck", (_req, res) => {
  res.json({ message: "Success" });
});
apiRouter.post("/verify-email", rateLimiter("verify-email", 60, 10 * 60 * 1e3), async (req, res) => {
  const email = String(req.body?.email || "").trim();
  if (!email) {
    res.status(400).json({ valid: false, message: "Email address is required." });
    return;
  }
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!EMAIL_REGEX.test(email) || !email.includes("@")) {
    res.json({ valid: false, message: "Please enter a complete email address (e.g. name@domain.com)." });
    return;
  }
  const parts = email.toLowerCase().split("@");
  if (parts.length !== 2) {
    res.json({ valid: false, message: "Invalid email structure." });
    return;
  }
  const [localPart, domain] = parts;
  const COMMON_TYPOS = {
    "gmial.com": "gmail.com",
    "gmaill.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gmai.com": "gmail.com",
    "yaho.com": "yahoo.com",
    "yahooo.com": "yahoo.com",
    "yhaoo.com": "yahoo.com",
    "hotmial.com": "hotmail.com",
    "hotmaill.com": "hotmail.com",
    "outlok.com": "outlook.com",
    "outloo.com": "outlook.com",
    "protonmial.com": "protonmail.com",
    "icoud.com": "icloud.com"
  };
  if (COMMON_TYPOS[domain]) {
    res.json({
      valid: false,
      typo: true,
      suggested: `${localPart}@${COMMON_TYPOS[domain]}`,
      message: `Possible domain typo. Did you mean ${localPart}@${COMMON_TYPOS[domain]}?`
    });
    return;
  }
  const DISPOSABLE_DOMAINS = /* @__PURE__ */ new Set([
    "mailinator.com",
    "tempmail.com",
    "10minutemail.com",
    "trashmail.com",
    "guerrillamail.com",
    "sharklasers.com",
    "getairmail.com",
    "throwawaymail.com",
    "temp-mail.org"
  ]);
  if (DISPOSABLE_DOMAINS.has(domain)) {
    res.json({
      valid: false,
      message: "Temporary or disposable email domains are not accepted. Please use a permanent email address."
    });
    return;
  }
  const tld = domain.split(".").pop() || "";
  if (tld.length < 2 || !domain.includes(".")) {
    res.json({ valid: false, message: "Please include a valid domain extension (e.g. .com, .org, .net)." });
    return;
  }
  const cleanUser = localPart.toLowerCase().replace(/[^a-z]/g, "");
  if (cleanUser.length >= 7) {
    if (/[bcdfghjklmnpqrstvwxyz]{6,}/i.test(cleanUser)) {
      if (!cleanUser.includes("schmidt")) {
        res.json({
          valid: false,
          message: "This email username contains random or invalid character sequences. Please enter a real, active email address."
        });
        return;
      }
    }
    const vowels = (cleanUser.match(/[aeiouy]/gi) || []).length;
    const vowelRatio = vowels / cleanUser.length;
    if (vowelRatio < 0.15) {
      res.json({
        valid: false,
        message: "This email address appears to be random keyboard input. Please enter a genuine email address."
      });
      return;
    }
  }
  if (/([a-z0-9]{2,})\1{2,}/i.test(localPart)) {
    res.json({
      valid: false,
      message: "This email username contains repetitive character patterns. Please enter a genuine email address."
    });
    return;
  }
  const KEYBOARD_MASH = ["qwerty", "asdfgh", "zxcvbn", "123456", "sdfghj"];
  for (const pattern of KEYBOARD_MASH) {
    if (cleanUser.includes(pattern)) {
      res.json({
        valid: false,
        message: "This email address contains a keyboard sequence. Please provide your real email address."
      });
      return;
    }
  }
  try {
    const mxLookup = dns.promises.resolveMx(domain);
    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 2500));
    const mxRecords = await Promise.race([mxLookup, timeoutPromise]);
    if (mxRecords === null) {
      res.json({ valid: true, domain, fallback: true, message: "Email address format verified." });
      return;
    }
    if (Array.isArray(mxRecords) && mxRecords.length > 0) {
      res.json({
        valid: true,
        domain,
        message: "Active deliverable email address verified."
      });
    } else {
      res.json({
        valid: false,
        message: `The domain "${domain}" does not appear to accept incoming emails.`
      });
    }
  } catch (err) {
    if (err?.code === "ENOTFOUND" || err?.code === "ENODATA" || err?.code === "SERVFAIL") {
      res.json({
        valid: false,
        message: `The email domain "${domain}" does not exist or has no active mail servers.`
      });
    } else {
      res.json({ valid: true, domain, fallback: true, message: "Email address format verified." });
    }
  }
});
apiRouter.post("/admin/login", async (req, res) => {
  const ip = getClientIp(req);
  try {
    const rateCheck = await checkAdminLoginRateLimit(ip);
    if (!rateCheck.allowed) {
      res.status(429).json({ message: rateCheck.message });
      return;
    }
    const b = req.body;
    const email = String(b.email || ADMIN_EMAIL).trim().toLowerCase();
    const password = String(b.password || "");
    if (email !== ADMIN_EMAIL) {
      await recordAdminLoginAttempt(ip, false);
      res.status(401).json({ message: "Invalid administrator credentials" });
      return;
    }
    let authenticated = false;
    let secRecord;
    try {
      const { items: secItems } = await db.list("admin_security", { limit: 10 });
      secRecord = secItems[0];
    } catch {
    }
    const DEFAULT_SALT = "zgi_sec_salt_2026";
    const DEFAULT_HASH = "fb2a4168334a02aee93e2ffa05eed0e2c22e8eeb191a91ed85a6061696eb5f47";
    const salt = secRecord?.salt || DEFAULT_SALT;
    const hash = secRecord?.passwordHash || DEFAULT_HASH;
    authenticated = verifyPassword(password, String(hash), String(salt));
    if (!authenticated) {
      const envPass = process.env.ZENITH_ADMIN_PASSWORD;
      if (envPass && envPass.trim() !== "") {
        authenticated = password === envPass.trim();
      }
    }
    if (!authenticated) {
      await recordAdminLoginAttempt(ip, false);
      res.status(401).json({ message: "Invalid administrator credentials" });
      return;
    }
    await recordAdminLoginAttempt(ip, true);
    const token = generateAdminSessionToken(ADMIN_EMAIL);
    await db.add("admin_sessions", [{
      token,
      email: ADMIN_EMAIL,
      ip,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }]).catch(() => {
    });
    await db.add("admin_audit", [{
      event: "ADMIN_LOGIN_SUCCESS",
      details: `Administrator authenticated successfully from IP ${ip}`,
      ip,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }]).catch(() => {
    });
    res.json({ authenticated: true, token, email: ADMIN_EMAIL });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Internal login error" });
  }
});
apiRouter.post("/admin/change-password", async (req, res) => {
  const ip = getClientIp(req);
  if (!await requireAdminSession(req)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const b = req.body;
  const currentPassword = String(b.currentPassword || "");
  const newPassword = String(b.newPassword || "");
  if (!newPassword || newPassword.length < 8) {
    res.status(400).json({ message: "New password must be at least 8 characters in length." });
    return;
  }
  try {
    const { items: secItems } = await db.list("admin_security", { limit: 10 });
    const secRecord = secItems[0];
    let currentValid = false;
    if (secRecord && secRecord.passwordHash && secRecord.salt) {
      currentValid = verifyPassword(currentPassword, String(secRecord.passwordHash), String(secRecord.salt));
    } else {
      const envPass = process.env.ZENITH_ADMIN_PASSWORD;
      if (envPass && envPass.trim() !== "") {
        currentValid = currentPassword === envPass.trim();
      }
    }
    if (!currentValid) {
      res.status(401).json({ message: "Current password verification failed." });
      return;
    }
    const { hash, salt } = hashPassword(newPassword);
    if (secRecord && secRecord.id) {
      await db.delete("admin_security", [secRecord.id]);
    }
    await db.add("admin_security", [{
      id: "sec_admin_cred",
      salt,
      passwordHash: hash,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }]);
    await db.add("admin_audit", [{
      event: "ADMIN_PASSWORD_UPDATED",
      details: `Administrator password changed from IP ${ip}`,
      ip,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }]).catch(() => {
    });
    res.json({ success: true, message: "Administrator password updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Failed to update password" });
  }
});
apiRouter.post("/admin/verify", async (req, res) => {
  const token = String(req.body?.token || "");
  const valid = await isValidAdminToken(token);
  if (valid) {
    res.json({ authenticated: true, email: ADMIN_EMAIL });
  } else {
    res.status(401).json({ authenticated: false, message: "Invalid or expired session" });
  }
});
apiRouter.post("/admin/logout", async (req, res) => {
  try {
    const token = String(req.body?.token || req.headers["x-zenith-admin-token"] || "");
    if (token) {
      const { items } = await db.list("admin_sessions", { limit: 100 });
      const matched = items.filter((s) => s.token === token).map((s) => String(s.id));
      if (matched.length) {
        await db.delete("admin_sessions", matched);
      }
    }
  } catch {
  }
  res.json({ signedOut: true });
});
apiRouter.get("/admin/applications", async (req, res) => {
  if (!await requireAdminSession(req)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const result = await adminList();
  res.json(result);
});
apiRouter.post("/admin/applications", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const result = await adminList();
  res.json(result);
});
apiRouter.get("/admin/applications/:id", async (req, res) => {
  if (!await requireAdminSession(req)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const application = await adminGet(req.params.id);
  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }
  res.json({ application });
});
apiRouter.post("/admin/applications/:id", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const application = await adminGet(req.params.id);
  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }
  res.json({ application });
});
async function sendStatusUpdateEmail(applicantEmail, applicantName, role, reference, newStatus, customNote, interviewChannel, interviewContact, interviewDeadline) {
  try {
    let apiKey = "";
    try {
      apiKey = await secrets.readSecret("BREVO_API_KEY");
    } catch {
    }
    if (!apiKey) {
      return { success: false, error: "BREVO_API_KEY is not configured in environment" };
    }
    const isInterview = newStatus === "Shortlisted" || newStatus === "Interview";
    const channel = interviewChannel || "Telegram";
    const contact = interviewContact || "@ZenithTalentLead";
    const deadline = interviewDeadline || "48 hours";
    let directLink = "mailto:zenithglobalinnovationhq@protonmail.com";
    const channelLower = channel.toLowerCase();
    if (channelLower.includes("telegram")) {
      const handleClean = contact.replace("@", "").trim();
      directLink = `https://t.me/${handleClean}`;
    } else if (channelLower.includes("whatsapp")) {
      const phoneClean = contact.replace(/[^0-9]/g, "");
      directLink = `https://wa.me/${phoneClean}?text=Hello%2C%20I%20am%20contacting%20you%20regarding%20my%20Zenith%20Global%20Innovation%20interview%20allocation%20under%20reference%20${reference}.`;
    } else if (channelLower.includes("zangi")) {
      const zangiNum = contact.replace(/[^0-9]/g, "");
      directLink = zangiNum ? `https://zangi.com/dl?number=${zangiNum}` : "https://zangi.com";
    } else if (contact.startsWith("http")) {
      directLink = contact;
    }
    const buttonColor = channelLower.includes("whatsapp") ? "#16a34a" : channelLower.includes("zangi") ? "#ea580c" : "#2563eb";
    let subject = `Application Update: ${newStatus} \u2014 ${role} | ${reference}`;
    let htmlContent = "";
    if (isInterview) {
      subject = `ACTION REQUIRED: Congratulations on Advancing to Direct Interview \u2014 ${role} | ${reference}`;
      htmlContent = `
<div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:620px;margin:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.06);color:#0f172a">
  <!-- Executive Header -->
  <div style="background:#10243e;padding:32px 36px;color:#ffffff;text-align:left">
    <div style="display:inline-block;padding:4px 12px;background:rgba(217,119,6,0.25);border:1px solid #d97706;border-radius:6px;font-size:11px;font-weight:800;color:#fcd34d;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px">
      CANDIDATE SELECTION NOTICE \xB7 DIRECT INTERVIEW ALLOCATION
    </div>
    <div style="font-size:24px;font-weight:800;letter-spacing:-0.02em;margin:0 0 6px">ZENITH GLOBAL INNOVATION</div>
    <div style="font-size:13px;opacity:0.85">Connecting Talent Across Continents \xB7 New York \xB7 London \xB7 Singapore \xB7 Toronto</div>
  </div>

  <div style="padding:36px">
    <!-- Big Congratulations Hero -->
    <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:12px;padding:20px;margin-bottom:28px">
      <div style="font-size:18px;font-weight:800;color:#166534;margin-bottom:6px">
        \u{1F389} Congratulations, ${applicantName}!
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
        \u23F1 STRICT ${deadline.toUpperCase()} CONFIRMATION DEADLINE
      </div>
      <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6">
        Due to active corporate staffing timelines, your interview allocation is reserved for <strong>${deadline}</strong>. Unconfirmed interview slots are promptly reallocated to alternate finalists on our talent waitlist.
      </p>
    </div>

    <!-- The Handover & Interview Directive Box -->
    <div style="background:#0f172a;color:#ffffff;border-radius:14px;padding:26px;margin-bottom:28px">
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#38bdf8;margin-bottom:10px">
        ACTION REQUIRED \xB7 DIRECT RECRUITER CONTACT HANDOVER
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

      ${channelLower.includes("zangi") ? `
      <div style="background:rgba(234,88,12,0.15);border:1px solid #ea580c;border-radius:8px;padding:12px 14px;margin-bottom:20px;font-size:12.5px;color:#fed7aa;line-height:1.5">
        \u{1F4AC} <strong>Zangi Safe Messenger Instructions:</strong> Open your Zangi app on your mobile device or desktop, search or add recruiter number <strong>${contact}</strong>, and send your reference code (<strong>${reference}</strong>) to immediately start your onboarding briefing.
      </div>` : ""}

      <div style="text-align:center">
        <a href="${directLink}" target="_blank" style="display:inline-block;background:${buttonColor};color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;padding:14px 28px;border-radius:8px;letter-spacing:0.02em">
          Connect with Recruiter on ${channel} Now \u2192
        </a>
      </div>
    </div>

    <!-- Official Reference Details -->
    <div style="padding:18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:24px">
      <p style="margin:0 0 8px;font-size:13px;color:#475569"><strong>Candidate Name:</strong> ${applicantName}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#475569"><strong>Role Applied:</strong> ${role}</p>
      <p style="margin:0;font-size:13px;color:#475569"><strong>Current Stage:</strong> <span style="font-weight:800;color:#1e40af">${newStatus}</span></p>
    </div>

    ${customNote ? `<div style="padding:16px;background:#eff6ff;border-left:4px solid #2563eb;margin-bottom:24px;border-radius:4px"><strong style="display:block;margin-bottom:6px;color:#1e40af;font-size:13px">Recruitment Team Briefing Note:</strong><p style="margin:0;color:#1e3a8a;font-size:13px;line-height:1.6">${customNote}</p></div>` : ""}

    <p style="font-size:13px;color:#64748b;line-height:1.6;margin:0 0 20px">
      During your direct screening session, your interviewer will review your technical portfolio, confirm remuneration terms, answer questions regarding day-to-day operations, and provide the official company documents.
    </p>

    <div style="border-top:1px solid #e2e8f0;padding-top:20px;font-size:12px;color:#64748b">
      <p style="margin:0 0 4px"><strong>Zenith Global Innovation Recruitment Directorate</strong></p>
      <p style="margin:0 0 4px">Headquarters: New York, USA \xB7 London \xB7 Singapore \xB7 Toronto</p>
      <p style="margin:0">Official Contact: <a href="mailto:zenithglobalinnovationhq@protonmail.com" style="color:#2563eb;text-decoration:none">zenithglobalinnovationhq@protonmail.com</a></p>
    </div>
  </div>
</div>`;
    } else {
      htmlContent = `
<div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:620px;margin:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.06);color:#0f172a">
  <div style="padding:28px 32px;background:#10243e;color:#fff">
    <div style="font-size:20px;font-weight:700">ZENITH GLOBAL INNOVATION</div>
    <div style="margin-top:6px;font-size:12px;opacity:.85">Connecting Talent Across Continents \xB7 New York \xB7 London \xB7 Singapore \xB7 Toronto</div>
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
    ${customNote ? `<div style="padding:16px;background:#eff6ff;border-left:4px solid #2563eb;margin-bottom:20px;border-radius:4px"><strong style="display:block;margin-bottom:6px;color:#1e40af;font-size:13px">Recruitment Team Note:</strong><p style="margin:0;color:#1e3a8a;font-size:13px;line-height:1.6">${customNote}</p></div>` : ""}
    <p style="font-size:13px;color:#64748b;line-height:1.6">You can check the live progress of your application at any time using your application reference code on our portal.</p>
    <p style="font-size:13px;color:#64748b;line-height:1.6">For management or general enquiries, contact <a href="mailto:zenithglobalinnovationhq@protonmail.com" style="color:#2563eb;text-decoration:none">zenithglobalinnovationhq@protonmail.com</a>.</p>
    <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:20px;font-size:12px;color:#64748b">
      <strong>Talent Acquisition Directorate</strong><br>Zenith Global Innovation
    </div>
  </div>
</div>`;
    }
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        sender: {
          name: "Zenith Global Innovation",
          email: "zenithglobalinnovationhq@protonmail.com"
        },
        to: [{ email: applicantEmail, name: applicantName }],
        subject,
        htmlContent
      })
    });
    if (response.ok) {
      return { success: true };
    } else {
      const detail = await response.text().catch(() => "");
      return { success: false, error: `Brevo rejected notification (HTTP ${response.status}): ${detail.slice(0, 200)}` };
    }
  } catch (err) {
    return { success: false, error: err?.message || "Failed to dispatch update email" };
  }
}
apiRouter.put("/admin/applications/:id/status", async (req, res) => {
  if (!await requireAdminSession(req)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const status = String(req.body?.status || "");
  const notifyApplicant = Boolean(req.body?.notifyApplicant);
  const customNote = req.body?.customNote ? String(req.body.customNote) : void 0;
  const interviewChannel = req.body?.interviewChannel ? String(req.body.interviewChannel) : void 0;
  const interviewContact = req.body?.interviewContact ? String(req.body.interviewContact) : void 0;
  const interviewDeadline = req.body?.interviewDeadline ? String(req.body.interviewDeadline) : void 0;
  const extraData = {};
  if (interviewChannel) extraData.interviewChannel = interviewChannel;
  if (interviewContact) extraData.interviewContact = interviewContact;
  if (interviewDeadline) extraData.interviewDeadline = interviewDeadline;
  const ok = await adminStatus(req.params.id, status, ADMIN_EMAIL, extraData);
  if (!ok) {
    res.status(400).json({ message: "Unable to update application status" });
    return;
  }
  let emailSent = false;
  let emailError = "";
  if (notifyApplicant) {
    const item = await adminGet(req.params.id);
    if (item && item.email) {
      const result = await sendStatusUpdateEmail(
        String(item.email),
        String(item.name || "Applicant"),
        String(item.jobTitle || item.desiredRole || "Position"),
        String(item.reference),
        status,
        customNote,
        interviewChannel || item.interviewChannel || item.preferredChannel,
        interviewContact || item.interviewContact,
        interviewDeadline || item.interviewDeadline
      );
      emailSent = result.success;
      emailError = result.error || "";
    }
  }
  res.json({ updated: true, status, emailSent, emailError });
});
apiRouter.post("/admin/applications/:id/status", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const status = String(b.status || "");
  const notifyApplicant = Boolean(b.notifyApplicant);
  const customNote = b.customNote ? String(b.customNote) : void 0;
  const interviewChannel = b.interviewChannel ? String(b.interviewChannel) : void 0;
  const interviewContact = b.interviewContact ? String(b.interviewContact) : void 0;
  const interviewDeadline = b.interviewDeadline ? String(b.interviewDeadline) : void 0;
  const extraData = {};
  if (interviewChannel) extraData.interviewChannel = interviewChannel;
  if (interviewContact) extraData.interviewContact = interviewContact;
  if (interviewDeadline) extraData.interviewDeadline = interviewDeadline;
  const ok = await adminStatus(req.params.id, status, ADMIN_EMAIL, extraData);
  if (!ok) {
    res.status(400).json({ message: "Unable to update application status" });
    return;
  }
  let emailSent = false;
  let emailError = "";
  if (notifyApplicant) {
    const item = await adminGet(req.params.id);
    if (item && item.email) {
      const result = await sendStatusUpdateEmail(
        String(item.email),
        String(item.name || "Applicant"),
        String(item.jobTitle || item.desiredRole || "Position"),
        String(item.reference),
        status,
        customNote,
        interviewChannel || item.interviewChannel || item.preferredChannel,
        interviewContact || item.interviewContact,
        interviewDeadline || item.interviewDeadline
      );
      emailSent = result.success;
      emailError = result.error || "";
    }
  }
  res.json({ updated: true, status, emailSent, emailError });
});
apiRouter.post("/admin/applications/:id/note", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const note = String(b.note || "").trim();
  if (!note) {
    res.status(400).json({ message: "Note is required" });
    return;
  }
  const ok = await adminAddNote(req.params.id, note, ADMIN_EMAIL);
  if (ok) {
    res.json({ saved: true });
  } else {
    res.status(400).json({ message: "Unable to save note" });
  }
});
apiRouter.get("/admin/audit", async (req, res) => {
  if (!await requireAdminSession(req)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  res.json({ events: await adminAudit() });
});
apiRouter.post("/admin/audit", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  res.json({ events: await adminAudit() });
});
apiRouter.post("/admin/brevo/status", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  let apiKey = "";
  try {
    apiKey = await secrets.readSecret("BREVO_API_KEY");
  } catch {
  }
  if (!apiKey) {
    res.json({
      configured: false,
      valid: false,
      senderEmail: ADMIN_EMAIL,
      message: "BREVO_API_KEY is not configured in the server environment (.env)."
    });
    return;
  }
  try {
    const accRes = await fetch("https://api.brevo.com/v3/account", {
      headers: { "api-key": apiKey, "Accept": "application/json" }
    });
    if (!accRes.ok) {
      const errText = await accRes.text().catch(() => "");
      res.json({
        configured: true,
        valid: false,
        senderEmail: ADMIN_EMAIL,
        statusCode: accRes.status,
        error: `Brevo rejected key (HTTP ${accRes.status}): ${errText.slice(0, 200)}`
      });
      return;
    }
    const accData = await accRes.json().catch(() => ({}));
    let senderVerified = false;
    try {
      const sendersRes = await fetch("https://api.brevo.com/v3/senders", {
        headers: { "api-key": apiKey, "Accept": "application/json" }
      });
      if (sendersRes.ok) {
        const sendersData = await sendersRes.json().catch(() => ({ senders: [] }));
        const list = Array.isArray(sendersData.senders) ? sendersData.senders : [];
        senderVerified = list.some((s) => String(s.email).toLowerCase() === ADMIN_EMAIL.toLowerCase() && s.active);
      }
    } catch {
    }
    res.json({
      configured: true,
      valid: true,
      senderEmail: ADMIN_EMAIL,
      senderVerified,
      accountEmail: accData.email || "",
      companyName: accData.companyName || "",
      plan: accData.plan || [],
      message: "Brevo API connection active and authenticated."
    });
  } catch (err) {
    res.json({
      configured: true,
      valid: false,
      senderEmail: ADMIN_EMAIL,
      error: `Connection failure to Brevo API: ${err?.message || "Network error"}`
    });
  }
});
apiRouter.post("/admin/brevo/test", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  let apiKey = "";
  try {
    apiKey = await secrets.readSecret("BREVO_API_KEY");
  } catch {
  }
  if (!apiKey) {
    res.status(400).json({ success: false, message: "BREVO_API_KEY is not configured." });
    return;
  }
  const recipient = String(b.recipientEmail || ADMIN_EMAIL).trim();
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        sender: {
          name: "Zenith Global Innovation",
          email: ADMIN_EMAIL
        },
        to: [{ email: recipient, name: "Zenith Administrator" }],
        subject: `[Test] Brevo Integration Verification \u2014 Zenith Global Innovation`,
        htmlContent: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#0f172a">
            <div style="background:#10243e;padding:24px;color:#fff">
              <h2 style="margin:0">Zenith Global Innovation</h2>
              <p style="margin:4px 0 0;font-size:12px;opacity:0.85">Recruitment Operations \xB7 Brevo Integration Diagnostic</p>
            </div>
            <div style="padding:24px;border:1px solid #e2e8f0;border-top:none">
              <p>Hello,</p>
              <p>This is a test notification confirming that the <strong>Brevo Transactional Email API</strong> is properly authenticated and operating successfully for Zenith Global Innovation.</p>
              <div style="background:#f1f5f9;padding:16px;border-radius:8px;font-size:13px;margin:20px 0">
                <p style="margin:0 0 6px"><strong>Sender:</strong> ${ADMIN_EMAIL}</p>
                <p style="margin:0 0 6px"><strong>Recipient:</strong> ${recipient}</p>
                <p style="margin:0"><strong>Timestamp:</strong> ${(/* @__PURE__ */ new Date()).toISOString()}</p>
              </div>
              <p style="font-size:12px;color:#64748b">Automatic candidate application confirmations and stage progression updates will now be dispatched without interruption.</p>
            </div>
          </div>
        `
      })
    });
    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      res.json({
        success: true,
        messageId: data.messageId || "ok",
        recipient,
        message: `Test email successfully dispatched to ${recipient}`
      });
    } else {
      const errText = await response.text().catch(() => "");
      res.status(400).json({
        success: false,
        statusCode: response.status,
        error: `Brevo dispatch failed: ${errText.slice(0, 300)}`
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err?.message || "Failed to dispatch email" });
  }
});
apiRouter.post("/admin/brevo/key", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const rawKey = String(b.apiKey || "").trim();
  if (!rawKey) {
    res.status(400).json({ message: "API Key is required" });
    return;
  }
  try {
    await secrets.writeSecret("BREVO_API_KEY", rawKey);
    const accRes = await fetch("https://api.brevo.com/v3/account", {
      headers: { "api-key": rawKey, "Accept": "application/json" }
    });
    if (accRes.ok) {
      const accData = await accRes.json().catch(() => ({}));
      res.json({
        success: true,
        valid: true,
        message: `Brevo API key saved and verified! Connected to ${accData.email || "account"}.`,
        accountEmail: accData.email
      });
    } else {
      const errText = await accRes.text().catch(() => "");
      res.json({
        success: true,
        valid: false,
        warning: `Key saved to server, but Brevo returned HTTP ${accRes.status}: ${errText.slice(0, 200)}`
      });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message || "Failed to update Brevo API key" });
  }
});
apiRouter.get("/jobs", async (_req, res) => {
  try {
    const jobs = await ensureJobs();
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Failed to fetch jobs" });
  }
});
apiRouter.post("/resumes", async (req, res) => {
  try {
    const b = req.body;
    if (!b.filename || !b.content || !b.contentType) {
      res.status(400).json({ message: "Resume file is required" });
      return;
    }
    const name = String(b.filename).replace(/[^a-zA-Z0-9._-]/g, "_");
    const resumePath = `applications/resumes/${Date.now()}-${name}`;
    const [ok] = await storage.write([{
      path: resumePath,
      content: String(b.content),
      contentType: String(b.contentType)
    }]);
    if (!ok) {
      res.status(500).json({ message: "Could not securely store resume" });
      return;
    }
    res.status(201).json({ path: resumePath });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Failed to process resume" });
  }
});
apiRouter.get("/resumes/file/*", async (req, res) => {
  try {
    const filePath = req.params[0];
    if (!filePath) {
      res.status(400).send("File path required");
      return;
    }
    const file = await storage.read(filePath);
    if (!file) {
      res.status(404).send("Resume file not found");
      return;
    }
    res.setHeader("Content-Type", file.contentType);
    res.setHeader("Content-Disposition", `inline; filename="${path4.basename(filePath)}"`);
    res.send(file.buffer);
  } catch (err) {
    res.status(500).send("Error retrieving file");
  }
});
apiRouter.post("/applications", rateLimiter("submit-app", 12, 15 * 60 * 1e3), async (req, res) => {
  try {
    const b = req.body;
    const missing = [];
    if (!b.name || String(b.name).trim() === "") missing.push("Full legal name");
    if (!b.email || String(b.email).trim() === "") missing.push("Email address");
    if (!b.phone || String(b.phone).trim() === "") missing.push("Primary phone number");
    if (!b.country || String(b.country).trim() === "") missing.push("Country of residence");
    if (!b.nationality || String(b.nationality).trim() === "") missing.push("Nationality");
    if (!b.dob || String(b.dob).trim() === "") missing.push("Date of birth");
    if (!b.gender || String(b.gender).trim() === "") missing.push("Gender");
    if (!b.address || String(b.address).trim() === "") missing.push("Residential address");
    if (!b.availability || String(b.availability).trim() === "") missing.push("Availability / start date");
    if (!b.education || String(b.education).trim() === "") missing.push("Education level");
    if (!b.field || String(b.field).trim() === "") missing.push("Field of study");
    if (!b.resumePath && !b.resumeName) missing.push("Resume / CV document");
    if (!b.resumePath && b.resumeName) b.resumePath = b.resumeName;
    if (!b.signature || String(b.signature).trim() === "") missing.push("Digital signature");
    if (!b.preferredChannel || String(b.preferredChannel).trim() === "") {
      b.preferredChannel = "Telegram";
    }
    if (!b.contactHandle || String(b.contactHandle).trim() === "") {
      missing.push("Interview contact handle (Telegram @username, WhatsApp number, or Zangi ID)");
    }
    if (missing.length > 0) {
      res.status(400).json({
        message: `Please complete the following required field${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}.`,
        missingFields: missing
      });
      return;
    }
    const emailStr = String(b.email || "").trim().toLowerCase();
    const [localPart] = emailStr.split("@");
    const cleanUser = (localPart || "").replace(/[^a-z]/g, "");
    if (cleanUser.length >= 7 && /[bcdfghjklmnpqrstvwxyz]{6,}/i.test(cleanUser) && !cleanUser.includes("schmidt") || /([a-z0-9]{2,})\1{2,}/i.test(localPart || "")) {
      res.status(400).json({
        message: "The submitted email address appears to contain random or invalid character patterns. Please provide a valid, active email address.",
        missingFields: ["Email address"]
      });
      return;
    }
    b.expectedSalary = b.expectedSalary && String(b.expectedSalary).trim() !== "" ? String(b.expectedSalary).trim() : "Open / Negotiable";
    b.employer = b.employer && String(b.employer).trim() !== "" ? String(b.employer).trim() : "Not specified";
    b.currentTitle = b.currentTitle && String(b.currentTitle).trim() !== "" ? String(b.currentTitle).trim() : "Not specified";
    const reference = "ZGI-2026-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const submittedAt = (/* @__PURE__ */ new Date()).toISOString();
    const responseBy = new Date(Date.now() + 5 * 864e5).toISOString().slice(0, 10);
    const preferredChannel = String(b.preferredChannel || "Telegram");
    const contactHandle = String(b.contactHandle || "").trim();
    const source = String(b.source || "Direct").trim();
    const additionalRoles = Array.isArray(b.additionalRoles) ? b.additionalRoles.filter(Boolean) : b.additionalRoles ? [String(b.additionalRoles)] : [];
    const initialRecord = {
      ...b,
      preferredChannel,
      contactHandle,
      source: source || "Direct",
      additionalRoles,
      reference,
      status: "Application Received",
      submittedAt,
      estimatedResponseDate: responseBy,
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: false,
      emailError: ""
    };
    const [id] = await db.add("applications", [initialRecord]);
    if (!id) {
      res.status(500).json({ message: "Could not save application" });
      return;
    }
    let emailSent = false;
    let emailError = "";
    const applicantName = String(b.name);
    const role = String(b.jobTitle || b.desiredRole || b.jobId);
    try {
      let apiKey = "";
      try {
        apiKey = await secrets.readSecret("BREVO_API_KEY");
      } catch {
      }
      if (!apiKey) {
        emailError = "Brevo API key not configured (BREVO_API_KEY environment variable required)";
        console.warn("Application saved. Transactional confirmation email skipped: BREVO_API_KEY is not configured.");
      } else {
        const htmlContent = `
<div style="font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.05);color:#0f172a">
  <div style="background:linear-gradient(135deg,#0a192f 0%,#1e3a5f 100%);padding:36px 32px;color:#ffffff;text-align:left">
    <div style="display:inline-block;padding:4px 12px;background:rgba(217,119,6,0.25);border:1px solid #f59e0b;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#fef3c7;margin-bottom:12px">
      \u25CF Official Candidate Intake \xB7 Priority Fast-Track
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#ffffff">ZENITH GLOBAL INNOVATION</h1>
    <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;letter-spacing:0.3px">Global Workforce & Strategic Talent Operations \xB7 Confidential</p>
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
      <div style="font-size:13px;font-weight:700;color:#92400e;margin-bottom:4px">\u26A0\uFE0F Critical Hiring Notice \u2014 Limited Quota Allocation</div>
      <p style="margin:0;font-size:12px;color:#78350f;line-height:1.55">
        Zenith Global Innovation conducts structured, highly competitive screening cycles. Once our Talent Assessment committee completes credential verification, shortlisted candidates are issued exclusive interview access windows. <strong>Please keep your ${preferredChannel} account active and accessible at ${contactHandle}.</strong>
      </p>
    </div>

    <p style="font-size:13px;line-height:1.6;color:#334155;margin-bottom:20px">
      Our executive committee completes stage assessments within <strong>3\u20135 business days</strong>. Should your profile progress to the shortlist, you will receive real-time instructions to connect directly with your assigned recruitment director.
    </p>

    <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:28px">
      <p style="font-size:11px;color:#64748b;line-height:1.6;margin:0 0 10px">
        Official corporate communications: <a href="mailto:zenithglobalinnovationhq@protonmail.com" style="color:#2563eb;text-decoration:none">zenithglobalinnovationhq@protonmail.com</a><br>
        Zenith Global Innovation \xB7 International Human Capital Management
      </p>
      <p style="font-size:10px;color:#94a3b8;margin:0">
        This notification was generated automatically for reference ${reference}. Do not reply directly to this automated transactional notice.
      </p>
    </div>
  </div>
</div>`;
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            sender: {
              name: "Zenith Global Innovation",
              email: "zenithglobalinnovationhq@protonmail.com"
            },
            to: [{ email: String(b.email), name: applicantName }],
            subject: `Congratulations \u2014 Priority Review Intake Confirmed | ${role} (${reference})`,
            htmlContent
          })
        });
        if (response.ok) {
          emailSent = true;
          console.log(`Confirmation email sent via Brevo to ${b.email} for application ${reference}`);
        } else {
          const detail = await response.text().catch(() => "");
          emailError = `Brevo rejected confirmation email (HTTP ${response.status})${detail ? `: ${detail.slice(0, 300)}` : ""}`;
          console.error(emailError);
        }
      }
    } catch (err) {
      emailError = err?.message || "Brevo email delivery error";
      console.error(emailError);
    }
    await db.update("applications", [{
      id,
      record: {
        ...initialRecord,
        emailSent,
        emailError
      }
    }]);
    res.status(201).json({
      id,
      reference,
      status: "Application Received",
      submittedAt,
      estimatedResponseDate: responseBy,
      expectedTimeline: "3-5 business days",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent,
      emailError: emailSent ? "" : emailError
    });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Failed to submit application" });
  }
});
apiRouter.get("/applications/:reference", async (req, res) => {
  try {
    const rawRef = String(req.params.reference || "").trim().toUpperCase();
    const { items } = await db.list("applications", { limit: 1e3 });
    const item = items.find((x) => String(x.reference || "").trim().toUpperCase() === rawRef);
    if (!item) {
      res.status(404).json({ message: "Application not found. Please verify your reference number." });
      return;
    }
    const rawName = String(item.name || "").trim();
    const maskedName = rawName ? rawName.split(" ").map((part) => part.length > 1 ? `${part[0]}${"*".repeat(Math.min(part.length - 1, 4))}` : part).join(" ") : "Applicant";
    res.json({
      reference: item.reference,
      status: item.status || "Application Received",
      submittedAt: item.submittedAt,
      estimatedResponseDate: item.estimatedResponseDate,
      jobTitle: item.jobTitle || item.desiredRole,
      applicantName: maskedName,
      country: item.country,
      preferredChannel: item.preferredChannel,
      interviewChannel: item.interviewChannel,
      interviewContact: item.interviewContact,
      interviewDeadline: item.interviewDeadline,
      companyEmail: "zenithglobalinnovationhq@protonmail.com"
    });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Error querying application" });
  }
});
apiRouter.get("/admin/leads", async (req, res) => {
  if (!await requireAdminSession(req)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const { items } = await db.list("leads", { limit: 500 });
  res.json({ leads: items });
});
apiRouter.post("/admin/leads", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const { items } = await db.list("leads", { limit: 500 });
  res.json({ leads: items });
});
apiRouter.post("/admin/leads/:id/status", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const nextStatus = String(b.status || "Contacted");
  const [lead] = await db.get("leads", [req.params.id]);
  if (!lead) {
    res.status(404).json({ message: "Lead not found" });
    return;
  }
  const ok = (await db.update("leads", [{ id: req.params.id, record: { ...lead, status: nextStatus, updatedBy: ADMIN_EMAIL, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } }]))[0];
  if (ok) {
    res.json({ updated: true, status: nextStatus });
  } else {
    res.status(400).json({ message: "Failed to update lead status" });
  }
});
apiRouter.post("/leads", rateLimiter("client-lead", 10, 15 * 60 * 1e3), async (req, res) => {
  try {
    const b = req.body;
    if (!b.name || !b.email || !b.message) {
      res.status(400).json({ message: "Name, email and message are required" });
      return;
    }
    const [id] = await db.add("leads", [{
      ...b,
      status: "New",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }]);
    if (!id) {
      res.status(500).json({ message: "Could not save request" });
      return;
    }
    res.status(201).json({ id, received: true });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Error saving lead" });
  }
});
apiRouter.post("/job-alerts", async (req, res) => {
  try {
    const b = req.body;
    const email = String(b.email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      res.status(400).json({ message: "A valid email is required" });
      return;
    }
    const [subscriptionId] = await db.add("job_alerts", [{
      email,
      country: String(b.country || "Any country"),
      category: String(b.category || "All roles"),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      active: true
    }]);
    if (!subscriptionId) {
      res.status(500).json({ message: "Could not create job alert" });
      return;
    }
    let confirmationSent = false;
    try {
      const apiKey = await secrets.readSecret("BREVO_API_KEY");
      if (apiKey) {
        const html = `
<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#18283d">
  <div style="padding:28px 30px;background:#10243e;color:#fff">
    <strong>ZENITH GLOBAL INNOVATION</strong>
    <div style="font-size:12px;margin-top:6px">Connecting Talent Across Continents</div>
  </div>
  <div style="padding:30px">
    <p>Your Zenith Global Innovation job alert is now active.</p>
    <p><strong>Category:</strong> ${String(b.category || "All roles")}<br><strong>Country:</strong> ${String(b.country || "Any country")}</p>
    <p>We will use this subscription to notify you when relevant opportunities become available.</p>
    <p>For enquiries: <a href="mailto:zenithglobalinnovationhq@protonmail.com">zenithglobalinnovationhq@protonmail.com</a></p>
  </div>
</div>`;
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            sender: {
              name: "Zenith Global Innovation",
              email: "zenithglobalinnovationhq@protonmail.com"
            },
            to: [{ email }],
            subject: "Your Zenith Global Innovation job alert is active",
            htmlContent: html
          })
        });
        confirmationSent = response.ok;
      }
    } catch {
    }
    res.status(201).json({ subscriptionId, subscribed: true, confirmationSent });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Error processing job alert" });
  }
});
apiRouter.get("/profile", async (_req, res) => {
  res.json({ email: ADMIN_EMAIL, name: "Zenith Administrator" });
});

// api/serverless.ts
var app = express();
app.use(honeypotShield);
app.use(securityHeaders);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-zenith-admin-token");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);
app.use("/", apiRouter);
app.use((req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    method: req.method,
    url: req.url
  });
});
app.use((err, _req, res, _next) => {
  console.error("[SERVERLESS API ERROR]", err);
  res.status(500).json({ message: err?.message || "Internal Server Error" });
});
function handler(req, res) {
  return app(req, res);
}
export {
  handler as default
};
