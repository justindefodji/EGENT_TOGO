import { onMounted } from 'vue'

export function useCursorFollowText() {
  const setupCursorFollowText = () => {
    const titles = document.querySelectorAll('h1, h2')
    
    document.addEventListener('mousemove', (e) => {
      titles.forEach(title => {
        const rect = title.getBoundingClientRect()
        const titleCenterX = rect.left + rect.width / 2
        const titleCenterY = rect.top + rect.height / 2
        
        const mouseX = e.clientX
        const mouseY = e.clientY
        
        const distX = (mouseX - titleCenterX) * 0.15
        const distY = (mouseY - titleCenterY) * 0.15
        
        // Limiter le mouvement
        const maxDist = 15
        const limitedX = Math.max(-maxDist, Math.min(maxDist, distX))
        const limitedY = Math.max(-maxDist, Math.min(maxDist, distY))
        
        title.style.transform = `translate(${limitedX}px, ${limitedY}px)`
        title.style.transition = 'transform 0.3s ease-out'
      })
    })
  }

  onMounted(() => {
    setupCursorFollowText()
  })
}
