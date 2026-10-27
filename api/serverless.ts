import express from 'express';
import { apiRouter } from '../backend/index';
import { securityHeaders, honeypotShield } from '../backend/security';

const app = express();

app.use(honeypotShield);
app.use(securityHeaders);

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Support both /api/* and root /* mountings
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Explicit 404 handler so requests never hang
app.use((req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    method: req.method,
    url: req.url,
  });
});

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[SERVERLESS API ERROR]', err);
  res.status(500).json({ message: err?.message || 'Internal Server Error' });
});

export default function handler(req: any, res: any) {
  return app(req, res);
}
