<template>
  <div class="bg-white py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Titre -->
      <div class="text-center mb-16 md:mb-20">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-dark mb-4">À PROPOS DE <span class="text-secondary">NOUS</span></h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">Découvrez notre mission, nos valeurs et notre engagement envers l'énergie durable</p>
      </div>

      <!-- Section Vidéo/Image avec bouton play -->
      <div class="mb-16 md:mb-24">
        <div class="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
          <img 
            src="https://via.placeholder.com/1200x500?text=About+Video" 
            alt="À propos d'EGENT TOGO"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <!-- Play button -->
          <button class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-xl">
              <i class="fas fa-play text-dark text-xl ml-1"></i>
            </div>
          </button>
        </div>
      </div>

      <!-- Section Notre Histoire -->
      <div class="mb-16 md:mb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <!-- Carte verte avec statistiques -->
          <div class="bg-green-600 rounded-3xl p-8 text-white w-80 h-80 flex flex-col justify-around">
            <div>
              <div class="text-5xl font-black mb-1">70%</div>
              <p class="text-sm font-semibold">Plus durable</p>
              <div class="h-1 bg-white/50 mt-2"></div>
            </div>
            <div>
              <div class="text-5xl font-black mb-1">120</div>
              <p class="text-sm font-semibold">Clients satisfaits</p>
              <div class="h-1 bg-white/50 mt-2"></div>
            </div>
            <div>
              <div class="text-5xl font-black mb-1">30%</div>
              <p class="text-sm font-semibold">D'économie</p>
            </div>
          </div>

          <!-- Contenu texte -->
          <div>
            <h2 class="text-5xl font-black text-blue-900 mb-6">NOTRE HISTOIRE</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              Fondée avec passion et expertise, EGENT TOGO a une histoire marquée par un engagement constant envers l'excellence et le service client. Depuis notre création, nous avons réalisé des projets variés et avons acquis une expérience approfondie dans le domaine des énergies renouvelables et de l'électricité générale. Chaque étape de notre parcours témoigne de notre détermination à être un acteur clé dans le secteur énergétique.
            </p>
          </div>
        </div>
      </div>

      <!-- Section Mission et Vision -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 md:mb-24">
        <div>
          <div class="uppercase text-secondary tracking-widest text-sm font-black mb-4">Notre Mission</div>
          <h2 class="text-4xl md:text-5xl font-black text-dark mb-6">Transformer l'Accès à l'Énergie</h2>
          <p class="text-lg text-gray-600 mb-4 leading-relaxed">
            EGENT TOGO est une entreprise spécialisée dans les solutions énergétiques durables et innovantes, adaptées aux besoins énergétiques du Togo et de l'Afrique.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            Notre mission est de permettre l'accès à une électricité sécurisée et durable pour tous, en fournissant des solutions technologiques de haute qualité.
          </p>
        </div>
        <div>
          <div class="uppercase text-secondary tracking-widest text-sm font-black mb-4">Notre Vision</div>
          <h2 class="text-4xl md:text-5xl font-black text-dark mb-6">Un Continent Autonome</h2>
          <p class="text-lg text-gray-600 mb-4 leading-relaxed">
            Nous travaillons avec passion pour bâtir l'avenir énergétique du continent africain.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            Notre vision est de créer un écosystème énergétique décentralisé, durable et accessible à tous les pays africains.
          </p>
        </div>
      </div>

      <!-- Section Nos Valeurs -->
      <div class="mb-16 md:mb-24">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-dark mb-4">Nos Valeurs</h2>
          <p class="text-lg text-gray-600">Les principes qui guident nos actions</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Valeur 1 -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-secondary">
            <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <i class="fas fa-leaf text-secondary text-3xl"></i>
            </div>
            <h3 class="text-2xl font-black text-dark mb-4">Durabilité</h3>
            <p class="text-gray-600 leading-relaxed">Nous nous engageons à fournir des solutions respectueuses de l'environnement et durables.</p>
          </div>

          <!-- Valeur 2 -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-secondary">
            <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <i class="fas fa-lightbulb text-secondary text-3xl"></i>
            </div>
            <h3 class="text-2xl font-black text-dark mb-4">Innovation</h3>
            <p class="text-gray-600 leading-relaxed">Nous développons constamment de nouvelles technologies énergétiques.</p>
          </div>

          <!-- Valeur 3 -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-secondary">
            <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <i class="fas fa-handshake text-secondary text-3xl"></i>
            </div>
            <h3 class="text-2xl font-black text-dark mb-4">Engagement</h3>
            <p class="text-gray-600 leading-relaxed">Nous nous engageons envers nos clients et nos communautés locales.</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 md:p-16 text-center">
        <h2 class="text-3xl md:text-4xl font-black text-white mb-6">Prêt à Rejoindre Notre Mission ?</h2>
        <p class="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">Contactez-nous pour découvrir comment nous pouvons transformer votre accès à l'énergie.</p>
        <button class="bg-secondary hover:bg-orange-600 text-white font-black px-8 py-4 rounded-full transition-colors duration-300 text-lg">
          Demander un Devis
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
