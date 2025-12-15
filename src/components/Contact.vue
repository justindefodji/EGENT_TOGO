<template>
  <section id="contact" class="bg-white py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="section-title">NOUS CONTACTER</h2>
        <p class="section-subtitle">Une question ? Contactez-nous dès aujourd'hui</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <form class="space-y-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Nom complet</label>
            <input 
              type="text" 
              placeholder="Votre nom"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              placeholder="votre@email.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Téléphone</label>
            <input 
              type="tel" 
              placeholder="+228 XX XX XX XX"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea 
              placeholder="Votre message..."
              rows="5"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            ></textarea>
          </div>

          <button type="submit" class="btn-primary w-full">Envoyer le message</button>
        </form>

        <!-- Contact Info -->
        <div class="space-y-8">
          <!-- Address -->
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                <span class="text-xl">📍</span>
              </div>
            </div>
            <div>
              <h3 class="font-semibold text-lg text-dark mb-1">Adresse</h3>
              <p class="text-gray-600">Lome, Togo</p>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                <span class="text-xl">📞</span>
              </div>
            </div>
            <div>
              <h3 class="font-semibold text-lg text-dark mb-1">Téléphone</h3>
              <p class="text-gray-600">+228 92 03 15 35</p>
              <p class="text-gray-600">+228 92 28 53 73</p>
            </div>
          </div>

          <!-- Email -->
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                <span class="text-xl">✉️</span>
              </div>
            </div>
            <div>
              <h3 class="font-semibold text-lg text-dark mb-1">Email</h3>
              <p class="text-gray-600">info@egenttogo.com</p>
            </div>
          </div>

          <!-- Hours -->
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                <span class="text-xl">🕐</span>
              </div>
            </div>
            <div>
              <h3 class="font-semibold text-lg text-dark mb-1">Horaires</h3>
              <p class="text-gray-600">Lundi - Vendredi: 08:00 - 18:00</p>
              <p class="text-gray-600">Samedi: 09:00 - 17:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
