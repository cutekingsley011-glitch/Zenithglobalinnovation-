import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DatabaseSchema {
  applications: Array<Record<string, any>>;
  jobs: Array<Record<string, any>>;
  admin_audit: Array<Record<string, any>>;
  leads: Array<Record<string, any>>;
  job_alerts: Array<Record<string, any>>;
  admin_sessions: Array<Record<string, any>>;
  [key: string]: Array<Record<string, any>>;
}

const defaultSchema: DatabaseSchema = {
  applications: [],
  jobs: [],
  admin_audit: [],
  leads: [],
  job_alerts: [],
  admin_sessions: [],
};

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeDb(defaultSchema);
      return { ...defaultSchema };
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return { ...defaultSchema, ...parsed };
  } catch (err) {
    console.error('Error reading database, resetting to default structure:', err);
    return { ...defaultSchema };
  }
}

function writeDb(data: DatabaseSchema): void {
  const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
  try {
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    if (fs.existsSync(tmpFile)) {
      try { fs.unlinkSync(tmpFile); } catch {}
    }
    throw err;
  }
}

// Generate simple unique IDs
function generateId(prefix = 'rec'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}

export const db = {
  async list<T = Record<string, any>>(collection: string, options?: { limit?: number }): Promise<{ items: T[] }> {
    const data = readDb();
    const items = (data[collection] || []) as T[];
    const limit = options?.limit || 1000;
    return { items: items.slice(0, limit) };
  },

  async get<T = Record<string, any>>(collection: string, ids: string[]): Promise<T[]> {
    const data = readDb();
    const items = (data[collection] || []) as Array<Record<string, any>>;
    const idSet = new Set(ids.map(String));
    const found = items.filter(item => idSet.has(String(item.id)));
    return found as T[];
  },

  async add<T = Record<string, any>>(collection: string, records: T[]): Promise<string[]> {
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
    return generatedIds;
  },

  async update<T = Record<string, any>>(
    collection: string,
    updates: Array<{ id: string; record: Partial<T> }>
  ): Promise<boolean[]> {
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
