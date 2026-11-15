import express from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { apiRouter } from './backend/index';
import { securityHeaders, honeypotShield } from './backend/security';
import { findSeoJob, renderJobDetailHtml } from './backend/seoJobs';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Active Honeypot & Attacker Isolation Trap (runs on all incoming traffic)
app.use(honeypotShield);

// Enterprise Security Headers & Server Obfuscation
app.use(securityHeaders);

// Enable permissive CORS for preview URLs, Cloud Run hostnames, and iframe embeds
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-zenith-admin-token');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Body parsing with large limit for resume payloads (base64)
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Mount API router
app.use('/api', apiRouter);

// Serve dedicated single-job SSR HTML for ?job= or /jobs/:slug SEO crawler inspection
app.get(['/', '/jobs/:slug'], (req, res, next) => {
  const rawJob = String(req.params?.slug || req.query?.job || '').trim();
  if (!rawJob) return next();
  const matched = findSeoJob(rawJob);
  if (!matched) return next();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(renderJobDetailHtml(matched, { isDev: !isProduction }));
});

// Initialize frontend middleware
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true as const,
        cors: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Zenith Global Innovation server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
