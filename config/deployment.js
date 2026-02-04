/**
 * Configuration d'hébergement et déploiement
 * Supporte GitHub Pages et egenttogo.com
 */

const deploymentConfig = {
  // Développement local
  development: {
    name: 'Development',
    frontendUrl: 'http://localhost:5173',
    serverUrl: 'http://localhost:3000',
    baseUrl: 'http://localhost:5173',
    prerender: false,
    cache: false,
    cacheTTL: 0
  },

  // GitHub Pages (actuellement)
  'github-pages': {
    name: 'GitHub Pages',
    frontendUrl: 'https://alifoe.github.io/EGENT_TOGO',
    serverUrl: '', 
    baseUrl: 'https://alifoe.github.io/EGENT_TOGO',
    prerender: false,
    cache: false,
    cacheTTL: 0
  },

  // egenttogo.com (cible finale)
  production: {
    name: 'Production (egenttogo.com)',
    frontendUrl: 'https://www.egenttogo.com',
    serverUrl: 'https://www.egenttogo.com',
    baseUrl: 'https://www.egenttogo.com',
    prerender: false,
    cache: true,
    cacheTTL: 86400000 // 24 heures
  }
};

/**
 * Obtenir la configuration selon l'environnement
 */
function getConfig(env = process.env.NODE_ENV || 'development') {
  const envName = env === 'production' ? 'github-pages' : env;
  return deploymentConfig[envName] || deploymentConfig.development;
}

/**
 * Configuration du serveur
 */
const serverConfig = {
  // Port
  port: process.env.PORT || 3000,

  // Répertoires
  dirs: {
    cache: './prerendered',
    dist: './dist',
    public: './public'
  },

  // Timeouts
  timeouts: {
    render: 30000,
    cache: 86400000
  },

  // Crawlers à détecter
  crawlers: [
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegram',
    'slurp',
    'googlebot',
    'bingbot',
    'yandexbot',
    'baiduspider'
  ]
};

export { deploymentConfig, getConfig, serverConfig };
