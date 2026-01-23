═══════════════════════════════════════════════════════════════════════════════

         📱 COMMENT PARTAGER UN ARTICLE SUR WHATSAPP & RÉSEAUX SOCIAUX

═══════════════════════════════════════════════════════════════════════════════


🎯 RÉSUMÉ RAPIDE:

Quand vous partagez un lien d'article de EGENT-TOGO sur WhatsApp:

AVANT (sans meta tags):
┌──────────────────────┐
│ [Pas d'image]        │
│ http://lien...       │
│ pas de titre visible │
└──────────────────────┘

APRÈS (avec notre implémentation):
┌────────────────────────────┐
│ [IMAGE de l'article]       │
│ Titre: "Mon Article..."    │
│ Description: "..."         │
│ egenttogo.com              │
└────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════

📋 ÉTAPES POUR TESTER:


1. Démarrer le serveur local
───────────────────────────

Ouvrir terminal PowerShell dans le dossier du projet:
C:\Users\conce\Desktop\PROJET_EGENTTOGO\EGENT_TOGO

Taper:
npm run dev

Attendre que le serveur démarre:
➜ Local: http://localhost:5173/EGENT_TOGO/


2. Ouvrir une page d'article
────────────────────────────

Dans votre navigateur, aller à:
http://localhost:5173/EGENT_TOGO/article/inauguration-nouveau-centre

(Ou n'importe quel article existant dans Firebase)


3. Vérifier les meta tags
────────────────────────

a) Méthode 1: Page de test interactive
   → Aller à: http://localhost:5173/EGENT_TOGO/debug-meta-tags
   → Entrer le titre, description, image
   → Cliquer "Appliquer les métadonnées"
   → Vérifier que tous les checkmarks ✅ sont verts

b) Méthode 2: Code source du navigateur
   → Sur la page d'article
   → Appuyer sur Ctrl+U (affiche le code source)
   → Chercher: <meta property="og:title"
   → Vous devez voir:
     • og:title
     • og:description
     • og:image
     • og:url
     • twitter:card
     • etc.

c) Méthode 3: Inspecteur du navigateur (F12)
   → Ouvrir le DevTools (F12)
   → Aller à l'onglet "Elements"
   → Chercher <head>
   → Vous verrez toutes les balises meta


4. Tester le partage réel (avec votre domaine)
──────────────────────────────────────────────

IMPORTANT: Doit être accessible publiquement sur HTTPS!
(Impossible avec localhost)

a) Sur un domaine déployé (egenttogo.com):
   
   Facebook:
   → Aller à: https://developers.facebook.com/tools/debug/sharing/
   → Entrer: https://www.egenttogo.com/article/mon-article
   → Cliquer "Debug"
   → Voir l'aperçu comme sur Facebook
   → Si pas bon, cliquer "Scrape Again" pour forcer la mise à jour

   WhatsApp:
   → Copier le lien: https://www.egenttogo.com/article/mon-article
   → L'envoyer sur WhatsApp (Web, Desktop ou Mobile)
   → Vous devez voir l'image, titre et description

   Twitter/X:
   → Aller à: https://cards-dev.twitter.com/validator
   → Entrer: https://www.egenttogo.com/article/mon-article
   → Voir l'aperçu avec image large


═══════════════════════════════════════════════════════════════════════════════

🔍 STRUCTURE DES META TAGS GENERÉS:


Exemple pour un article:
────────────────────────

```html
<head>
  <!-- OPEN GRAPH - Facebook, WhatsApp, LinkedIn -->
  <meta property="og:title" content="Inauguration du Nouveau Centre EGENT-TOGO">
  <meta property="og:description" content="Découvrez notre nouvel espace...">
  <meta property="og:image" content="https://...image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:secure_url" content="https://...image.jpg">
  <meta property="og:url" content="https://egenttogo.com/article/inauguration-nouveau-centre">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="EGENT-TOGO">
  <meta property="og:locale" content="fr_TG">
  
  <!-- TWITTER CARD -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Inauguration du Nouveau Centre...">
  <meta name="twitter:description" content="Découvrez...">
  <meta name="twitter:image" content="https://...image.jpg">
  <meta name="twitter:site" content="@egenttogo">
  
  <!-- STANDARD META TAGS -->
  <meta name="description" content="Découvrez...">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- CANONICAL URL -->
  <link rel="canonical" href="https://egenttogo.com/article/inauguration-nouveau-centre">
  
  <!-- STRUCTURED DATA (JSON-LD) - Pour Google -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Inauguration du Nouveau Centre...",
    "description": "Découvrez...",
    "image": "https://...image.jpg",
    "datePublished": "2026-01-23T00:00:00Z"
  }
  </script>
</head>
```


═══════════════════════════════════════════════════════════════════════════════

⚙️ COMMENT ÇA MARCHE TECHNIQUEMENT:

Flux de requête pour un crawler:
────────────────────────────────

1. WhatsApp/Facebook fait une requête HTTP
   GET /article/mon-article HTTP/1.1
   User-Agent: Mozilla/5.0 (Windows; WhatsApp)

2. Notre serveur Node.js (server.js) reçoit la requête
   → Vérifie le User-Agent
   → Détecte "whatsapp" = c'est un crawler

3. Serveur lance Puppeteer (navigateur sans UI)
   → Charge: http://localhost:5173/article/mon-article
   → Attend que Vue.js se charge
   → Attend que @vueuse/head injecte les meta tags
   → Attend 500ms supplémentaires pour être sûr

4. Serveur récupère le HTML généré
   → Contient maintenant les <meta property="og:...">
   → Le met en cache (24h) pour performance

5. Envoie le HTML au crawler
   → WhatsApp parse les meta tags
   → Extrait: og:title, og:image, og:description
   → Affiche la prévisualisation

6. Utilisateur voit sur WhatsApp:
   [IMAGE 1200x630]
   Inauguration du Nouveau Centre
   Découvrez notre nouvel espace...
   egenttogo.com


Pour les utilisateurs normaux:
──────────────────────────────

Requête normal (User-Agent Firefox/Chrome):
GET /article/mon-article HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)

→ Pas de "whatsapp/facebook/twitter" détecté
→ Envoie l'app Vue.js standard (index.html)
→ Vue.js se charge et configure les meta tags avec @vueuse/head
→ Page fonctionne normalement


═══════════════════════════════════════════════════════════════════════════════

🚀 PROCHAINES ÉTAPES:

1. Deployer en production (Firebase Hosting + Cloud Functions)
   → Remplacer node server.js par une Cloud Function
   → Servir les pages pre-rendues pour les crawlers

2. Ajouter des boutons de partage au composant Article
   → Boutons pour Facebook, Twitter, WhatsApp, LinkedIn
   → Pré-remplir le message avec titre + lien

3. Optimiser les images
   → Redimensionner les images à 1200x630px si nécessaire
   → Compresser pour meilleure performance
   → Servir depuis CDN (Firebase Storage)

4. Ajouter Open Graph pour les AUTRES pages
   → Services, Produits, Projets
   → Page d'accueil
   → Pages de catégories

5. Ajouter le support de Plus d'options
   → Article:published_time
   → Article:modified_time
   → Author meta tag
   → Breadcrumb schema


═══════════════════════════════════════════════════════════════════════════════

❓ QUESTIONS FRÉQUENTES:

Q: Pourquoi l'image ne s'affiche pas sur WhatsApp?
R: Vérifier:
   1. L'URL est HTTPS (pas HTTP)
   2. Taille minimum 1200x630px
   3. Format: JPEG ou PNG
   4. L'image est accessible (pas derrière un firewall/auth)
   5. Sur Facebook Debugger, cliquer "Scrape Again"

Q: Pourquoi j'ai juste le lien sans prévisualisation?
R: Les meta tags ne sont pas arrivés à WhatsApp
   → Utiliser Facebook Debugger pour vérifier
   → Vérifier /debug-meta-tags pour validation locale

Q: Combien de temps pour que WhatsApp mette à jour?
R: Environ 5-10 secondes
   → Si plus long: utiliser Facebook Debugger "Scrape Again"
   → Cache Facebook: 24h normalement

Q: Je peux changer l'image après publication?
R: Oui! Changer simplement article.image dans Firebase
   → Les utilisateurs verront la nouvelle image la prochaine fois
   → Utiliser Facebook Debugger pour forcer mise à jour cache


═══════════════════════════════════════════════════════════════════════════════

✅ CHECKLIST AVANT PARTAGE:

□ Article créé dans Firebase (title, image, excerpt, etc)
□ Image en HTTPS, taille 1200x630px minimum
□ Aller à article pour vérifier meta tags (Ctrl+U)
□ Tester avec Facebook Debugger si en production
□ Copier le lien
□ Envoyer sur WhatsApp/Facebook/Twitter
□ Vérifier que image, titre, description s'affichent
□ ✅ Succès!


═══════════════════════════════════════════════════════════════════════════════
