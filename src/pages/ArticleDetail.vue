<template>
  <div>
    <!-- Admin Edit/Delete Buttons -->
    <div v-if="isAdmin" class="fixed top-24 right-8 z-40 flex gap-3">
      <button
        @click="openEditModal"
        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2 font-semibold"
      >
        <i class="fas fa-edit"></i> Éditer
      </button>
      <button
        @click="deleteArticleConfirm"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2 font-semibold"
      >
        <i class="fas fa-trash"></i> Supprimer
      </button>
    </div>

    <!-- Hero Section -->
    <section class="bg-white pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center gap-2 text-[#0392C7] hover:text-[#FF9D35] font-semibold mb-8">
          <i class="fas fa-arrow-left"></i>
          Retour aux actualités
        </button>

        <!-- Article Hero -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Images Section -->
          <div class="flex flex-col gap-4">
            <!-- Main Image -->
            <div v-if="article && article.image" class="relative bg-gray-100 rounded-3xl overflow-hidden h-96">
              <img 
                :src="article.image" 
                :alt="article.title"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Thumbnails for Supplementary Images -->
            <div v-if="article && article.images && article.images.length > 0" class="grid grid-cols-3 gap-4">
              <img 
                v-for="(image, index) in article.images"
                :key="index"
                :src="image"
                :alt="`${article.title} - Image ${index + 1}`"
                class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                @click="article.image = image"
              />
            </div>
          </div>

          <!-- Info -->
          <div v-if="article" class="flex flex-col justify-between">
            <div>
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-3">
                {{ article.category }}
              </p>
              <h1 class="text-4xl md:text-5xl font-bold text-[#016E98] mb-6">
                {{ article.title }}
              </h1>
              
              <div class="bg-blue-50 rounded-2xl p-6 mb-8">
                <p class="text-gray-600 text-sm mb-2">Publié le</p>
                <p class="text-2xl font-bold text-[#0392C7]">{{ article.date }}</p>
              </div>

              <p class="text-gray-700 text-lg leading-relaxed mb-8">
                {{ article.excerpt }}
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <router-link to="/contact" class="bg-[#FF9D35] hover:bg-[#FF8214] text-white px-8 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-envelope"></i>
                  Nous contacter
                </router-link>
                <router-link to="/actualites" class="border-2 border-[#0392C7] hover:bg-blue-50 text-[#0392C7] px-8 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-newspaper"></i>
                  Autres actualités
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="bg-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Left: Content -->
          <div class="md:col-span-2">
            <div class="bg-white rounded-3xl p-8 shadow-lg">
              <!-- Article Content -->
              <div v-if="article" class="prose prose-lg max-w-none">
                <div 
                  v-if="article.content"
                  class="text-gray-700 space-y-6 leading-relaxed"
                  v-html="article.content"
                ></div>
                <div v-else class="text-gray-500 italic">
                  Contenu de l'article non disponible
                </div>
              </div>
            </div>

            <!-- Galerie d'images supplémentaires -->
            <div v-if="article && article.images && article.images.length > 0" class="mt-12">
              <h2 class="text-3xl font-bold text-[#016E98] mb-8">Galerie photos</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  v-for="(image, idx) in article.images"
                  :key="idx"
                  class="relative rounded-2xl overflow-hidden h-64 bg-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
                  @click="openImageModal(idx)"
                >
                  <img 
                    :src="image"
                    :alt="`${article.title} - Image ${idx + 1}`"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <i class="fas fa-search-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Related Articles -->
            <div v-if="relatedArticles.length > 0" class="mt-16">
              <h2 class="text-3xl font-bold text-[#016E98] mb-8">Articles liés</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <router-link
                  v-for="relatedArticle in relatedArticles"
                  :key="relatedArticle.id"
                  :to="`/article/${relatedArticle.slug}`"
                  class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div v-if="relatedArticle.image" class="h-48 overflow-hidden bg-gray-100">
                    <img 
                      :src="relatedArticle.image"
                      :alt="relatedArticle.title"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div v-else class="h-48 bg-gray-300"></div>
                  <div class="p-6">
                    <p class="text-[#FF9D35] font-semibold text-xs uppercase tracking-widest mb-2">
                      {{ relatedArticle.category }}
                    </p>
                    <h3 class="text-xl font-normal text-[#016E98] mb-3 group-hover:text-[#FF9D35] transition-colors line-clamp-2">
                      {{ relatedArticle.title }}
                    </h3>
                    <p class="text-gray-600 text-sm line-clamp-2">
                      {{ relatedArticle.excerpt }}
                    </p>
                    <p class="text-gray-500 text-xs mt-4">
                      {{ relatedArticle.date }}
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Right: Info -->
          <div>
            <div class="bg-white rounded-3xl p-8 shadow-lg sticky top-20">
              <h3 class="text-2xl font-bold text-[#016E98] mb-8">Informations</h3>
              <div v-if="article" class="space-y-6">
                <!-- Category -->
                <div class="border-b border-gray-200 pb-4">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase mb-2">Catégorie</p>
                  <p class="text-lg font-bold text-[#016E98]">{{ article.category }}</p>
                </div>

                <!-- Date -->
                <div class="border-b border-gray-200 pb-4">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase mb-2">Date</p>
                  <p class="text-lg font-bold text-[#016E98]">{{ article.date }}</p>
                </div>

                <!-- Share -->
                <div class="border-b border-gray-200 pb-4">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase mb-3">Partager</p>
                  <div class="flex gap-3 flex-wrap">
                    <button @click="shareOnFacebook" title="Facebook" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fab fa-facebook-f"></i>
                    </button>
                    <button @click="shareOnTwitter" title="Twitter" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fab fa-twitter"></i>
                    </button>
                    <button @click="shareOnLinkedIn" title="LinkedIn" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fab fa-linkedin-in"></i>
                    </button>
                    <button @click="copyToClipboard" title="Copier le lien" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fas fa-link"></i>
                    </button>
                  </div>
                </div>

                <!-- Info Box -->
                <div class="bg-blue-50 rounded-2xl p-6">
                  <div class="flex items-start gap-4">
                    <i class="fas fa-lightbulb text-[#0392C7] text-2xl mt-1"></i>
                    <div>
                      <p class="font-bold text-[#016E98] mb-2">À savoir</p>
                      <p class="text-sm text-gray-700">
                        Restez informé des dernières actualités de EGENT TOGO.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Edit Article -->
    <ArticleFormModal
      v-if="showEditModal"
      :article="editingArticle"
      @save="saveArticle"
      @close="closeEditModal"
    />

    <!-- Lightbox Modal pour Galerie -->
    <div v-if="showImageModal && article && article.images" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <!-- Main Image -->
      <div class="relative w-full max-w-5xl h-full flex items-center justify-center">
        <!-- Close Button -->
        <button
          @click="closeImageModal"
          class="absolute top-6 right-6 text-white hover:text-gray-300 text-3xl transition-colors z-10"
          title="Fermer"
        >
          ✕
        </button>

        <!-- Previous Button -->
        <button
          @click="previousImage"
          class="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors z-10"
          title="Image précédente"
        >
          <i class="fas fa-chevron-left text-2xl"></i>
        </button>

        <!-- Image Display -->
        <div class="w-full max-h-[80vh] flex items-center justify-center">
          <img
            :src="article.images[currentImageIndex]"
            :alt="`${article.title} - Image ${currentImageIndex + 1}`"
            class="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        <!-- Next Button -->
        <button
          @click="nextImage"
          class="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors z-10"
          title="Image suivante"
        >
          <i class="fas fa-chevron-right text-2xl"></i>
        </button>

        <!-- Counter -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {{ currentImageIndex + 1 }} / {{ article.images.length }}
        </div>

        <!-- Thumbnails -->
        <div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90%] pb-2">
          <button
            v-for="(image, idx) in article.images"
            :key="idx"
            @click="currentImageIndex = idx"
            :class="[
              'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
              currentImageIndex === idx ? 'border-[#FF9D35] scale-110' : 'border-white/30 hover:border-white/60'
            ]"
            title="`Image ${idx + 1}`"
          >
            <img :src="image" :alt="`Thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { auth } from '../lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useOpenGraphMeta } from '../composables/useOpenGraphMeta'
import { useFirebaseData } from '../composables/useFirebaseData'
import ArticleFormModal from '../components/ArticleFormModal.vue'

// Google Analytics - Dynamic Loading
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date())
  gtag('config', 'G-65BEBH9XRC')
  
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-65BEBH9XRC'
  document.head.appendChild(script)
}

const { setArticleMeta, getArticleJsonLD, injectJsonLD } = useOpenGraphMeta()
const { deleteNews, updateNews } = useFirebaseData()
const router = useRouter()
const route = useRoute()

const article = ref(null)
const articles = ref([])
const relatedArticles = ref([])
const loading = ref(true)
const isAdmin = ref(false)
const showEditModal = ref(false)
const editingArticle = ref(null)
const showImageModal = ref(false)
const currentImageIndex = ref(0)

const loadArticles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'articles'))
    articles.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erreur chargement articles:', error)
  }
}

const findRelatedArticles = () => {
  if (!article.value) return
  
  relatedArticles.value = articles.value
    .filter(a => 
      a.id !== article.value.id && 
      a.category === article.value.category
    )
    .slice(0, 2)
}

// ✅ WATCHER POUR METTRE À JOUR LES MÉTADONNÉES DÈS QUE L'ARTICLE EST CHARGÉ
watch(article, (newArticle) => {
  if (newArticle && newArticle.title && newArticle.image) {
    console.log('👀 [ArticleDetail] Article détecté, configuration Open Graph...')
    
    // Configuration des meta tags Open Graph
    setArticleMeta({
      titre: `${newArticle.title} - EGENT TOGO`,
      description: newArticle.excerpt || newArticle.title,
      image: newArticle.image,
      url: `/article/${newArticle.slug || route.params.slug}`,
      date: newArticle.date || new Date().toISOString(),
      categorie: newArticle.category || 'Articles'
    })
    
    // Injecter les données structurées JSON-LD
    const jsonLd = getArticleJsonLD({
      titre: newArticle.title,
      description: newArticle.excerpt || newArticle.title,
      image: newArticle.image,
      url: `/article/${newArticle.slug || route.params.slug}`,
      date: newArticle.date || new Date().toISOString()
    })
    injectJsonLD(jsonLd)
    
    console.log('✅ [ArticleDetail] Métadonnées OG configurées pour:', newArticle.title)
  }
}, { deep: true })

onMounted(async () => {
  // Vérifier si l'utilisateur est admin
  auth.onAuthStateChanged((user) => {
    isAdmin.value = !!user
  })

  await loadArticles()
  
  const articleSlug = route.params.slug
  const foundArticle = articles.value.find(a => a.slug === articleSlug)
  
  if (foundArticle) {
    article.value = { ...foundArticle }
    findRelatedArticles()
    
    // ✅ MISE À JOUR INITIALE DES MÉTADONNÉES
    setArticleMeta({
      titre: `${foundArticle.title} - EGENT TOGO`,
      description: foundArticle.excerpt || foundArticle.title,
      image: foundArticle.image,
      url: `/article/${articleSlug}`,
      date: foundArticle.date || new Date().toISOString(),
      categorie: foundArticle.category || 'Articles'
    })
    
    // Injecter les données structurées JSON-LD
    const jsonLd = getArticleJsonLD({
      titre: foundArticle.title,
      description: foundArticle.excerpt || foundArticle.title,
      image: foundArticle.image,
      url: `/article/${articleSlug}`,
      date: foundArticle.date || new Date().toISOString()
    })
    injectJsonLD(jsonLd)
  } else {
    router.push('/actualites')
    return
  }
  
  loading.value = false
})

const goBack = () => {
  router.push('/actualites')
}

// Admin Functions
const openEditModal = () => {
  editingArticle.value = { ...article.value }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingArticle.value = null
}

const saveArticle = async (articleData) => {
  try {
    await updateNews(article.value.id, articleData)
    article.value = { ...article.value, ...articleData }
    closeEditModal()
    alert('✅ Article mis à jour avec succès!')
  } catch (error) {
    alert('❌ Erreur: ' + error.message)
  }
}

const deleteArticleConfirm = async () => {
  if (!confirm(`⚠️ Êtes-vous sûr de vouloir supprimer "${article.value.title}"?\n\nCette action est irréversible.`)) {
    return
  }

  try {
    await deleteNews(article.value.id)
    alert('✅ Article supprimé!')
    router.push('/actualites')
  } catch (error) {
    alert('❌ Erreur: ' + error.message)
  }
}

const shareOnFacebook = () => {
  const url = window.location.href
  console.log('🔗 [Partage] Facebook:', url)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
}

const shareOnTwitter = () => {
  const url = window.location.href
  const text = article.value?.title || 'Article intéressant'
  console.log('🔗 [Partage] Twitter:', url, 'Texte:', text)
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = window.location.href
  console.log('🔗 [Partage] LinkedIn:', url)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
}

const shareOnWhatsApp = () => {
  const url = window.location.href
  console.log('🔗 [Partage] WhatsApp:', url)
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank')
}

const shareOnTelegram = () => {
  const url = window.location.href
  console.log('🔗 [Partage] Telegram:', url)
  window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`, '_blank')
}

const printArticle = () => {
  window.print()
}

const copyToClipboard = async () => {
  try {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    
    // ✅ AFFICHER LA VÉRIFICATION DES MÉTADONNÉES
    const ogImage = document.querySelector('meta[property="og:image"]')?.content
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content
    const ogDescription = document.querySelector('meta[property="og:description"]')?.content
    
    console.log(' [Copie] Lien copié avec métadonnées:')
    console.log({
      url: url,
      ogTitle: ogTitle,
      ogDescription: ogDescription,
      ogImage: ogImage,  // ✅ AFFICHÉE SUR WHATSAPP, FACEBOOK, TWITTER, ETC.
      statut: '✅ Prêt pour partage social'
    })
    
    alert('✅ Lien copié dans le presse-papiers!\n\n📸 L\'image s\'affichera sur:\n• WhatsApp\n• Facebook\n• Twitter/X\n• LinkedIn\n• Telegram\n• Et autres réseaux sociaux')
  } catch (error) {
    console.error('❌ Erreur copie:', error)
    alert('❌ Erreur lors de la copie')
  }
}

// Galerie photos
const openImageModal = (index) => {
  currentImageIndex.value = index
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = article.value.images.length - 1
  }
}

const nextImage = () => {
  if (currentImageIndex.value < article.value.images.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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
  color: #016E98;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
