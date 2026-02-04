<template>
  <section id="products" class="bg-gray-50 py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="section-title">DÉCOUVREZ NOS PRODUITS PHARES</h2>
        <p class="section-subtitle">Nos solutions technologiques pour améliorer votre confort d'électricité et conditionner votre confort.</p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <!-- Product 1 -->
        <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <div class="h-48 bg-gray-300 overflow-hidden">
            <img 
              src="https://via.placeholder.com/300x250?text=Lampadaire+BILLY" 
              alt="Lampadaire Billy"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="font-normal text-dark mb-2">Lampadaires Billy</h3>
            <p class="text-sm text-gray-600">Lampadaire intelligemment conçu pour éclairer les routes et accès routiers.</p>
          </div>
        </div>

        <!-- Product 2 -->
        <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <div class="h-48 bg-gray-300 overflow-hidden">
            <img 
              src="https://via.placeholder.com/300x250?text=EGENT+Solar" 
              alt="EGENT Solar"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="font-normal text-dark mb-2">Lampadaires EGENT Solar</h3>
            <p class="text-sm text-gray-600">Éclairage alimenté à l'énergie solaire pour les routes et zones publiques.</p>
          </div>
        </div>

        <!-- Product 3 -->
        <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <div class="h-48 bg-gray-300 overflow-hidden">
            <img 
              src="https://via.placeholder.com/300x250?text=Kit+Zoklin" 
              alt="Kit Zoklin"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="font-normal text-dark mb-2">Kit Zoklin</h3>
            <p class="text-sm text-gray-600">Solution solaire préconçue pour une installation rapide et facile.</p>
          </div>
        </div>

        <!-- Product 4 -->
        <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <div class="h-48 bg-gray-300 overflow-hidden">
            <img 
              src="https://via.placeholder.com/300x250?text=Produit+4" 
              alt="Produit 4"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="font-normal text-dark mb-2">Autres Solutions</h3>
            <p class="text-sm text-gray-600">Découvrez nos autres solutions énergétiques et produits innovants.</p>
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
