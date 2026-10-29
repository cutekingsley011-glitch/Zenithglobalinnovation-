import fs from 'fs';
import path from 'path';
import seedDb from '../data/db.json';

const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isVercel ? '/tmp' : path.resolve(process.cwd(), 'data');
const DB_FILE = isVercel ? path.join('/tmp', 'db.json') : path.join(DATA_DIR, 'db.json');

// Ensure directory exists without crashing on read-only serverless filesystems
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch {}

interface DatabaseSchema {
  applications: Array<Record<string, any>>;
  jobs: Array<Record<string, any>>;
  admin_audit: Array<Record<string, any>>;
  leads: Array<Record<string, any>>;
  job_alerts: Array<Record<string, any>>;
  admin_sessions: Array<Record<string, any>>;
  admin_security: Array<Record<string, any>>;
  [key: string]: Array<Record<string, any>>;
}

const defaultSchema: DatabaseSchema = {
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
  ],
};

// In-memory store embedded with seed database so reads never fail
let inMemoryStore: DatabaseSchema = {
  ...defaultSchema,
  ...(seedDb as any),
};

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function syncFromCloudKV(): Promise<void> {
  if (!KV_URL || !KV_TOKEN) return;
  try {
    const res = await fetch(`${KV_URL}/get/zenith_global_db`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    if (res.ok) {
      const json: any = await res.json();
      if (json && json.result) {
        let parsed = json.result;
        while (typeof parsed === 'string') {
          try {
            parsed = JSON.parse(parsed);
          } catch {
            break;
          }
        }
        if (parsed && typeof parsed === 'object') {
          inMemoryStore = {
            ...inMemoryStore,
            ...parsed,
            applications: Array.isArray(parsed.applications) ? parsed.applications : inMemoryStore.applications,
            admin_sessions: Array.isArray(parsed.admin_sessions) ? parsed.admin_sessions : inMemoryStore.admin_sessions,
            leads: Array.isArray(parsed.leads) ? parsed.leads : inMemoryStore.leads,
          };
          try {
            fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryStore, null, 2), 'utf-8');
          } catch {}
        }
      }
    }
  } catch (err) {
    console.warn('[CLOUD KV SYNC ERROR]', err);
  }
}

async function syncToCloudKV(data: DatabaseSchema): Promise<void> {
  if (!KV_URL || !KV_TOKEN) return;
  try {
    await fetch(`${KV_URL}/set/zenith_global_db`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.warn('[CLOUD KV WRITE ERROR]', err);
  }
}

function readDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        const memoryApps = inMemoryStore.applications || [];
        const diskApps = parsed.applications || [];
        inMemoryStore = {
          ...defaultSchema,
          ...parsed,
          ...inMemoryStore,
          applications: memoryApps.length >= diskApps.length ? memoryApps : diskApps,
        };
      }
    }
  } catch {}
  return inMemoryStore;
}

function writeDb(data: DatabaseSchema): void {
  inMemoryStore = data;
  try {
    const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch {}
}

// Generate simple unique IDs
function generateId(prefix = 'rec'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}

export const db = {
  async list<T = Record<string, any>>(collection: string, options?: { limit?: number }): Promise<{ items: T[] }> {
    await syncFromCloudKV();
    const data = readDb();
    const items = (data[collection] || []) as T[];
    const limit = options?.limit || 1000;
    return { items: items.slice(0, limit) };
  },

  async get<T = Record<string, any>>(collection: string, ids: string[]): Promise<T[]> {
    await syncFromCloudKV();
    const data = readDb();
    const items = (data[collection] || []) as Array<Record<string, any>>;
    const idSet = new Set(ids.map(String));
    const found = items.filter(item => idSet.has(String(item.id)));
    return found as T[];
  },

  async add<T = Record<string, any>>(collection: string, records: T[]): Promise<string[]> {
    await syncFromCloudKV();
    const data = readDb();
    if (!data[collection]) {
      data[collection] = [];
    }
    const generatedIds: string[] = [];
    for (const record of records) {
      const rec = record as Record<string, any>;
      const id = rec.id || generateId(collection.slice(0, 3));
      const newRecord = { ...rec, id };
      data[collection].unshift(newRecord);
      generatedIds.push(id);
    }
    writeDb(data);
    syncToCloudKV(data).catch(() => {});
    return generatedIds;
  },

  async update<T = Record<string, any>>(
    collection: string,
    updates: Array<{ id: string; record: Partial<T> }>
  ): Promise<boolean[]> {
    await syncFromCloudKV();
    const data = readDb();
    const items = (data[collection] || []) as Array<Record<string, any>>;
    const results: boolean[] = [];

    for (const { id, record } of updates) {
      const index = items.findIndex(item => String(item.id) === String(id));
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
      syncToCloudKV(data).catch(() => {});
    }
    return results;
  },

  async delete(collection: string, ids: string[]): Promise<boolean[]> {
    const data = readDb();
    const items = (data[collection] || []) as Array<Record<string, any>>;
    const idSet = new Set(ids.map(String));
    const initialLength = items.length;
    data[collection] = items.filter(item => !idSet.has(String(item.id)));
    const deletedCount = initialLength - data[collection].length;
    if (deletedCount > 0) {
      writeDb(data);
    }
    return ids.map(id => idSet.has(id));
  }
};
