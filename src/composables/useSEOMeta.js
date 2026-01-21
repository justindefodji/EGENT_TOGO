/**
 * Composable pour gérer les métadonnées Open Graph et les métadonnées de prévisualisation
 * Optimisé pour la prévisualisation de lien sur Facebook, LinkedIn, Twitter et autres réseaux sociaux
 * Robot de détection automatique des métadonnées pour partage sur les réseaux sociaux
 */

export function useSEOMeta() {
  // Déterminer le domaine de base
  const getBaseUrl = () => {
    if (typeof window === 'undefined') return 'https://egenttogo.com'
    
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
      return `${protocol}//localhost:5173`
    }
    if (hostname.includes('github.io')) {
      return 'https://alifoe.github.io/EGENT_TOGO'
    }
    if (hostname.includes('egenttogo.com')) {
      return 'https://www.egenttogo.com'
    }
    
    return `${protocol}//${hostname}`
  }

  /**
   * Convertir une image locale en URL absolue
   * Gère les images importées de webpack et les chemins relatifs
   * ✅ Optimisé pour WhatsApp, Facebook, Twitter et tous les réseaux sociaux
   */
  const resolveImageUrl = (imagePath) => {
    if (!imagePath) {
      return `${getBaseUrl()}/src/assets/images/logo.png`
    }
    
    const baseUrl = getBaseUrl()
    
    // Si c'est déjà une URL absolue (http/https) - PRÉFÉRÉ pour les réseaux sociaux
    if (imagePath.startsWith('http')) {
      return imagePath
    }
    
    // Si c'est une URL de données (base64) - NON RECOMMANDÉ pour les réseaux sociaux
    if (imagePath.startsWith('data:')) {
      return imagePath
    }
    
    // Si c'est un blob Webpack (image importée en Vue)
    if (imagePath.includes('/') || imagePath.includes('\\')) {
      // Pour les images dans src/assets, on les sert depuis /src/assets/
      const resolvedUrl = `${baseUrl}/src${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
      return resolvedUrl
    }
    
    // Chemin par défaut
    const defaultUrl = `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
    return defaultUrl
  }

  /**
   * Valider que les métadonnées sont correctement définies
   * CRITIQUE POUR LE PARTAGE SUR LES RÉSEAUX SOCIAUX
   */
  const validateMetaTags = () => {
    const checks = {
      ogTitle: !!document.querySelector('meta[property="og:title"]'),
      ogDescription: !!document.querySelector('meta[property="og:description"]'),
      ogImage: !!document.querySelector('meta[property="og:image"]'),  // ✅ CRITIQUE
      ogUrl: !!document.querySelector('meta[property="og:url"]'),
      ogType: !!document.querySelector('meta[property="og:type"]'),
      ogSiteName: !!document.querySelector('meta[property="og:site_name"]'),
      twitterCard: !!document.querySelector('meta[name="twitter:card"]'),
      twitterImage: !!document.querySelector('meta[name="twitter:image"]'),  // ✅ CRITIQUE
      whatsappImage: !!document.querySelector('meta[property="og:image"]'),
      
      description: !!document.querySelector('meta[name="description"]'),
      canonical: !!document.querySelector('link[rel="canonical"]'),
      jsonLd: !!document.querySelector('script[type="application/ld+json"]')
    }
    
    const isValid = Object.values(checks).every(v => v === true)
    
    // ✅ AFFICHAGE DE L'IMAGE RÉSOLVUE POUR VÉRIFICATION
    const ogImageTag = document.querySelector('meta[property="og:image"]')
    const twitterImageTag = document.querySelector('meta[name="twitter:image"]')
    
    return { isValid, details: checks }
  }

  const setMeta = (title, description, imagePath, pathname = '/', options = {}) => {
    const baseUrl = getBaseUrl()
    
    // ✅ Résoudre l'URL de l'image avec validation stricte
    const imageUrl = resolveImageUrl(imagePath)
    
    // Construire l'URL complète
    const fullUrl = `${baseUrl}${pathname}`

    // Mettre à jour le titre de la page
    document.title = `${title}`

    // Valeurs par défaut des options
    const ogType = options.type || 'website'
    const imageWidth = options.imageWidth || '1200'
    const imageHeight = options.imageHeight || '630'
    const locale = options.locale || 'fr_FR'
    const siteName = options.siteName || 'EGENT-TOGO'

    // ✅ Open Graph Tags - OPTIMISÉ POUR TOUS LES RÉSEAUX SOCIAUX
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },  // IMAGE - CRITIQUE POUR WhatsApp, Facebook, etc.
      { property: 'og:image:width', content: imageWidth },
      { property: 'og:image:height', content: imageHeight },
      { property: 'og:image:type', content: 'image/jpeg' },  // Accepté par tous les réseaux
      { property: 'og:image:secure_url', content: imageUrl }, // URL sécurisée pour HTTPS
      { property: 'og:image:alt', content: title }, // ✅ ALT TEXT pour accessibilité et partage
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: locale },
      
      // ✅ Twitter Card (Summary Large Image) - OPTIMISÉ POUR TWITTER/X
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },  // IMAGE pour Twitter
      { name: 'twitter:image:alt', content: title },
      { name: 'twitter:site', content: '@egenttogo' },
      { name: 'twitter:creator', content: '@egenttogo' },
      
      // ✅ Meta Description et Keywords
      { name: 'description', content: description },
      { name: 'keywords', content: 'électricité, énergie solaire, climatisation, Togo, EGENT' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'language', content: 'French' },
      
      // ✅ Canonical URL pour éviter le contenu dupliqué
      { rel: 'canonical', href: fullUrl },
    ]

    // ✅ Supprimer les anciennes métadonnées (évite les doublons)
    ogTags.forEach(tag => {
      let selector
      if (tag.property) {
        selector = `meta[property="${tag.property}"]`
      } else if (tag.name) {
        selector = `meta[name="${tag.name}"]`
      } else if (tag.rel) {
        selector = `link[rel="${tag.rel}"]`
      }
      
      if (selector) {
        const existing = document.querySelector(selector)
        if (existing) existing.remove()
      }
    })

    // ✅ Ajouter les nouvelles métadonnées
    ogTags.forEach(tag => {
      if (tag.rel) {
        // Gestion des liens canoniques
        const link = document.createElement('link')
        link.rel = tag.rel
        link.href = tag.href
        document.head.appendChild(link)
      } else {
        // Gestion des balises meta
        const meta = document.createElement('meta')
        if (tag.property) {
          meta.setAttribute('property', tag.property)
        } else if (tag.name) {
          meta.setAttribute('name', tag.name)
        }
        meta.content = tag.content
        document.head.appendChild(meta)
      }
    })

    // ✅ Ajouter les données structurées JSON-LD pour meilleure reconnaissance
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': ogType === 'article' ? 'NewsArticle' : 'WebPage',
      headline: title,
      description: description,
      image: imageUrl,  // IMAGE - IMPORTANT POUR LE ROBOT GOOGLE
      url: fullUrl,
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      inLanguage: 'fr-TG',
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/src/assets/images/logo.png`,
          width: 200,
          height: 200
        }
      },
      author: {
        '@type': 'Organization',
        name: siteName
      }
    }

    // ✅ Supprimer les anciennes données JSON-LD
    const oldJsonLd = document.querySelector('script[type="application/ld+json"]')
    if (oldJsonLd) oldJsonLd.remove()

    // ✅ Ajouter les nouvelles données JSON-LD
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLdData)
    document.head.appendChild(script)

    // ✅ Valider après mise à jour
    setTimeout(() => {
      validateMetaTags()
    }, 100)
  }

  return {
    setMeta,
    validateMetaTags,
    resolveImageUrl
  }
}
