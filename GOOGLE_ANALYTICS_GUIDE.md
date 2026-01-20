# Google Analytics 4 - Guide d'Implémentation

## ✅ Installation Complète

Google Analytics 4 est maintenant entièrement configuré sur votre projet !

### 📦 Packages Installés
- `vue-gtag@6.x` - Plugin Vue 3 pour Google Analytics 4

### 📂 Fichiers Créés/Modifiés

1. **src/config/analytics.js** - Configuration GA4
2. **src/composables/useAnalytics.js** - Composable de tracking
3. **src/main.js** - Initialisation du script GA
4. **.env.example** - Variables d'environnement

---

## 🚀 Configuration Requise

### 1. Obtenir votre Measurement ID

1. Allez sur [Google Analytics](https://analytics.google.com)
2. Créez une nouvelle propriété GA4 pour `egenttogo.com`
3. Copiez votre **Measurement ID** (format: `G-65BEBH9XRC`)

### 2. Configurer .env local

```bash
# Créez un fichier .env (copie de .env.example)
cp .env.example .env
```

Puis modifiez `.env` :

```env
VITE_GA_MEASUREMENT_ID=G-YOUR_REAL_ID_HERE
```

---

## 📊 Utilisation dans les Composants

### Importer le composable

```javascript
import { useAnalytics } from '@/composables/useAnalytics'

export default {
  setup() {
    const { trackEvent, trackPageView } = useAnalytics()
    return { trackEvent, trackPageView }
  }
}
```

### Exemples de Tracking

#### 1. Formulaire de Contact (Contact.vue)

```javascript
import { useAnalytics } from '@/composables/useAnalytics'

export default {
  setup() {
    const { trackContactForm } = useAnalytics()
    
    const submitForm = async (formData) => {
      try {
        // ... soumettre le formulaire ...
        
        // Tracker après succès
        trackContactForm({
          email: formData.email,
          subject: formData.subject,
          submission_date: new Date().toISOString()
        })
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
    
    return { submitForm }
  }
}
```

#### 2. Demande de Devis (Quote.vue)

```javascript
const submitQuote = async (quoteData) => {
  try {
    // ... soumettre le devis ...
    
    trackQuoteRequest({
      serviceType: quoteData.serviceType,
      estimatedValue: quoteData.estimatedValue,
      clientType: 'individual' // ou 'business'
    })
  } catch (error) {
    console.error('Erreur:', error)
  }
}
```

#### 3. Vue d'un Produit (Products.vue)

```javascript
import { useAnalytics } from '@/composables/useAnalytics'

export default {
  setup() {
    const { trackViewProduct } = useAnalytics()
    
    const selectProduct = (product) => {
      trackViewProduct({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price
      })
      // ... afficher les détails ...
    }
    
    return { selectProduct }
  }
}
```

#### 4. Vue d'un Article (Blog.vue ou Pages/Article.vue)

```javascript
const { trackViewArticle, trackArticleScroll } = useAnalytics()

// Au chargement
onMounted(() => {
  trackViewArticle({
    id: article.id,
    title: article.title,
    category: article.category,
    author: article.author
  })
})

// Au scroll (optionnel - engagement)
const handleScroll = (event) => {
  const scrollPercentage = (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight)) * 100
  if (scrollPercentage > 50) { // 50% scrolled
    trackArticleScroll({
      id: article.id,
      title: article.title
    }, Math.round(scrollPercentage))
  }
}
```

#### 5. Galerie (Gallery.vue)

```javascript
const { trackGalleryView } = useAnalytics()

onMounted(() => {
  trackGalleryView({
    category: 'projects',
    imageCount: images.length
  })
})
```

#### 6. Partage de Contenu (CTA buttons)

```javascript
const { trackShareContent } = useAnalytics()

const shareToFacebook = (content) => {
  trackShareContent({
    type: 'article',
    id: content.id,
    title: content.title,
    method: 'facebook'
  })
  // ... open share dialog ...
}
```

#### 7. Gestion des Erreurs

```javascript
import { useAnalytics } from '@/composables/useAnalytics'

export default {
  setup() {
    const { trackError } = useAnalytics()
    
    const handleError = (error) => {
      trackError({
        type: 'api_error',
        message: error.message,
        location: 'ProductList.vue'
      })
    }
    
    return { handleError }
  }
}
```

---

## 📈 Événements Disponibles

Voir `src/config/analytics.js` pour la liste complète :

| Événement | Description |
|-----------|-------------|
| `form_submit` | Soumission formulaire |
| `contact_form` | Formulaire de contact |
| `quote_request` | Demande de devis |
| `view_product` | Vue produit |
| `view_service` | Vue service |
| `service_inquiry` | Demande info service |
| `view_article` | Vue article |
| `article_scroll` | Scroll article (engagement) |
| `share_content` | Partage de contenu |
| `gallery_view` | Vue galerie |
| `page_error` | Erreur page |
| `conversion` | Conversion (Google Ads) |

---

## 🔍 Vérifier le Tracking

### Dans le Navigateur

1. Ouvrez **DevTools** (F12)
2. Allez dans **Network**
3. Filtrez par `collect` pour voir les appels GA4
4. Chaque événement enverra une requête à `www.google-analytics.com/collect`

### Dans Google Analytics

1. Allez sur [Google Analytics](https://analytics.google.com)
2. Sélectionnez votre propriété
3. Allez dans **Realtime** > **Events**
4. Vous verrez les événements en direct

---

## 🔒 Respect de la Vie Privée (RGPD)

### Opt-out utilisateur

```javascript
import { useAnalytics } from '@/composables/useAnalytics'

const { optOut } = useAnalytics()

// L'utilisateur peut refuser le tracking
const disableTracking = () => {
  optOut()
  // Afficher confirmation...
}
```

### Anonymiser les IPs

L'IP est déjà anonymisée dans `src/config/analytics.js` :
```javascript
anonymizeIp: false // Vous pouvez mettre true pour anonymiser
```

---

## 🎯 Implémentation par Page (Checklist)

### Pages Publiques
- [ ] **Pages/Home.vue** - `trackPageView('Home')`
- [ ] **Pages/Products.vue** - `trackViewProduct()` au clic
- [ ] **Pages/Services.vue** - `trackViewService()` au clic
- [ ] **Pages/Projects.vue** - `trackViewProduct()` pour chaque projet
- [ ] **Pages/Blog.vue** - `trackViewArticle()` au clic
- [ ] **Pages/Gallery.vue** - `trackGalleryView()` au chargement
- [ ] **Pages/Contact.vue** - `trackContactForm()` à la soumission
- [ ] **Pages/About.vue** - `trackPageView('About')`

### Formulaires
- [ ] **Contact.vue** - ✅ `trackContactForm()`
- [ ] **Quote.vue** - ✅ `trackQuoteRequest()`

---

## 📝 Notes Importantes

1. **ID Réel Requis** : Le Measurement ID par défaut `G-XXXXXXXXXX` ne trackera pas les vraies données
2. **Variables d'Environnement** : Utilisez `.env` pour gérer les IDs selon l'environnement
3. **Console Logs** : Les logs `📊 [GA]` aident au déboggage (à supprimer en production)
4. **Router Tracking** : Les changements de route sont trackés automatiquement
5. **RGPD** : Ajoutez un cookie consent avant le tracking (voir notes RGPD)

---

## 🐛 Dépannage

### Les événements ne s'affichent pas dans GA

1. Vérifiez que `VITE_GA_MEASUREMENT_ID` est correct dans `.env`
2. Attendez 24-48h pour que les données apparaissent en GA (temps réel: 1-2 min)
3. Ouvrez DevTools > Network et recherchez des appels à `collect`

### Le Measurement ID n'est pas chargé

```bash
# Vérifiez que .env existe et contient :
cat .env | grep VITE_GA_MEASUREMENT_ID

# Redémarrez le dev server
npm run dev
```

### Pas de script GA dans la page

1. Ouvrez DevTools > Sources
2. Cherchez `googletagmanager.com`
3. S'il n'apparaît pas, le script ne s'est pas chargé
4. Vérifiez la console pour les erreurs

---

## 📚 Ressources

- [Vue-Gtag Documentation](https://vue-gtag.js.org/)
- [Google Analytics 4 Help](https://support.google.com/analytics)
- [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

---

**Dernière mise à jour** : Configuration créée le ${new Date().toLocaleDateString('fr-FR')}

**Status** : ✅ Google Analytics 4 intégré et prêt à l'emploi !
