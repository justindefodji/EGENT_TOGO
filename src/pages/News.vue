<template>
  <div>
    <!-- Hero Section News -->
    <div class="bg-gradient-to-br from-blue-900 via-blue-800 to-dark relative -mt-32 pt-0">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-40 md:py-56">
        <!-- Section Titre Hero -->
        <div class="text-center">
          <p class="text-secondary font-semibold mb-4 text-sm uppercase tracking-widest">Restez informé</p>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Nos <span class="text-secondary">Actualités</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Découvrez les dernières nouvelles, innovations et réalisations du groupe EGENT-TOGO. Suivez notre actualité pour rester connecté à nos développements.
          </p>
        </div>
      </div>

      <!-- Image Section -->
      <div class="relative w-full h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <img 
          src="/EGENT_TOGO/src/assets/images/custom/imagefont01.jpg" 
          alt="EGENT-TOGO Services"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- News Grid Section -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest">Nos actualités</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight">LES DERNIÈRES NOUVELLES</h2>
        </div>

        <!-- News Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- News Card 1 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-64 sm:h-72">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Inauguration du nouveau centre"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Date Badge -->
              <div class="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold">
                5 Jan 2026
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-2">Actualité</p>
              <h3 class="text-2xl font-black text-[#05075F] mb-3 line-clamp-2">Inauguration du nouveau centre EGENT-TOGO</h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                Découvrez notre nouveau centre technologique équipé des dernières innovations en matière d'efficacité énergétique et de solutions durables.
              </p>
              <a href="#" class="inline-flex items-center text-secondary font-bold hover:text-orange-600 transition-colors duration-300">
                Lire plus <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </article>

          <!-- News Card 2 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-64 sm:h-72">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Partenariat international"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Date Badge -->
              <div class="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold">
                2 Jan 2026
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-2">Partenariat</p>
              <h3 class="text-2xl font-black text-[#05075F] mb-3 line-clamp-2">Nouveau partenariat international signé</h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                EGENT-TOGO s'associe avec un leader mondial pour apporter des solutions innovantes en matière d'énergie renouvelable.
              </p>
              <a href="#" class="inline-flex items-center text-secondary font-bold hover:text-orange-600 transition-colors duration-300">
                Lire plus <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </article>

          <!-- News Card 3 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-64 sm:h-72">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Prix et reconnaissance"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Date Badge -->
              <div class="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold">
                30 Déc 2025
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-2">Reconnaissance</p>
              <h3 class="text-2xl font-black text-[#05075F] mb-3 line-clamp-2">EGENT-TOGO reçoit un prix pour l'innovation</h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                Notre entreprise a été reconnue pour son engagement dans la recherche et le développement de solutions durables.
              </p>
              <a href="#" class="inline-flex items-center text-secondary font-bold hover:text-orange-600 transition-colors duration-300">
                Lire plus <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </article>

          <!-- News Card 4 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-64 sm:h-72">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Événement clients"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Date Badge -->
              <div class="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold">
                28 Déc 2025
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-2">Événement</p>
              <h3 class="text-2xl font-black text-[#05075F] mb-3 line-clamp-2">Forum clients EGENT-TOGO 2026</h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                Nous invitons nos clients à participer à notre forum annuel pour découvrir les nouvelles solutions et tendances du secteur.
              </p>
              <a href="#" class="inline-flex items-center text-secondary font-bold hover:text-orange-600 transition-colors duration-300">
                Lire plus <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </article>

          <!-- News Card 5 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-64 sm:h-72">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Durabilité"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Date Badge -->
              <div class="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold">
                25 Déc 2025
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-2">Durabilité</p>
              <h3 class="text-2xl font-black text-[#05075F] mb-3 line-clamp-2">Engagement pour un avenir durable</h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                EGENT-TOGO réaffirme son engagement envers la durabilité environnementale et les objectifs de développement durable.
              </p>
              <a href="#" class="inline-flex items-center text-secondary font-bold hover:text-orange-600 transition-colors duration-300">
                Lire plus <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </article>

          <!-- News Card 6 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-64 sm:h-72">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Ressources humaines"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Date Badge -->
              <div class="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold">
                20 Déc 2025
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-2">Ressources Humaines</p>
              <h3 class="text-2xl font-black text-[#05075F] mb-3 line-clamp-2">EGENT-TOGO recrute des talents</h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                Rejoignez notre équipe dynamique ! Nous recherchons des professionnels passionnés par l'énergie et l'innovation.
              </p>
              <a href="#" class="inline-flex items-center text-secondary font-bold hover:text-orange-600 transition-colors duration-300">
                Lire plus <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-gradient-to-r from-blue-900 to-dark py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-6">Restez Informé</h2>
        <p class="text-xl text-gray-200 mb-12">
          Abonnez-vous à notre newsletter pour recevoir les dernières actualités et innovations.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Votre email" 
            class="flex-1 px-6 py-4 rounded-lg text-dark font-semibold focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <button class="bg-secondary hover:bg-orange-600 text-white font-black px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            S'abonner
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
