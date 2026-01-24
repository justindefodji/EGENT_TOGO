/**
 * Configuration Google Analytics 4 pour EGENT TOGO
 * Support complet du tracking: pages, événements, utilisateurs, conversions
 */

export const googleAnalyticsConfig = {
  // Remplacer par votre ID Google Analytics 4
  measurementId: 'G-65BEBH9XRC', // À remplacer avec votre ID réel
  
  // Configuration avancée
  config: {
    // Activer le debug mode (à désactiver en production)
    debug: false,
    
    // Page view tracking automatique
    pageTrackerScreenviewEnabled: true,
    
    // Anonymiser les IPs
    anonymizeIp: false,
    
    // Cookies - RGPD compliant
    allowGoogleSignals: true,
    allowAdPersonalization: true,
    
    // Timeout de session en secondes (30 minutes par défaut)
    sessionTimeout: 1800,
  }
}

/**
 * Événements personnalisés à tracker
 */
export const analyticsEvents = {
  // Page views
  PAGE_VIEW: 'page_view',
  SCROLL: 'scroll',
  
  // Forms & Conversions
  FORM_SUBMIT: 'form_submit',
  CONTACT_FORM: 'contact_form',
  QUOTE_REQUEST: 'quote_request',
  
  // Product interactions
  VIEW_PRODUCT: 'view_product',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  
  // Service interactions
  VIEW_SERVICE: 'view_service',
  SERVICE_INQUIRY: 'service_inquiry',
  
  // Content
  VIEW_ARTICLE: 'view_article',
  ARTICLE_SCROLL: 'article_scroll',
  DOWNLOAD_CONTENT: 'download_content',
  
  // Engagement
  SHARE_CONTENT: 'share_content',
  VIDEO_PLAY: 'video_play',
  GALLERY_VIEW: 'gallery_view',
  
  // User
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  LOGOUT: 'logout',
  
  // Errors
  PAGE_ERROR: 'page_error',
  FORM_ERROR: 'form_error'
}

/**
 * Conversion IDs (pour Google Ads et autres)
 */
export const conversionTracking = {
  // Google Ads Conversion IDs
  CONTACT_FORM_CONVERSION: {
    id: 'AW-XXXXXXXXXX', // À remplacer
    label: 'contact_form_conversion'
  },
  
  QUOTE_REQUEST_CONVERSION: {
    id: 'AW-XXXXXXXXXX', // À remplacer
    label: 'quote_request_conversion'
  },
  
  SERVICE_INQUIRY_CONVERSION: {
    id: 'AW-XXXXXXXXXX', // À remplacer
    label: 'service_inquiry_conversion'
  }
}

export default googleAnalyticsConfig
