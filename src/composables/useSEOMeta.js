/**
 * Composable pour gérer les métadonnées Open Graph et les métadonnées de prévisualisation
 * Optimisé pour la prévisualisation de lien sur Facebook, LinkedIn, Twitter et autres réseaux sociaux
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

  const setMeta = (title, description, imagePath, pathname = '/', options = {}) => {
    const baseUrl = getBaseUrl()
    
    // Convertir le chemin de l'image en URL absolue
    let imageUrl = imagePath
    if (imagePath && !imagePath.startsWith('http')) {
      imageUrl = `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
    }
    
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

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: imageWidth },
      { property: 'og:image:height', content: imageHeight },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: locale },
      
      // Twitter Card (Summary Large Image)
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:site', content: '@egenttogo' },
      
      // Meta Description et Keywords
      { name: 'description', content: description },
      { name: 'keywords', content: 'électricité, énergie solaire, climatisation, Togo, EGENT' },
      
      // Canonical URL
      { rel: 'canonical', href: fullUrl },
    ]

    // Supprimer les anciennes métadonnées
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

    // Ajouter les nouvelles métadonnées
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

    // Log pour debug
    console.log('SEO Meta Tags actualisés:', {
      title,
      description,
      imageUrl,
      fullUrl,
      ogType
    })
  }

  return {
    setMeta
  }
}
