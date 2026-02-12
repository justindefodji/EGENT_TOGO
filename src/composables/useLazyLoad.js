/**
 * Composable pour lazy loading d'images avec support WebP
 */

import { onMounted, ref } from 'vue'

export function useLazyLoad() {
  const imageRefs = ref([])

  const setupLazyLoad = (imgElements) => {
    // Utiliser Intersection Observer pour le lazy loading
    if (!('IntersectionObserver' in window)) {
      // Fallback pour les anciens navigateurs
      imgElements.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src
          if (img.dataset.srcset) img.srcset = img.dataset.srcset
        }
      })
      return
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            if (img.dataset.srcset) img.srcset = img.dataset.srcset
            img.classList.add('loaded')
            observer.unobserve(img)
          }
        }
      })
    }, {
      rootMargin: '50px' // Charger 50px avant que l'image soit visible
    })

    imgElements.forEach(img => imageObserver.observe(img))
  }

  onMounted(() => {
    const lazyImages = document.querySelectorAll('img[data-src]')
    if (lazyImages.length > 0) {
      setupLazyLoad(lazyImages)
    }
  })

  return {
    setupLazyLoad
  }
}
