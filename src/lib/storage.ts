/**
 * Resilient client-side storage helper for sandboxed iframe environments
 * Falls back to in-memory store if sessionStorage is restricted.
 */

const memoryStore: Record<string, string> = {};

export const safeStorage = {
  getItem(key: string): string {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key) || memoryStore[key] || '';
      }
    } catch {
      // Access denied or third-party cookies disabled in sandbox
    }
    return memoryStore[key] || '';
  },

  setItem(key: string, val: string): void {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, val);
      }
    } catch {
      // Access denied or third-party cookies disabled in sandbox
    }
    memoryStore[key] = val;
  },

  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
      }
    } catch {
      // Access denied or third-party cookies disabled in sandbox
    }
    delete memoryStore[key];
  },
};
