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
      emailError: 'Brevo rejected confirmation email (HTTP 401): {"message":"Key not found","code":"unauthorized"}\n',
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
      emailError: 'Brevo rejected confirmation email (HTTP 401): {"message":"Key not found","code":"unauthorized"}\n',
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
      emailError: 'Brevo rejected confirmation email (HTTP 401): {"message":"We have detected you are using an unrecognised IP address 34.34.246.77. If you performed this action make sure to add the new IP address in this link: https://app.brevo.com/security/authorised_ips","code":"unauthorized"}\n',
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
      emailError: 'Brevo rejected confirmation email (HTTP 401): {"message":"We have detected you are using an unrecognised IP address 34.34.246.77. If you performed this action make sure to add the new IP address in this link: https://app.brevo.com/security/authorised_ips","code":"unauthorized"}\n',
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
        const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
        if (parsed && typeof parsed === "object") {
          inMemoryStore = {
            ...inMemoryStore,
            ...parsed,
            applications: Array.isArray(parsed.applications) ? parsed.applications : inMemoryStore.applications,
            admin_sessions: Array.isArray(parsed.admin_sessions) ? parsed.admin_sessions : inMemoryStore.admin_sessions,
            leads: Array.isArray(parsed.leads) ? parsed.leads : inMemoryStore.leads
          };
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
      body: JSON.stringify(JSON.stringify(data))
    });
  } catch (err) {
    console.warn("[CLOUD KV WRITE ERROR]", err);
  }
}
function readDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      inMemoryStore = { ...inMemoryStore, ...parsed };
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
        console.warn(`[BREVO REJECTED] HTTP ${response.status}: ${detail.slice(0, 250)}`);
        return { success: false, provider: "Brevo", error: `Brevo error (HTTP ${response.status}): ${detail.slice(0, 200)}` };
      }
    } catch (err) {
      return { success: false, provider: "Brevo", error: err?.message || "Brevo network error" };
    }
  }
  return {
    success: false,
    provider: "None",
    error: "No active email provider configured (configure RESEND_API_KEY or BREVO_API_KEY)"
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
        console.warn(`[CONFIRMATION EMAIL FAILED] ${emailError}`);
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
