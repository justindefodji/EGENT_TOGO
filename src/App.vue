<script setup>
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const router = useRouter()

const updateTitle = (route) => {
  const pageTitle = route.meta?.title || 'Accueil'
  document.title = `EGENT TOGO - ${pageTitle}`
}

// Mettre à jour le titre au chargement initial
updateTitle(router.currentRoute.value)

// Mettre à jour le titre quand la route change
watch(() => router.currentRoute.value, (newRoute) => {
  updateTitle(newRoute)
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <Header />
    <main class="pt-28">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>
