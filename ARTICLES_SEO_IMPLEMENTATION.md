# 📰 Système de Gestion des Articles avec Prévisualisation SEO

## Vue d'ensemble

Le projet EGENT-TOGO inclut maintenant un système complet de gestion d'articles avec support optimal pour la partage sur les réseaux sociaux (Facebook, LinkedIn, Twitter).

## 🎯 Fonctionnalités Implémentées

### 1. **Prévisualisation de Lien (Link Preview)**
   - ✅ Image principal de l'article affichée en grand
   - ✅ Titre accrocheur
   - ✅ Description/extrait pertinent
   - ✅ URL du lien claire

### 2. **Métadonnées Open Graph**
   - ✅ `og:title` - Titre de l'article
   - ✅ `og:description` - Description/extrait
   - ✅ `og:image` - Image principale (1200x630px)
   - ✅ `og:url` - URL complète de l'article
   - ✅ `og:type` - Type "article"
   - ✅ `og:site_name` - "EGENT-TOGO"
   - ✅ `og:locale` - Localisation "fr_FR"

### 3. **Twitter Card Tags**
   - ✅ `twitter:card` - "summary_large_image"
   - ✅ `twitter:title` - Titre de l'article
   - ✅ `twitter:description` - Description
   - ✅ `twitter:image` - Image de l'article

### 4. **Résolution d'URL Automatique**
   - ✅ Détection de l'environnement (localhost, GitHub Pages, production)
   - ✅ Conversion des chemins relatifs en URLs absolutes
   - ✅ Support multi-domaines

## 📁 Fichiers Clés

### `src/composables/useSEOMeta.js`
Composable Vue 3 qui:
- Gère les métadonnées Open Graph
- Détecte l'environnement de déploiement
- Convertit les chemins d'image relatifs en URLs absolutes
- Injecte les balises meta dans le `<head>` dynamiquement

### `src/pages/ArticleDetail.vue`
Page de détail d'article qui:
- Charge l'article sélectionné
- Appelle `setMeta()` pour mettre à jour les métadonnées
- Affiche le contenu complet de l'article
- Affiche les articles connexes

### `src/pages/News.vue`
Page liste des articles qui:
- Affiche les articles publiés
- Permet de cliquer pour voir le détail

## 🔄 Flux de Données

```
1. Utilisateur clique sur un article
   ↓
2. ArticleDetail.vue charge
   ↓
3. onMounted() s'exécute
   ↓
4. setMeta() est appelé avec:
   - title: "Titre de l'article"
   - description: "Extrait de l'article"
   - imagePath: "/src/assets/images/image.jpg"
   - pathname: "/actualites/article-slug"
   ↓
5. useSEOMeta convertit les chemins relatifs en URLs absolutes:
   /src/assets/images/image.jpg
   → https://www.egenttogo.com/src/assets/images/image.jpg
   ↓
6. Balises meta sont injectées dans <head>
   ↓
7. Utilisateur partage le lien sur Facebook/LinkedIn
   ↓
8. Réseau social récupère les métadonnées
   ↓
9. Prévisualisation affiche: Image + Titre + Description + URL
```

## 📊 Structure d'Article

```javascript
{
  id: 1,
  slug: 'inauguration-nouveau-centre',        // URL slug
  title: 'Inauguration du nouveau centre',    // Titre (50-60 car)
  category: 'Actualité',                       // Catégorie
  date: '5 Jan 2026',                          // Date de publication
  image: imgHeadepage,                         // Image principale (1200x630)
  excerpt: 'Découvrez le lancement...',       // Description (150-160 car)
  content: [                                   // Contenu complet
    'Paragraphe 1...',
    'Paragraphe 2...',
    // ...
  ]
}
```

## 🌐 Environnements Supportés

### Développement
- **URL Base**: `http://localhost:5173`
- **Image URL**: `http://localhost:5173/src/assets/images/...`

### Production (egenttogo.com)
- **URL Base**: `https://www.egenttogo.com`
- **Image URL**: `https://www.egenttogo.com/src/assets/images/...`

### GitHub Pages
- **URL Base**: `https://alifoe.github.io/EGENT_TOGO`
- **Image URL**: `https://alifoe.github.io/EGENT_TOGO/src/assets/images/...`

## 📱 Test de Prévisualisation

### Facebook
1. Accédez à: https://developers.facebook.com/tools/debug/sharing/
2. Collez l'URL: `http://localhost:5173/actualites/inauguration-nouveau-centre`
3. Cliquez "Scrape Again"
4. Vérifiez que l'image, titre et description s'affichent

### LinkedIn
1. Accédez à: https://www.linkedin.com/feed/inspector/
2. Collez l'URL de l'article
3. Vérifiez la prévisualisation

### Twitter/X
1. Accédez à: https://cards-dev.twitter.com/validator
2. Collez l'URL
3. Vérifiez le rendu Twitter Card

## 💡 Points Importants

### Image de l'Article
- **Dimensions**: 1200 x 630 pixels (ratio 1.91:1)
- **Format**: WebP, JPEG ou PNG
- **Taille**: < 2 MB
- **Qualité**: Haute résolution pour un affichage crisp

### Titre de l'Article
- **Longueur idéale**: 50-60 caractères
- **Style**: Clair, accrocheur, sans "- EGENT-TOGO" (ajouté auto)
- **Éviter**: Symboles spéciaux, guillemets

### Description/Extrait
- **Longueur idéale**: 150-160 caractères
- **Contenu**: Résumé pertinent du contenu
- **Enjeu**: Doit donner envie de cliquer
- **Pas de**: Répétition du titre

## 🎨 Optimisations Appliquées

1. **Canonical URL** - Évite les duplicata SEO
2. **Twitter Card Summary Large Image** - Optimal pour Twitter
3. **Image dimensions** - Spécifiées pour rendu correct
4. **Localisation** - Définie à "fr_FR"
5. **Type d'article** - Signale aux moteurs de recherche qu'il s'agit d'un article
6. **Console logging** - Debug facile des métadonnées

## 🚀 Utilisation

### Ajouter un Nouvel Article

```javascript
// Dans articlesData de ArticleDetail.vue
'nouveau-article': {
  id: 7,
  slug: 'nouveau-article',
  title: 'Titre de votre article (50-60 car)',
  category: 'Catégorie',
  date: '17 Jan 2026',
  image: imgMonImage,  // Importer l'image en haut
  excerpt: 'Description courte (150-160 car)...',
  content: [
    'Contenu paragraphe 1...',
    'Contenu paragraphe 2...',
  ]
}
```

Les métadonnées seront automatiquement mises à jour lors de la navigation!

## ✨ Résultat Final

Quand quelqu'un partage un article sur les réseaux sociaux:

**Facebook/LinkedIn Preview**:
```
┌─────────────────────────────┐
│  [IMAGE 1200x630]           │
│                             │
│  Titre de l'article         │
│  Description courte...      │
│  www.egenttogo.com/art...   │
└─────────────────────────────┘
```

**Résultat**: Un lien attrayant qui incite au clic! 🎯

## 📚 Fichiers de Référence

- [ARTICLE_SEO_GUIDE.md](./ARTICLE_SEO_GUIDE.md) - Guide détaillé SEO
- [test-seo-meta.sh](./test-seo-meta.sh) - Script de test
- [src/composables/useSEOMeta.js](./src/composables/useSEOMeta.js) - Composable
- [src/pages/ArticleDetail.vue](./src/pages/ArticleDetail.vue) - Page article

---

**Créé le**: 17 Jan 2026
**Dernière mise à jour**: 17 Jan 2026
**Status**: ✅ Production Ready
