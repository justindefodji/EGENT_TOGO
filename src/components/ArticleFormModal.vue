<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-4 border-b flex justify-between items-center">
        <h2 class="text-2xl font-bold text-white">
          {{ article ? '✎ Éditer l\'Article' : '➕ Ajouter un Article' }}
        </h2>
        <button 
          @click="$emit('close')"
          class="text-white hover:text-gray-200 text-2xl"
        >
          ✕
        </button>
      </div>

      <!-- Messages d'erreur/succès -->
      <div v-if="statusMessage" :class="[
        'mx-6 mt-4 p-4 rounded-lg border-l-4 font-semibold text-sm',
        statusMessage.includes('✅') 
          ? 'bg-green-50 border-green-500 text-green-800' 
          : 'bg-red-50 border-red-500 text-red-800'
      ]">
        {{ statusMessage }}
      </div>

      <!-- Form -->
      <div class="p-6 space-y-6">
        <!-- Titre -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Titre *</label>
          <input 
            v-model="form.title"
            @input="generateSlug"
            type="text"
            placeholder="Ex: Inauguration du nouveau centre"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p v-if="errors.title" class="text-red-600 text-xs mt-1">{{ errors.title }}</p>
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Slug (URL-friendly) *</label>
          <input 
            v-model="form.slug"
            type="text"
            placeholder="inauguration-nouveau-centre"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
          />
          <p class="text-xs text-gray-500 mt-1">Sera utilisé dans l'URL: /article/{{ form.slug }}</p>
          <p v-if="errors.slug" class="text-red-600 text-xs mt-1">{{ errors.slug }}</p>
        </div>

        <!-- Catégorie -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Catégorie *</label>
          <select 
            v-model="form.category"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Actualité">Actualité</option>
            <option value="Partenariat">Partenariat</option>
            <option value="Formation">Formation</option>
            <option value="Événement">Événement</option>
            <option value="Innovation">Innovation</option>
            <option value="Promotion">Promotion</option>
          </select>
          <p v-if="errors.category" class="text-red-600 text-xs mt-1">{{ errors.category }}</p>
        </div>

        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Image de l'article *</label>
          <div 
            @dragover.prevent="dragOverImage = true"
            @dragleave.prevent="dragOverImage = false"
            @drop.prevent="handleImageDrop"
            class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
            :class="dragOverImage ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'"
          >
            <input 
              type="file"
              accept="image/*"
              @change="handleImageSelect"
              class="hidden"
              ref="imageInput"
            />
            
            <!-- État: upload en cours -->
            <div v-if="isUploadingImage" class="space-y-3">
              <div class="animate-spin text-4xl">⏳</div>
              <p class="text-gray-700 font-semibold">Upload en cours...</p>
              <p class="text-xs text-gray-600">Ne pas fermer cette fenêtre. Patience...</p>
            </div>

            <!-- État: image uploadée -->
            <div v-else-if="previewImage" class="space-y-4">
              <img
                :src="previewImage"
                class="max-h-48 mx-auto rounded-lg border-2 border-green-300"
                :alt="form.title"
                onerror="this.style.display='none'"
              />
              <p class="text-xs text-green-600 font-semibold">✅ Image prête</p>
              <button
                @click="previewImage = ''; form.image = ''; currentFile = null"
                type="button"
                class="text-red-600 hover:text-red-700 font-semibold px-6 py-2 bg-red-50 rounded-lg inline-block"
              >
                <i class="fas fa-trash mr-2"></i>Changer
              </button>
            </div>
            
            <!-- État: pas d'image -->
            <div v-else class="space-y-3">
              <div class="text-4xl">🖼️</div>
              <p class="text-gray-700 font-semibold">Glissez une image ici</p>
              <p class="text-sm text-gray-600">ou cliquez pour sélectionner</p>
              <button 
                @click="$refs.imageInput.click()"
                type="button"
                class="text-blue-600 hover:text-blue-700 font-semibold px-6 py-2 bg-blue-50 rounded-lg inline-block"
              >
                <i class="fas fa-cloud-upload-alt mr-2"></i>Sélectionner
              </button>
            </div>
          </div>

          <p v-if="errors.image" class="text-red-600 text-xs mt-1">{{ errors.image }}</p>
        </div>

        <!-- Images Supplémentaires -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Images supplémentaires (glisser-déposer)</label>
          <div
            @drop.prevent="handleDrop"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            :class="[
              'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
              isDraggingImages ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            ]"
          >
            <input 
              type="file"
              accept="image/*"
              multiple
              @change="handleSupplementaryImageSelect"
              class="hidden"
              ref="fileInputSupplementary"
            />
            
            <div class="space-y-3">
              <div class="text-4xl">📸</div>
              <p class="text-gray-600 font-semibold">Glissez vos images ici</p>
              <p class="text-sm text-gray-500">ou cliquez pour sélectionner</p>
              <button 
                @click="$refs.fileInputSupplementary?.click()"
                type="button"
                class="text-blue-600 hover:text-blue-700 font-semibold px-6 py-2 bg-blue-50 rounded-lg inline-block"
              >
                <i class="fas fa-cloud-upload-alt mr-2"></i>Sélectionner des images
              </button>
            </div>
          </div>

          <!-- Aperçu des images en attente -->
          <div v-if="pendingImages.length > 0" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="image in pendingImages" :key="image.id" class="relative">
              <img :src="image.src" :alt="image.fileName" class="w-full h-32 object-cover rounded-lg" />
              <button
                type="button"
                @click="removeImage(image.id)"
                class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Bouton Ajouter Images -->
          <div v-if="pendingImages.length > 0" class="mt-4">
            <button
              type="button"
              @click="addImagesToArticle"
              class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              ✅ Ajouter {{ pendingImages.length }} image(s)
            </button>
          </div>

          <!-- Images Confirmées -->
          <div v-if="form.images && form.images.length > 0" class="mt-4">
            <p class="text-sm font-semibold text-gray-700 mb-2">Images ajoutées ({{ form.images.length }})</p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="(image, idx) in form.images" :key="idx" class="relative">
                <img :src="image" :alt="`Image ${idx + 1}`" class="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  @click="form.images.splice(idx, 1)"
                  class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Excerpt (Résumé) -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Résumé court (Excerpt) *</label>
          <textarea 
            v-model="form.excerpt"
            placeholder="Résumé court de l'article (apparaîtra sur la page de liste)"
            rows="3"
            maxlength="200"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">{{ form.excerpt.length }}/200 caractères</p>
          <p v-if="errors.excerpt" class="text-red-600 text-xs mt-1">{{ errors.excerpt }}</p>
        </div>

        <!-- Contenu HTML -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Contenu de l'article *</label>
          <QuillEditor 
            v-model="form.content"
            class="rounded-lg border border-gray-300"
          />
          <p class="text-xs text-gray-500 mt-2">
            💡 Utilisez l'éditeur ci-dessus pour formatter votre texte. Pas besoin de connaître le HTML!
          </p>
          <p v-if="errors.content" class="text-red-600 text-xs mt-1">{{ errors.content }}</p>
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Date</label>
          <input 
            v-model="form.date"
            type="text"
            placeholder="Ex: 5 Jan 2026"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Auteur -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Auteur</label>
          <input 
            v-model="form.author"
            type="text"
            placeholder="Ex: EGENT TOGO"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
        <button 
          @click="$emit('close')"
          class="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Annuler
        </button>
        <button 
          @click="submitForm"
          :disabled="saving"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <i v-if="saving" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-save"></i>
          {{ saving ? 'Sauvegarde...' : (article ? 'Mettre à jour' : 'Créer') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useFirebaseData } from '../composables/useFirebaseData'
import { useImageCompression } from '../composables/useImageCompression'
import QuillEditor from './QuillEditor.vue'

const props = defineProps({
  article: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'close'])

const { addNews, updateNews } = useFirebaseData()
const { compressImage, isValidImageFile } = useImageCompression()

const imageInput = ref(null)
const fileInputSupplementary = ref(null)
const dragOverImage = ref(false)
const isDraggingImages = ref(false)
const saving = ref(false)
const isUploadingImage = ref(false)
const statusMessage = ref('')
const currentFile = ref(null)
const previewImage = ref(null)  // Preview + stockage en base64 compressé
const pendingImages = ref([])

const form = reactive({
  title: '',
  slug: '',
  category: '',
  image: '',
  images: [],
  excerpt: '',
  content: '',
  date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }),
  author: 'EGENT TOGO'
})

const errors = reactive({
  title: '',
  slug: '',
  category: '',
  image: '',
  excerpt: '',
  content: ''
})

// Pré-remplir le formulaire si édition
watch(() => props.article, (newArticle) => {
  if (newArticle) {
    form.title = newArticle.title || ''
    form.slug = newArticle.slug || ''
    form.category = newArticle.category || ''
    form.image = newArticle.image || ''
    previewImage.value = newArticle.image || ''  // URL depuis Firestore
    form.images = newArticle.images ? JSON.parse(JSON.stringify(newArticle.images)) : []
    form.excerpt = newArticle.excerpt || ''
    form.content = newArticle.content || ''
    form.date = newArticle.date || ''
    form.author = newArticle.author || 'EGENT TOGO'
    pendingImages.value = []
  }
}, { immediate: true })

// Générer automatiquement le slug à partir du titre
const generateSlug = () => {
  const slug = form.title
    .toLowerCase()
    .trim()
    .replace(/[éèê]/g, 'e')
    .replace(/[àâ]/g, 'a')
    .replace(/[ù]/g, 'u')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50)
  
  // Ne générer que si on crée, pas si on édite
  if (!props.article) {
    form.slug = slug
  }
}

// Traiter le drop d'image
const handleImageDrop = async (e) => {
  dragOverImage.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    await handleImageFile(files[0])
  }
}

// Traiter la sélection d'image
const handleImageSelect = async (e) => {
  const files = e.target.files
  if (files.length > 0) {
    await handleImageFile(files[0])
  }
}

// Upload l'image sur Firebase Storage
const handleImageFile = async (file) => {
  try {
    if (!isValidImageFile(file)) {
      throw new Error('Format d\'image invalide')
    }

    statusMessage.value = '⏳ Compression de l\'image en cours...'
    isUploadingImage.value = true
    
    console.log('📸 Compression image:', { filename: file.name, size: `${(file.size / 1024).toFixed(2)}KB` })
    
    // Compresser l'image avec timeout
    const compressPromise = compressImage(file, 300)
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('⏱️ Timeout compression (> 30s). Image trop grande?')), 30000)
    )
    
    const result = await Promise.race([compressPromise, timeoutPromise])
    
    console.log(`✅ Image compressée: ${result.originalSizeKB.toFixed(2)}KB → ${result.sizeKB.toFixed(2)}KB (${result.compressionRatio}% reduction)`)
    
    // Stocker le base64 compressé DIRECTEMENT dans Firestore
    previewImage.value = result.base64
    form.image = result.base64
    errors.image = ''
    statusMessage.value = `✅ Image compressée et prête! (${result.compressionRatio}% reduction)`
  } catch (error) {
    console.error('❌ Erreur compression:', error)
    errors.image = error.message
    statusMessage.value = `❌ Erreur: ${error.message}`
    previewImage.value = ''  // Réinitialiser en cas d'erreur
  } finally {
    isUploadingImage.value = false
    // Nettoyer le message après 5s si pas d'erreur
    setTimeout(() => {
      if (!saving.value && !errors.image && statusMessage.value.includes('✅')) {
        statusMessage.value = ''
      }
    }, 5000)
  }
}

// Gérer les images supplémentaires (drag & drop)
const handleDragOver = (e) => {
  e.preventDefault()
  isDraggingImages.value = true
}

const handleDragLeave = () => {
  isDraggingImages.value = false
}

const handleDrop = (e) => {
  e.preventDefault()
  isDraggingImages.value = false
  const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
  processImageFiles(files)
}

const handleSupplementaryImageSelect = (e) => {
  const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'))
  processImageFiles(files)
}

// Compresser une image
const compressImageBase64 = (base64Data, callback) => {
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    let width = img.width
    let height = img.height
    
    const maxWidth = 800
    if (width > maxWidth) {
      height = (height * maxWidth) / width
      width = maxWidth
    }
    
    canvas.width = width
    canvas.height = height
    
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)
    
    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5)
    callback(compressedBase64)
  }
  img.src = base64Data
}

// Traiter les fichiers images supplémentaires
const processImageFiles = (files) => {
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      compressImageBase64(e.target.result, (compressedBase64) => {
        pendingImages.value.push({
          id: Date.now() + Math.random(),
          src: compressedBase64,
          fileName: file.name
        })
      })
    }
    reader.readAsDataURL(file)
  })
}

// Retirer une image en attente
const removeImage = (id) => {
  pendingImages.value = pendingImages.value.filter(img => img.id !== id)
}

// Ajouter les images aux articles
const addImagesToArticle = () => {
  if (pendingImages.value.length > 0) {
    const newImages = pendingImages.value.map(img => img.src)
    form.images = [...(form.images || []), ...newImages]
    pendingImages.value = []
    statusMessage.value = `✅ ${newImages.length} image(s) ajoutée(s)!`
  }
}

// Valider le formulaire
const validateForm = () => {
  errors.title = ''
  errors.slug = ''
  errors.category = ''
  errors.image = ''
  errors.excerpt = ''
  errors.content = ''

  if (!form.title.trim()) errors.title = 'Le titre est requis'
  if (!form.slug.trim()) errors.slug = 'Le slug est requis'
  if (!form.category.trim()) errors.category = 'La catégorie est requise'
  if (!form.image) errors.image = 'L\'image est requise'
  if (!form.excerpt.trim()) errors.excerpt = 'Le résumé est requis'
  if (!form.content.trim()) errors.content = 'Le contenu est requis'

  return !Object.values(errors).some(e => e !== '')
}

// Soumettre le formulaire
const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  try {
    saving.value = true
    statusMessage.value = '⏳ Sauvegarde...'

    // IMPORTANT: form.image DOIT être du base64 compressé
    if (!form.image || !form.image.startsWith('data:image')) {
      throw new Error('❌ Erreur: L\'image n\'a pas été compressée correctement. Veuillez sélectionner une image.')
    }

    const articleData = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      image: form.image,  // Base64 compressé < 300KB
      images: form.images || [],  // Images supplémentaires
      excerpt: form.excerpt,
      content: form.content,
      date: form.date,
      author: form.author
    }

    if (props.article) {
      // Édition - l'article existe
      await updateNews(props.article.id, articleData)
      statusMessage.value = '✅ Article mis à jour!'
    } else {
      // Création - nouvel article
      await addNews(articleData)
      statusMessage.value = '✅ Article créé!'
    }

    setTimeout(() => {
      emit('close')
    }, 1000)
  } catch (error) {
    statusMessage.value = `❌ ${error.message}`
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
textarea {
  font-family: 'Courier New', monospace;
  resize: vertical;
}
</style>
