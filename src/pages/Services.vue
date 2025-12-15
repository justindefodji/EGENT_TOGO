<template>
  <div class="bg-white pt-32 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-5xl md:text-6xl font-bold text-dark mb-4">SERVICES & PRODUITS</h1>
      <p class="text-xl text-gray-600 mb-16">Découvrez toutes nos solutions énergétiques durables</p>

      <!-- Services Section -->
      <div class="mb-20">
        <h2 class="text-4xl font-bold text-dark mb-12">Nos Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Service 1 -->
          <div class="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div class="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span class="text-6xl">⚡</span>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-dark mb-3">Électricité Générale</h3>
              <p class="text-gray-600 mb-4">Solutions d'électricité générale pour vos besoins résidentiels et commerciaux.</p>
              <ul class="text-sm text-gray-600 space-y-2">
                <li>✓ Installation électrique</li>
                <li>✓ Maintenance</li>
                <li>✓ Dépannage 24/7</li>
              </ul>
            </div>
          </div>

          <!-- Service 2 -->
          <div class="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span class="text-6xl">❄️</span>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-dark mb-3">Climatisation & Froid</h3>
              <p class="text-gray-600 mb-4">Systèmes de climatisation et de refroidissement efficaces et durables.</p>
              <ul class="text-sm text-gray-600 space-y-2">
                <li>✓ Installation climatisation</li>
                <li>✓ Maintenance régulière</li>
                <li>✓ Réparation rapide</li>
              </ul>
            </div>
          </div>

          <!-- Service 3 -->
          <div class="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div class="h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <span class="text-6xl">☀️</span>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-dark mb-3">Énergie Solaire</h3>
              <p class="text-gray-600 mb-4">Solutions solaires complètes pour une énergie verte et renouvelable.</p>
              <ul class="text-sm text-gray-600 space-y-2">
                <li>✓ Panneaux solaires</li>
                <li>✓ Installation complète</li>
                <li>✓ Suivi performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div>
        <h2 class="text-4xl font-bold text-dark mb-12">Nos Produits</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Product 1 -->
          <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition border border-gray-200">
            <div class="h-40 bg-gray-300"></div>
            <div class="p-4">
              <h3 class="font-bold text-dark mb-2">Lampadaires Billy</h3>
              <p class="text-sm text-gray-600 mb-3">Lampadaires hautes performances pour routes et espaces publics</p>
              <button class="text-secondary font-semibold text-sm hover:text-orange-600">En savoir plus →</button>
            </div>
          </div>

          <!-- Product 2 -->
          <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition border border-gray-200">
            <div class="h-40 bg-gray-300"></div>
            <div class="p-4">
              <h3 class="font-bold text-dark mb-2">EGENT Solar</h3>
              <p class="text-sm text-gray-600 mb-3">Système solaire complet avec panneaux et batteries</p>
              <button class="text-secondary font-semibold text-sm hover:text-orange-600">En savoir plus →</button>
            </div>
          </div>

          <!-- Product 3 -->
          <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition border border-gray-200">
            <div class="h-40 bg-gray-300"></div>
            <div class="p-4">
              <h3 class="font-bold text-dark mb-2">Kit Zoklin</h3>
              <p class="text-sm text-gray-600 mb-3">Solution solaire préconçue pour installation rapide</p>
              <button class="text-secondary font-semibold text-sm hover:text-orange-600">En savoir plus →</button>
            </div>
          </div>

          <!-- Product 4 -->
          <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition border border-gray-200">
            <div class="h-40 bg-gray-300"></div>
            <div class="p-4">
              <h3 class="font-bold text-dark mb-2">Batteries EGENT</h3>
              <p class="text-sm text-gray-600 mb-3">Batteries haute performance pour stockage d'énergie</p>
              <button class="text-secondary font-semibold text-sm hover:text-orange-600">En savoir plus →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
