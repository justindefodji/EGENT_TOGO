<template>
  <footer class="bg-blue-900 text-white py-16 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Company Logo & Info -->
        <div>
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-secondary to-blue-400 rounded-full flex items-center justify-center">
              <i class="fas fa-bolt text-white text-xl font-bold"></i>
            </div>
            <span class="text-2xl font-black">EGENT-TOGO</span>
          </div>
          <p class="text-blue-200 text-base leading-relaxed mb-8">
            Faites un pas vers un avenir<br>d'autonomie énergétique<br>avec nous
          </p>
          
          <h4 class="font-black text-white text-lg mb-4">Contact</h4>
          <div class="space-y-2 text-blue-200">
            <p class="font-semibold">infos@egenttogo.com</p>
            <p>+228 92 53 14 55</p>
            <p>+228 91 20 43 73</p>
          </div>
        </div>

        <!-- Ressources -->
        <div>
          <h3 class="font-black text-xl text-white mb-6">Ressources</h3>
          <ul class="space-y-3 text-blue-200">
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Demander un devis</a></li>
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Galerie</a></li>
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Articles</a></li>
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Actualités</a></li>
            <li><a href="#products" class="hover:text-secondary transition-colors duration-300">Produits</a></li>
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">À propos</a></li>
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Témoignages</a></li>
          </ul>
        </div>

        <!-- Visitez-nous -->
        <div>
          <h3 class="font-black text-xl text-white mb-6">Visitez - nous</h3>
          <div class="flex items-center space-x-6 mb-8">
            <a href="#" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="#" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl">
              <i class="fab fa-x-twitter"></i>
            </a>
            <a href="#" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="#" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl">
              <i class="fab fa-threads"></i>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <h3 class="font-black text-xl text-white mb-6">Contactez-nous</h3>
          <form class="space-y-4">
            <div>
              <label class="block text-blue-200 text-sm mb-2">Nom & prénom</label>
              <input 
                type="text" 
                placeholder=""
                class="w-full px-4 py-3 bg-transparent border-2 border-blue-400 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-secondary transition-colors duration-300"
              />
            </div>
            
            <div>
              <label class="block text-blue-200 text-sm mb-2">Téléphone</label>
              <input 
                type="tel" 
                placeholder=""
                class="w-full px-4 py-3 bg-transparent border-2 border-blue-400 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-secondary transition-colors duration-300"
              />
            </div>
            
            <div>
              <label class="block text-blue-200 text-sm mb-2">Email</label>
              <input 
                type="email" 
                placeholder=""
                class="w-full px-4 py-3 bg-transparent border-2 border-blue-400 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-secondary transition-colors duration-300"
              />
            </div>
            
            <div>
              <label class="block text-blue-200 text-sm mb-2">Message</label>
              <textarea 
                rows="4"
                placeholder=""
                class="w-full px-4 py-3 bg-transparent border-2 border-blue-400 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-secondary transition-colors duration-300 resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              class="w-full bg-secondary hover:bg-orange-600 text-white font-black py-3 rounded-lg transition-colors duration-300"
            >
              Envoyez
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Divider -->
      <div class="border-t border-blue-700 pt-8">
        <p class="text-center text-blue-300 text-sm">
          &copy; 2026 EGENT-TOGO. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
input:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
}
</style>
