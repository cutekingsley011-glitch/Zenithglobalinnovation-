import express from 'express';
import { apiRouter } from '../backend/index';
import { securityHeaders, honeypotShield } from '../backend/security';

const app = express();

// Security middlewares
app.use(honeypotShield);
app.use(securityHeaders);

// CORS for cross-origin and Vercel domains
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

// Mount the API router at both /api and / to handle all Vercel path rewrites
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Global Error Handler to prevent function invocation crashes
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[SERVERLESS API ERROR]', err);
  res.status(500).json({ message: err?.message || 'Internal Server Error' });
});

export default app;
