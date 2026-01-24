/**
 * Composable pour gérer les données structurées JSON-LD avancées
 * Support complet pour Organization, Product, Service, Article, BreadcrumbList, etc.
 */

export function useStructuredData() {
  const getBaseUrl = () => {
    if (typeof window === 'undefined') return 'https://www.egenttogo.com'
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    
    if (hostname.includes('localhost')) return `${protocol}//localhost:5173`
    if (hostname.includes('github.io')) return 'https://alifoe.github.io/EGENT_TOGO'
    
    return `${protocol}//${hostname}`
  }

  /**
   * Ajouter une donnée structurée JSON-LD au head
   */
  const addStructuredData = (data) => {
    // Supprimer l'ancien script JSON-LD s'il existe
    const oldScript = document.querySelector(`script[type="application/ld+json"][data-id="${data['@id'] || 'default'}"]`)
    if (oldScript) oldScript.remove()

    // Créer et ajouter le nouveau script
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-id', data['@id'] || 'default')
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }

  /**
   * Organisation (Company/Business)
   */
  const addOrganization = (options = {}) => {
    const baseUrl = getBaseUrl()
    const data = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#organization`,
      name: options.name || 'EGENT TOGO',
      alternateName: 'EGENT TOGO',
      description: options.description || 'Solutions innovantes en électricité, énergie solaire et climatisation au Togo',
      url: baseUrl,
      logo: `${baseUrl}/src/assets/images/logo.png`,
      image: `${baseUrl}/src/assets/images/logo_marque.png`,
      sameAs: [
        'https://www.facebook.com/EGENTTOGO',
        'https://www.instagram.com/egenttogo',
        'https://www.linkedin.com/company/EGENT TOGO'
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: options.streetAddress || 'Lomé',
        addressLocality: 'Lomé',
        addressRegion: 'Région Maritime',
        postalCode: options.postalCode || '00228',
        addressCountry: 'TG'
      },
      telephone: options.telephone || '+228 22 51 63 09',
      email: options.email || 'contact@egenttogo.com',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: options.telephone || '+228 22 51 63 09',
        email: options.email || 'contact@egenttogo.com'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Togo'
      },
      priceRange: options.priceRange || '$$$'
    }

    addStructuredData(data)
    return data
  }

  /**
   * Fil d'Ariane (Breadcrumb)
   */
  const addBreadcrumb = (items = []) => {
    const baseUrl = getBaseUrl()
    const breadcrumbItems = [
      { position: 1, name: 'Accueil', item: baseUrl },
      ...items
    ]

    const data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item
      }))
    }

    addStructuredData(data)
    return data
  }

  /**
   * Produit
   */
  const addProduct = (product) => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': product.id || 'product',
      name: product.name,
      description: product.description,
      image: product.image,
      brand: {
        '@type': 'Brand',
        name: 'EGENT TOGO'
      },
      offers: {
        '@type': 'Offer',
        price: product.price || 'N/A',
        priceCurrency: product.currency || 'XOF',
        availability: product.availability || 'https://schema.org/InStock'
      },
      aggregateRating: product.rating ? {
        '@type': 'AggregateRating',
        ratingValue: product.rating.value,
        ratingCount: product.rating.count
      } : undefined
    }

    // Supprimer les propriétés undefined
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key])
    addStructuredData(data)
    return data
  }

  /**
   * Service
   */
  const addService = (service) => {
    const baseUrl = getBaseUrl()
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': service.id || 'service',
      name: service.name,
      description: service.description,
      image: service.image,
      serviceType: service.serviceType || 'Installation',
      provider: {
        '@type': 'LocalBusiness',
        name: 'EGENT TOGO',
        url: baseUrl
      },
      areaServed: {
        '@type': 'Country',
        name: 'Togo'
      },
      offers: {
        '@type': 'Offer',
        price: service.price || 'Devis sur demande',
        priceCurrency: 'XOF'
      }
    }

    addStructuredData(data)
    return data
  }

  /**
   * Article/BlogPost
   */
  const addArticle = (article) => {
    const baseUrl = getBaseUrl()
    const data = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      '@id': article.id || 'article',
      headline: article.title,
      description: article.description,
      image: article.image,
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      author: {
        '@type': 'Organization',
        name: 'EGENT TOGO',
        url: baseUrl
      },
      publisher: {
        '@type': 'Organization',
        name: 'EGENT TOGO',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/src/assets/images/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': article.url || baseUrl
      }
    }

    addStructuredData(data)
    return data
  }

  /**
   * FAQ
   */
  const addFAQ = (faqs = []) => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }

    addStructuredData(data)
    return data
  }

  /**
   * Galerie d'images
   */
  const addImageGallery = (images = []) => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      associatedMedia: images.map((img, index) => ({
        '@type': 'ImageObject',
        url: img.url,
        name: img.title || `Image ${index + 1}`,
        description: img.description,
        uploadDate: img.uploadDate
      }))
    }

    addStructuredData(data)
    return data
  }

  /**
   * Évaluation/Avis
   */
  const addReview = (review) => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': review.id || 'review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: review.text,
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.datePublished
    }

    addStructuredData(data)
    return data
  }

  /**
   * AggregateRating
   */
  const addAggregateRating = (targetId, rating) => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      '@id': `${targetId}#aggregateRating`,
      ratingValue: rating.value,
      ratingCount: rating.count,
      bestRating: '5',
      worstRating: '1'
    }

    addStructuredData(data)
    return data
  }

  return {
    addStructuredData,
    addOrganization,
    addBreadcrumb,
    addProduct,
    addService,
    addArticle,
    addFAQ,
    addImageGallery,
    addReview,
    addAggregateRating
  }
}
