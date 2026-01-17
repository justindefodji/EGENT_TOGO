# Guide SEO pour les Articles - Prévisualisation de Lien

## 📱 Fonctionnement

Quand un utilisateur partage un lien d'article sur les réseaux sociaux (Facebook, LinkedIn, Twitter), la prévisualisation affiche automatiquement:

1. **Image principale de l'article** 🖼️
2. **Titre de l'article** 📝
3. **Description/Extrait** 📄
4. **URL du lien** 🔗

## 🔧 Configuration Technique

### Métadonnées Open Graph utilisées

```html
<meta property="og:title" content="Titre de l'article">
<meta property="og:description" content="Description/extrait de l'article">
<meta property="og:image" content="https://www.egenttogo.com/src/assets/images/...">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://www.egenttogo.com/actualites/article-slug">
<meta property="og:type" content="article">
<meta property="og:site_name" content="EGENT-TOGO">
<meta property="og:locale" content="fr_FR">
```

### Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Titre de l'article">
<meta name="twitter:description" content="Description de l'article">
<meta name="twitter:image" content="https://...">
```

## 📄 Structure d'un Article

### Dans `ArticleDetail.vue`:

```javascript
const articlesData = {
  'mon-article-slug': {
    id: 1,
    slug: 'mon-article-slug',
    title: 'Titre de l\'article',           // ✅ Affiché en gras dans la prévisualisation
    category: 'Catégorie',
    date: '15 Jan 2026',
    image: imgMonImage,                      // ✅ Affichée en grand dans la prévisualisation
    excerpt: 'Description courte...',        // ✅ Affichée sous le titre dans la prévisualisation
    content: [
      'Paragraphe 1...',
      'Paragraphe 2...',
    ]
  }
}
```

## 🌍 Résolution d'URL Automatique

Le composable `useSEOMeta.js` convertit automatiquement:

### Développement (localhost)
```
/src/assets/images/mon-image.jpg
→ http://localhost:5173/src/assets/images/mon-image.jpg
```

### Production (egenttogo.com)
```
/src/assets/images/mon-image.jpg
→ https://www.egenttogo.com/src/assets/images/mon-image.jpg
```

### GitHub Pages
```
/src/assets/images/mon-image.jpg
→ https://alifoe.github.io/EGENT_TOGO/src/assets/images/mon-image.jpg
```

## ✅ Recommandations

### Image de l'article
- **Dimensions recommandées**: 1200 x 630 pixels
- **Format**: WebP, JPEG ou PNG
- **Taille**: < 2 MB
- **Aspect ratio**: 1.91:1 (idéal pour Facebook)

### Titre
- **Longueur**: 50-60 caractères (idéal pour affichage)
- **Lisibilité**: Clair et accrocheur

### Description/Extrait
- **Longueur**: 150-160 caractères
- **Contenu**: Résumé du contenu de l'article
- **Lisibilité**: Doit donner envie de cliquer

## 🧪 Test de Prévisualisation

### Facebook Sharing Debugger
Accédez à: https://developers.facebook.com/tools/debug/sharing/
- Collez le lien de votre article
- Cliquez sur "Scrape Again"
- Vérifiez que l'image, le titre et la description s'affichent correctement

### LinkedIn URL Inspector
Accédez à: https://www.linkedin.com/feed/inspector/
- Collez le lien de votre article
- Vérifiez la prévisualisation

### Twitter Card Validator
Accédez à: https://cards-dev.twitter.com/validator
- Collez le lien de votre article
- Vérifiez le rendu Twitter Card

## 🎯 Code de Mise à Jour

Lors de la navigation vers une page d'article, le code suivant s'exécute:

```javascript
onMounted(() => {
  const currentArticle = article.value
  if (currentArticle) {
    setMeta(
      currentArticle.title,
      currentArticle.excerpt,
      currentArticle.image,
      `/actualites/${currentArticle.slug}`,
      {
        type: 'article',
        siteName: 'EGENT-TOGO',
        locale: 'fr_FR',
        imageWidth: '1200',
        imageHeight: '630'
      }
    )
  }
})
```

Cela:
1. ✅ Extrait le titre, description et image de l'article
2. ✅ Construit l'URL complète
3. ✅ Crée/met à jour les balises meta dans le `<head>`
4. ✅ Convertit les chemins d'image relatifs en URLs absolues

## 🚀 Résultat Final

Quand quelqu'un partage le lien sur Facebook/LinkedIn:

```
┌─────────────────────────────────┐
│   IMAGE (1200x630)              │
│                                 │
│ ┌───────────────────────────┐   │
│ │ Titre de l'article        │   │
│ │ Description courte...     │   │
│ │ www.egenttogo.com/...     │   │
│ └───────────────────────────┘   │
└─────────────────────────────────┘
```

✨ **Résultat**: Lien attrayant avec image, titre et description bien affichés!
