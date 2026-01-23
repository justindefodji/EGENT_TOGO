═══════════════════════════════════════════════════════════════════════════════

                        🔗 URLS DE TEST ET DEBUG

═══════════════════════════════════════════════════════════════════════════════


📍 URLS LOCALES (npm run dev):


Pages principales:
──────────────────

Accueil:
http://localhost:5173/EGENT_TOGO/

Articles (News):
http://localhost:5173/EGENT_TOGO/actualites

Articles spécifiques:
http://localhost:5173/EGENT_TOGO/article/inauguration-nouveau-centre
http://localhost:5173/EGENT_TOGO/article/lancement-service-climatisation
(Remplacer avec des slugs réels de vos articles)


Pages de test META TAGS:
────────────────────────

Test interactif des meta tags:
http://localhost:5173/EGENT_TOGO/debug-meta-tags

Debug général:
http://localhost:5173/EGENT_TOGO/debug


Autres pages:
─────────────

Services:
http://localhost:5173/EGENT_TOGO/services

Produits:
http://localhost:5173/EGENT_TOGO/produits

Projets:
http://localhost:5173/EGENT_TOGO/projets

Galerie:
http://localhost:5173/EGENT_TOGO/galerie

Contact:
http://localhost:5173/EGENT_TOGO/contact


═══════════════════════════════════════════════════════════════════════════════

🌐 URLS PRODUCTION (egenttogo.com):


(À configurer après déploiement)

Articles:
https://www.egenttogo.com/article/inauguration-nouveau-centre
https://www.egenttogo.com/article/lancement-service-climatisation


═══════════════════════════════════════════════════════════════════════════════

🧪 OUTILS DE TEST EN LIGNE:


Facebook Sharing Debugger (PRINCIPAL):
──────────────────────────────────────
https://developers.facebook.com/tools/debug/sharing/

Utilisation:
1. Copier votre URL d'article (egenttogo.com/article/...)
2. Coller dans la barre de recherche
3. Cliquer "Debug"
4. Voir l'aperçu comme sur Facebook
5. Si problème: cliquer "Scrape Again" pour forcer mise à jour

Affiche:
✓ Image (og:image)
✓ Titre (og:title)
✓ Description (og:description)
✓ Avertissements s'il y a des problèmes


Twitter Card Validator:
───────────────────────
https://cards-dev.twitter.com/validator

Utilisation:
1. Entrer votre URL
2. Voir le rendu comme sur Twitter
3. Vérifier la taille de l'image (summary_large_image)

Affiche:
✓ Image Twitter (twitter:image)
✓ Titre (twitter:title)
✓ Description (twitter:description)


Open Graph Validator (Generic):
────────────────────────────────
https://www.opengraphcheck.com/

Entrer l'URL et voir tous les meta tags OG


LinkedIn Post Inspector:
───────────────────────
https://www.linkedin.com/feed/ → Coller le lien
(LinkedIn analysera automatiquement les meta tags)


Google Rich Results Test (Schema.org):
──────────────────────────────────────
https://search.google.com/test/rich-results

Utilisation:
1. Entrer l'URL
2. Voir comment Google interprète le structured data (JSON-LD)
3. Vérifier qu'il reconnaît "NewsArticle"


═══════════════════════════════════════════════════════════════════════════════

🐛 DEBUG DANS LE NAVIGATEUR:


Voir les meta tags générés (Local):
───────────────────────────────────

1. Aller sur la page d'un article:
   http://localhost:5173/EGENT_TOGO/article/inauguration-nouveau-centre

2. Appuyer sur Ctrl+U (affiche le code source HTML)

3. Chercher avec Ctrl+F: og:title
   Vous devez voir:
   <meta property="og:title" content="...">
   <meta property="og:description" content="...">
   <meta property="og:image" content="...">
   <meta property="og:url" content="...">
   <meta name="twitter:card" content="summary_large_image">
   etc.

4. Si vous ne les voyez PAS:
   → Aller à /debug-meta-tags
   → Remplir le formulaire
   → Cliquer "Appliquer les métadonnées"
   → Vérifier à nouveau


Avec DevTools (F12):
─────────────────────

1. Appuyer sur F12 (ouvre DevTools)

2. Aller à l'onglet "Elements" ou "Inspector"

3. Dans la structure HTML, chercher <head>

4. Vous verrez toutes les <meta> tags

5. Pour une spécifique, chercher avec Ctrl+F dans le devtools:
   property="og:image"

6. Vérifier que la valeur est correcte et que c'est une URL HTTPS


Vérifier si les images se chargent:
────────────────────────────────────

1. DevTools (F12) → Onglet "Network"

2. Recharger la page (F5 ou Ctrl+Shift+R)

3. Chercher les images dans la liste
   (Filtre par "img" pour voir juste les images)

4. Chercher votre image og:image
   Elle doit:
   ✓ Avoir le statut "200" (succès)
   ✓ Être HTTPS (pas HTTP)
   ✓ Être accessible publiquement


═══════════════════════════════════════════════════════════════════════════════

💾 STRUCTURE RÉCOMMANDÉE DES DONNÉES FIREBASE:


Collection: articles
─────────────────────

Chaque document doit avoir:

{
  title: "Inauguration du Nouveau Centre",
  slug: "inauguration-nouveau-centre",        ← IMPORTANT: doit être unique
  excerpt: "Découvrez notre nouvel espace...",
  image: "https://...full-url-to-image.jpg",  ← IMPORTANT: URL ABSOLUE HTTPS
  content: "<p>Contenu complet...</p>",
  category: "News" ou "Inaugurations" etc,
  date: "2026-01-23",
  author: "EGENT-TOGO",
  images: [                                    ← Images supplémentaires
    "https://...",
    "https://..."
  ]
}


Règles essentielles:
────────────────────

1. IMAGE DOIT ÊTRE HTTPS
   ❌ http://...
   ✅ https://...

2. IMAGE DOIT ÊTRE ABSOLUE (pas relative)
   ❌ /src/assets/images/...
   ✓ https://storage.googleapis.com/...

3. SLUG DOIT ÊTRE UNIQUE
   ❌ Éviter les espaces et caractères spéciaux
   ✓ inauguration-nouveau-centre (avec tirets)

4. EXCERPT DOIT ÊTRE COURT
   ❌ 500 caractères
   ✓ 150-160 caractères (optimal pour réseaux sociaux)


═══════════════════════════════════════════════════════════════════════════════

🔍 DÉPANNAGE - CHECKLIST:


Le lien ne s'affiche pas sur WhatsApp avec image:
──────────────────────────────────────────────────

□ Vérifier que article.image est HTTPS (pas HTTP)
□ Vérifier la taille: min 1200x630px
□ Vérifier le format: JPEG ou PNG
□ Vérifier que l'image est accessible (copier l'URL dans navigateur)
□ Utiliser Facebook Debugger "Scrape Again"
□ Attendre 10 secondes et réessayer
□ Vérifier /debug-meta-tags que les meta tags sont générés
□ Vérifier Ctrl+U que og:image est dans le HTML


Meta tags ne s'affichent pas dans le code source (Ctrl+U):
───────────────────────────────────────────────────────────

□ Aller à /debug-meta-tags
□ Remplir le formulaire avec les bonnes infos
□ Cliquer "Appliquer les métadonnées"
□ Vérifier que les checkmarks verts s'affichent
□ Si toujours pas: vérifier la console (F12 → Console)
□ Chercher les erreurs JavaScript


Image affichée mais titre/description manquants:
─────────────────────────────────────────────────

□ Vérifier article.title existe
□ Vérifier article.excerpt existe
□ Vérifier qu'ils ne sont pas vides
□ Vérifier /debug-meta-tags


Cache Facebook trop vieux:
───────────────────────────

□ Aller à Facebook Debugger
□ Entrer l'URL
□ Cliquer "Scrape Again" (pour forcer la mise à jour)
□ Attendre 5-10 secondes
□ Réessayer


═══════════════════════════════════════════════════════════════════════════════

📊 EXEMPLE DE RENDU FINAL:

Quand on envoie ce lien sur WhatsApp:
https://www.egenttogo.com/article/inauguration-nouveau-centre

On devrait voir:
┌─────────────────────────────────────────┐
│                                         │
│   [IMAGE 1200x630 de l'article]        │
│                                         │
│ Inauguration du Nouveau Centre         │
│ EGENT-TOGO                             │
│                                         │
│ Découvrez notre nouvel espace de       │
│ 5000 m² entièrement dédié aux          │
│ services...                            │
│                                         │
│ www.egenttogo.com                      │
│                                         │
└─────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════

✅ VALIDATION FINALE:

Avant de dire "c'est bon":

1. Test local (/debug-meta-tags) ✅
2. Code source montre meta tags (Ctrl+U) ✅
3. Facebook Debugger affiche l'aperçu ✅
4. Twitter Card Validator affiche l'image ✅
5. Test réel sur WhatsApp/Facebook ✅


═══════════════════════════════════════════════════════════════════════════════
