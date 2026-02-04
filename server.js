/**
npm * Serveur pour EGENT TOGO
 * Sert les fichiers statiques du build Vue.js
 * 
 * Usage:
 * node server.js
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * API: Santé du serveur
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

/**
 * Servir les fichiers statiques (build Vue)
 */
app.use(express.static('dist'));

/**
 * Fallback pour les routes du frontend (SPA)
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

/**
 * Démarrer le serveur
 */
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 Serveur EGENT TOGO                 ║
║  Port: ${PORT}                            ║
║  Environment: ${process.env.NODE_ENV || 'development'}           ║
╚════════════════════════════════════════╝
  `);
});

export default app;
