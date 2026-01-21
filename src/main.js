import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import { googleAnalyticsConfig } from './config/analytics'

const app = createApp(App)
app.use(router)

// Initialize Google Analytics 4
// Inject le script GA dans le document
if (typeof window !== 'undefined') {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || googleAnalyticsConfig.measurementId
  
  // Créer et injecter le script GA
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
  
  // Initialiser gtag
  window.dataLayer = window.dataLayer || []
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date())
  gtag('config', measurementId, {
    ...googleAnalyticsConfig.config,
    'page_path': window.location.pathname,
    'page_title': document.title,
    'page_location': window.location.href
  })
  window.gtag = gtag
  window.GA_MEASUREMENT_ID = measurementId
}

// Router tracking automatique
router.afterEach((to, from) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: to.meta.title || to.name,
      page_location: window.location.href,
      page_path: to.path
    })
  }
})

app.mount('#app')
