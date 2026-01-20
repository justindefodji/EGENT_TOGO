/**
 * Composable pour tracker les événements Google Analytics 4
 * Permet de tracker: pages, formulaires, produits, conversions, etc.
 */

import { analyticsEvents } from '@/config/analytics'

export function useAnalytics() {
  // Accéder à l'instance gtag globale
  const gtag = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      return window.gtag
    }
    return null
  }

  /**
   * Track une page view
   * Appelé automatiquement mais peut être utile pour les SPA
   */
  const trackPageView = (pageName, pageLocation) => {
    const gtagInstance = gtag()
    if (gtagInstance) {
      gtagInstance('event', 'page_view', {
        page_title: pageName,
        page_location: pageLocation || window.location.href
      })
      console.log('📊 [GA] Page view tracked:', pageName)
    }
  }

  /**
   * Track un événement personnalisé
   * @param {string} eventName - Nom de l'événement
   * @param {object} eventData - Données de l'événement
   */
  const trackEvent = (eventName, eventData = {}) => {
    const gtagInstance = gtag()
    if (gtagInstance) {
      gtagInstance('event', eventName, {
        ...eventData,
        timestamp: new Date().toISOString()
      })
      console.log('📊 [GA] Event tracked:', eventName, eventData)
    }
  }

  /**
   * Track une soumission de formulaire
   * @param {string} formName - Nom du formulaire
   * @param {object} formData - Données du formulaire
   */
  const trackFormSubmit = (formName, formData = {}) => {
    trackEvent(analyticsEvents.FORM_SUBMIT, {
      form_name: formName,
      ...formData
    })
  }

  /**
   * Track une demande de contact
   */
  const trackContactForm = (contactData = {}) => {
    trackEvent(analyticsEvents.CONTACT_FORM, {
      contact_type: 'form_submission',
      ...contactData
    })
  }

  /**
   * Track une demande de devis
   * @param {object} quoteData - Données du devis
   */
  const trackQuoteRequest = (quoteData = {}) => {
    trackEvent(analyticsEvents.QUOTE_REQUEST, {
      quote_type: quoteData.serviceType || 'unknown',
      estimated_value: quoteData.estimatedValue || 'unknown',
      ...quoteData
    })
  }

  /**
   * Track la vue d'un produit
   */
  const trackViewProduct = (productData) => {
    trackEvent(analyticsEvents.VIEW_PRODUCT, {
      product_id: productData.id,
      product_name: productData.name,
      product_category: productData.category,
      product_price: productData.price,
      ...productData
    })
  }

  /**
   * Track la vue d'un service
   */
  const trackViewService = (serviceData) => {
    trackEvent(analyticsEvents.VIEW_SERVICE, {
      service_id: serviceData.id,
      service_name: serviceData.name,
      service_category: serviceData.category,
      ...serviceData
    })
  }

  /**
   * Track une demande d'information sur service
   */
  const trackServiceInquiry = (serviceData = {}) => {
    trackEvent(analyticsEvents.SERVICE_INQUIRY, {
      service_name: serviceData.name || 'unknown',
      service_category: serviceData.category || 'unknown',
      ...serviceData
    })
  }

  /**
   * Track la vue d'un article
   */
  const trackViewArticle = (articleData) => {
    trackEvent(analyticsEvents.VIEW_ARTICLE, {
      article_id: articleData.id,
      article_title: articleData.title,
      article_category: articleData.category,
      article_author: articleData.author,
      ...articleData
    })
  }

  /**
   * Track le scroll d'un article (engagement)
   */
  const trackArticleScroll = (articleData, scrollPercentage) => {
    trackEvent(analyticsEvents.ARTICLE_SCROLL, {
      article_id: articleData.id,
      article_title: articleData.title,
      scroll_percentage: scrollPercentage,
      ...articleData
    })
  }

  /**
   * Track le partage de contenu
   */
  const trackShareContent = (contentData) => {
    trackEvent(analyticsEvents.SHARE_CONTENT, {
      content_type: contentData.type || 'page',
      content_id: contentData.id,
      content_title: contentData.title,
      share_method: contentData.method || 'social',
      ...contentData
    })
  }

  /**
   * Track la galerie
   */
  const trackGalleryView = (galleryData = {}) => {
    trackEvent(analyticsEvents.GALLERY_VIEW, {
      gallery_category: galleryData.category || 'all',
      image_count: galleryData.imageCount || 0,
      ...galleryData
    })
  }

  /**
   * Track un événement d'erreur
   */
  const trackError = (errorData) => {
    trackEvent(analyticsEvents.PAGE_ERROR, {
      error_type: errorData.type || 'unknown',
      error_message: errorData.message || 'Unknown error',
      error_location: errorData.location || window.location.href,
      ...errorData
    })
  }

  /**
   * Track une conversion
   * @param {string} conversionId - ID de la conversion
   * @param {number} conversionValue - Valeur de la conversion
   */
  const trackConversion = (conversionId, conversionValue = 0) => {
    const gtagInstance = gtag()
    if (gtagInstance) {
      gtagInstance('event', 'conversion', {
        send_to: conversionId,
        value: conversionValue,
        currency: 'XOF'
      })
      console.log('📊 [GA] Conversion tracked:', conversionId)
    }
  }

  /**
   * Définir un utilisateur ID personnalisé
   * (pour tracker les utilisateurs identifiés)
   */
  const setUserId = (userId) => {
    const gtagInstance = gtag()
    if (gtagInstance) {
      gtagInstance('config', {
        'user_id': userId
      })
      console.log('📊 [GA] User ID set:', userId)
    }
  }

  /**
   * Définir des propriétés utilisateur personnalisées
   */
  const setUserProperties = (properties) => {
    const gtagInstance = gtag()
    if (gtagInstance) {
      gtagInstance('config', {
        'user_properties': properties
      })
      console.log('📊 [GA] User properties set:', properties)
    }
  }

  /**
   * Opt-out du tracking (respect de la vie privée)
   */
  const optOut = () => {
    if (typeof window !== 'undefined') {
      window[`ga-disable-${window.GA_MEASUREMENT_ID}`] = true
      console.log('📊 [GA] User opted out')
    }
  }

  /**
   * Opt-in du tracking
   */
  const optIn = () => {
    if (typeof window !== 'undefined') {
      delete window[`ga-disable-${window.GA_MEASUREMENT_ID}`]
      console.log('📊 [GA] User opted in')
    }
  }

  return {
    trackPageView,
    trackEvent,
    trackFormSubmit,
    trackContactForm,
    trackQuoteRequest,
    trackViewProduct,
    trackViewService,
    trackServiceInquiry,
    trackViewArticle,
    trackArticleScroll,
    trackShareContent,
    trackGalleryView,
    trackError,
    trackConversion,
    setUserId,
    setUserProperties,
    optOut,
    optIn
  }
}
