<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-4 py-3">
    <div class="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      <nav class="px-6 lg:px-8 py-4 flex justify-between items-center">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition">
          <div class="relative w-12 h-12">
            <!-- Logo Circle avec électricité -->
            <svg viewBox="0 0 100 100" class="w-full h-full">
              <!-- Cercle extérieur bleu -->
              <circle cx="50" cy="50" r="48" fill="none" stroke="#0369a1" stroke-width="2"/>
              <!-- Éclair central -->
              <path d="M50 20 L60 40 L50 40 L50 70 L40 50 L50 50 Z" fill="#FF9500"/>
              <!-- Point vert en bas -->
              <circle cx="50" cy="75" r="4" fill="#22c55e"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-dark">EGENT-TOGO</span>
        </RouterLink>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink to="/" class="text-orange-500 font-semibold hover:text-orange-600 transition" active-class="text-orange-600">ACCUEIL</RouterLink>
          <RouterLink to="/a-propos" class="text-dark font-semibold hover:text-secondary transition" active-class="text-secondary">À PROPOS</RouterLink>
          <RouterLink to="/services-produits" class="text-dark font-semibold hover:text-secondary transition" active-class="text-secondary">SERVICES & PRODUITS</RouterLink>
          <RouterLink to="/galerie" class="text-dark font-semibold hover:text-secondary transition" active-class="text-secondary">GALERIE</RouterLink>
        </div>

        <!-- CTA Button -->
        <button class="btn-primary hidden md:block rounded-full">Demander un devis</button>

        <!-- Menu Mobile -->
        <button class="md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-gray-50 border-t">
        <div class="px-4 py-4 space-y-4">
          <RouterLink to="/" class="block text-orange-500 font-semibold hover:text-orange-600" @click="mobileMenuOpen = false">ACCUEIL</RouterLink>
          <RouterLink to="/a-propos" class="block text-dark font-semibold hover:text-secondary" @click="mobileMenuOpen = false">À PROPOS</RouterLink>
          <RouterLink to="/services-produits" class="block text-dark font-semibold hover:text-secondary" @click="mobileMenuOpen = false">SERVICES & PRODUITS</RouterLink>
          <RouterLink to="/galerie" class="block text-dark font-semibold hover:text-secondary" @click="mobileMenuOpen = false">GALERIE</RouterLink>
          <button class="btn-primary w-full rounded-full">Demander un devis</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>
