import fs from 'fs';
import path from 'path';

const STORAGE_ROOT = path.resolve(process.cwd(), 'data', 'storage');

if (!fs.existsSync(STORAGE_ROOT)) {
  fs.mkdirSync(STORAGE_ROOT, { recursive: true });
}

export interface StorageFile {
  path: string;
  content: string; // Base64 or utf8 string
  contentType: string;
}

export const storage = {
  async write(files: StorageFile[]): Promise<boolean[]> {
    const results: boolean[] = [];
    for (const file of files) {
      try {
        // Sanitize path to prevent directory traversal
        const safeRelative = file.path.replace(/\.\./g, '').replace(/^\/+/, '');
        const targetPath = path.join(STORAGE_ROOT, safeRelative);
        const parentDir = path.dirname(targetPath);

        if (!fs.existsSync(parentDir)) {
          fs.mkdirSync(parentDir, { recursive: true });
        }

        // Check if content is base64
        let buffer: Buffer;
        if (/^[A-Za-z0-9+/=]+$/.test(file.content) && file.content.length % 4 === 0) {
          buffer = Buffer.from(file.content, 'base64');
        } else {
          buffer = Buffer.from(file.content, 'utf-8');
        }

        fs.writeFileSync(targetPath, buffer);

        // Also write metadata
        const metaPath = `${targetPath}.meta.json`;
        fs.writeFileSync(
          metaPath,
          JSON.stringify({
            contentType: file.contentType || 'application/octet-stream',
            size: buffer.length,
            uploadedAt: new Date().toISOString(),
            originalPath: file.path,
          }, null, 2)
        );

        results.push(true);
      } catch (err) {
        console.error('Failed to write storage file:', file.path, err);
        results.push(false);
      }
    }
    return results;
  },

  async read(filePath: string): Promise<{ buffer: Buffer; contentType: string } | null> {
    try {
      const safeRelative = filePath.replace(/\.\./g, '').replace(/^\/+/, '');
      const targetPath = path.join(STORAGE_ROOT, safeRelative);
      if (!fs.existsSync(targetPath)) return null;

      const buffer = fs.readFileSync(targetPath);
      let contentType = 'application/octet-stream';
      const metaPath = `${targetPath}.meta.json`;
      if (fs.existsSync(metaPath)) {
        try {
          const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
          if (meta.contentType) contentType = meta.contentType;
        } catch {}
      }
      return { buffer, contentType };
    } catch (err) {
      console.error('Failed to read storage file:', filePath, err);
      return null;
    }
  },

  getStorageRoot(): string {
    return STORAGE_ROOT;
  }
};
