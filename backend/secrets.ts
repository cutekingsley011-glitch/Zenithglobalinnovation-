import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export const secrets = {
  async readSecret(key: string): Promise<string> {
    // 1. Check local .env file first so configured keys override container defaults
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const parsed = dotenv.parse(fs.readFileSync(envPath, 'utf8'));
        if (parsed[key] && parsed[key].trim() !== '') {
          process.env[key] = parsed[key].trim();
          return parsed[key].trim();
        }
      }
    } catch {}

    // 2. Check in-memory process.env
    const val = process.env[key];
    if (val && val.trim() !== '') {
      return val.trim();
    }

    if (key === 'ZENITH_ADMIN_PASSWORD') {
      const p = process.env.ZENITH_ADMIN_PASSWORD;
      if (p && p.trim() !== '') return p.trim();
      return '';
    }

    if (key === 'RESEND_API_KEY') {
      const r = process.env.RESEND_API_KEY;
      if (r && r.trim() !== '') return r.trim();
      return '';
    }

    if (key === 'BREVO_API_KEY') {
      const b = process.env.BREVO_API_KEY;
      if (b && b.trim() !== '') return b.trim();
      return '';
    }

    throw new Error(`Secret ${key} is not configured`);
  },

  async writeSecret(key: string, value: string): Promise<void> {
    const trimmed = value.trim();
    process.env[key] = trimmed;

    try {
      const envPath = path.resolve(process.cwd(), '.env');
      let lines: string[] = [];
      if (fs.existsSync(envPath)) {
        lines = fs.readFileSync(envPath, 'utf8').split('\n');
      }

      let found = false;
      const updatedLines = lines.map(line => {
        if (line.startsWith(`${key}=`)) {
          found = true;
          return `${key}="${trimmed}"`;
        }
        return line;
      });

      if (!found) {
        updatedLines.push(`${key}="${trimmed}"`);
      }

      fs.writeFileSync(envPath, updatedLines.filter(l => l !== undefined).join('\n').trim() + '\n', 'utf8');
    } catch (err) {
      console.error(`Failed to persist secret ${key} to .env:`, err);
    }
  }
};

