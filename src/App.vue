<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
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
