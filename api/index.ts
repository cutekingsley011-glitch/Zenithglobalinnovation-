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

// Mount the API router
app.use('/api', apiRouter);

export default app;
