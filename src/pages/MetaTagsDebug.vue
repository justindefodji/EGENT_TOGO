<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-[#016E98] mb-4">🧪 Test Meta Tags Open Graph</h1>
        <p class="text-gray-600 text-lg">Vérifiez les métadonnées avant de partager sur les réseaux sociaux</p>
      </div>

      <!-- Form to test -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-[#016E98] mb-6">📝 Configuration de test</h2>
        
        <div class="space-y-6">
          <!-- Article Slug Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Article Slug</label>
            <input 
              v-model="articleSlug"
              type="text"
              placeholder="ex: mon-article-test"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0392C7] focus:border-transparent"
            />
            <p class="text-xs text-gray-500 mt-1">URL complète: /article/{{ articleSlug }}</p>
          </div>

          <!-- Title Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Titre (og:title)</label>
            <input 
              v-model="testMeta.titre"
              type="text"
              placeholder="Titre de l'article"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0392C7] focus:border-transparent"
            />
          </div>

          <!-- Description Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Description (og:description)</label>
            <textarea 
              v-model="testMeta.description"
              placeholder="Description courte pour le partage"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0392C7] focus:border-transparent"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">{{ testMeta.description.length }}/160 caractères (recommandé)</p>
          </div>

          <!-- Image URL Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Image URL (og:image)</label>
            <input 
              v-model="testMeta.image"
              type="url"
              placeholder="https://..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0392C7] focus:border-transparent"
            />
            <p class="text-xs text-gray-500 mt-1">Min: 1200x630px, Format: JPEG/PNG, HTTPS obligatoire</p>
          </div>

          <!-- Buttons -->
          <div class="flex gap-4 flex-wrap">
            <button 
              @click="applyTestMeta"
              class="flex-1 bg-[#0392C7] hover:bg-[#016E98] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <i class="fas fa-cogs"></i>
              Appliquer les métadonnées
            </button>
            <button 
              @click="testFacebookDebugger"
              class="flex-1 bg-[#1877F2] hover:bg-[#165AC9] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <i class="fas fa-globe"></i>
              Tester avec Facebook Debugger
            </button>
          </div>
        </div>
      </div>

      <!-- Meta Tags Validation -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-[#016E98] mb-6">✅ Validation des Meta Tags</h2>
        
        <div class="space-y-4">
          <div v-for="(valid, tag) in validationResults" :key="tag" class="flex items-center gap-3 p-4 rounded-lg border-2" :class="valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'">
            <i :class="valid ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'" class="text-xl"></i>
            <span :class="valid ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Current Meta Tags Display -->
        <div class="mt-8 pt-8 border-t-2 border-gray-200">
          <h3 class="text-lg font-bold text-gray-700 mb-4">📋 Meta tags actuels dans le DOM</h3>
          <div class="bg-gray-50 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
            <pre class="text-xs text-gray-700 whitespace-pre-wrap break-words">{{ currentMetaTags }}</pre>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-[#016E98] mb-6">👁️ Aperçu du partage</h2>
        
        <div class="bg-gray-100 rounded-lg p-6 space-y-6">
          <!-- Facebook Preview -->
          <div class="bg-white rounded-lg overflow-hidden shadow">
            <div class="text-xs text-gray-500 px-3 py-2 bg-gray-50 border-b border-gray-200">Facebook / WhatsApp</div>
            <div class="p-4 space-y-3">
              <div v-if="testMeta.image" class="w-full h-48 bg-gray-200 rounded overflow-hidden">
                <img :src="testMeta.image" :alt="testMeta.titre" class="w-full h-full object-cover" @error="imageError">
              </div>
              <div>
                <p class="text-sm font-bold text-gray-800">{{ testMeta.titre }}</p>
                <p class="text-xs text-gray-600 line-clamp-2">{{ testMeta.description }}</p>
                <p class="text-xs text-gray-500 mt-2">egenttogo.com</p>
              </div>
            </div>
          </div>

          <!-- Twitter Preview -->
          <div class="bg-white rounded-lg overflow-hidden shadow">
            <div class="text-xs text-gray-500 px-3 py-2 bg-gray-50 border-b border-gray-200">Twitter/X</div>
            <div class="p-4 space-y-3">
              <div v-if="testMeta.image" class="w-full h-40 bg-gray-200 rounded overflow-hidden">
                <img :src="testMeta.image" :alt="testMeta.titre" class="w-full h-full object-cover" @error="imageError">
              </div>
              <div>
                <p class="text-sm font-bold text-gray-800">{{ testMeta.titre }}</p>
                <p class="text-xs text-gray-600">{{ testMeta.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Help Section -->
      <div class="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 mt-8">
        <h3 class="text-lg font-bold text-yellow-900 mb-4">⚠️ Conseils importants</h3>
        <ul class="space-y-3 text-yellow-800">
          <li class="flex items-start gap-3">
            <i class="fas fa-arrow-right mt-1 flex-shrink-0"></i>
            <span><strong>HTTPS obligatoire:</strong> Les réseaux sociaux n'acceptent que les images HTTPS</span>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-arrow-right mt-1 flex-shrink-0"></i>
            <span><strong>Taille image:</strong> Minimum 1200x630px pour une meilleure qualité</span>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-arrow-right mt-1 flex-shrink-0"></i>
            <span><strong>Pas de JavaScript:</strong> Les crawlers sociaux ne lisent que le HTML brut - utilisez le pre-rendering</span>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-arrow-right mt-1 flex-shrink-0"></i>
            <span><strong>Cache:</strong> Facebook met en cache - utilisez le Facebook Sharing Debugger pour forcer la mise à jour</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOpenGraphMeta } from '../composables/useOpenGraphMeta'

const { setArticleMeta } = useOpenGraphMeta()

const articleSlug = ref('test-article')
const testMeta = ref({
  titre: 'Test Article - EGENT-TOGO',
  description: 'Ceci est un article de test pour vérifier les meta tags Open Graph',
  image: 'https://via.placeholder.com/1200x630'
})

const validationResults = ref({
  'og:title': false,
  'og:description': false,
  'og:image': false,
  'og:url': false,
  'og:type': false,
  'twitter:card': false,
  'description': false,
  'canonical': false
})

const currentMetaTags = ref('')

const applyTestMeta = () => {
  console.log('📝 Application des meta tags de test...')
  
  setArticleMeta({
    titre: testMeta.value.titre,
    description: testMeta.value.description,
    image: testMeta.value.image,
    url: `/article/${articleSlug.value}`,
    date: new Date().toISOString(),
    categorie: 'Test'
  })
  
  validateAllMeta()
}

const validateAllMeta = () => {
  // Vérifier chaque meta tag
  validationResults.value['og:title'] = !!document.querySelector('meta[property="og:title"]')
  validationResults.value['og:description'] = !!document.querySelector('meta[property="og:description"]')
  validationResults.value['og:image'] = !!document.querySelector('meta[property="og:image"]')
  validationResults.value['og:url'] = !!document.querySelector('meta[property="og:url"]')
  validationResults.value['og:type'] = !!document.querySelector('meta[property="og:type"]')
  validationResults.value['twitter:card'] = !!document.querySelector('meta[name="twitter:card"]')
  validationResults.value['description'] = !!document.querySelector('meta[name="description"]')
  validationResults.value['canonical'] = !!document.querySelector('link[rel="canonical"]')
  
  // Récupérer tous les meta tags actuels
  const allMeta = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"], link[rel="canonical"]')
  let metaList = ''
  allMeta.forEach(tag => {
    if (tag.tagName === 'META') {
      const prop = tag.getAttribute('property') || tag.getAttribute('name')
      const content = tag.getAttribute('content')
      metaList += `<${tag.tagName} ${tag.getAttribute('property') ? 'property' : 'name'}="${prop}" content="${content}"\n`
    } else if (tag.tagName === 'LINK') {
      const rel = tag.getAttribute('rel')
      const href = tag.getAttribute('href')
      metaList += `<${tag.tagName} rel="${rel}" href="${href}"\n`
    }
  })
  
  currentMetaTags.value = metaList || 'Aucun meta tag trouvé'
}

const testFacebookDebugger = () => {
  const url = window.location.href
  window.open(`https://developers.facebook.com/tools/debug/sharing/?url=${encodeURIComponent(url)}`, '_blank')
}

const imageError = () => {
  console.warn('⚠️ Erreur de chargement de l\'image')
}

onMounted(() => {
  validateAllMeta()
})
</script>
