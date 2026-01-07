<template>
  <div>
    <div v-if="!product" class="flex items-center justify-center min-h-screen">
      <p class="text-xl text-gray-500">Chargement...</p>
    </div>

    <div v-else>
    <!-- Hero Section with Product Images -->
    <section class="bg-white pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center gap-2 text-[#0392C7] hover:text-[#FF9D35] font-semibold mb-8 transition-colors">
          <i class="fas fa-arrow-left"></i>
          Retour aux produits
        </button>

        <!-- Main Product Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Images Section -->
          <div class="flex flex-col gap-4">
            <!-- Main Image -->
            <div class="relative bg-gray-100 rounded-3xl overflow-hidden h-96">
              <img 
                :src="product.mainImage" 
                :alt="product.name"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Thumbnails -->
            <div v-if="product.images && product.images.length > 1" class="grid grid-cols-3 gap-4">
              <img 
                v-for="(image, index) in product.images"
                :key="index"
                :src="image"
                :alt="`${product.name} - Image ${index + 1}`"
                class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                @click="product.mainImage = image"
              />
            </div>
          </div>

          <!-- Product Info Section -->
          <div class="flex flex-col justify-between">
            <!-- Header -->
            <div>
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-3">{{ product.category }}</p>
              <h1 class="text-4xl md:text-5xl font-black text-[#05075F] mb-6 leading-tight">{{ product.name }}</h1>
              
              <!-- Price -->
              <div class="bg-blue-50 rounded-2xl p-6 mb-8">
                <p class="text-gray-600 text-sm mb-2">À partir de</p>
                <p class="text-4xl font-black text-[#0392C7]">{{ product.price }}</p>
              </div>

              <!-- Description -->
              <p class="text-gray-700 text-lg leading-relaxed mb-8">
                {{ product.description }}
              </p>

              <!-- Quick Features -->
              <div class="space-y-3 mb-8">
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Installation rapide et simple</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Garantie complète incluse</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Support technique 24/7</span>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="navigateTo('/devis')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-shopping-cart"></i>
                  Demander un devis
                </button>
                <button @click="navigateTo('/contact')" class="border-2 border-[#0392C7] hover:bg-blue-50 text-[#0392C7] px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-phone"></i>
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Description Section -->
    <section class="bg-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Left: Description -->
          <div class="md:col-span-2">
            <div class="bg-white rounded-3xl p-8 shadow-lg">
              <h2 class="text-3xl font-black text-[#05075F] mb-8">À propos de ce produit</h2>
              <div class="prose prose-lg max-w-none text-gray-700" v-html="product.longDescription"></div>
            </div>
          </div>

          <!-- Right: Specifications -->
          <div>
            <div class="bg-white rounded-3xl p-8 shadow-lg sticky top-20">
              <h3 class="text-2xl font-black text-[#05075F] mb-8">Caractéristiques</h3>
              <div class="space-y-6">
                <div v-for="spec in product.specs" :key="spec.label" class="border-b border-gray-200 pb-4 last:border-b-0">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest mb-2">{{ spec.label }}</p>
                  <p class="text-lg font-bold text-[#05075F]">{{ spec.value }}</p>
                </div>
              </div>

              <!-- Additional Info Box -->
              <div class="mt-8 bg-blue-50 rounded-2xl p-6">
                <div class="flex items-start gap-4">
                  <i class="fas fa-shield-alt text-[#0392C7] text-2xl mt-1"></i>
                  <div>
                    <p class="font-bold text-[#05075F] mb-2">Couverture complète</p>
                    <p class="text-sm text-gray-700">
                      Tous nos produits sont couverts par une garantie complète et un service après-vente premium.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products Section -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight mb-6">AUTRES PRODUITS</h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez nos autres solutions énergétiques
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id"
            @click="navigateToProduct(relatedProduct.slug)"
            class="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 duration-300"
          >
            <img 
              :src="relatedProduct.mainImage" 
              :alt="relatedProduct.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-black text-[#0392C7] mb-2">{{ relatedProduct.name }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ relatedProduct.shortDescription }}</p>
              <p class="text-[#FF9D35] font-black text-lg">{{ relatedProduct.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-[#05075F] to-[#0392C7] py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-8">PRÊT À PASSER À L'ACTION ?</h2>
        <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Nos experts sont disponibles pour vous aider à choisir la solution idéale pour vos besoins énergétiques.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="navigateTo('/devis')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
            Demander un devis
          </button>
          <button @click="navigateTo('/contact')" class="border-2 border-white hover:bg-white/10 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
            Nous contacter
          </button>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProductBySlug, products } from '../data/products'

const router = useRouter()
const route = useRoute()

const product = ref(null)
const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.id !== product.value.id).slice(0, 3)
})

onMounted(() => {
  const productSlug = route.params.slug
  const foundProduct = getProductBySlug(productSlug)
  if (foundProduct) {
    product.value = JSON.parse(JSON.stringify(foundProduct))
  } else {
    router.push('/produits')
  }
})

const navigateTo = (path) => {
  router.push(path)
}

const navigateToProduct = (slug) => {
  router.push(`/produits/${slug}`)
}

const goBack = () => {
  router.push('/produits')
}
</script>

<style scoped>
.prose-lg :deep(ul) {
  list-style: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose-lg :deep(li) {
  margin-bottom: 0.5rem;
}

.prose-lg :deep(h3) {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #05075F;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
