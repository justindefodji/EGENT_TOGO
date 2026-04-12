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
import compression from 'compression';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression()); // Activer la compression Gzip
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
 * Redirection pour l'ancienne base path /EGENT_TOGO/
 * Utile pour la transition de GitHub Pages vers domaine personnalisé
 */
app.use((req, res, next) => {
  if (req.url.startsWith('/EGENT_TOGO/')) {
    req.url = req.url.replace('/EGENT_TOGO/', '/');
  }
  next();
});

/**
 * Servir les fichiers statiques (build Vue)
 */
const oneYear = 31536000000;
app.use(express.static('dist', {
  maxAge: oneYear,
  immutable: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      // Les fichiers HTML ne doivent pas être mis en cache de manière permanente
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    }
  }
}));

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
