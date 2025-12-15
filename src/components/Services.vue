<template>
  <section id="services" class="bg-gray-50 py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="section-title">NOUS OFFRONS DES SOLUTIONS ÉNERGÉTIQUES DURABLES</h2>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Service 1: Électricité Générale -->
        <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <div class="relative h-64 bg-gray-300 overflow-hidden">
            <img 
              src="https://via.placeholder.com/400x300?text=Electricite" 
              alt="Électricité générale"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div class="text-white text-center">
                <span class="text-5xl mb-2">⚡</span>
                <h3 class="text-2xl font-bold">L'ÉLECTRICITÉ GÉNÉRALE</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Service 2: Climatisation & Froid -->
        <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <div class="relative h-64 bg-gray-300 overflow-hidden">
            <img 
              src="https://via.placeholder.com/400x300?text=Climatisation" 
              alt="Climatisation"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div class="text-white text-center">
                <span class="text-5xl mb-2">❄️</span>
                <h3 class="text-2xl font-bold">CLIMATISATION À FROID</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Service 3: Énergie Solaire -->
        <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <div class="relative h-64 bg-gray-300 overflow-hidden">
            <img 
              src="https://via.placeholder.com/400x300?text=Solaire" 
              alt="Énergie solaire"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div class="text-white text-center">
                <span class="text-5xl mb-2">☀️</span>
                <h3 class="text-2xl font-bold">ÉNERGIE SOLAIRE</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center">
        <button class="btn-primary">En savoir plus</button>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
