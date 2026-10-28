import express from 'express';
import { apiRouter } from './index';
import { securityHeaders, honeypotShield } from './security';

const app = express();

// 1. Defend perimeter
app.use(honeypotShield);
app.use(securityHeaders);

// 2. CORS headers
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

// 3. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. URL normalization for Vercel Serverless Rewrites
app.use((req, res, next) => {
  if (req.originalUrl && (req.url === '/api' || req.url === '/api/index' || req.url === '/api/index.js')) {
    req.url = req.originalUrl;
  }
  next();
});

// 5. Direct healthcheck routes
app.get('/api/ping', (_req, res) => {
  res.json({ ok: true, status: 'operational', timestamp: new Date().toISOString() });
});
app.get('/ping', (_req, res) => {
  res.json({ ok: true, status: 'operational', timestamp: new Date().toISOString() });
});

// 6. Support both /api/* and root /* and /api/index/* mountings
app.use('/api', apiRouter);
app.use('/api/index', apiRouter);
app.use('/', apiRouter);

// 7. Explicit 404 handler so requests never hang
app.use((req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
  });
});

// 8. Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[SERVERLESS API ERROR]', err);
  if (!res.headersSent) {
    res.status(500).json({ message: err?.message || 'Internal Server Error' });
  }
});

export default function handler(req: any, res: any) {
  try {
    return app(req, res);
  } catch (err: any) {
    console.error('[SERVERLESS FATAL INVOCATION ERROR]', err);
    if (res && typeof res.status === 'function' && !res.headersSent) {
      res.status(500).json({ error: 'Internal handler failure', message: err?.message || String(err) });
    }
  }
}
