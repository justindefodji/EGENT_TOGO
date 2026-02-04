# Cloud Functions - Structure et Déploiement

## 📁 Structure des fichiers

```
functions/
├── index.js                 # Point d'entrée principal
├── package.json             # Dépendances Node.js
├── .env.example             # Modèle de configuration
├── .gitignore               # Ignorer node_modules
└── node_modules/            # Dépendances (générées par npm install)
```

## 🔧 Fichiers créés

### functions/index.js
Contient la Cloud Function `prerender` qui:
- **Génère des métadonnées statiques** pour les articles via Firestore
- **Détecte les crawlers sociaux** pour adapter les en-têtes de cache
- **Retourne le HTML** avec les meta tags OG pré-remplis pour les partages sociaux
- **Expose une API** de santé `/api/health`

### functions/package.json
Contient les dépendances:
- `firebase-functions@4.4.0` - SDK Cloud Functions
- `firebase-admin@11.11.0` - SDK Firebase admin
- `express@4.18.2` - Framework web
- `cors@2.8.5` - Support CORS
- `nodemailer@6.9.7` - Envoi d'emails (devis)

## 📋 Configuration (firebase.json)

```json
"functions": {
  "source": "functions",
  "runtime": "nodejs18",
  "codebase": "default"
},
"hosting": {
  "rewrites": [
    {
      "source": "/api/**",
      "function": "prerender"
    },
    {
      "source": "/article/**",
      "function": "prerender"
    },
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
}
```

**Comment ça marche:**
1. Quand quelqu'un accède `/article/mon-article`, la requête va d'abord à la Cloud Function
2. La fonction reçoit le User-Agent et vérifie si c'est un crawler
3. Si c'est un crawler → La fonction génère le HTML avec les meta tags statiques via Firestore et le retourne.
4. Si c'est un utilisateur normal → La fonction le redirige vers Firebase Hosting qui sert l'SPA Vue.js

## 🚀 Déploiement

### Prérequis
- ✅ `firebase-tools` installé globalement: `npm install -g firebase-tools`
- ✅ Authentifié avec Firebase: `firebase login`
- ✅ Sélectionné le bon projet: `firebase use EGENT TOGO` (ou votre project ID)

### Étapes de déploiement

1. **Compiler le frontend**
   ```bash
   npm run build
   ```
   Génère `dist/` avec le code Vue.js compilé

2. **Tester localement (RECOMMANDÉ)**
   ```bash
   firebase emulators:start --only functions,hosting
   ```
   Accédez à: http://localhost:5000
   - Testez le router normalement
   - Testez avec un User-Agent crawler: `curl -H "User-Agent: Whatsapp" http://localhost:5000/article/test`

3. **Déployer en production**
   ```bash
   firebase deploy --only functions,hosting
   ```
   Cela:
   - Upload la Cloud Function vers Google Cloud
   - Upload les fichiers statiques (dist/) vers Firebase Hosting
   - Configure les rewrites
   - Active le prerendering pour les crawlers

## 🔍 Vérification du déploiement

Une fois déployé:

1. **Vérifier la fonction**
   ```bash
   firebase functions:list
   ```
   Devrait montrer: `prerender` en tant qu'HTTPS function

2. **Tester avec un crawler**
   ```bash
   curl -H "User-Agent: facebookexternalhit" https://www.egenttogo.com/article/mon-article
   ```
   Devrait retourner le HTML pré-rendu avec les meta tags OG

3. **Vérifier sur les réseaux sociaux**
   - Facebook: https://developers.facebook.com/tools/debug/sharing/
   - Twitter/X: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/
   - Entrez l'URL d'un article et regardez si l'image OG s'affiche

## 📊 Logs et débogage

### Consulter les logs
```bash
firebase functions:log
```

### Filtrer par fonction
```bash
firebase functions:log --function prerender
```

### Voir les logs en direct
```bash
firebase emulators:start --only functions --inspect-functions
```

## ⚙️ Configuration avancée

### Variables d'environnement
Pour ajouter des variables à la Cloud Function:
```bash
firebase functions:config:set env.frontend_url="https://www.egenttogo.com"
```

### Timeouts et ressources
Dans `firebase.json`:
```json
"functions": {
  "source": "functions",
  "runtime": "nodejs18",
  "timeoutSeconds": 60,
  "memory": "512MB"
}
```

## 📚 Ressources

- [Google Cloud Functions Documentation](https://cloud.google.com/functions/docs)
- [Firebase Hosting Rewrites](https://firebase.google.com/docs/hosting/full-config)
- [Open Graph Protocol](https://ogp.me/)
- [@vueuse/head Documentation](https://head.unhead.io/)
