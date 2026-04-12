<template>
  <section id="home" class="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden pt-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="z-10">
          <h1 class="text-4xl md:text-5xl font-normal text-dark mb-6 leading-tight">
            ÉCRIVONS L'AVENIR DE
            <span class="text-secondary font-normal">L'ÉNERGIE</span>
            AU TOGO
          </h1>
          <p class="text-gray-600 text-lg mb-8">
            Rejoignez-nous pour bâtir des solutions durables et innovantes, adaptées aux besoins énergétiques de demain au Togo et en Afrique.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="btn-primary rounded-lg">Demander un devis</button>
            <button class="btn-secondary rounded-lg">Voir nos projets</button>
          </div>
        </div>

        <!-- Image -->
        <div class="relative">
          <img 
            src="https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=600&h=500&fit=crop" 
            alt="Énergie solaire au Togo"
            class="w-full rounded-lg shadow-lg"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
          <div class="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded text-sm">
            Crédit: Tom Photograph
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Info Bar -->
    <div class="bg-green-600 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex items-center space-x-4">
            <div class="bg-white rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <span class="text-green-600 text-xl">📍</span>
            </div>
            <div>
              <p class="font-semibold">Localisation</p>
              <p class="text-sm">Togolese</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="bg-white rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <span class="text-green-600 text-xl">📞</span>
            </div>
            <div>
              <p class="font-semibold">Téléphone</p>
              <p class="text-sm">+228 92 03 15 35<br>+228 92 28 53 73</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="bg-white rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <span class="text-green-600 text-xl">✉️</span>
            </div>
            <div>
              <p class="font-semibold">Email</p>
              <p class="text-sm">info@egenttogo.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
