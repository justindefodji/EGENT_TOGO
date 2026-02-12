/**
 * Plugin Vue pour le lazy loading automatique des images
 */

export default {
  install(app) {
    // Directive personnalisée pour lazy loading
    app.directive('lazy', {
      mounted(el) {
        // Ajouter un préchargement pour les images
        if (!('IntersectionObserver' in window)) {
          // Fallback pour les navigateurs sans support
          if (el.dataset.src) {
            el.src = el.dataset.src
            if (el.dataset.srcset) el.srcset = el.dataset.srcset
          }
          return
        }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target
              if (img.dataset.src) {
                // Ajouter une image placeholder durant le chargement
                const temp = img.src
                img.src = img.dataset.src
                if (img.dataset.srcset) img.srcset = img.dataset.srcset
                
                img.onload = () => {
                  img.classList.add('lazy-loaded')
                  observer.unobserve(img)
                }
                
                img.onerror = () => {
                  img.src = temp // Revenir au placeholder en cas d'erreur
                }
              }
            }
          })
        }, {
          rootMargin: '100px'
        })

        observer.observe(el)
      }
    })
  }
}
