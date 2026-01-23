═══════════════════════════════════════════════════════════════════════════════

                    🌍 META TAGS OPEN GRAPH - GUIDE COMPLET 🌍

                 Partage sur WhatsApp, Facebook, Twitter & LinkedIn

═══════════════════════════════════════════════════════════════════════════════


📖 TABLE DES MATIÈRES:

1. Qu'est-ce que c'est? (Concept simple)
2. Comment ça marche? (Architecture)
3. Implémentation (Code & Configuration)
4. Test & Validation (Comment vérifier)
5. FAQ & Dépannage


═══════════════════════════════════════════════════════════════════════════════

1️⃣  QU'EST-CE QUE C'EST?

Le problème:
───────────
Quand vous partagez un lien d'article sur WhatsApp, Facebook ou Twitter,
le réseau social fait une requête HTTP pour LIRE le HTML de votre page.

⚠️ IMPORTANT: Les réseaux sociaux N'EXÉCUTENT PAS JavaScript!
Ils ont besoin du HTML brut avec les meta tags.

La solution: Meta Tags Open Graph (OG)
──────────────────────────────────────

Ce sont des balises HTML spéciales qui disent aux réseaux sociaux:
- Quel est le titre? (og:title)
- C'est quoi la description? (og:description)  
- Quelle image afficher? (og:image) ← LE PLUS IMPORTANT
- Quel est le lien exact? (og:url)

Exemple HTML:
─────────────
```html
<head>
  <meta property="og:title" content="Mon Article Génial">
  <meta property="og:description" content="Description courte">
  <meta property="og:image" content="https://site.com/image.jpg">
  <meta property="og:url" content="https://site.com/article/slug">
  <meta property="og:type" content="article">
</head>
```

Résultat sur les réseaux sociaux:
─────────────────────────────────
[IMAGE 1200x630]
Mon Article Génial
Description courte
site.com


═══════════════════════════════════════════════════════════════════════════════

2️⃣  COMMENT ÇA MARCHE? (Architecture)

Vue.js est une SPA (Single Page Application):
─────────────────────────────────────────────

Sans pre-rendering:
┌─────────────────────┐
│ WhatsApp fait une   │
│ requête HTTP        │
└────────┬────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Reçoit le HTML de Vue.js                │
│ Avec juste: <div id="app"></div>        │
│ PAS de meta tags! ❌                     │
└─────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Affichage vide ❌        │
│ Sans image               │
│ Sans titre correct       │
└──────────────────────────┘


Avec pre-rendering (Notre solution):
────────────────────────────────────

┌─────────────────────┐
│ WhatsApp fait une   │
│ requête HTTP        │
└────────┬────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ Node.js server.js l'intercepte              │
│ Détecte que c'est un crawler social         │
│ Utilise Puppeteer pour générer la page      │
│ PUIS ajoute les meta tags dynamiquement     │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│ Envoie HTML AVEC meta tags ✅            │
│ og:title = "Titre de l'article"          │
│ og:image = "https://..."                 │
│ og:description = "..."                   │
└──────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│ Affichage PARFAIT ✅                     │
│ Image visible sur tous les réseaux       │
│ Titre et description corrects            │
└──────────────────────────────────────────┘


Fichiers impliqués:
──────────────────

1. src/composables/useOpenGraphMeta.js
   → Fonction Vue pour définir les meta tags
   → Utilise @vueuse/head
   → Normalisé les URLs des images

2. src/pages/ArticleDetail.vue
   → Utilise useOpenGraphMeta
   → Appelle setArticleMeta() quand l'article se charge
   → Génère aussi les données JSON-LD (schema.org)

3. server.js
   → Détecte les crawlers sociaux (WhatsApp, Facebook, etc)
   → Utilise Puppeteer pour pré-rendre la page
   → Cache les résultats pour performance


═══════════════════════════════════════════════════════════════════════════════

3️⃣  IMPLÉMENTATION (Code & Configuration)

Installation:
─────────────
✅ Déjà fait! Package installé:
   npm install @vueuse/head


Utiliser dans un composant Vue:
────────────────────────────────

```javascript
import { useOpenGraphMeta } from '@/composables/useOpenGraphMeta'

export default {
  setup() {
    const { setArticleMeta, injectJsonLD, getArticleJsonLD } = useOpenGraphMeta()

    // Quand l'article se charge:
    setArticleMeta({
      titre: article.title,
      description: article.excerpt,
      image: article.image,  // DOIT être une URL absolue HTTPS
      url: `/article/${article.slug}`,
      date: article.date,
      categorie: article.category
    })

    // Optionnel: Ajouter les données structurées JSON-LD
    const jsonLd = getArticleJsonLD({
      titre: article.title,
      description: article.excerpt,
      image: article.image,
      url: `/article/${article.slug}`,
      date: article.date
    })
    injectJsonLD(jsonLd)

    return { /* ... */ }
  }
}
```


Configuration serveur (server.js):
──────────────────────────────────

Déjà configuré! Détecte ces crawlers:
- facebookexternalhit (Facebook)
- twitterbot (Twitter/X)
- linkedinbot (LinkedIn)
- whatsapp (WhatsApp) ← Le plus important!
- telegram, pinterest, discordbot, etc.

Le serveur fait automatiquement:
1. Reçoit une requête d'un crawler
2. Utilise Puppeteer pour charger la page
3. Attend le chargement des meta tags
4. Cache le résultat (24h)
5. Renvoie le HTML pré-rendu


═══════════════════════════════════════════════════════════════════════════════

4️⃣  TEST & VALIDATION

Option A: Test local avec votre navigateur
──────────────────────────────────────────

1. Démarrer le serveur:
   npm run dev

2. Aller à la page de test:
   http://localhost:5173/debug-meta-tags

3. Entrer les infos:
   - Slug: mon-article
   - Titre: Mon Article
   - Description: Une super description
   - Image: https://...

4. Cliquer "Appliquer les métadonnées"

5. Vérifier que tous les ✅ sont verts


Option B: Test avec Facebook Sharing Debugger (RÉEL)
──────────────────────────────────────────────────────

1. Aller à: https://developers.facebook.com/tools/debug/sharing/

2. Entrer votre URL d'article:
   https://www.egenttogo.com/article/mon-article

3. Facebook va:
   ✅ Parser le HTML
   ✅ Extraire les meta tags
   ✅ Afficher l'aperçu comme sur Facebook
   ✅ Montrer les problèmes s'il y en a

4. Vérifier:
   - Image affichée? ✅
   - Titre correct? ✅
   - Description? ✅


Option C: Test sur WhatsApp/Telegram (RÉEL)
────────────────────────────────────────────

1. Copier le lien de l'article:
   https://www.egenttogo.com/article/mon-article

2. L'envoyer sur WhatsApp:
   - Desktop ou Mobile
   - En message privé ou story
   
3. Vous devez voir:
   [IMAGE de l'article]
   Titre de l'article
   Description
   www.egenttogo.com


Problèmes communs et solutions:
───────────────────────────────

❌ Image ne s'affiche pas:
   → Vérifier que l'URL est HTTPS (pas HTTP)
   → Taille min: 1200x630px
   → Format: JPEG/PNG
   → Accessible publiquement (pas de firewall)

❌ Titre/description vides:
   → Vérifier le composable
   → Mettre console.log pour déboguer
   → Vérifier que vue-head injecte correctement

❌ Meta tags ne sont pas dans le HTML:
   → Vérifier /debug-meta-tags pour validation
   → Voir la source HTML (Ctrl+U)
   → Chercher <meta property="og:title">

❌ Cache Facebook:
   → Utiliser Facebook Debugger
   → Cliquer "Scrape Again"
   → Attendre 5-10 secondes


═══════════════════════════════════════════════════════════════════════════════

5️⃣  FAQ & DÉPANNAGE

Q: Pourquoi je ne peux pas juste utiliser JavaScript?
R: Parce que les crawlers sociaux ne l'exécutent pas. Ils font une simple 
   requête HTTP et lisent juste le HTML brut. Si les meta tags ne sont pas 
   dans le HTML initial, ils ne seront jamais créés.

Q: Pourquoi avoir besoin d'un serveur Node.js?
R: Pour le pre-rendering! Sans lui, le HTML initial de Vue n'a pas les meta tags.
   Le serveur les ajoute juste pour les crawlers, les utilisateurs normaux 
   reçoivent toujours l'app Vue.

Q: Est-ce que @vueuse/head ajoute les meta tags au HTML initial?
R: Non, @vueuse/head les ajoute au DOM du navigateur APRÈS le chargement.
   Pour les crawlers, nous avons besoin du pre-rendering côté serveur.

Q: Comment tester sans déployer?
R: Utiliser /debug-meta-tags ou Facebook Sharing Debugger avec votre domaine local
   (fonctionne si vous rendez accessible publiquement).

Q: Les images doivent être sur mon serveur ou peuvent être externes?
R: Elles peuvent être externes, du moment qu'elles sont en HTTPS et accessibles.
   Recommandation: stocker sur Firebase Storage ou CDN pour meilleure perfo.

Q: Quelle est la différence entre og:image et twitter:image?
R: Les deux déclinent peu. Nous les mettons à la même valeur.
   twitter:card = "summary_large_image" = large format avec image

Q: Taille optimale pour og:image?
R: 1200x630px (ratio 1.9:1)
   Minimum: 600x315px
   Maximum: éviter au-delà de 8MB


═══════════════════════════════════════════════════════════════════════════════

🔗 RESSOURCES UTILES:

- Open Graph: https://ogp.me/
- Facebook Debugger: https://developers.facebook.com/tools/debug/sharing/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- @vueuse/head: https://github.com/vueuse/head
- Schema.org: https://schema.org/NewsArticle


═══════════════════════════════════════════════════════════════════════════════

✅ CHECKLIST DE VALIDATION:

Avant de déployer en production:

□ Meta tags générés correctement (@vueuse/head)
□ Images en HTTPS (pas HTTP)
□ Taille image: min 1200x630px
□ Pre-rendering configuré sur server.js
□ Test avec Facebook Sharing Debugger: OK ✅
□ Test sur WhatsApp/Telegram: image visible ✅
□ Test sur Twitter: large image affichée ✅
□ Données JSON-LD présentes (schema.org)
□ Canonical URLs correctes
□ Cache du serveur configuré (24h)


═══════════════════════════════════════════════════════════════════════════════

Questions? Allez à /debug-meta-tags pour tester immédiatement!

═══════════════════════════════════════════════════════════════════════════════
