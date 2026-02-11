/**
 * Composable pour gérer les Meta Tags Open Graph
 * Basé sur: @vueuse/head
 * Solution recommandée pour le partage sur WhatsApp, Facebook, LinkedIn, Twitter
 * 
 * ⚠️ IMPORTANT: Les réseaux sociaux ne peuvent pas exécuter JavaScript!
 * Le serveur Firebase Functions génère des métadonnées statiques pour les articles.
 */

import { useHead } from '@vueuse/head'

export function useOpenGraphMeta() {
  
  /**
   * Déterminer le domaine de base selon l'environnement
   */
  const getBaseUrl = () => {
    if (typeof window === 'undefined') {
      return process.env.VITE_SITE_URL || 'https://egenttogo.com'
    }
    
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
      return 'http://localhost:5173'
    }
    if (hostname.includes('github.io')) {
      return 'https://alifoe.github.io/EGENT_TOGO'
    }
    if (hostname.includes('egenttogo')) {
      return 'https://www.egenttogo.com'
    }
    
    return `${protocol}//${hostname}`
  }

  /**
   * Valider et normaliser l'URL de l'image
   * Les images doivent être accessibles via HTTPS pour les réseaux sociaux
   */
  const normalizeImageUrl = (imagePath) => {
    const baseUrl = getBaseUrl()
    
    if (!imagePath) {
      return `${baseUrl}/src/assets/images/logo.png`
    }
    
    // Si c'est déjà une URL absolue HTTP/HTTPS
    if (imagePath.startsWith('http')) {
      // S'assurer que c'est HTTPS
      return imagePath.startsWith('https') ? imagePath : imagePath.replace('http:', 'https:')
    }
    
    // Chemin relatif - construire l'URL absolue
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
    return `${baseUrl}${cleanPath}`
  }

  /**
   * Définir les meta tags Open Graph pour un article
   * Appel: setArticleMeta({ titre, description, image, url })
   */
  const setArticleMeta = ({ 
    titre, 
    description, 
    image, 
    url = '/',
    date = null,
    auteur = 'EGENT TOGO',
    categorie = null 
  }) => {
    
    const baseUrl = getBaseUrl()
    const imageUrl = normalizeImageUrl(image)
    const fullUrl = `${baseUrl}${url}`
    
    console.log('🎨 [OpenGraph] Configuration des meta tags')
    console.log('  Titre:', titre)
    console.log('  Description:', description)
    console.log('  Image:', imageUrl)
    console.log('  URL:', fullUrl)

    useHead({
      title: titre,
      meta: [
        // ========================================
        // 🔵 OPEN GRAPH - Facebook, WhatsApp, etc
        // ========================================
        { property: 'og:title', content: titre },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:secure_url', content: imageUrl }, // HTTPS obligatoire
        { property: 'og:image:alt', content: titre },
        { property: 'og:url', content: fullUrl },
        { property: 'og:type', content: 'article' },
        { property: 'og:site_name', content: 'EGENT TOGO' },
        { property: 'og:locale', content: 'fr_TG' },
        
        // ========================================
        // 🐦 TWITTER CARD
        // ========================================
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: titre },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:image:alt', content: titre },
        { name: 'twitter:site', content: '@egenttogo' },
        
        // ========================================
        // 📱 MOBILE & GENERAL META
        // ========================================
        { name: 'description', content: description },
        { name: 'keywords', content: 'électricité, énergie solaire, climatisation, Togo, EGENT' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'French' },
        { name: 'author', content: auteur },
        
        // ========================================
        // 📰 ARTICLE METADATA
        // ========================================
        ...(date ? [
          { property: 'article:published_time', content: date },
          { property: 'article:modified_time', content: date }
        ] : []),
        ...(categorie ? [
          { property: 'article:section', content: categorie }
        ] : []),
        ...(auteur ? [
          { property: 'article:author', content: auteur }
        ] : []),
      ],
      link: [
        // Canonical URL pour éviter le contenu dupliqué
        { rel: 'canonical', href: fullUrl }
      ]
    })
  }

  /**
   * Définir les meta tags pour une page générique
   */
  const setPageMeta = ({ 
    titre, 
    description, 
    image,
    url = '/',
    type = 'website'
  }) => {
    
    const baseUrl = getBaseUrl()
    const imageUrl = normalizeImageUrl(image)
    const fullUrl = `${baseUrl}${url}`

    useHead({
      title: titre,
      meta: [
        { property: 'og:title', content: titre },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:secure_url', content: imageUrl },
        { property: 'og:image:alt', content: titre },
        { property: 'og:url', content: fullUrl },
        { property: 'og:type', content: type },
        { property: 'og:site_name', content: 'EGENT TOGO' },
        { name: 'description', content: description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: titre },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
      ],
      link: [
        { rel: 'canonical', href: fullUrl }
      ]
    })
  }

  /**
   * Générer les données structurées JSON-LD (optionnel mais recommandé)
   * Cela aide Google et les autres moteurs à mieux comprendre le contenu
   */
  const injectJsonLD = (data) => {
    if (typeof window === 'undefined') return
    
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }

  /**
   * Générer une structure JSON-LD pour un article
   */
  const getArticleJsonLD = ({ 
    titre, 
    description, 
    image, 
    url,
    date,
    auteur = 'EGENT TOGO'
  }) => {
    const baseUrl = getBaseUrl()
    
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: titre,
      description: description,
      image: normalizeImageUrl(image),
      datePublished: date,
      dateModified: date,
      author: {
        '@type': 'Organization',
        name: auteur
      },
      publisher: {
        '@type': 'Organization',
        name: 'EGENT TOGO',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/src/assets/images/logo.png`,
          width: 200,
          height: 200
        }
      }
    }
  }

  return {
    setArticleMeta,
    setPageMeta,
    normalizeImageUrl,
    injectJsonLD,
    getArticleJsonLD,
    getBaseUrl
  }
}
