<template>
  <div class="bg-white pt-32 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-5xl md:text-6xl font-bold text-dark mb-8">GALERIE</h1>
      <p class="text-xl text-gray-600 mb-16">Découvrez nos réalisations et projets phares</p>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <!-- Image 1 -->
        <div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <img 
            src="https://via.placeholder.com/400x300?text=Projet+1" 
            alt="Projet 1"
            class="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <h3 class="text-white text-center font-bold opacity-0 group-hover:opacity-100 transition">Installation Solaire</h3>
          </div>
        </div>

        <!-- Image 2 -->
        <div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <img 
            src="https://via.placeholder.com/400x300?text=Projet+2" 
            alt="Projet 2"
            class="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <h3 class="text-white text-center font-bold opacity-0 group-hover:opacity-100 transition">Lampadaires LED</h3>
          </div>
        </div>

        <!-- Image 3 -->
        <div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <img 
            src="https://via.placeholder.com/400x300?text=Projet+3" 
            alt="Projet 3"
            class="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <h3 class="text-white text-center font-bold opacity-0 group-hover:opacity-100 transition">Climatisation</h3>
          </div>
        </div>

        <!-- Image 4 -->
        <div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <img 
            src="https://via.placeholder.com/400x300?text=Projet+4" 
            alt="Projet 4"
            class="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <h3 class="text-white text-center font-bold opacity-0 group-hover:opacity-100 transition">Éclairage Public</h3>
          </div>
        </div>

        <!-- Image 5 -->
        <div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <img 
            src="https://via.placeholder.com/400x300?text=Projet+5" 
            alt="Projet 5"
            class="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <h3 class="text-white text-center font-bold opacity-0 group-hover:opacity-100 transition">Installation Panneaux</h3>
          </div>
        </div>

        <!-- Image 6 -->
        <div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <img 
            src="https://via.placeholder.com/400x300?text=Projet+6" 
            alt="Projet 6"
            class="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <h3 class="text-white text-center font-bold opacity-0 group-hover:opacity-100 transition">Maintenance</h3>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="bg-gray-50 rounded-lg p-12">
        <h2 class="text-3xl font-bold text-dark mb-12 text-center">Nos Réalisations</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <h3 class="text-4xl font-bold text-secondary mb-2">500+</h3>
            <p class="text-gray-600">Projets réalisés</p>
          </div>
          <div class="text-center">
            <h3 class="text-4xl font-bold text-secondary mb-2">10K+</h3>
            <p class="text-gray-600">Clients satisfaits</p>
          </div>
          <div class="text-center">
            <h3 class="text-4xl font-bold text-secondary mb-2">15+</h3>
            <p class="text-gray-600">Années d'expérience</p>
          </div>
          <div class="text-center">
            <h3 class="text-4xl font-bold text-secondary mb-2">100%</h3>
            <p class="text-gray-600">Garantie qualité</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
