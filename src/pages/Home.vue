<template>
  <div>
    <!-- Hero Section -->
    <section 
      id="home" 
      class="relative overflow-visible -mt-32 pt-0 pb-20 md:pb-32 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero1})` }"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div class="flex items-center justify-center">
          <!-- Content -->
          <div class="z-10 max-w-3xl text-center">
            <h1 class="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              ÉCRIVONS L'AVENIR DE
              <span class="text-secondary font-black">L'ÉNERGIE</span>
              AU TOGO
            </h1>
            <p class="text-white text-lg mb-8 opacity-100">
              Rejoignez-nous pour bâtir des solutions durables et innovantes, adaptées aux besoins énergétiques de demain au Togo et en Afrique.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="btn-primary rounded-lg">Demander un devis</button>
              <button class="btn-secondary rounded-lg">Voir nos projets</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="px-4 -mt-12 mb-12 relative z-10">
      <div class="max-w-7xl mx-auto bg-green-600 rounded-3xl shadow-lg overflow-hidden">
        <div class="px-6 lg:px-8 py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-14 w-14 rounded-full bg-white">
                  <i class="fas fa-map-marker-alt text-green-600 text-xl"></i>
                </div>
              </div>
              <div>
                <p class="text-white text-sm font-semibold leading-relaxed">Lorem ipsum dolor sit<br>amet consectetur.</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-14 w-14 rounded-full bg-white">
                  <i class="fas fa-phone text-green-600 text-xl"></i>
                </div>
              </div>
              <div>
                <p class="text-white font-semibold">+228 92 53 14 55</p>
                <p class="text-white font-semibold">+228 91 20 43 73</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-14 w-14 rounded-full bg-white">
                  <i class="fas fa-envelope text-green-600 text-xl"></i>
                </div>
              </div>
              <div>
                <p class="text-white font-semibold">infos@egenttogo.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <!-- Content -->
          <div class="order-2 md:order-1">
            <p class="text-secondary font-semibold mb-3 text-sm uppercase tracking-widest">À PROPOS DE NOUS</p>
            <h2 class="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight">VOTRE AVENIR D'AUTONOMIE ÉNERGÉTIQUE AVEC NOUS</h2>
            
            <p class="text-gray-600 mb-8 leading-relaxed text-lg">
              Chez EGENT TOGO, notre objectif est de fournir des solutions énergétiques durables en se spécialisant dans la fourniture et l'installation d'équipements solaires ainsi que dans l'électricité générale.
            </p>

            <button class="btn-primary rounded-lg px-8 py-3 text-lg font-semibold">En savoir plus</button>
          </div>

          <!-- Image -->
          <div class="order-1 md:order-2">
            <img 
              src="https://via.placeholder.com/500x400?text=Solar+Panel" 
              alt="Énergie autonome"
              class="w-full rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <p class="text-secondary font-semibold mb-3 text-sm uppercase tracking-widest">Nos services</p>
          <h2 class="text-4xl md:text-5xl font-black text-dark leading-tight">NOUS OFFRONS DES SOLUTIONS ÉNERGÉTIQUES DURABLES</h2>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <!-- Service 1: Électricité Générale -->
          <div class="group relative overflow-visible rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80">
            <img 
              src="https://via.placeholder.com/400x300?text=Electricite" 
              alt="Électricité générale"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-3xl"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end justify-between p-6 rounded-3xl">
              <div>
                <h3 class="text-2xl md:text-3xl font-black text-white">ÉLECTRICITÉ<br>GÉNÉRALE</h3>
              </div>
            </div>
            <div class="absolute -bottom-5 -right-5 w-20 h-20 bg-green-600 rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>

          <!-- Service 2: Climatisation & Froid -->
          <div class="group relative overflow-visible rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80">
            <img 
              src="https://via.placeholder.com/400x300?text=Climatisation" 
              alt="Climatisation"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-3xl"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end justify-between p-6 rounded-3xl">
              <div>
                <h3 class="text-2xl md:text-3xl font-black text-white">CLIMATISATION<br>& FROID</h3>
              </div>
            </div>
            <div class="absolute -bottom-5 -right-5 w-20 h-20 bg-green-600 rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>

          <!-- Service 3: Énergie Solaire -->
          <div class="group relative overflow-visible rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80">
            <img 
              src="https://via.placeholder.com/400x300?text=Solaire" 
              alt="Énergie solaire"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-3xl"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end justify-between p-6 rounded-3xl">
              <div>
                <h3 class="text-2xl md:text-3xl font-black text-white">ÉNERGIE<br>SOLAIRE</h3>
              </div>
            </div>
            <div class="absolute -bottom-5 -right-5 w-20 h-20 bg-green-600 rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="text-center">
          <button class="btn-primary rounded-lg px-8 py-3 text-lg font-semibold">En savoir plus</button>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="bg-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <!-- Image -->
          <div class="order-2 md:order-1">
            <img 
              src="https://via.placeholder.com/500x600?text=Why+Choose+Us" 
              alt="Pourquoi nous choisir"
              class="w-full rounded-3xl shadow-2xl"
            />
          </div>

          <!-- Content -->
          <div class="order-1 md:order-2">
            <p class="text-secondary font-semibold mb-3 text-sm uppercase tracking-widest">Nos valeurs</p>
            <h2 class="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight">POURQUOI CHOISIR LES SOLUTIONS EGENT TOGO ?</h2>
            
            <p class="text-gray-600 mb-12 leading-relaxed text-lg">
              Lorem ipsum dolor sit amet consectetur. Platea tortor consectetur facilisi id malesuada. Vitae mauris purus erat est molestie velit rutrum neque ullamcorper.
            </p>

            <div class="grid grid-cols-2 gap-6">
              <!-- Feature 1 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 mb-4">
                  <i class="fas fa-gem text-secondary text-2xl"></i>
                </div>
                <h3 class="font-black text-dark text-lg mb-3">Équipement de Qualité</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Lorem ipsum dolor sit amet consectetur. Ut nunc magna volutpat quam dui montes.</p>
              </div>

              <!-- Feature 2 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 mb-4">
                  <i class="fas fa-bolt text-secondary text-2xl"></i>
                </div>
                <h3 class="font-black text-dark text-lg mb-3">Énergie Durable</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Lorem ipsum dolor sit amet consectetur. Ut nunc magna volutpat quam dui montes.</p>
              </div>

              <!-- Feature 3 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 mb-4">
                  <i class="fas fa-shield-alt text-secondary text-2xl"></i>
                </div>
                <h3 class="font-black text-dark text-lg mb-3">Installation sécurisée</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Lorem ipsum dolor sit amet consectetur. Ut nunc magna volutpat quam dui montes.</p>
              </div>

              <!-- Feature 4 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 mb-4">
                  <i class="fas fa-users text-secondary text-2xl"></i>
                </div>
                <h3 class="font-black text-dark text-lg mb-3">Technicien qualifié</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Lorem ipsum dolor sit amet consectetur. Ut nunc magna volutpat quam dui montes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <p class="text-secondary font-semibold mb-3 text-sm uppercase tracking-widest">Nos produits</p>
          <h2 class="text-4xl md:text-5xl font-black text-dark leading-tight mb-6">DÉCOUVREZ NOS PRODUITS PHARES</h2>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Nous avons des produits conçus pour vous aider à réduire vos coûts d'électricité et à améliorer votre confort. Découvrez-les dès maintenant !
          </p>
        </div>

        <!-- Products Grid - 3 Column Layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
          <!-- Product 1: Armoire Billy -->
          <div class="flex flex-col h-full">
            <div class="bg-blue-50 rounded-3xl overflow-hidden shadow-lg mb-6 h-96">
              <img 
                src="https://via.placeholder.com/400x500?text=Armoire+Billy" 
                alt="Armoire Billy"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-2xl font-black text-blue-600 mb-4">Armoire Billy</h3>
            <p class="text-gray-700 leading-relaxed text-base">
              Solution anti délestage, pour éviter les coupures de courant. Remplace valablement les groupes électrogènes.
            </p>
          </div>

          <!-- Product 2: Lampadaires EGENT Solar - CENTER/LARGER -->
          <div class="flex flex-col h-full md:-mt-12">
            <div class="relative overflow-hidden rounded-3xl shadow-2xl mb-6 h-96">
              <img 
                src="https://via.placeholder.com/400x500?text=Lampadaires+EGENT" 
                alt="Lampadaires EGENT Solar"
                class="w-full h-full object-cover"
              />
              <!-- <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col items-start justify-end p-6">
                <div class="bg-orange-500 text-black px-4 py-2 font-black text-lg mb-2">
                  LAMPADAIRES<br>EGENT Solar
                </div>
                <p class="text-white text-sm font-bold mb-1">FIABLE - FORTE LUMIÈRE</p>
                <p class="text-red-400 text-sm font-bold">Garantie 05 ans</p>
              </div> -->
            </div>
            <h3 class="text-3xl font-black text-blue-600 mb-4">Lampadaires<br>EGENT SOLAR</h3>
            <p class="text-gray-700 leading-relaxed text-base">
              Des lampadaires solaires pour illuminer vos espaces extérieurs tout en réduisant vos coûts d'électricité.
            </p>
          </div>

          <!-- Product 3: Kit Zoklin -->
          <div class="flex flex-col h-full">
            <div class="bg-orange-50 rounded-3xl overflow-hidden shadow-lg mb-6 h-96">
              <img 
                src="https://via.placeholder.com/400x500?text=Kit+Zoklin" 
                alt="Kit Zoklin"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-2xl font-black text-blue-600 mb-4">Kit Zoklin</h3>
            <p class="text-gray-700 leading-relaxed text-base">
              Votre solution solaire préconçue pour une installation rapide et facile. Tout inclus pour votre autonomie énergétique.
            </p>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="text-center">
          <button class="btn-primary rounded-lg px-8 py-3 text-lg font-semibold">En savoir plus</button>
        </div>
      </div>
    </section>

    <!-- CTA Section: Dites au revoir aux pannes -->
    <section class="bg-blue-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <!-- Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-black text-dark leading-tight mb-8">DITES AU REVOIR AUX PANNES<br>D'ÉLECTRICITÉ ET<br>AUX FACTURES SALÉES.</h2>
            
            <p class="text-gray-700 mb-8 leading-relaxed text-lg">
              Nous vous proposons des solutions d'énergie renouvelable pour votre maison ou votre entreprise à des prix abordables. Une première étape vers un avenir plus vert.
            </p>

            <button class="bg-secondary hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-300">
              Demander un devis
            </button>
          </div>

          <!-- Image -->
          <div>
            <img 
              src="https://via.placeholder.com/600x500?text=Solar+Professional" 
              alt="Professionnelle énergie solaire"
              class="w-full rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import hero1 from '/src/assets/images/hero1.jpg?url'
</script>
