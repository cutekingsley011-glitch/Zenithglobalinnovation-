var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// backend/serverless.ts
import express from "express";

// backend/index.ts
import { Router } from "express";
import path4 from "path";
import dns from "dns";
import crypto2 from "crypto";

// backend/db.ts
import fs from "fs";
import path from "path";

// data/db.json
var db_default = {
  applications: [
    {
      name: "Jordan Bell",
      email: "zenithglobalinnovationhq@protonmail.com",
      phone: "+1 (555) 321-9876",
      jobId: "eng-director",
      jobTitle: "Director of Global Engineering",
      country: "United States",
      nationality: "American",
      gender: "Non-binary",
      availability: "Within 2 weeks",
      education: "Bachelor of Science",
      field: "Software Engineering",
      experience: "6 years",
      address: "123 Market St, San Francisco, CA",
      resumePath: "applications/resumes/demo-resume.pdf",
      signature: "Jordan Bell",
      preferredChannel: "Telegram",
      contactHandle: "@JordanBellDev",
      dob: "1994-08-12",
      expectedSalary: "Open / Negotiable",
      employer: "Not specified",
      currentTitle: "Not specified",
      source: "Direct",
      additionalRoles: [],
      reference: "ZGI-2026-Y80VS6",
      status: "Application Received",
      submittedAt: "2026-10-25T20:47:01.745Z",
      estimatedResponseDate: "2026-10-30",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: false,
      emailError: "Email confirmation pending: configure an active email provider (Resend or Brevo) in Admin Portal",
      id: "app_mvoatgtu_79vnllw"
    },
    {
      name: "Sarah Connor",
      email: "zenithglobalinnovationhq@protonmail.com",
      phone: "+1 (555) 777-8888",
      jobId: "eng-director",
      jobTitle: "Director of Global Engineering",
      country: "United Kingdom",
      nationality: "British",
      gender: "Female",
      source: "remoteok",
      additionalRoles: [
        "Lead Software Architect",
        "Chief Technology Officer (CTO)"
      ],
      expectedSalary: "$190,000 / year",
      availability: "Immediate",
      signature: "Sarah Connor",
      preferredChannel: "Telegram",
      contactHandle: "@SarahConnorTech",
      dob: "1991-03-22",
      education: "Master of Engineering",
      field: "Computing",
      experience: "10 years",
      address: "10 Downing Street, London",
      employer: "Cyberdyne Systems",
      currentTitle: "Principal Staff Engineer",
      resumePath: "applications/resumes/demo-resume.pdf",
      reference: "ZGI-2026-HZMJTU",
      status: "Application Received",
      submittedAt: "2026-10-25T19:09:24.702Z",
      estimatedResponseDate: "2026-10-30",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: true,
      emailError: "",
      id: "app_mvo7bxi6_51ugp40"
    },
    {
      jobId: "eng-director",
      jobTitle: "Director of Global Engineering",
      name: "Marcus Vance",
      email: "zenithglobalinnovationhq@protonmail.com",
      phone: "+1 (555) 392-8172",
      country: "United States",
      nationality: "American",
      dob: "1988-06-15",
      gender: "Male",
      address: "742 Evergreen Terrace, Springfield, OR",
      expectedSalary: "$185,000 / year",
      availability: "2026-11-15",
      education: "Master of Science in Computer Science",
      field: "Software Engineering & Distributed Systems",
      experience: "12+ years",
      employer: "Vance Technologies Global",
      currentTitle: "Principal Infrastructure Architect",
      resumePath: "applications/resumes/demo-resume.pdf",
      signature: "Marcus Vance",
      preferredChannel: "Telegram",
      contactHandle: "@MarcusVanceEng",
      reference: "ZGI-2026-7WE198",
      status: "Shortlisted",
      submittedAt: "2026-10-23T19:21:17.150Z",
      estimatedResponseDate: "2026-10-28",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: true,
      emailError: "",
      id: "app_mvlcvhwe_phn8q3e",
      interviewChannel: "Telegram",
      interviewContact: "@ZenithTalentLead",
      interviewDeadline: "Within 48 hours of receipt"
    },
    {
      jobId: "eng-director",
      jobTitle: "Director of Global Engineering",
      name: "Marcus Vance",
      email: "zenithglobalinnovationhq@protonmail.com",
      phone: "+1 (555) 392-8172",
      country: "United States",
      nationality: "American",
      dob: "1988-06-15",
      gender: "Male",
      address: "742 Evergreen Terrace, Springfield, OR",
      expectedSalary: "$185,000 / year",
      availability: "2026-11-15",
      education: "Master of Science in Computer Science",
      field: "Software Engineering & Distributed Systems",
      experience: "12+ years",
      employer: "Vance Technologies Global",
      currentTitle: "Principal Infrastructure Architect",
      resumePath: "applications/resumes/demo-resume.pdf",
      signature: "Marcus Vance",
      preferredChannel: "Telegram",
      contactHandle: "@MarcusVanceEng",
      reference: "ZGI-2026-27RAIK",
      status: "Application Received",
      submittedAt: "2026-10-23T19:20:42.163Z",
      estimatedResponseDate: "2026-10-28",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: false,
      emailError: "Email confirmation pending: configure an active email provider (Resend or Brevo) in Admin Portal",
      id: "app_mvlcuqwk_9pcino4"
    },
    {
      name: "Evelyn Reed",
      email: "zenithglobalinnovationhq@protonmail.com",
      phone: "+1 (312) 555-0144",
      country: "United States",
      nationality: "American",
      dob: "1992-06-15",
      gender: "Female",
      address: "400 N Michigan Ave, Chicago, IL 60611",
      jobId: "executive-leadership-positions-senior-project-manager",
      jobTitle: "Senior Project Manager",
      desiredRole: "Senior Project Manager",
      expectedSalary: "$135,000",
      availability: "2026-11-01",
      education: "Master of Science",
      field: "Project Management & Systems Engineering",
      experience: "7",
      employer: "Summit Global Consulting",
      currentTitle: "Senior Project Manager",
      resumePath: "applications/resumes/sample.pdf",
      resumeName: "Evelyn_Reed_Resume.pdf",
      signature: "Evelyn Reed",
      applicationDate: "2026-10-22",
      reference: "ZGI-2026-DG2OYQ",
      status: "Application Received",
      submittedAt: "2026-10-22T22:53:32.957Z",
      estimatedResponseDate: "2026-10-27",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: true,
      emailError: "",
      id: "app_mvk50m8u_9dfkxqg"
    },
    {
      name: "Jonathan Vance",
      email: "zenithglobalinnovationhq@protonmail.com",
      phone: "+1 (212) 555-0199",
      country: "United States",
      nationality: "American",
      jobId: "senior-technical-roles-lead-software-architect",
      jobTitle: "Lead Software Architect",
      desiredRole: "Lead Software Architect",
      signature: "Jonathan Vance",
      resumePath: "applications/resumes/sample.pdf",
      reference: "ZGI-2026-MK3GHQ",
      status: "Under Review",
      submittedAt: "2026-10-22T22:35:51.403Z",
      estimatedResponseDate: "2026-10-27",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: true,
      emailError: "",
      id: "app_mvk4dv58_f9g8mxn"
    },
    {
      name: "David Sterling",
      email: "zenithglobalinnovationhq@protonmail.com",
      phone: "+1 415-555-0199",
      country: "United States",
      nationality: "American",
      jobId: "senior-technical-roles-senior-full-stack-developer",
      jobTitle: "Senior Full Stack Developer",
      desiredRole: "Senior Full Stack Developer",
      signature: "David Sterling",
      resumePath: "applications/resumes/sample.pdf",
      reference: "ZGI-2026-UX96K9",
      status: "Under Review",
      submittedAt: "2026-10-22T22:28:16.641Z",
      estimatedResponseDate: "2026-10-27",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: false,
      emailError: "Email confirmation pending: configure an active email provider (Resend or Brevo) in Admin Portal",
      id: "app_mvk4448x_92nz1aw"
    },
    {
      name: "Marcus Vance",
      email: "zenithglobalinnovationhq@protonmail.com",
      phone: "+1 (555) 234-5678",
      country: "United States",
      nationality: "American",
      address: "742 Evergreen Terrace, New York, NY 10001",
      jobId: "senior-technical-roles-senior-full-stack-developer",
      jobTitle: "Senior Full Stack Developer",
      desiredRole: "Senior Full Stack Developer",
      education: "Master's Degree",
      field: "Computer Science",
      experience: "8+ years",
      employer: "Apex Global Technologies",
      currentTitle: "Lead Software Engineer",
      expectedSalary: "45,000 / year",
      availability: "Within 2 weeks",
      resumePath: "applications/resumes/sample-test.pdf",
      resumeName: "Marcus_Vance_Resume.pdf",
      signature: "Marcus Vance",
      applicationDate: "2026-10-22",
      reference: "ZGI-2026-LZVIPF",
      status: "Application Received",
      submittedAt: "2026-10-22T22:28:11.127Z",
      estimatedResponseDate: "2026-10-27",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: false,
      emailError: "Email confirmation pending: configure an active email provider (Resend or Brevo) in Admin Portal",
      id: "app_mvk43zzs_5spqmgx"
    },
    {
      name: "Alexandra Morgan",
      email: "alex.morgan.tech@example.com",
      phone: "+1 (555) 234-5678",
      dob: "1990-05-15",
      gender: "Female",
      nationality: "United States",
      country: "United States",
      address: "450 Lexington Ave, New York, NY 10017",
      jobId: "senior-technical-roles-senior-full-stack-developer",
      jobTitle: "Senior Full Stack Developer",
      desiredRole: "Senior Full Stack Developer",
      expectedSalary: "$165,000",
      availability: "2026-11-15",
      education: "Bachelor of Science in Computer Science",
      field: "Software Engineering",
      certifications: "AWS Certified Solutions Architect, Certified Kubernetes Administrator",
      experience: 8,
      employer: "FinTech Nexus Inc.",
      currentTitle: "Lead Software Engineer",
      resumePath: "applications/resumes/1792701040426-alex_morgan_cv.pdf",
      resumeName: "alex_morgan_cv.pdf",
      signature: "Alexandra Morgan",
      applicationDate: "2026-10-22",
      reference: "ZGI-2026-60J5E3",
      status: "Interview",
      submittedAt: "2026-10-22T20:30:47.879Z",
      estimatedResponseDate: "2026-10-27",
      companyEmail: "zenithglobalinnovationhq@protonmail.com",
      emailSent: false,
      emailError: "Brevo API key not configured (BREVO_API_KEY environment variable required)",
      id: "app_mvjzx1dz_mkn30kd",
      adminNotes: [
        {
          note: "Strong background in distributed cloud architectures. Scheduling technical interview.",
          adminEmail: "zenithglobalinnovationhq@protonmail.com",
          createdAt: "2026-10-22T20:31:04.258Z"
        }
      ]
    }
  ],
  jobs: [
    {
      title: "Senior Product Manager",
      sector: "Additional High-Value Roles",
      location: "Remote \xB7 Global",
      type: "Full-time",
      id: "job_mvjzwhyv_09ajw2u"
    },
    {
      title: "Customer Success Director",
      sector: "Customer Success & Sales Leadership",
      location: "Remote \xB7 Global",
      type: "Full-time",
      id: "job_mvjzwhyv_2jup743"
    },
    {
      title: "Senior Management Consultant",
      sector: "Specialized Consulting Roles",
      location: "Remote \xB7 Global",
      type: "Contract",
      id: "job_mvjzwhyv_lslvozb"
    },
    {
      title: "Senior Operations Manager",
      sector: "Operations & HR Leadership",
      location: "Remote \xB7 Global",
      type: "Full-time",
      id: "job_mvjzwhyv_50boe3x"
    },
    {
      title: "Senior Financial Analyst",
      sector: "Finance & Business Intelligence",
      location: "Remote \xB7 Global",
      type: "Full-time",
      id: "job_mvjzwhyv_pchju39"
    },
    {
      title: "Creative Director",
      sector: "Marketing & Creative Leadership",
      location: "Remote \xB7 Global",
      type: "Full-time",
      featured: true,
      id: "job_mvjzwhyv_mdos0xf"
    },
    {
      title: "Senior Full Stack Developer",
      sector: "Senior Technical Roles",
      location: "Remote \xB7 Global",
      type: "Full-time",
      featured: true,
      id: "job_mvjzwhyv_1brb91a"
    },
    {
      title: "Chief Technology Officer (CTO)",
      sector: "Executive & Leadership Positions",
      location: "Remote \xB7 Global",
      type: "Full-time",
      featured: true,
      id: "job_mvjzwhyv_71fu97u"
    }
  ],
  admin_audit: [
    {
      event: "ADMIN_LOGIN_SUCCESS",
      details: "Administrator authenticated successfully from IP 127.0.0.1",
      ip: "127.0.0.1",
      timestamp: "2026-10-27T23:30:00.784Z",
      id: "adm_mvrbirps_wo116z9"
    },
    {
      event: "ADMIN_LOGIN_SUCCESS",
      details: "Administrator authenticated successfully from IP 127.0.0.1",
      ip: "127.0.0.1",
      timestamp: "2026-10-26T10:56:59.246Z",
      id: "adm_mvp56ir3_tbh2n74"
    },
    {
      event: "SECURITY_HONEYPOT_TRIGGERED",
      details: "Exploit probe detected from 127.0.0.1 targeting /wp-login.php. IP isolated for 24 hours.",
      ip: "127.0.0.1",
      path: "/wp-login.php",
      userAgent: "curl/7.88.1",
      timestamp: "2026-10-26T10:56:42.099Z",
      id: "adm_mvp565is_4xt1sji"
    },
    {
      applicationId: "app_mvlcvhwe_phn8q3e",
      reference: "ZGI-2026-7WE198",
      action: "Status changed",
      from: "Application Received",
      to: "Shortlisted",
      adminEmail: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-23T19:21:25.859Z",
      id: "adm_mvlcvomb_iknmfre"
    },
    {
      applicationId: "app_mvk4dv58_f9g8mxn",
      reference: "ZGI-2026-MK3GHQ",
      action: "Status changed",
      from: "Application Received",
      to: "Under Review",
      adminEmail: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-22T22:35:57.180Z",
      id: "adm_mvk4dzlo_sq7dxe6"
    },
    {
      applicationId: "app_mvk4448x_92nz1aw",
      reference: "ZGI-2026-UX96K9",
      action: "Status changed",
      from: "Application Received",
      to: "Under Review",
      adminEmail: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-22T22:28:35.504Z",
      id: "adm_mvk44isw_0akd6dj"
    },
    {
      applicationId: "app_mvjzx1dz_mkn30kd",
      reference: "ZGI-2026-60J5E3",
      action: "Status changed",
      from: "Shortlisted",
      to: "Interview",
      adminEmail: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-22T21:31:44.248Z",
      id: "adm_mvk23ens_mqly3pe"
    },
    {
      applicationId: "app_mvjzx1dz_mkn30kd",
      reference: "ZGI-2026-60J5E3",
      action: "Admin note added",
      adminEmail: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-22T20:31:04.258Z",
      id: "adm_mvjzxe0z_0yaw62x"
    },
    {
      applicationId: "app_mvjzx1dz_mkn30kd",
      reference: "ZGI-2026-60J5E3",
      action: "Status changed",
      from: "Application Received",
      to: "Shortlisted",
      adminEmail: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-22T20:30:58.784Z",
      id: "adm_mvjzx9sw_itrab63"
    }
  ],
  leads: [
    {
      name: "Sarah Jenkins",
      email: "sarah.jenkins@acmecorp.example",
      company: "Acme Global Solutions",
      phone: "+1 212-555-0188",
      category: "Senior Technical Roles",
      rolesNeeded: "Senior Full Stack Developer",
      message: "Looking to staff 3 senior remote engineers for our North American operations.",
      status: "New",
      createdAt: "2026-10-22T22:28:24.710Z",
      id: "lea_mvk44ah2_wp8kaj7"
    },
    {
      name: "David Miller",
      email: "david@clientcorp.com",
      company: "ClientCorp Global",
      message: "Interested in building a remote data engineering squad.",
      createdAt: "2026-10-22T20:31:27.786Z",
      id: "lea_mvjzxw6i_dykdu21",
      status: "Contacted",
      updatedBy: "zenithglobalinnovationhq@protonmail.com",
      updatedAt: "2026-10-22T21:31:37.678Z"
    }
  ],
  job_alerts: [
    {
      email: "candidate@example.com",
      country: "United States",
      category: "Senior Technical Roles",
      createdAt: "2026-10-22T20:31:22.514Z",
      active: true,
      id: "job_mvjzxs42_hiji2wb"
    }
  ],
  admin_sessions: [
    {
      token: "7efd313cfd1a10598b78981570e11097aedbeb2d435b338e82621dda029b45fe",
      email: "zenithglobalinnovationhq@protonmail.com",
      ip: "127.0.0.1",
      createdAt: "2026-10-27T23:30:00.783Z",
      id: "adm_mvrbirpr_cwfyurd"
    },
    {
      token: "96f9b0ce7e13256322fa00c5f82d9a42dbc40d8d970bf9572a7c93044f96acff",
      email: "zenithglobalinnovationhq@protonmail.com",
      ip: "127.0.0.1",
      createdAt: "2026-10-26T10:56:59.246Z",
      id: "adm_mvp56ir2_yfnchdc"
    },
    {
      token: "e24e2e0291a2d0b55eef920390a552faa0d8cfce5a39d35ab8e5f4be33aed3e0",
      email: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-25T19:09:12.603Z",
      id: "adm_mvo7bo64_68d78zl"
    },
    {
      token: "e24e2e0291a2d0b55eef920390a552faa0d8cfce5a39d35ab8e5f4be33aed3e0",
      email: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-23T19:21:20.648Z",
      id: "adm_mvlcvkll_1am9ui3"
    },
    {
      token: "e24e2e0291a2d0b55eef920390a552faa0d8cfce5a39d35ab8e5f4be33aed3e0",
      email: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-22T21:42:35.330Z",
      id: "adm_mvk2hd1e_vg4qmmw"
    },
    {
      token: "e24e2e0291a2d0b55eef920390a552faa0d8cfce5a39d35ab8e5f4be33aed3e0",
      email: "zenithglobalinnovationhq@protonmail.com",
      createdAt: "2026-10-22T21:31:28.171Z",
      id: "adm_mvk23298_lptjlps"
    }
  ],
  admin_security: [
    {
      id: "sec_admin_cred",
      salt: "zgi_sec_salt_2026",
      passwordHash: "fb2a4168334a02aee93e2ffa05eed0e2c22e8eeb191a91ed85a6061696eb5f47",
      updatedAt: "2026-10-26T10:53:27.415Z"
    }
  ]
};

// backend/db.ts
var isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
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
var inMemoryStore = {
  ...defaultSchema,
  ...db_default
};
var KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
var KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
async function syncFromCloudKV() {
  if (!KV_URL || !KV_TOKEN) return;
  try {
    const res = await fetch(`${KV_URL}/get/zenith_global_db`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` }
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.result) {
        let parsed = json.result;
        while (typeof parsed === "string") {
          try {
            parsed = JSON.parse(parsed);
          } catch {
            break;
          }
        }
        if (parsed && typeof parsed === "object") {
          inMemoryStore = {
            ...inMemoryStore,
            ...parsed,
            applications: Array.isArray(parsed.applications) ? parsed.applications : inMemoryStore.applications,
            admin_sessions: Array.isArray(parsed.admin_sessions) ? parsed.admin_sessions : inMemoryStore.admin_sessions,
            leads: Array.isArray(parsed.leads) ? parsed.leads : inMemoryStore.leads
          };
          try {
            fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryStore, null, 2), "utf-8");
          } catch {
          }
        }
      }
    }
  } catch (err) {
    console.warn("[CLOUD KV SYNC ERROR]", err);
  }
}
async function syncToCloudKV(data) {
  if (!KV_URL || !KV_TOKEN) return;
  try {
    await fetch(`${KV_URL}/set/zenith_global_db`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.warn("[CLOUD KV WRITE ERROR]", err);
  }
}
function mergeRecords(primary, secondary) {
  const byId = /* @__PURE__ */ new Map();
  for (const item of secondary) {
    if (item && item.id) byId.set(String(item.id), item);
  }
  for (const item of primary) {
    if (item && item.id) byId.set(String(item.id), item);
  }
  return Array.from(byId.values());
}
function readDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const memoryApps = inMemoryStore.applications || [];
        const diskApps = parsed.applications || [];
        const memoryLeads = inMemoryStore.leads || [];
        const diskLeads = parsed.leads || [];
        const memoryAlerts = inMemoryStore.job_alerts || [];
        const diskAlerts = parsed.job_alerts || [];
        inMemoryStore = {
          ...defaultSchema,
          ...parsed,
          ...inMemoryStore,
          applications: memoryApps.length >= diskApps.length ? mergeRecords(memoryApps, diskApps) : mergeRecords(diskApps, memoryApps),
          leads: memoryLeads.length >= diskLeads.length ? mergeRecords(memoryLeads, diskLeads) : mergeRecords(diskLeads, memoryLeads),
          job_alerts: memoryAlerts.length >= diskAlerts.length ? mergeRecords(memoryAlerts, diskAlerts) : mergeRecords(diskAlerts, memoryAlerts)
        };
      }
    }
  } catch {
  }
  return inMemoryStore;
}
function writeDb(data) {
  inMemoryStore = data;
  try {
    const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmpFile, DB_FILE);
  } catch {
  }
}
function generateId(prefix = "rec") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}
var db = {
  async list(collection, options) {
    await syncFromCloudKV();
    const data = readDb();
    const items = data[collection] || [];
    const limit = options?.limit || 1e3;
    return { items: items.slice(0, limit) };
  },
  async get(collection, ids) {
    await syncFromCloudKV();
    const data = readDb();
    const items = data[collection] || [];
    const idSet = new Set(ids.map(String));
    const found = items.filter((item) => idSet.has(String(item.id)));
    return found;
  },
  async add(collection, records) {
    await syncFromCloudKV();
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
    syncToCloudKV(data).catch(() => {
    });
    return generatedIds;
  },
  async update(collection, updates) {
    await syncFromCloudKV();
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
      syncToCloudKV(data).catch(() => {
      });
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
    if (key === "RESEND_API_KEY") {
      const r = process.env.RESEND_API_KEY;
      if (r && r.trim() !== "") return r.trim();
      return "";
    }
    if (key === "BREVO_API_KEY") {
      const b = process.env.BREVO_API_KEY;
      if (b && b.trim() !== "") return b.trim();
      return "";
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
  try {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
      return forwarded.split(",")[0].trim();
    }
    return req.socket?.remoteAddress || req.ip || "127.0.0.1";
  } catch {
    return "127.0.0.1";
  }
}
function honeypotShield(req, res, next) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();
    const blockedUntil = blockedIps.get(ip);
    if (blockedUntil) {
      if (now < blockedUntil) {
        try {
          res.setHeader("Server", "Zenith-Perimeter-Shield/4.2");
          res.setHeader("X-Threat-Detected", "Isolated");
        } catch {
        }
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
      try {
        res.setHeader("Server", "Zenith-Active-Perimeter/4.2");
        res.setHeader("X-Defense-Action", "Trap-Triggered-And-Logged");
      } catch {
      }
      res.status(403).json({
        error: "Security perimeter breach detected. Request signature has been logged and blacklisted."
      });
      return;
    }
  } catch {
  }
  next();
}
function securityHeaders(req, res, next) {
  try {
    if (typeof res.removeHeader === "function") {
      res.removeHeader("X-Powered-By");
    }
    if (typeof res.setHeader === "function") {
      res.setHeader("Server", "Zenith-Enterprise-Gateway/4.0");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
      res.setHeader("X-XSS-Protection", "1; mode=block");
      res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    }
  } catch {
  }
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
  if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const delay = 1200 + Math.floor(Math.random() * 600);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
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
async function sendSystemEmail(options) {
  let resendKey = "";
  let brevoKey = "";
  try {
    resendKey = await secrets.readSecret("RESEND_API_KEY");
  } catch {
  }
  if (!resendKey && process.env.RESEND_API_KEY) {
    resendKey = process.env.RESEND_API_KEY;
  }
  try {
    brevoKey = await secrets.readSecret("BREVO_API_KEY");
  } catch {
  }
  if (!brevoKey && process.env.BREVO_API_KEY) {
    brevoKey = process.env.BREVO_API_KEY;
  }
  if (resendKey) {
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Zenith Global Innovation <intake@zenithglobalinnovation.com.ng>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [options.to],
          subject: options.subject,
          html: options.htmlContent
        })
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        console.log(`[RESEND SUCCESS] Email dispatched to ${options.to} (ID: ${data?.id})`);
        return { success: true, provider: "Resend", messageId: data?.id };
      } else {
        const errDetail = await res.text().catch(() => "");
        console.warn(`[RESEND REJECTED] HTTP ${res.status}: ${errDetail.slice(0, 250)}`);
      }
    } catch (e) {
      console.warn("[RESEND EXCEPTION]", e?.message);
    }
  }
  if (brevoKey) {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoKey,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          sender: {
            name: "Zenith Global Innovation",
            email: "zenithglobalinnovationhq@protonmail.com"
          },
          to: [{ email: options.to, name: options.name || options.to }],
          subject: options.subject,
          htmlContent: options.htmlContent
        })
      });
      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        console.log(`[BREVO SUCCESS] Email dispatched to ${options.to}`);
        return { success: true, provider: "Brevo", messageId: data?.messageId };
      } else {
        const detail = await response.text().catch(() => "");
        if (response.status === 401) {
          console.log("[EMAIL NOTICE] Stored Brevo key is unauthorized or expired (HTTP 401). Deactivating invalid key.");
          try {
            await secrets.writeSecret("BREVO_API_KEY", "");
            process.env.BREVO_API_KEY = "";
          } catch {
          }
          return {
            success: false,
            provider: "Brevo",
            error: "Brevo API key is unauthorized or inactive. Please configure an active Resend or Brevo API key in the Admin Portal."
          };
        }
        console.warn(`[BREVO NOTICE] HTTP ${response.status}: ${detail.slice(0, 250)}`);
        return { success: false, provider: "Brevo", error: `Brevo response (HTTP ${response.status}): ${detail.slice(0, 200)}` };
      }
    } catch (err) {
      return { success: false, provider: "Brevo", error: err?.message || "Brevo network error" };
    }
  }
  return {
    success: false,
    provider: "None",
    error: "No active email provider configured (configure RESEND_API_KEY or BREVO_API_KEY in Admin Portal)"
  };
}
async function sendStatusUpdateEmail(applicantEmail, applicantName, role, reference, newStatus, customNote, interviewChannel, interviewContact, interviewDeadline) {
  try {
    const isInterview = newStatus === "Shortlisted" || newStatus === "Interview";
    const channel = interviewChannel || "Telegram";
    const defaultContact = channel === "Zangi" ? "5135448181" : channel === "WhatsApp" ? "+1 (800) 492-3684" : "@Alexander_caldwell1";
    const contact = interviewContact && interviewContact !== "@ZenithTalentLead" ? interviewContact : defaultContact;
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
    const result = await sendSystemEmail({
      to: applicantEmail,
      name: applicantName,
      subject,
      htmlContent
    });
    return { success: result.success, error: result.error, provider: result.provider };
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
  let resendKey = "";
  let brevoKey = "";
  try {
    resendKey = await secrets.readSecret("RESEND_API_KEY");
  } catch {
  }
  if (!resendKey && process.env.RESEND_API_KEY) resendKey = process.env.RESEND_API_KEY;
  try {
    brevoKey = await secrets.readSecret("BREVO_API_KEY");
  } catch {
  }
  if (!brevoKey && process.env.BREVO_API_KEY) brevoKey = process.env.BREVO_API_KEY;
  let resendValid = false;
  let resendError = "";
  let resendDomains = [];
  if (resendKey) {
    try {
      const rRes = await fetch("https://api.resend.com/domains", {
        headers: { "Authorization": `Bearer ${resendKey}`, "Accept": "application/json" }
      });
      if (rRes.ok) {
        const rData = await rRes.json().catch(() => ({ data: [] }));
        resendDomains = rData?.data || [];
        resendValid = true;
      } else {
        const rErr = await rRes.text().catch(() => "");
        resendError = `Resend HTTP ${rRes.status}: ${rErr.slice(0, 150)}`;
      }
    } catch (e) {
      resendError = e?.message || "Network error";
    }
  }
  let brevoValid = false;
  let brevoError = "";
  let brevoAccountEmail = "";
  if (brevoKey) {
    try {
      const bRes = await fetch("https://api.brevo.com/v3/account", {
        headers: { "api-key": brevoKey, "Accept": "application/json" }
      });
      if (bRes.ok) {
        const bData = await bRes.json().catch(() => ({}));
        brevoAccountEmail = bData?.email || "";
        brevoValid = true;
      } else {
        const bErr = await bRes.text().catch(() => "");
        brevoError = `Brevo HTTP ${bRes.status}: ${bErr.slice(0, 150)}`;
      }
    } catch (e) {
      brevoError = e?.message || "Network error";
    }
  }
  const isConfigured = Boolean(resendKey || brevoKey);
  const isValid = resendValid || brevoValid;
  let activeProvider = "None";
  if (resendValid && brevoValid) {
    activeProvider = "Resend (Primary) + Brevo (Failover)";
  } else if (resendValid) {
    activeProvider = "Resend (Active)";
  } else if (brevoValid) {
    activeProvider = "Brevo (Active)";
  }
  res.json({
    configured: isConfigured,
    valid: isValid,
    provider: activeProvider,
    resend: {
      configured: Boolean(resendKey),
      valid: resendValid,
      domains: resendDomains.map((d) => ({ name: d.name, status: d.status })),
      error: resendError
    },
    brevo: {
      configured: Boolean(brevoKey),
      valid: brevoValid,
      accountEmail: brevoAccountEmail,
      error: brevoError
    },
    senderEmail: "intake@zenithglobalinnovation.com.ng",
    message: isValid ? `Email dispatcher active via ${activeProvider}. Confirmation emails are operational.` : isConfigured ? "Email provider key configured, awaiting verification." : "No email key configured. Add a Resend (re_...) or Brevo (xkeysib-...) key."
  });
});
apiRouter.post("/admin/brevo/test", async (req, res) => {
  const b = req.body;
  const t = String(b.token || "");
  if (!await isValidAdminToken(t)) {
    res.status(401).json({ message: "Administrator authentication required" });
    return;
  }
  const recipient = String(b.recipientEmail || ADMIN_EMAIL).trim();
  const testHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#0f172a">
      <div style="background:#10243e;padding:24px;color:#fff">
        <h2 style="margin:0">Zenith Global Innovation</h2>
        <p style="margin:4px 0 0;font-size:12px;opacity:0.85">Recruitment Operations \xB7 Email Integration Diagnostic</p>
      </div>
      <div style="padding:24px;border:1px solid #e2e8f0;border-top:none">
        <p>Hello,</p>
        <p>This is an automated test notification confirming that your <strong>Transactional Email Integration</strong> is properly authenticated and operating successfully for Zenith Global Innovation.</p>
        <div style="background:#f1f5f9;padding:16px;border-radius:8px;font-size:13px;margin:20px 0">
          <p style="margin:0 0 6px"><strong>Sender:</strong> intake@zenithglobalinnovation.com.ng</p>
          <p style="margin:0 0 6px"><strong>Recipient:</strong> ${recipient}</p>
          <p style="margin:0"><strong>Timestamp:</strong> ${(/* @__PURE__ */ new Date()).toISOString()}</p>
        </div>
        <p style="font-size:12px;color:#64748b">Automatic candidate intake confirmations and stage progression updates are now operating live.</p>
      </div>
    </div>
  `;
  const result = await sendSystemEmail({
    to: recipient,
    name: "Zenith Administrator",
    subject: "[Test] Email Integration Verification \u2014 Zenith Global Innovation",
    htmlContent: testHtml
  });
  if (result.success) {
    res.json({
      success: true,
      provider: result.provider,
      messageId: result.messageId || "ok",
      recipient,
      message: `Test email successfully dispatched via ${result.provider} to ${recipient}!`
    });
  } else {
    res.status(400).json({
      success: false,
      provider: result.provider,
      error: result.error || "Failed to dispatch email"
    });
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
  if (rawKey.startsWith("re_")) {
    try {
      await secrets.writeSecret("RESEND_API_KEY", rawKey);
      const testRes = await fetch("https://api.resend.com/domains", {
        headers: { "Authorization": `Bearer ${rawKey}`, "Accept": "application/json" }
      });
      if (testRes.ok) {
        const dData = await testRes.json().catch(() => ({ data: [] }));
        const domains = dData?.data || [];
        const domainNames = domains.map((d) => d.name).join(", ") || "zenithglobalinnovation.com.ng";
        res.json({
          success: true,
          valid: true,
          provider: "Resend",
          message: `Resend API Key verified and active! Connected domain(s): ${domainNames}.`
        });
      } else {
        const errText = await testRes.text().catch(() => "");
        res.json({
          success: true,
          valid: false,
          provider: "Resend",
          warning: `Key saved to server, but Resend returned HTTP ${testRes.status}: ${errText.slice(0, 200)}`
        });
      }
    } catch (err) {
      res.status(500).json({ message: err?.message || "Failed to verify Resend API key" });
    }
  } else {
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
          provider: "Brevo",
          message: `Brevo API key saved and verified! Connected to ${accData.email || "account"}.`,
          accountEmail: accData.email
        });
      } else {
        const errText = await accRes.text().catch(() => "");
        res.json({
          success: true,
          valid: false,
          provider: "Brevo",
          warning: `Key saved to server, but Brevo returned HTTP ${accRes.status}: ${errText.slice(0, 200)}`
        });
      }
    } catch (err) {
      res.status(500).json({ message: err?.message || "Failed to update Brevo API key" });
    }
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
      const emailResult = await sendSystemEmail({
        to: String(b.email),
        name: applicantName,
        subject: `Congratulations \u2014 Priority Review Intake Confirmed | ${role} (${reference})`,
        htmlContent
      });
      emailSent = emailResult.success;
      if (!emailResult.success) {
        emailError = emailResult.error || "Failed to dispatch confirmation email";
        console.log(`[APPLICATION NOTICE] Confirmation notice status (${emailResult.provider}): ${emailError}`);
      } else {
        console.log(`[CONFIRMATION EMAIL SENT] via ${emailResult.provider} to ${b.email} for application ${reference}`);
      }
    } catch (err) {
      emailError = err?.message || "Email delivery exception";
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
      const res2 = await sendSystemEmail({
        to: email,
        subject: "Your Zenith Global Innovation job alert is active",
        htmlContent: html
      });
      confirmationSent = res2.success;
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

// backend/seoJobsData.json
var seoJobsData_default = {
  organization: {
    "@type": "Organization",
    "@id": "https://www.zenithglobalinnovation.com.ng/#organization",
    name: "Zenith Global Innovation",
    alternateName: "Zenith Global HR & Strategic Remote Staffing",
    url: "https://www.zenithglobalinnovation.com.ng",
    foundingDate: "2019",
    description: "International corporate recruitment and remote staffing partner connecting thoroughly vetted professionals with companies worldwide.",
    email: "zenithglobalinnovationhq@protonmail.com",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "245 West 29th Street, Suite 1204",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10001",
        addressCountry: "US"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "1350 Avenue of the Americas, Floor 3",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10018",
        addressCountry: "US"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "400 Park Avenue South, Suite 800",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10022",
        addressCountry: "US"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "82 Great Eastern Street",
        addressLocality: "London",
        postalCode: "EC2A 4NE",
        addressCountry: "GB"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "152 City Road",
        addressLocality: "London",
        postalCode: "EC1V 9BD",
        addressCountry: "GB"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "10 Marina Boulevard, Level 39",
        addressLocality: "Singapore",
        postalCode: "018956",
        addressCountry: "SG"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "1 Raffles Place, Tower 2",
        addressLocality: "Singapore",
        postalCode: "049315",
        addressCountry: "SG"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "88 Queen's Quay West, Suite 1900",
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M5V 2T6",
        addressCountry: "CA"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "199 Bay Street, Commerce Court West",
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M5H 2N2",
        addressCountry: "CA"
      }
    ],
    areaServed: [
      "United States",
      "United Kingdom",
      "Canada",
      "Singapore",
      "Australia",
      "Worldwide"
    ],
    knowsAbout: [
      "Remote Staffing",
      "Executive Search",
      "Technical Recruitment",
      "Global Workforce Management"
    ],
    award: "Better Business Bureau (BBB) A+ Accredited Business",
    memberOf: [
      {
        "@type": "Organization",
        name: "Better Business Bureau (BBB)",
        sameAs: "https://www.bbb.org"
      },
      {
        "@type": "Organization",
        name: "Google Cloud Partner Advantage",
        sameAs: "https://cloud.google.com/partners"
      },
      {
        "@type": "Organization",
        name: "Meta Business Partner Network",
        sameAs: "https://www.facebook.com/business/partner-directory"
      }
    ]
  },
  website: {
    "@type": "WebSite",
    "@id": "https://www.zenithglobalinnovation.com.ng/#website",
    url: "https://www.zenithglobalinnovation.com.ng",
    name: "Zenith Global Innovation",
    publisher: {
      "@id": "https://www.zenithglobalinnovation.com.ng/#organization"
    }
  },
  jobs: [
    {
      slug: "Chief-Technology-Officer-CTO",
      title: "Chief Technology Officer (CTO)",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Chief-Technology-Officer-CTO",
      description: "<p>The Chief Technology Officer (CTO) is a fully remote position at Zenith Global Innovation specializing in enterprise technology strategy, architecture, engineering leadership, cybersecurity and long-term technical investment. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to enterprise technology strategy, architecture, engineering leadership, cybersecurity and long-term technical investment into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Chief Technology Officer (CTO) or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 125e3,
          maxValue: 285e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "enterprise technology strategy, architecture, engineering leadership, cybersecurity and long-term technical investment",
      metaDescription: "Remote Chief Technology Officer (CTO) ($125,000\u2013$285,000/yr) focused on enterprise technology strategy, architecture and engineering leadership. Apply directly."
    },
    {
      slug: "Chief-Marketing-Officer-CMO",
      title: "Chief Marketing Officer (CMO)",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Chief-Marketing-Officer-CMO",
      description: "<p>The Chief Marketing Officer (CMO) is a fully remote position at Zenith Global Innovation specializing in global brand strategy, demand generation, positioning, customer acquisition and marketing performance. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to global brand strategy, demand generation, positioning, customer acquisition and marketing performance into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Chief Marketing Officer (CMO) or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-04T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 125e3,
          maxValue: 285e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "global brand strategy, demand generation, positioning, customer acquisition and marketing performance",
      metaDescription: "Remote Chief Marketing Officer (CMO) ($125,000\u2013$285,000/yr) focused on global brand strategy, demand generation and positioning. Apply directly."
    },
    {
      slug: "Chief-Operations-Officer-COO",
      title: "Chief Operations Officer (COO)",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Chief-Operations-Officer-COO",
      description: "<p>The Chief Operations Officer (COO) is a fully remote position at Zenith Global Innovation specializing in company-wide operating discipline, service delivery, process excellence, workforce performance and scalable execution. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to company-wide operating discipline, service delivery, process excellence, workforce performance and scalable execution into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Chief Operations Officer (COO) or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-25T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 125e3,
          maxValue: 285e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "company-wide operating discipline, service delivery, process excellence, workforce performance and scalable execution",
      metaDescription: "Remote Chief Operations Officer (COO) ($125,000\u2013$285,000/yr) focused on company-wide operating discipline and service delivery. Apply directly."
    },
    {
      slug: "Director-of-Digital-Transformation",
      title: "Director of Digital Transformation",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Director-of-Digital-Transformation",
      description: "<p>The Director of Digital Transformation is a fully remote position at Zenith Global Innovation specializing in business process modernization, technology adoption, automation and measurable digital change. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to business process modernization, technology adoption, automation and measurable digital change into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Director of Digital Transformation or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-15T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 125e3,
          maxValue: 285e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "business process modernization, technology adoption, automation and measurable digital change",
      metaDescription: "Remote Director of Digital Transformation ($125,000\u2013$285,000/yr) focused on business process modernization, technology adoption and automation. Apply directly."
    },
    {
      slug: "Vice-President-of-Business-Development",
      title: "Vice President of Business Development",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Vice-President-of-Business-Development",
      description: "<p>The Vice President of Business Development is a fully remote position at Zenith Global Innovation specializing in strategic partnerships, enterprise pipeline growth, market expansion and high-value commercial relationships. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to strategic partnerships, enterprise pipeline growth, market expansion and high-value commercial relationships into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Vice President of Business Development or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-05T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 125e3,
          maxValue: 285e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "strategic partnerships, enterprise pipeline growth, market expansion and high-value commercial relationships",
      metaDescription: "Remote Vice President of Business Development ($125,000\u2013$285,000/yr) focused on strategic partnerships and enterprise pipeline growth. Apply directly."
    },
    {
      slug: "Senior-Project-Manager",
      title: "Senior Project Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Project-Manager",
      description: "<p>The Senior Project Manager is a fully remote position at Zenith Global Innovation specializing in complex project planning, delivery governance, stakeholder coordination, budgets, risks and milestones. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to complex project planning, delivery governance, stakeholder coordination, budgets, risks and milestones into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Project Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 125e3,
          maxValue: 285e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "complex project planning, delivery governance, stakeholder coordination, budgets, risks and milestones",
      metaDescription: "Remote Senior Project Manager ($125,000\u2013$285,000/yr) focused on complex project planning, delivery governance and stakeholder coordination. Apply directly."
    },
    {
      slug: "Product-Strategy-Lead",
      title: "Product Strategy Lead",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Product-Strategy-Lead",
      description: "<p>The Product Strategy Lead is a fully remote position at Zenith Global Innovation specializing in product vision, market opportunity, customer insight, portfolio priorities and commercial product strategy. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to product vision, market opportunity, customer insight, portfolio priorities and commercial product strategy into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Product Strategy Lead or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 125e3,
          maxValue: 285e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "product vision, market opportunity, customer insight, portfolio priorities and commercial product strategy",
      metaDescription: "Remote Product Strategy Lead ($125,000\u2013$285,000/yr) focused on product vision, market opportunity, customer insight and portfolio priorities. Apply directly."
    },
    {
      slug: "Change-Management-Consultant",
      title: "Change Management Consultant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Change-Management-Consultant",
      description: "<p>The Change Management Consultant is a fully remote position at Zenith Global Innovation specializing in organizational change, stakeholder readiness, communication, adoption planning and transformation outcomes. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to organizational change, stakeholder readiness, communication, adoption planning and transformation outcomes into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Change Management Consultant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-04T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 125e3,
          maxValue: 285e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "organizational change, stakeholder readiness, communication, adoption planning and transformation outcomes",
      metaDescription: "Remote Change Management Consultant ($125,000\u2013$285,000/yr) focused on organizational change, stakeholder readiness and communication. Apply directly."
    },
    {
      slug: "Senior-Full-Stack-Developer",
      title: "Senior Full Stack Developer",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Full-Stack-Developer",
      description: "<p>The Senior Full Stack Developer is a fully remote position at Zenith Global Innovation specializing in end-to-end web application engineering across frontend, backend, APIs, databases and production delivery. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to end-to-end web application engineering across frontend, backend, APIs, databases and production delivery into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Full Stack Developer or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-25T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "end-to-end web application engineering across frontend, backend, APIs, databases and production delivery",
      metaDescription: "Remote Senior Full Stack Developer ($115,000\u2013$225,000/yr) focused on end-to-end web application engineering across frontend, backend and APIs. Apply directly."
    },
    {
      slug: "Lead-Software-Architect",
      title: "Lead Software Architect",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Lead-Software-Architect",
      description: "<p>The Lead Software Architect is a fully remote position at Zenith Global Innovation specializing in technical architecture, engineering standards, system design, scalability and architectural decision-making. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to technical architecture, engineering standards, system design, scalability and architectural decision-making into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Lead Software Architect or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-15T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "technical architecture, engineering standards, system design, scalability and architectural decision-making",
      metaDescription: "Remote Lead Software Architect ($115,000\u2013$225,000/yr) focused on technical architecture, engineering standards, system design and scalability. Apply directly."
    },
    {
      slug: "Senior-DevOps-Engineer",
      title: "Senior DevOps Engineer",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-DevOps-Engineer",
      description: "<p>The Senior DevOps Engineer is a fully remote position at Zenith Global Innovation specializing in CI/CD, cloud infrastructure, observability, automation, reliability and secure software delivery. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to CI/CD, cloud infrastructure, observability, automation, reliability and secure software delivery into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior DevOps Engineer or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "CI/CD, cloud infrastructure, observability, automation, reliability and secure software delivery",
      metaDescription: "Remote Senior DevOps Engineer ($115,000\u2013$225,000/yr) focused on CI/CD, cloud infrastructure, observability, automation and reliability. Apply directly."
    },
    {
      slug: "Principal-Cloud-Engineer",
      title: "Principal Cloud Engineer",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Principal-Cloud-Engineer",
      description: "<p>The Principal Cloud Engineer is a fully remote position at Zenith Global Innovation specializing in cloud architecture, migration, infrastructure automation, scalability, resilience and cost optimization. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to cloud architecture, migration, infrastructure automation, scalability, resilience and cost optimization into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Principal Cloud Engineer or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "cloud architecture, migration, infrastructure automation, scalability, resilience and cost optimization",
      metaDescription: "Remote Principal Cloud Engineer ($115,000\u2013$225,000/yr) focused on cloud architecture, migration, infrastructure automation and scalability. Apply directly."
    },
    {
      slug: "Senior-Cybersecurity-Analyst",
      title: "Senior Cybersecurity Analyst",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Cybersecurity-Analyst",
      description: "<p>The Senior Cybersecurity Analyst is a fully remote position at Zenith Global Innovation specializing in security monitoring, threat analysis, incident response, vulnerability management and security controls. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to security monitoring, threat analysis, incident response, vulnerability management and security controls into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Cybersecurity Analyst or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "security monitoring, threat analysis, incident response, vulnerability management and security controls",
      metaDescription: "Remote Senior Cybersecurity Analyst ($115,000\u2013$225,000/yr) focused on security monitoring, threat analysis and incident response. Apply directly."
    },
    {
      slug: "Lead-Data-Scientist",
      title: "Lead Data Scientist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Lead-Data-Scientist",
      description: "<p>The Lead Data Scientist is a fully remote position at Zenith Global Innovation specializing in advanced analytics, predictive modeling, experimentation and data-driven business decision support. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to advanced analytics, predictive modeling, experimentation and data-driven business decision support into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Lead Data Scientist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-04T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "advanced analytics, predictive modeling, experimentation and data-driven business decision support",
      metaDescription: "Remote Lead Data Scientist ($115,000\u2013$225,000/yr) focused on advanced analytics, predictive modeling and experimentation. Apply directly."
    },
    {
      slug: "Senior-Machine-Learning-Engineer",
      title: "Senior Machine Learning Engineer",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Machine-Learning-Engineer",
      description: "<p>The Senior Machine Learning Engineer is a fully remote position at Zenith Global Innovation specializing in production machine learning systems, model deployment, data pipelines, evaluation and MLOps. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to production machine learning systems, model deployment, data pipelines, evaluation and MLOps into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Machine Learning Engineer or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-25T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "production machine learning systems, model deployment, data pipelines, evaluation and MLOps",
      metaDescription: "Remote Senior Machine Learning Engineer ($115,000\u2013$225,000/yr) focused on production machine learning systems and model deployment. Apply directly."
    },
    {
      slug: "Blockchain-Solutions-Architect",
      title: "Blockchain Solutions Architect",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Blockchain-Solutions-Architect",
      description: "<p>The Blockchain Solutions Architect is a fully remote position at Zenith Global Innovation specializing in distributed ledger architecture, smart-contract ecosystems, integration design and enterprise blockchain solutions. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to distributed ledger architecture, smart-contract ecosystems, integration design and enterprise blockchain solutions into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Blockchain Solutions Architect or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-30T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "distributed ledger architecture, smart-contract ecosystems, integration design and enterprise blockchain solutions",
      metaDescription: "Remote Blockchain Solutions Architect ($115,000\u2013$225,000/yr) focused on distributed ledger architecture and smart-contract ecosystems. Apply directly."
    },
    {
      slug: "Senior-Database-Administrator",
      title: "Senior Database Administrator",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Database-Administrator",
      description: "<p>The Senior Database Administrator is a fully remote position at Zenith Global Innovation specializing in database reliability, performance tuning, backup strategy, security and high-availability operations. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to database reliability, performance tuning, backup strategy, security and high-availability operations into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Database Administrator or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "database reliability, performance tuning, backup strategy, security and high-availability operations",
      metaDescription: "Remote Senior Database Administrator ($115,000\u2013$225,000/yr) focused on database reliability, performance tuning, backup strategy and security. Apply directly."
    },
    {
      slug: "Principal-UX-UI-Designer",
      title: "Principal UX/UI Designer",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Principal-UX-UI-Designer",
      description: "<p>The Principal UX/UI Designer is a fully remote position at Zenith Global Innovation specializing in user research, interaction design, visual systems, accessibility and product experience leadership. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to user research, interaction design, visual systems, accessibility and product experience leadership into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Principal UX/UI Designer or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 115e3,
          maxValue: 225e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "user research, interaction design, visual systems, accessibility and product experience leadership",
      metaDescription: "Remote Principal UX/UI Designer ($115,000\u2013$225,000/yr) focused on user research, interaction design, visual systems and accessibility. Apply directly."
    },
    {
      slug: "Senior-Digital-Marketing-Manager",
      title: "Senior Digital Marketing Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Digital-Marketing-Manager",
      description: "<p>The Senior Digital Marketing Manager is a fully remote position at Zenith Global Innovation specializing in multi-channel campaigns, performance marketing, audience growth, analytics and digital acquisition. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to multi-channel campaigns, performance marketing, audience growth, analytics and digital acquisition into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Digital Marketing Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 185e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "multi-channel campaigns, performance marketing, audience growth, analytics and digital acquisition",
      metaDescription: "Remote Senior Digital Marketing Manager ($95,000\u2013$185,000/yr) focused on multi-channel campaigns, performance marketing and audience growth. Apply directly."
    },
    {
      slug: "Brand-Strategy-Director",
      title: "Brand Strategy Director",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Brand-Strategy-Director",
      description: "<p>The Brand Strategy Director is a fully remote position at Zenith Global Innovation specializing in brand positioning, identity, messaging, market differentiation and global brand governance. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to brand positioning, identity, messaging, market differentiation and global brand governance into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Brand Strategy Director or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-04T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 185e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "brand positioning, identity, messaging, market differentiation and global brand governance",
      metaDescription: "Remote Brand Strategy Director ($95,000\u2013$185,000/yr) focused on brand positioning, identity, messaging and market differentiation. Apply directly."
    },
    {
      slug: "Senior-Content-Strategist",
      title: "Senior Content Strategist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Content-Strategist",
      description: "<p>The Senior Content Strategist is a fully remote position at Zenith Global Innovation specializing in editorial strategy, content planning, audience journeys, thought leadership and measurable content performance. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to editorial strategy, content planning, audience journeys, thought leadership and measurable content performance into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Content Strategist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-09T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 185e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "editorial strategy, content planning, audience journeys, thought leadership and measurable content performance",
      metaDescription: "Remote Senior Content Strategist ($95,000\u2013$185,000/yr) focused on editorial strategy, content planning and audience journeys. Apply directly."
    },
    {
      slug: "Creative-Director",
      title: "Creative Director",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Creative-Director",
      description: "<p>The Creative Director is a fully remote position at Zenith Global Innovation specializing in creative vision, campaign concepts, brand expression, creative teams and quality standards. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to creative vision, campaign concepts, brand expression, creative teams and quality standards into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Creative Director or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-30T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 185e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "creative vision, campaign concepts, brand expression, creative teams and quality standards",
      metaDescription: "Remote Creative Director ($95,000\u2013$185,000/yr) focused on creative vision, campaign concepts, brand expression and creative teams. Apply directly."
    },
    {
      slug: "Senior-SEO-Specialist",
      title: "Senior SEO Specialist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-SEO-Specialist",
      description: "<p>The Senior SEO Specialist is a fully remote position at Zenith Global Innovation specializing in technical SEO, content optimization, search visibility, keyword strategy and organic growth. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to technical SEO, content optimization, search visibility, keyword strategy and organic growth into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior SEO Specialist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 185e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "technical SEO, content optimization, search visibility, keyword strategy and organic growth",
      metaDescription: "Remote Senior SEO Specialist ($95,000\u2013$185,000/yr) focused on technical SEO, content optimization, search visibility and keyword strategy. Apply directly."
    },
    {
      slug: "Marketing-Automation-Lead",
      title: "Marketing Automation Lead",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Marketing-Automation-Lead",
      description: "<p>The Marketing Automation Lead is a fully remote position at Zenith Global Innovation specializing in lifecycle marketing, CRM automation, segmentation, lead nurturing and campaign operations. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to lifecycle marketing, CRM automation, segmentation, lead nurturing and campaign operations into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Marketing Automation Lead or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 185e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "lifecycle marketing, CRM automation, segmentation, lead nurturing and campaign operations",
      metaDescription: "Remote Marketing Automation Lead ($95,000\u2013$185,000/yr) focused on lifecycle marketing, CRM automation, segmentation and lead nurturing. Apply directly."
    },
    {
      slug: "Senior-Growth-Hacker",
      title: "Senior Growth Hacker",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Growth-Hacker",
      description: "<p>The Senior Growth Hacker is a fully remote position at Zenith Global Innovation specializing in rapid experimentation, acquisition loops, conversion optimization and scalable growth channels. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to rapid experimentation, acquisition loops, conversion optimization and scalable growth channels into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Growth Hacker or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 185e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "rapid experimentation, acquisition loops, conversion optimization and scalable growth channels",
      metaDescription: "Remote Senior Growth Hacker ($95,000\u2013$185,000/yr) focused on rapid experimentation, acquisition loops and conversion optimization. Apply directly."
    },
    {
      slug: "E-commerce-Strategy-Manager",
      title: "E-commerce Strategy Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/E-commerce-Strategy-Manager",
      description: "<p>The E-commerce Strategy Manager is a fully remote position at Zenith Global Innovation specializing in digital commerce strategy, merchandising, conversion, customer journeys and online revenue growth. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to digital commerce strategy, merchandising, conversion, customer journeys and online revenue growth into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in E-commerce Strategy Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-05T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 185e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "digital commerce strategy, merchandising, conversion, customer journeys and online revenue growth",
      metaDescription: "Remote E-commerce Strategy Manager ($95,000\u2013$185,000/yr) focused on digital commerce strategy, merchandising, conversion and customer journeys. Apply directly."
    },
    {
      slug: "Senior-Financial-Analyst",
      title: "Senior Financial Analyst",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Financial-Analyst",
      description: "<p>The Senior Financial Analyst is a fully remote position at Zenith Global Innovation specializing in financial modeling, forecasting, variance analysis, reporting and management decision support. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to financial modeling, forecasting, variance analysis, reporting and management decision support into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Financial Analyst or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-09T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 105e3,
          maxValue: 195e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "financial modeling, forecasting, variance analysis, reporting and management decision support",
      metaDescription: "Remote Senior Financial Analyst ($105,000\u2013$195,000/yr) focused on financial modeling, forecasting, variance analysis and reporting. Apply directly."
    },
    {
      slug: "Business-Intelligence-Manager",
      title: "Business Intelligence Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Business-Intelligence-Manager",
      description: "<p>The Business Intelligence Manager is a fully remote position at Zenith Global Innovation specializing in BI strategy, dashboards, data governance, analytics delivery and executive reporting. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to BI strategy, dashboards, data governance, analytics delivery and executive reporting into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Business Intelligence Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-30T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 105e3,
          maxValue: 195e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "BI strategy, dashboards, data governance, analytics delivery and executive reporting",
      metaDescription: "Remote Business Intelligence Manager ($105,000\u2013$195,000/yr) focused on BI strategy, dashboards, data governance and analytics delivery. Apply directly."
    },
    {
      slug: "Senior-Investment-Analyst",
      title: "Senior Investment Analyst",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Investment-Analyst",
      description: "<p>The Senior Investment Analyst is a fully remote position at Zenith Global Innovation specializing in investment research, valuation, financial modeling, market analysis and investment recommendations. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to investment research, valuation, financial modeling, market analysis and investment recommendations into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Investment Analyst or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 105e3,
          maxValue: 195e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "investment research, valuation, financial modeling, market analysis and investment recommendations",
      metaDescription: "Remote Senior Investment Analyst ($105,000\u2013$195,000/yr) focused on investment research, valuation, financial modeling and market analysis. Apply directly."
    },
    {
      slug: "Risk-Management-Consultant",
      title: "Risk Management Consultant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Risk-Management-Consultant",
      description: "<p>The Risk Management Consultant is a fully remote position at Zenith Global Innovation specializing in enterprise risk identification, controls, scenario analysis and risk mitigation programs. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to enterprise risk identification, controls, scenario analysis and risk mitigation programs into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Risk Management Consultant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 105e3,
          maxValue: 195e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "enterprise risk identification, controls, scenario analysis and risk mitigation programs",
      metaDescription: "Remote Risk Management Consultant ($105,000\u2013$195,000/yr) focused on enterprise risk identification, controls and scenario analysis. Apply directly."
    },
    {
      slug: "Senior-Compliance-Officer",
      title: "Senior Compliance Officer",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Compliance-Officer",
      description: "<p>The Senior Compliance Officer is a fully remote position at Zenith Global Innovation specializing in regulatory compliance, policy implementation, monitoring, controls and compliance reporting. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to regulatory compliance, policy implementation, monitoring, controls and compliance reporting into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Compliance Officer or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-15T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 105e3,
          maxValue: 195e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "regulatory compliance, policy implementation, monitoring, controls and compliance reporting",
      metaDescription: "Remote Senior Compliance Officer ($105,000\u2013$195,000/yr) focused on regulatory compliance, policy implementation, monitoring and controls. Apply directly."
    },
    {
      slug: "Treasury-Manager",
      title: "Treasury Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Treasury-Manager",
      description: "<p>The Treasury Manager is a fully remote position at Zenith Global Innovation specializing in cash management, liquidity planning, banking relationships, funding and treasury controls. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to cash management, liquidity planning, banking relationships, funding and treasury controls into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Treasury Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-05T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 105e3,
          maxValue: 195e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "cash management, liquidity planning, banking relationships, funding and treasury controls",
      metaDescription: "Remote Treasury Manager ($105,000\u2013$195,000/yr) focused on cash management, liquidity planning, banking relationships and funding. Apply directly."
    },
    {
      slug: "Financial-Planning-Analysis-Lead",
      title: "Financial Planning & Analysis Lead",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Financial-Planning-Analysis-Lead",
      description: "<p>The Financial Planning & Analysis Lead is a fully remote position at Zenith Global Innovation specializing in budgeting, forecasting, scenario planning, performance analysis and executive financial insight. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to budgeting, forecasting, scenario planning, performance analysis and executive financial insight into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Financial Planning & Analysis Lead or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-09T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 105e3,
          maxValue: 195e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "budgeting, forecasting, scenario planning, performance analysis and executive financial insight",
      metaDescription: "Remote Financial Planning & Analysis Lead ($105,000\u2013$195,000/yr) focused on budgeting, forecasting, scenario planning and performance analysis. Apply directly."
    },
    {
      slug: "Senior-Tax-Consultant",
      title: "Senior Tax Consultant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Tax-Consultant",
      description: "<p>The Senior Tax Consultant is a fully remote position at Zenith Global Innovation specializing in tax planning, compliance, research, advisory analysis and coordination of tax obligations. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to tax planning, compliance, research, advisory analysis and coordination of tax obligations into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Tax Consultant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-30T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 105e3,
          maxValue: 195e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "tax planning, compliance, research, advisory analysis and coordination of tax obligations",
      metaDescription: "Remote Senior Tax Consultant ($105,000\u2013$195,000/yr) focused on tax planning, compliance, research and advisory analysis. Apply directly."
    },
    {
      slug: "Senior-Operations-Manager",
      title: "Senior Operations Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Operations-Manager",
      description: "<p>The Senior Operations Manager is a fully remote position at Zenith Global Innovation specializing in daily operating performance, service quality, process improvement, resource planning and team leadership. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to daily operating performance, service quality, process improvement, resource planning and team leadership into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Operations Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 9e4,
          maxValue: 175e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "daily operating performance, service quality, process improvement, resource planning and team leadership",
      metaDescription: "Remote Senior Operations Manager ($90,000\u2013$175,000/yr) focused on daily operating performance, service quality and process improvement. Apply directly."
    },
    {
      slug: "Director-of-Remote-Workforce-Management",
      title: "Director of Remote Workforce Management",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Director-of-Remote-Workforce-Management",
      description: "<p>The Director of Remote Workforce Management is a fully remote position at Zenith Global Innovation specializing in distributed workforce strategy, remote operating models, productivity, engagement and workforce governance. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to distributed workforce strategy, remote operating models, productivity, engagement and workforce governance into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Director of Remote Workforce Management or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-25T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 9e4,
          maxValue: 175e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "distributed workforce strategy, remote operating models, productivity, engagement and workforce governance",
      metaDescription: "Remote Director of Remote Workforce Management ($90,000\u2013$175,000/yr) focused on distributed workforce strategy and remote operating models. Apply directly."
    },
    {
      slug: "Senior-HR-Business-Partner",
      title: "Senior HR Business Partner",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-HR-Business-Partner",
      description: "<p>The Senior HR Business Partner is a fully remote position at Zenith Global Innovation specializing in strategic HR partnership, workforce planning, employee relations, performance and organizational effectiveness. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to strategic HR partnership, workforce planning, employee relations, performance and organizational effectiveness into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior HR Business Partner or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-15T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 9e4,
          maxValue: 175e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "strategic HR partnership, workforce planning, employee relations, performance and organizational effectiveness",
      metaDescription: "Remote Senior HR Business Partner ($90,000\u2013$175,000/yr) focused on strategic HR partnership, workforce planning and employee relations. Apply directly."
    },
    {
      slug: "Talent-Acquisition-Lead",
      title: "Talent Acquisition Lead",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Talent-Acquisition-Lead",
      description: "<p>The Talent Acquisition Lead is a fully remote position at Zenith Global Innovation specializing in recruitment strategy, sourcing, selection, employer branding and hiring quality. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to recruitment strategy, sourcing, selection, employer branding and hiring quality into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Talent Acquisition Lead or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-05T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 9e4,
          maxValue: 175e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "recruitment strategy, sourcing, selection, employer branding and hiring quality",
      metaDescription: "Remote Talent Acquisition Lead ($90,000\u2013$175,000/yr) focused on recruitment strategy, sourcing, selection, employer branding and hiring quality. Apply directly."
    },
    {
      slug: "Organizational-Development-Consultant",
      title: "Organizational Development Consultant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Organizational-Development-Consultant",
      description: "<p>The Organizational Development Consultant is a fully remote position at Zenith Global Innovation specializing in organizational design, leadership development, culture, capability building and change initiatives. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to organizational design, leadership development, culture, capability building and change initiatives into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Organizational Development Consultant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-09T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 9e4,
          maxValue: 175e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "organizational design, leadership development, culture, capability building and change initiatives",
      metaDescription: "Remote Organizational Development Consultant ($90,000\u2013$175,000/yr) focused on organizational design, leadership development and culture. Apply directly."
    },
    {
      slug: "Senior-Learning-Development-Specialist",
      title: "Senior Learning & Development Specialist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Learning-Development-Specialist",
      description: "<p>The Senior Learning & Development Specialist is a fully remote position at Zenith Global Innovation specializing in learning strategy, training programs, skills development, facilitation and learning measurement. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to learning strategy, training programs, skills development, facilitation and learning measurement into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Learning & Development Specialist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-30T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 9e4,
          maxValue: 175e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "learning strategy, training programs, skills development, facilitation and learning measurement",
      metaDescription: "Remote Senior Learning & Development Specialist ($90,000\u2013$175,000/yr) focused on learning strategy, training programs and skills development. Apply directly."
    },
    {
      slug: "Employee-Experience-Manager",
      title: "Employee Experience Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Employee-Experience-Manager",
      description: "<p>The Employee Experience Manager is a fully remote position at Zenith Global Innovation specializing in employee journey, engagement programs, workplace culture, feedback and retention initiatives. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to employee journey, engagement programs, workplace culture, feedback and retention initiatives into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Employee Experience Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-04T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 9e4,
          maxValue: 175e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "employee journey, engagement programs, workplace culture, feedback and retention initiatives",
      metaDescription: "Remote Employee Experience Manager ($90,000\u2013$175,000/yr) focused on employee journey, engagement programs, workplace culture and feedback. Apply directly."
    },
    {
      slug: "Workforce-Analytics-Lead",
      title: "Workforce Analytics Lead",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Workforce-Analytics-Lead",
      description: "<p>The Workforce Analytics Lead is a fully remote position at Zenith Global Innovation specializing in people analytics, workforce planning, reporting, forecasting and evidence-based talent decisions. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to people analytics, workforce planning, reporting, forecasting and evidence-based talent decisions into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Workforce Analytics Lead or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-25T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 9e4,
          maxValue: 175e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "people analytics, workforce planning, reporting, forecasting and evidence-based talent decisions",
      metaDescription: "Remote Workforce Analytics Lead ($90,000\u2013$175,000/yr) focused on people analytics, workforce planning, reporting and forecasting. Apply directly."
    },
    {
      slug: "Senior-Management-Consultant",
      title: "Senior Management Consultant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Management-Consultant",
      description: "<p>The Senior Management Consultant is a fully remote position at Zenith Global Innovation specializing in executive advisory, business analysis, strategic recommendations and transformation execution. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to executive advisory, business analysis, strategic recommendations and transformation execution into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Management Consultant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-15T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "CONTRACT",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 11e4,
          maxValue: 25e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "executive advisory, business analysis, strategic recommendations and transformation execution",
      metaDescription: "Remote Senior Management Consultant ($110,000\u2013$250,000/yr) focused on executive advisory, business analysis and strategic recommendations. Apply directly."
    },
    {
      slug: "Digital-Transformation-Consultant",
      title: "Digital Transformation Consultant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Digital-Transformation-Consultant",
      description: "<p>The Digital Transformation Consultant is a fully remote position at Zenith Global Innovation specializing in digital operating models, technology-enabled process redesign, adoption and transformation roadmaps. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to digital operating models, technology-enabled process redesign, adoption and transformation roadmaps into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Digital Transformation Consultant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-05T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "CONTRACT",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 11e4,
          maxValue: 25e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "digital operating models, technology-enabled process redesign, adoption and transformation roadmaps",
      metaDescription: "Remote Digital Transformation Consultant ($110,000\u2013$250,000/yr) focused on digital operating models and technology-enabled process redesign. Apply directly."
    },
    {
      slug: "Process-Improvement-Specialist",
      title: "Process Improvement Specialist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Process-Improvement-Specialist",
      description: "<p>The Process Improvement Specialist is a fully remote position at Zenith Global Innovation specializing in process mapping, root-cause analysis, workflow redesign, lean improvement and measurable efficiency. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to process mapping, root-cause analysis, workflow redesign, lean improvement and measurable efficiency into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Process Improvement Specialist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-09T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "CONTRACT",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 11e4,
          maxValue: 25e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "process mapping, root-cause analysis, workflow redesign, lean improvement and measurable efficiency",
      metaDescription: "Remote Process Improvement Specialist ($110,000\u2013$250,000/yr) focused on process mapping, root-cause analysis and workflow redesign. Apply directly."
    },
    {
      slug: "Senior-Business-Analyst",
      title: "Senior Business Analyst",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Business-Analyst",
      description: "<p>The Senior Business Analyst is a fully remote position at Zenith Global Innovation specializing in business requirements, process analysis, stakeholder discovery, solution definition and delivery support. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to business requirements, process analysis, stakeholder discovery, solution definition and delivery support into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Business Analyst or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "CONTRACT",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 11e4,
          maxValue: 25e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "business requirements, process analysis, stakeholder discovery, solution definition and delivery support",
      metaDescription: "Remote Senior Business Analyst ($110,000\u2013$250,000/yr) focused on business requirements, process analysis and stakeholder discovery. Apply directly."
    },
    {
      slug: "IT-Strategy-Consultant",
      title: "IT Strategy Consultant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/IT-Strategy-Consultant",
      description: "<p>The IT Strategy Consultant is a fully remote position at Zenith Global Innovation specializing in technology roadmaps, IT operating models, investment priorities, governance and business alignment. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to technology roadmaps, IT operating models, investment priorities, governance and business alignment into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in IT Strategy Consultant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-04T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "CONTRACT",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 11e4,
          maxValue: 25e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "technology roadmaps, IT operating models, investment priorities, governance and business alignment",
      metaDescription: "Remote IT Strategy Consultant ($110,000\u2013$250,000/yr) focused on technology roadmaps, IT operating models, investment priorities and governance. Apply directly."
    },
    {
      slug: "Customer-Experience-Consultant",
      title: "Customer Experience Consultant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Customer-Experience-Consultant",
      description: "<p>The Customer Experience Consultant is a fully remote position at Zenith Global Innovation specializing in customer journey design, service improvement, voice-of-customer insight and experience strategy. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to customer journey design, service improvement, voice-of-customer insight and experience strategy into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Customer Experience Consultant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-25T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "CONTRACT",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 11e4,
          maxValue: 25e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "customer journey design, service improvement, voice-of-customer insight and experience strategy",
      metaDescription: "Remote Customer Experience Consultant ($110,000\u2013$250,000/yr) focused on customer journey design and service improvement. Apply directly."
    },
    {
      slug: "Supply-Chain-Optimization-Expert",
      title: "Supply Chain Optimization Expert",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Supply-Chain-Optimization-Expert",
      description: "<p>The Supply Chain Optimization Expert is a fully remote position at Zenith Global Innovation specializing in supply chain performance, planning, procurement flows, inventory and operational optimization. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to supply chain performance, planning, procurement flows, inventory and operational optimization into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Supply Chain Optimization Expert or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-15T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "CONTRACT",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 11e4,
          maxValue: 25e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "supply chain performance, planning, procurement flows, inventory and operational optimization",
      metaDescription: "Remote Supply Chain Optimization Expert ($110,000\u2013$250,000/yr) focused on supply chain performance, planning, procurement flows and inventory. Apply directly."
    },
    {
      slug: "Senior-Data-Privacy-Consultant",
      title: "Senior Data Privacy Consultant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Data-Privacy-Consultant",
      description: "<p>The Senior Data Privacy Consultant is a fully remote position at Zenith Global Innovation specializing in privacy governance, data protection programs, risk assessments, controls and regulatory readiness. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to privacy governance, data protection programs, risk assessments, controls and regulatory readiness into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Data Privacy Consultant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-05T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "CONTRACT",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 11e4,
          maxValue: 25e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "privacy governance, data protection programs, risk assessments, controls and regulatory readiness",
      metaDescription: "Remote Senior Data Privacy Consultant ($110,000\u2013$250,000/yr) focused on privacy governance, data protection programs and risk assessments. Apply directly."
    },
    {
      slug: "Senior-Account-Manager",
      title: "Senior Account Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Account-Manager",
      description: "<p>The Senior Account Manager is a fully remote position at Zenith Global Innovation specializing in strategic account ownership, client retention, expansion opportunities and executive relationship management. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to strategic account ownership, client retention, expansion opportunities and executive relationship management into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Account Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 18e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "strategic account ownership, client retention, expansion opportunities and executive relationship management",
      metaDescription: "Remote Senior Account Manager ($85,000\u2013$180,000/yr) focused on strategic account ownership, client retention and expansion opportunities. Apply directly."
    },
    {
      slug: "Customer-Success-Director",
      title: "Customer Success Director",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Customer-Success-Director",
      description: "<p>The Customer Success Director is a fully remote position at Zenith Global Innovation specializing in customer outcomes, retention strategy, adoption, renewal performance and success team leadership. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to customer outcomes, retention strategy, adoption, renewal performance and success team leadership into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Customer Success Director or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 18e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "customer outcomes, retention strategy, adoption, renewal performance and success team leadership",
      metaDescription: "Remote Customer Success Director ($85,000\u2013$180,000/yr) focused on customer outcomes, retention strategy, adoption and renewal performance. Apply directly."
    },
    {
      slug: "Senior-Sales-Strategist",
      title: "Senior Sales Strategist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Sales-Strategist",
      description: "<p>The Senior Sales Strategist is a fully remote position at Zenith Global Innovation specializing in sales strategy, segmentation, pipeline performance, consultative selling and revenue planning. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to sales strategy, segmentation, pipeline performance, consultative selling and revenue planning into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Sales Strategist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-04T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 18e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "sales strategy, segmentation, pipeline performance, consultative selling and revenue planning",
      metaDescription: "Remote Senior Sales Strategist ($85,000\u2013$180,000/yr) focused on sales strategy, segmentation, pipeline performance and consultative selling. Apply directly."
    },
    {
      slug: "Key-Account-Manager",
      title: "Key Account Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Key-Account-Manager",
      description: "<p>The Key Account Manager is a fully remote position at Zenith Global Innovation specializing in high-value account planning, relationship development, commercial growth and client satisfaction. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to high-value account planning, relationship development, commercial growth and client satisfaction into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Key Account Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-25T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 18e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "high-value account planning, relationship development, commercial growth and client satisfaction",
      metaDescription: "Remote Key Account Manager ($85,000\u2013$180,000/yr) focused on high-value account planning, relationship development and commercial growth. Apply directly."
    },
    {
      slug: "Client-Relationship-Manager",
      title: "Client Relationship Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Client-Relationship-Manager",
      description: "<p>The Client Relationship Manager is a fully remote position at Zenith Global Innovation specializing in client partnership, service coordination, issue resolution and relationship health. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to client partnership, service coordination, issue resolution and relationship health into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Client Relationship Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-15T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 18e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "client partnership, service coordination, issue resolution and relationship health",
      metaDescription: "Remote Client Relationship Manager ($85,000\u2013$180,000/yr) focused on client partnership, service coordination and issue resolution. Apply directly."
    },
    {
      slug: "Senior-Business-Development-Manager",
      title: "Senior Business Development Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Business-Development-Manager",
      description: "<p>The Senior Business Development Manager is a fully remote position at Zenith Global Innovation specializing in prospecting, enterprise opportunities, partnerships, proposals and revenue growth. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to prospecting, enterprise opportunities, partnerships, proposals and revenue growth into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Business Development Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 18e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "prospecting, enterprise opportunities, partnerships, proposals and revenue growth",
      metaDescription: "Remote Senior Business Development Manager ($85,000\u2013$180,000/yr) focused on prospecting, enterprise opportunities, partnerships and proposals. Apply directly."
    },
    {
      slug: "Sales-Operations-Lead",
      title: "Sales Operations Lead",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Sales-Operations-Lead",
      description: "<p>The Sales Operations Lead is a fully remote position at Zenith Global Innovation specializing in sales processes, CRM discipline, forecasting, performance analytics and commercial enablement. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to sales processes, CRM discipline, forecasting, performance analytics and commercial enablement into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Sales Operations Lead or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 18e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "sales processes, CRM discipline, forecasting, performance analytics and commercial enablement",
      metaDescription: "Remote Sales Operations Lead ($85,000\u2013$180,000/yr) focused on sales processes, CRM discipline, forecasting and performance analytics. Apply directly."
    },
    {
      slug: "Senior-Research-Analyst",
      title: "Senior Research Analyst",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Research-Analyst",
      description: "<p>The Senior Research Analyst is a fully remote position at Zenith Global Innovation specializing in structured research, market intelligence, data analysis, evidence synthesis and executive-ready insights. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to structured research, market intelligence, data analysis, evidence synthesis and executive-ready insights into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Research Analyst or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 19e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "structured research, market intelligence, data analysis, evidence synthesis and executive-ready insights",
      metaDescription: "Remote Senior Research Analyst ($95,000\u2013$190,000/yr) focused on structured research, market intelligence, data analysis and evidence synthesis. Apply directly."
    },
    {
      slug: "Corporate-Trainer",
      title: "Corporate Trainer",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Corporate-Trainer",
      description: "<p>The Corporate Trainer is a fully remote position at Zenith Global Innovation specializing in professional training design, facilitation, curriculum development and measurable capability improvement. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to professional training design, facilitation, curriculum development and measurable capability improvement into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Corporate Trainer or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-04T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 19e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "professional training design, facilitation, curriculum development and measurable capability improvement",
      metaDescription: "Remote Corporate Trainer ($95,000\u2013$190,000/yr) focused on professional training design, facilitation and curriculum development. Apply directly."
    },
    {
      slug: "Senior-Legal-Counsel",
      title: "Senior Legal Counsel",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Legal-Counsel",
      description: "<p>The Senior Legal Counsel is a fully remote position at Zenith Global Innovation specializing in commercial legal advice, contract review, legal risk management and business-facing counsel. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to commercial legal advice, contract review, legal risk management and business-facing counsel into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Legal Counsel or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-25T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 19e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "commercial legal advice, contract review, legal risk management and business-facing counsel",
      metaDescription: "Remote Senior Legal Counsel ($95,000\u2013$190,000/yr) focused on commercial legal advice, contract review and legal risk management. Apply directly."
    },
    {
      slug: "Senior-Procurement-Specialist",
      title: "Senior Procurement Specialist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Procurement-Specialist",
      description: "<p>The Senior Procurement Specialist is a fully remote position at Zenith Global Innovation specializing in supplier sourcing, procurement processes, negotiation, vendor performance and cost management. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to supplier sourcing, procurement processes, negotiation, vendor performance and cost management into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Procurement Specialist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-30T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 19e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "supplier sourcing, procurement processes, negotiation, vendor performance and cost management",
      metaDescription: "Remote Senior Procurement Specialist ($95,000\u2013$190,000/yr) focused on supplier sourcing, procurement processes and negotiation. Apply directly."
    },
    {
      slug: "Quality-Assurance-Lead",
      title: "Quality Assurance Lead",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Quality-Assurance-Lead",
      description: "<p>The Quality Assurance Lead is a fully remote position at Zenith Global Innovation specializing in quality strategy, testing standards, defect prevention, audit readiness and continuous improvement. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to quality strategy, testing standards, defect prevention, audit readiness and continuous improvement into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Quality Assurance Lead or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 19e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "quality strategy, testing standards, defect prevention, audit readiness and continuous improvement",
      metaDescription: "Remote Quality Assurance Lead ($95,000\u2013$190,000/yr) focused on quality strategy, testing standards, defect prevention and audit readiness. Apply directly."
    },
    {
      slug: "Senior-Compliance-Auditor",
      title: "Senior Compliance Auditor",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Compliance-Auditor",
      description: "<p>The Senior Compliance Auditor is a fully remote position at Zenith Global Innovation specializing in independent compliance testing, control evaluation, evidence review, findings and remediation tracking. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to independent compliance testing, control evaluation, evidence review, findings and remediation tracking into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Compliance Auditor or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 19e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "independent compliance testing, control evaluation, evidence review, findings and remediation tracking",
      metaDescription: "Remote Senior Compliance Auditor ($95,000\u2013$190,000/yr) focused on independent compliance testing, control evaluation and evidence review. Apply directly."
    },
    {
      slug: "Corporate-Communications-Manager",
      title: "Corporate Communications Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Corporate-Communications-Manager",
      description: "<p>The Corporate Communications Manager is a fully remote position at Zenith Global Innovation specializing in internal communications, corporate messaging, executive communications, reputation and stakeholder engagement. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to internal communications, corporate messaging, executive communications, reputation and stakeholder engagement into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Corporate Communications Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 19e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "internal communications, corporate messaging, executive communications, reputation and stakeholder engagement",
      metaDescription: "Remote Corporate Communications Manager ($95,000\u2013$190,000/yr) focused on internal communications and corporate messaging. Apply directly."
    },
    {
      slug: "Senior-Product-Manager",
      title: "Senior Product Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Senior-Product-Manager",
      description: "<p>The Senior Product Manager is a fully remote position at Zenith Global Innovation specializing in product strategy, roadmap ownership, customer needs, cross-functional delivery and product performance. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to product strategy, roadmap ownership, customer needs, cross-functional delivery and product performance into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Senior Product Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-04T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 95e3,
          maxValue: 19e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "product strategy, roadmap ownership, customer needs, cross-functional delivery and product performance",
      metaDescription: "Remote Senior Product Manager ($95,000\u2013$190,000/yr) focused on product strategy, roadmap ownership and customer needs. Apply directly."
    },
    {
      slug: "Virtual-Assistant",
      title: "Virtual Assistant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Virtual-Assistant",
      description: "<p>The Virtual Assistant is a fully remote position at Zenith Global Innovation specializing in calendar management, correspondence, scheduling, research, administrative coordination and remote executive support. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to calendar management, correspondence, scheduling, research, administrative coordination and remote executive support into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Virtual Assistant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-09T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 65e3,
          maxValue: 95e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "calendar management, correspondence, scheduling, research, administrative coordination and remote executive support",
      metaDescription: "Remote Virtual Assistant ($65,000\u2013$95,000/yr) focused on calendar management, correspondence, scheduling and research. Apply directly."
    },
    {
      slug: "Executive-Assistant",
      title: "Executive Assistant",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Executive-Assistant",
      description: "<p>The Executive Assistant is a fully remote position at Zenith Global Innovation specializing in high-trust executive support, complex scheduling, meeting preparation, travel coordination and confidential administration. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to high-trust executive support, complex scheduling, meeting preparation, travel coordination and confidential administration into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Executive Assistant or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-30T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 65e3,
          maxValue: 95e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "high-trust executive support, complex scheduling, meeting preparation, travel coordination and confidential administration",
      metaDescription: "Remote Executive Assistant ($65,000\u2013$95,000/yr) focused on high-trust executive support, complex scheduling and meeting preparation. Apply directly."
    },
    {
      slug: "Customer-Service-Representative",
      title: "Customer Service Representative",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Customer-Service-Representative",
      description: "<p>The Customer Service Representative is a fully remote position at Zenith Global Innovation specializing in customer inquiries, issue resolution, service quality, accurate documentation and positive customer experiences. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to customer inquiries, issue resolution, service quality, accurate documentation and positive customer experiences into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Customer Service Representative or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 65e3,
          maxValue: 95e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "customer inquiries, issue resolution, service quality, accurate documentation and positive customer experiences",
      metaDescription: "Remote Customer Service Representative ($65,000\u2013$95,000/yr) focused on customer inquiries, issue resolution and service quality. Apply directly."
    },
    {
      slug: "Data-Entry-Specialist",
      title: "Data Entry Specialist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Data-Entry-Specialist",
      description: "<p>The Data Entry Specialist is a fully remote position at Zenith Global Innovation specializing in accurate data capture, validation, record maintenance, document processing and information quality. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to accurate data capture, validation, record maintenance, document processing and information quality into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Data Entry Specialist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 65e3,
          maxValue: 95e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "accurate data capture, validation, record maintenance, document processing and information quality",
      metaDescription: "Remote Data Entry Specialist ($65,000\u2013$95,000/yr) focused on accurate data capture, validation, record maintenance and document processing. Apply directly."
    },
    {
      slug: "Social-Media-Manager",
      title: "Social Media Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Social-Media-Manager",
      description: "<p>The Social Media Manager is a fully remote position at Zenith Global Innovation specializing in social strategy, publishing, community management, campaign execution and channel performance. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to social strategy, publishing, community management, campaign execution and channel performance into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Social Media Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-14T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 75e3,
          maxValue: 11e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "social strategy, publishing, community management, campaign execution and channel performance",
      metaDescription: "Remote Social Media Manager ($75,000\u2013$110,000/yr) focused on social strategy, publishing, community management and campaign execution. Apply directly."
    },
    {
      slug: "Content-Creator",
      title: "Content Creator",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Content-Creator",
      description: "<p>The Content Creator is a fully remote position at Zenith Global Innovation specializing in original digital content, storytelling, creative production, editorial consistency and audience engagement. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to original digital content, storytelling, creative production, editorial consistency and audience engagement into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Content Creator or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-05T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 75e3,
          maxValue: 11e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "original digital content, storytelling, creative production, editorial consistency and audience engagement",
      metaDescription: "Remote Content Creator ($75,000\u2013$110,000/yr) focused on original digital content, storytelling, creative production and editorial consistency. Apply directly."
    },
    {
      slug: "SEO-Specialist",
      title: "SEO Specialist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/SEO-Specialist",
      description: "<p>The SEO Specialist is a fully remote position at Zenith Global Innovation specializing in keyword research, on-page optimization, technical improvements, content briefs and search performance. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to keyword research, on-page optimization, technical improvements, content briefs and search performance into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in SEO Specialist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-09T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 75e3,
          maxValue: 11e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "keyword research, on-page optimization, technical improvements, content briefs and search performance",
      metaDescription: "Remote SEO Specialist ($75,000\u2013$110,000/yr) focused on keyword research, on-page optimization, technical improvements and content briefs. Apply directly."
    },
    {
      slug: "Email-Marketing-Coordinator",
      title: "Email Marketing Coordinator",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Email-Marketing-Coordinator",
      description: "<p>The Email Marketing Coordinator is a fully remote position at Zenith Global Innovation specializing in email campaigns, segmentation, automation support, testing, deliverability and performance reporting. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to email campaigns, segmentation, automation support, testing, deliverability and performance reporting into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Email Marketing Coordinator or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-30T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 75e3,
          maxValue: 11e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "email campaigns, segmentation, automation support, testing, deliverability and performance reporting",
      metaDescription: "Remote Email Marketing Coordinator ($75,000\u2013$110,000/yr) focused on email campaigns, segmentation, automation support and testing. Apply directly."
    },
    {
      slug: "IT-Support-Specialist",
      title: "IT Support Specialist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/IT-Support-Specialist",
      description: "<p>The IT Support Specialist is a fully remote position at Zenith Global Innovation specializing in technical troubleshooting, user support, device and software assistance and service-desk resolution. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to technical troubleshooting, user support, device and software assistance and service-desk resolution into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in IT Support Specialist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 14e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "technical troubleshooting, user support, device and software assistance and service-desk resolution",
      metaDescription: "Remote IT Support Specialist ($85,000\u2013$140,000/yr) focused on technical troubleshooting, user support, device and software assistance. Apply directly."
    },
    {
      slug: "Junior-Developer",
      title: "Junior Developer",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Junior-Developer",
      description: "<p>The Junior Developer is a fully remote position at Zenith Global Innovation specializing in frontend or backend implementation, bug fixing, code quality, testing and supervised product delivery. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to frontend or backend implementation, bug fixing, code quality, testing and supervised product delivery into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Junior Developer or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-10T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 14e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "frontend or backend implementation, bug fixing, code quality, testing and supervised product delivery",
      metaDescription: "Remote Junior Developer ($85,000\u2013$140,000/yr) focused on frontend or backend implementation, bug fixing, code quality and testing. Apply directly."
    },
    {
      slug: "Web-Designer",
      title: "Web Designer",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Web-Designer",
      description: "<p>The Web Designer is a fully remote position at Zenith Global Innovation specializing in responsive web interfaces, visual design, usability, accessibility and design-to-development handoff. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to responsive web interfaces, visual design, usability, accessibility and design-to-development handoff into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Web Designer or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-15T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 14e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "responsive web interfaces, visual design, usability, accessibility and design-to-development handoff",
      metaDescription: "Remote Web Designer ($85,000\u2013$140,000/yr) focused on responsive web interfaces, visual design, usability and accessibility. Apply directly."
    },
    {
      slug: "Digital-Project-Manager",
      title: "Digital Project Manager",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Digital-Project-Manager",
      description: "<p>The Digital Project Manager is a fully remote position at Zenith Global Innovation specializing in digital project coordination, timelines, requirements, vendors, stakeholder communication and delivery quality. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to digital project coordination, timelines, requirements, vendors, stakeholder communication and delivery quality into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Digital Project Manager or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-05T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 85e3,
          maxValue: 14e4,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "digital project coordination, timelines, requirements, vendors, stakeholder communication and delivery quality",
      metaDescription: "Remote Digital Project Manager ($85,000\u2013$140,000/yr) focused on digital project coordination, timelines, requirements and vendors. Apply directly."
    },
    {
      slug: "Bookkeeper",
      title: "Bookkeeper",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Bookkeeper",
      description: "<p>The Bookkeeper is a fully remote position at Zenith Global Innovation specializing in transaction recording, reconciliations, ledger accuracy and routine financial reporting. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to transaction recording, reconciliations, ledger accuracy and routine financial reporting into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Bookkeeper or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-11-09T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 8e4,
          maxValue: 135e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "transaction recording, reconciliations, ledger accuracy and routine financial reporting",
      metaDescription: "Remote Bookkeeper ($80,000\u2013$135,000/yr) focused on transaction recording, reconciliations, ledger accuracy and routine financial reporting. Apply directly."
    },
    {
      slug: "Payroll-Administrator",
      title: "Payroll Administrator",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Payroll-Administrator",
      description: "<p>The Payroll Administrator is a fully remote position at Zenith Global Innovation specializing in payroll preparation, employee records, deductions, compliance checks and payroll issue resolution. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to payroll preparation, employee records, deductions, compliance checks and payroll issue resolution into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Payroll Administrator or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-30T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 8e4,
          maxValue: 135e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "payroll preparation, employee records, deductions, compliance checks and payroll issue resolution",
      metaDescription: "Remote Payroll Administrator ($80,000\u2013$135,000/yr) focused on payroll preparation, employee records, deductions and compliance checks. Apply directly."
    },
    {
      slug: "Accounts-Receivable-Specialist",
      title: "Accounts Receivable Specialist",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Accounts-Receivable-Specialist",
      description: "<p>The Accounts Receivable Specialist is a fully remote position at Zenith Global Innovation specializing in invoice management, collections, payment reconciliation, aging analysis and customer account accuracy. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to invoice management, collections, payment reconciliation, aging analysis and customer account accuracy into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Accounts Receivable Specialist or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-20T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 8e4,
          maxValue: 135e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "invoice management, collections, payment reconciliation, aging analysis and customer account accuracy",
      metaDescription: "Remote Accounts Receivable Specialist ($80,000\u2013$135,000/yr) focused on invoice management, collections and payment reconciliation. Apply directly."
    },
    {
      slug: "Financial-Analyst",
      title: "Financial Analyst",
      url: "https://www.zenithglobalinnovation.com.ng/jobs/Financial-Analyst",
      description: "<p>The Financial Analyst is a fully remote position at Zenith Global Innovation specializing in financial reporting, modeling, budgeting, variance analysis and business performance insight. You will collaborate with international teams and enterprise stakeholders across multiple timezones to deliver high-impact results.</p><h3>Key Responsibilities</h3><ul><li>Translate strategic business objectives connected to financial reporting, modeling, budgeting, variance analysis and business performance insight into measurable work deliverables.</li><li>Apply specialized knowledge and professional judgment to identify risks, evaluate opportunities, and take appropriate action.</li><li>Maintain clear, dependable communication across distributed global teams and client organizations.</li><li>Ensure high operational standards, confidentiality, and data protection compliance in all deliverables.</li></ul><h3>Qualifications</h3><ul><li>Demonstrated professional experience in Financial Analyst or directly related executive functions.</li><li>Proven record of independent execution, reliability, and leadership in remote working environments.</li><li>Relevant academic qualification, professional degree, or equivalent practical industry excellence.</li><li>Strong analytical, cross-cultural communication, and problem-solving skills.</li></ul>",
      datePosted: "2026-10-25T08:00:00Z",
      validThrough: "2027-06-30T23:59:59Z",
      employmentType: "FULL_TIME",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: 8e4,
          maxValue: 135e3,
          unitText: "YEAR"
        }
      },
      applicantLocationRequirements: [
        {
          "@type": "Country",
          name: "United States"
        },
        {
          "@type": "Country",
          name: "United Kingdom"
        },
        {
          "@type": "Country",
          name: "Canada"
        },
        {
          "@type": "Country",
          name: "Singapore"
        },
        {
          "@type": "Country",
          name: "Australia"
        },
        {
          "@type": "Country",
          name: "Germany"
        },
        {
          "@type": "Country",
          name: "Ireland"
        },
        {
          "@type": "Country",
          name: "Netherlands"
        },
        {
          "@type": "Country",
          name: "Nigeria"
        },
        {
          "@type": "Country",
          name: "India"
        }
      ],
      focus: "financial reporting, modeling, budgeting, variance analysis and business performance insight",
      metaDescription: "Remote Financial Analyst ($80,000\u2013$135,000/yr) focused on financial reporting, modeling, budgeting and variance analysis. Apply directly."
    }
  ],
  acceptedCountries: [
    {
      "@type": "Country",
      name: "United States"
    },
    {
      "@type": "Country",
      name: "United Kingdom"
    },
    {
      "@type": "Country",
      name: "Canada"
    },
    {
      "@type": "Country",
      name: "Australia"
    },
    {
      "@type": "Country",
      name: "Germany"
    },
    {
      "@type": "Country",
      name: "France"
    },
    {
      "@type": "Country",
      name: "Switzerland"
    },
    {
      "@type": "Country",
      name: "Singapore"
    },
    {
      "@type": "Country",
      name: "United Arab Emirates"
    },
    {
      "@type": "Country",
      name: "Saudi Arabia"
    },
    {
      "@type": "Country",
      name: "Qatar"
    },
    {
      "@type": "Country",
      name: "Kuwait"
    },
    {
      "@type": "Country",
      name: "Bahrain"
    },
    {
      "@type": "Country",
      name: "Oman"
    },
    {
      "@type": "Country",
      name: "Jordan"
    },
    {
      "@type": "Country",
      name: "Japan"
    },
    {
      "@type": "Country",
      name: "Netherlands"
    },
    {
      "@type": "Country",
      name: "Sweden"
    },
    {
      "@type": "Country",
      name: "Norway"
    },
    {
      "@type": "Country",
      name: "Denmark"
    },
    {
      "@type": "Country",
      name: "Finland"
    },
    {
      "@type": "Country",
      name: "Belgium"
    },
    {
      "@type": "Country",
      name: "Austria"
    },
    {
      "@type": "Country",
      name: "New Zealand"
    },
    {
      "@type": "Country",
      name: "Ireland"
    },
    {
      "@type": "Country",
      name: "Luxembourg"
    },
    {
      "@type": "Country",
      name: "Liechtenstein"
    },
    {
      "@type": "Country",
      name: "Monaco"
    },
    {
      "@type": "Country",
      name: "Iceland"
    },
    {
      "@type": "Country",
      name: "Hong Kong"
    },
    {
      "@type": "Country",
      name: "Cayman Islands"
    },
    {
      "@type": "Country",
      name: "Bermuda"
    },
    {
      "@type": "Country",
      name: "Gibraltar"
    },
    {
      "@type": "Country",
      name: "Jersey"
    },
    {
      "@type": "Country",
      name: "Guernsey"
    },
    {
      "@type": "Country",
      name: "Isle of Man"
    },
    {
      "@type": "Country",
      name: "Israel"
    },
    {
      "@type": "Country",
      name: "South Korea"
    },
    {
      "@type": "Country",
      name: "Taiwan"
    },
    {
      "@type": "Country",
      name: "Italy"
    },
    {
      "@type": "Country",
      name: "Spain"
    },
    {
      "@type": "Country",
      name: "Portugal"
    },
    {
      "@type": "Country",
      name: "Malta"
    },
    {
      "@type": "Country",
      name: "Cyprus"
    },
    {
      "@type": "Country",
      name: "Estonia"
    },
    {
      "@type": "Country",
      name: "Czech Republic"
    },
    {
      "@type": "Country",
      name: "Poland"
    },
    {
      "@type": "Country",
      name: "Greece"
    },
    {
      "@type": "Country",
      name: "Hungary"
    },
    {
      "@type": "Country",
      name: "Romania"
    },
    {
      "@type": "Country",
      name: "South Africa"
    },
    {
      "@type": "Country",
      name: "Nigeria"
    },
    {
      "@type": "Country",
      name: "Kenya"
    },
    {
      "@type": "Country",
      name: "Ghana"
    },
    {
      "@type": "Country",
      name: "Egypt"
    },
    {
      "@type": "Country",
      name: "Brazil"
    },
    {
      "@type": "Country",
      name: "Mexico"
    },
    {
      "@type": "Country",
      name: "Argentina"
    },
    {
      "@type": "Country",
      name: "Chile"
    },
    {
      "@type": "Country",
      name: "Colombia"
    },
    {
      "@type": "Country",
      name: "India"
    },
    {
      "@type": "Country",
      name: "Pakistan"
    },
    {
      "@type": "Country",
      name: "Philippines"
    },
    {
      "@type": "Country",
      name: "Malaysia"
    },
    {
      "@type": "Country",
      name: "Indonesia"
    },
    {
      "@type": "Country",
      name: "Thailand"
    },
    {
      "@type": "Country",
      name: "Vietnam"
    },
    {
      "@type": "Country",
      name: "Turkey"
    }
  ]
};

// backend/builtAssets.json
var builtAssets_default = {
  cssHrefs: [
    "/assets/index-BQDFU4VC.css",
    "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  ],
  jsSrcs: [
    "/assets/index-L9xX2-gB.js"
  ]
};

// backend/seoJobs.ts
var allJobs = seoJobsData_default.jobs || [];
var organizationNode = seoJobsData_default.organization || {};
var websiteNode = seoJobsData_default.website || {};
function normalizeSlug(input) {
  return String(input || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function escapeHtml(text) {
  return String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function findSeoJob(rawQuery) {
  if (!rawQuery) return void 0;
  const clean = normalizeSlug(rawQuery);
  if (!clean) return void 0;
  const exact = allJobs.find(
    (j) => normalizeSlug(j.slug) === clean || normalizeSlug(j.title) === clean
  );
  if (exact) return exact;
  const suffixMatches = allJobs.filter((j) => {
    const s = normalizeSlug(j.slug);
    return clean.endsWith(`-${s}`);
  }).sort((a, b) => b.slug.length - a.slug.length);
  if (suffixMatches.length > 0) return suffixMatches[0];
  return allJobs.find((j) => {
    const s = normalizeSlug(j.slug);
    return clean.includes(s) || s.includes(clean);
  });
}
function renderJobDetailHtml(job, options) {
  const canonicalUrl = `https://www.zenithglobalinnovation.com.ng/jobs/${encodeURIComponent(job.slug)}`;
  const minPay = job.baseSalary?.value?.minValue ?? 85e3;
  const maxPay = job.baseSalary?.value?.maxValue ?? 18e4;
  const salaryFormatted = `$${minPay.toLocaleString()}\u2013$${maxPay.toLocaleString()} USD/yr`;
  const empTypeLabel = job.employmentType === "CONTRACTOR" ? "Contract \xB7 100% Remote" : "Full-time \xB7 100% Remote";
  const pageTitle = `${job.title} \u2013 Remote (${salaryFormatted}) | Zenith Global Innovation`;
  const metaDesc = job.metaDescription || `Remote ${job.title} (${salaryFormatted}, ${empTypeLabel}) focused on ${job.focus || "high-impact global delivery"}. Apply directly at Zenith Global Innovation.`;
  const jobPostingNode = {
    "@type": "JobPosting",
    "@id": `${canonicalUrl}#jobposting`,
    title: job.title,
    url: canonicalUrl,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      "@id": "https://www.zenithglobalinnovation.com.ng/#organization",
      name: "Zenith Global Innovation",
      sameAs: "https://www.zenithglobalinnovation.com.ng"
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: seoJobsData_default.acceptedCountries && seoJobsData_default.acceptedCountries.length > 0 ? seoJobsData_default.acceptedCountries : job.applicantLocationRequirements,
    baseSalary: job.baseSalary,
    directApply: true,
    identifier: {
      "@type": "PropertyValue",
      name: "Zenith Global Innovation",
      value: job.slug
    }
  };
  const graphPayload = {
    "@context": "https://schema.org",
    "@graph": [organizationNode, websiteNode, jobPostingNode]
  };
  const assets = builtAssets_default;
  const cssTags = (assets.cssHrefs || []).map((href) => `<link rel="stylesheet" crossorigin href="${escapeHtml(href)}">`).join("\n    ");
  const jsTags = options?.isDev ? `<script type="module" src="/src/main.tsx"></script>` : assets.jsSrcs && assets.jsSrcs.length > 0 ? assets.jsSrcs.map((src) => `<script type="module" crossorigin src="${escapeHtml(src)}"></script>`).join("\n    ") : `<script type="module" src="/src/main.tsx"></script>`;
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

    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

    <!-- OpenGraph Metadata -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:site_name" content="Zenith Global Innovation" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(metaDesc)}" />

    <!-- Twitter / X Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />

    <!-- Single-Job Google for Jobs JSON-LD Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(graphPayload, null, 2)}
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    ${cssTags}
  </head>
  <body>
    <div id="root">
      <header style="padding: 20px; background: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 960px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <a href="https://www.zenithglobalinnovation.com.ng/" style="font-size: 20px; font-weight: 800; color: #10243e; text-decoration: none;">ZENITH GLOBAL INNOVATION</a>
            <p style="font-size: 12px; color: #64748b; margin: 3px 0 0;">Connecting Talent Across Continents \xB7 Established 2019</p>
          </div>
          <a href="https://www.zenithglobalinnovation.com.ng/" style="color: #2563eb; font-weight: 700; font-size: 13px; text-decoration: none;">\u2190 Browse All 81 Open Roles</a>
        </div>
      </header>

      <main style="max-width: 960px; margin: 0 auto; padding: 36px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a;">
        <div style="margin-bottom: 12px; font-size: 12px; font-weight: 700; color: #2563eb; text-transform: uppercase;">
          ${escapeHtml(empTypeLabel)} \xB7 Posted ${escapeHtml(postedDateDisplay)}
        </div>
        <h1 style="font-size: 32px; font-weight: 800; margin: 0 0 14px; color: #0f172a;">
          ${escapeHtml(job.title)}
        </h1>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
          <strong style="color: #1e3a8a; font-size: 18px;">Compensation: ${escapeHtml(salaryFormatted)}</strong>
          <div style="font-size: 13px; color: #334155; margin-top: 4px;">
            100% Remote (Telecommute) \xB7 Direct Application Enabled \xB7 Assessment Response in 3\u20135 Business Days
          </div>
        </div>

        <article style="font-size: 15px; line-height: 1.7; color: #334155;">
          ${job.description}
        </article>

        <section style="margin-top: 32px; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Verified Employer &amp; Global Hubs</h2>
          <p style="margin: 0 0 10px; font-size: 13px; color: #475569;">
            Google Cloud Partner Verified \xB7 Meta Verified Business \xB7 BBB Accredited Business (A+ Rating) \xB7 256-Bit SSL Encrypted Intake
          </p>
          <p style="margin: 0; font-size: 12.5px; color: #64748b;">
            Offices: New York (245 West 29th Street, 1350 Avenue of the Americas, 400 Park Avenue South) \xB7 London (82 Great Eastern Street, 152 City Road) \xB7 Singapore (10 Marina Boulevard, 1 Raffles Place) \xB7 Toronto (88 Queen's Quay West, 199 Bay Street)
          </p>
        </section>
      </main>
    </div>
    ${jsTags}
  </body>
</html>`;
}

// backend/serverless.ts
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
app.use((req, res, next) => {
  if (req.originalUrl && (req.url === "/api" || req.url === "/api/index" || req.url === "/api/index.js")) {
    req.url = req.originalUrl;
  }
  next();
});
app.get(["/sitemap.xml", "/api/sitemap.xml"], (_req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  try {
    const fs4 = __require("fs");
    const path5 = __require("path");
    const candidates = [
      path5.join(process.cwd(), "dist", "sitemap.xml"),
      path5.join(process.cwd(), "public", "sitemap.xml"),
      path5.join(__dirname, "..", "public", "sitemap.xml"),
      path5.join(__dirname, "..", "dist", "sitemap.xml")
    ];
    for (const p of candidates) {
      if (fs4.existsSync(p)) {
        return res.send(fs4.readFileSync(p, "utf-8"));
      }
    }
  } catch {
  }
  res.sendFile("sitemap.xml", { root: "./public" });
});
app.get(["/robots.txt", "/api/robots.txt"], (_req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send("User-agent: *\nAllow: /\n\nSitemap: https://www.zenithglobalinnovation.com.ng/sitemap.xml\n");
});
app.get(["/", "/jobs/:slug", "/api/job-page"], (req, res, next) => {
  const rawJob = String(req.params?.slug || req.query?.job || "").trim();
  if (!rawJob) {
    return next();
  }
  const matched = findSeoJob(rawJob);
  if (!matched) {
    return next();
  }
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=3600");
  res.status(200).send(renderJobDetailHtml(matched));
});
app.get("/api/ping", (_req, res) => {
  const hasKv = Boolean(process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL);
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  res.json({
    ok: true,
    status: "operational",
    cloudStorage: hasKv ? "Upstash Redis Connected" : "Local Fallback",
    emailEngine: hasResend ? "Resend Active" : "Email Unconfigured",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.get("/ping", (_req, res) => {
  const hasKv = Boolean(process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL);
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  res.json({
    ok: true,
    status: "operational",
    cloudStorage: hasKv ? "Upstash Redis Connected" : "Local Fallback",
    emailEngine: hasResend ? "Resend Active" : "Email Unconfigured",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.use("/api", apiRouter);
app.use("/api/index", apiRouter);
app.use("/", apiRouter);
app.use((req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl
  });
});
app.use((err, _req, res, _next) => {
  console.error("[SERVERLESS API ERROR]", err);
  if (!res.headersSent) {
    res.status(500).json({ message: err?.message || "Internal Server Error" });
  }
});
var serverless_default = app;
export {
  serverless_default as default
};
