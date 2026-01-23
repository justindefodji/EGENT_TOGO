<template>
  <div class="space-y-6 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold text-gray-900">Gestion des Projets</h2>
      <button
        @click="showForm = !showForm"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center gap-2"
      >
        <i :class="showForm ? 'fas fa-times' : 'fas fa-plus'"></i>
        {{ showForm ? 'Annuler' : 'Nouveau Projet' }}
      </button>
    </div>

    <!-- Statut Messages -->
    <transition name="fade">
      <div v-if="statusMessage" :class="[
        'p-4 rounded-lg border-l-4 font-semibold',
        statusMessage.includes('✅') 
          ? 'bg-green-50 border-green-500 text-green-800' 
          : 'bg-red-50 border-red-500 text-red-800'
      ]">
        {{ statusMessage }}
      </div>
    </transition>

    <!-- Formulaire -->
    <div v-if="showForm" class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 class="text-xl font-bold text-gray-900 mb-6">
        {{ isEditing ? '✏️ Modifier Projet' : '➕ Créer Nouveau Projet' }}
      </h3>
      
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Grille Principale -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Titre -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Titre du Projet *</label>
            <input
              v-model="formData.title"
              type="text"
              required
              placeholder="Ex: Installation Solaire Résidentielle"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <!-- Catégorie -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Catégorie *</label>
            <input
              v-model="formData.category"
              type="text"
              required
              placeholder="Ex: Énergie Solaire"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <!-- Localisation -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Localisation</label>
            <input
              v-model="formData.location"
              type="text"
              placeholder="Ex: Lomé, Togo"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <!-- Date -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              v-model="formData.date"
              type="text"
              placeholder="Ex: Décembre 2023"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
          <input
            v-model="formData.slug"
            type="text"
            placeholder="installation-solaire-residential"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
          />
        </div>

        <!-- Description Courte -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Description Courte</label>
          <textarea
            v-model="formData.shortDescription"
            rows="2"
            placeholder="Résumé court du projet"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
          ></textarea>
        </div>

        <!-- Description Complète --> 
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Description Complète</label>
          <QuillEditor 
            v-model="formData.description"
            class="rounded-lg border-2 border-gray-300"
          />
          <p class="text-xs text-gray-500 mt-2">
            💡 Utilisez l'éditeur ci-dessus pour formatter votre texte. Pas besoin de connaître le HTML!
          </p>
        </div>

        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Image principale</label>
          <div
            @dragover.prevent="handleDragOverMainImage"
            @dragleave.prevent="handleDragLeaveMainImage"
            @drop.prevent="handleDropMainImage"
            class="border-3 border-dashed border-blue-400 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition bg-blue-50/50"
            :class="isDraggingMainImage ? 'border-blue-600 bg-blue-100' : ''"
          >
            <div v-if="!previewImage" class="space-y-3">
              <div class="text-4xl">🖼️</div>
              <p class="text-gray-700 font-semibold">Glissez-déposez votre image ici</p>
              <p class="text-sm text-gray-600">ou cliquez pour sélectionner</p>
              <input
                type="file"
                @change="handleMainImageSelect"
                accept="image/*"
                class="hidden"
                ref="fileInput"
              />
              <button
                type="button"
                @click="$refs.fileInput?.click()"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition inline-block"
              >
                Sélectionner une image
              </button>
            </div>
            <div v-else-if="isUploadingImage" class="space-y-3">
              <div class="animate-spin text-4xl">⏳</div>
              <p class="text-gray-700 font-semibold">Upload en cours...</p>
            </div>
            <div v-else class="space-y-4">
              <img
                :src="previewImage"
                :alt="formData.title"
                class="max-h-64 mx-auto rounded-lg object-cover"
              />
              <button
                type="button"
                @click="previewImage = ''; formData.mainImage = ''; currentFile = null"
                class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Changer l'image
              </button>
            </div>
          </div>
        </div>

        <!-- Images Supplémentaires -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Images supplémentaires</label>
          <div
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
            class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors"
            :class="isDraggingImages ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-400'"
          >
            <div v-if="pendingImages.length === 0" class="space-y-2">
              <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 block"></i>
              <p class="text-gray-600 font-semibold">Glissez vos images ici</p>
              <p class="text-sm text-gray-500">ou</p>
              <input
                type="file"
                multiple
                accept="image/*"
                @change="handleImageSelect"
                class="hidden"
                ref="imagesInput"
              />
              <button
                type="button"
                @click="$refs.imagesInput?.click()"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition inline-block text-sm"
              >
                Sélectionner des images
              </button>
            </div>
          </div>

          <!-- Aperçu des images en attente -->
          <div v-if="pendingImages.length > 0" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="image in pendingImages" :key="image.id" class="relative group">
              <img 
                :src="image.src" 
                :alt="image.fileName"
                class="w-full h-24 object-cover rounded-lg shadow-md"
              />
              <button
                @click="removeImage(image.id)"
                type="button"
                class="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i class="fas fa-times text-sm"></i>
              </button>
              <p class="text-xs text-gray-600 mt-1 truncate">{{ image.fileName }}</p>
            </div>
          </div>

          <!-- Bouton d'ajout -->
          <div v-if="pendingImages.length > 0" class="mt-4">
            <button
              @click="addImagesToProject"
              type="button"
              class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              <i class="fas fa-check mr-2"></i>Ajouter {{ pendingImages.length }} image(s)
            </button>
          </div>

          <!-- Images existantes -->
          <div v-if="formData.images && formData.images.length > 0" class="mt-6">
            <h4 class="text-sm font-bold text-gray-700 mb-3">Images existantes</h4>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="(image, idx) in formData.images" :key="idx" class="relative group">
                <img 
                  :src="image" 
                  :alt="'Image ' + (idx + 1)"
                  class="w-full h-24 object-cover rounded-lg shadow-md"
                />
                <button
                  @click="removeExistingImage(idx)"
                  type="button"
                  class="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i class="fas fa-trash text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Résultats -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            <i class="fas fa-chart-line mr-2"></i>Résultats clés
          </label>
          <div class="space-y-3">
            <div v-for="(result, idx) in formData.results" :key="idx" class="flex gap-3">
              <div class="flex-1 space-y-2">
                <input 
                  v-model="formData.results[idx].metric"
                  type="text"
                  placeholder="Ex: +50%"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  v-model="formData.results[idx].description"
                  type="text"
                  placeholder="Ex: Augmentation de rendement"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                @click="formData.results.splice(idx, 1)"
                type="button"
                class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition h-fit"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <button
              @click="formData.results.push({ metric: '', description: '' })"
              type="button"
              class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition"
            >
              <i class="fas fa-plus"></i> Ajouter un résultat
            </button>
          </div>
        </div>

        <!-- Caractéristiques et Avantages -->
        <div>
          <h4 class="text-lg font-bold text-gray-800 mb-4">À propos du projet</h4>
          
          <!-- Caractéristiques principales -->
          <div class="mb-6">
            <label class="block text-sm font-bold text-gray-700 mb-3">
              <i class="fas fa-list mr-2"></i>Caractéristiques principales
            </label>
            <div class="space-y-3">
              <div v-for="(char, idx) in formData.mainCharacteristics" :key="idx" class="flex gap-3">
                <textarea 
                  v-model="formData.mainCharacteristics[idx]"
                  placeholder="Ex: Installation solaire haute performance"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="1"
                ></textarea>
                <button
                  @click="formData.mainCharacteristics.splice(idx, 1)"
                  type="button"
                  class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <button
                @click="formData.mainCharacteristics.push('')"
                type="button"
                class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition"
              >
                <i class="fas fa-plus"></i> Ajouter une caractéristique
              </button>
            </div>
          </div>

          <!-- Avantages -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-3">
              <i class="fas fa-star mr-2"></i>Avantages
            </label>
            <div class="space-y-3">
              <div v-for="(adv, idx) in formData.advantages" :key="idx" class="flex gap-3">
                <textarea 
                  v-model="formData.advantages[idx]"
                  placeholder="Ex: Économies d'énergie considérables"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="1"
                ></textarea>
                <button
                  @click="formData.advantages.splice(idx, 1)"
                  type="button"
                  class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <button
                @click="formData.advantages.push('')"
                type="button"
                class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition"
              >
                <i class="fas fa-plus"></i> Ajouter un avantage
              </button>
            </div>
          </div>
        </div>

        <!-- Boutons -->
        <div class="flex gap-4 pt-4 border-t-2 border-gray-200">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
          >
            <i :class="isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-save'"></i>
            {{ isSubmitting ? 'Traitement...' : (isEditing ? 'Mettre à jour' : 'Créer') }}
          </button>
          <button
            type="button"
            @click="resetForm"
            class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Tableau des Projets -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header du Tableau -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <i class="fas fa-briefcase"></i>
          Projets ({{ projects.length }})
        </h3>
      </div>

      <!-- Tableau -->
      <div v-if="projects.length > 0" class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">Titre</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">Catégorie</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">Localisation</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">Image</th>
              <th class="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 text-sm text-gray-900 font-semibold">{{ project.title }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {{ project.category }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ project.location || '-' }}</td>
              <td class="px-6 py-4 text-sm">
                <img 
                  v-if="project.mainImage" 
                  :src="project.mainImage" 
                  :alt="project.title"
                  class="h-10 w-10 rounded object-cover"
                />
                <span v-else class="text-gray-400 text-xs">Pas d'image</span>
              </td>
              <td class="px-6 py-4 text-sm">
                <div class="flex justify-center gap-2">
                  <button
                    @click="editProject(project)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold text-xs transition flex items-center gap-1"
                  >
                    <i class="fas fa-pen"></i>
                    Éditer
                  </button>
                  <button
                    @click="confirmDelete(project)"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold text-xs transition flex items-center gap-1"
                  >
                    <i class="fas fa-trash"></i>
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Vide -->
      <div v-else class="p-8 text-center">
        <div class="text-5xl mb-4">📋</div>
        <p class="text-gray-600 text-lg font-semibold">Aucun projet trouvé</p>
        <p class="text-gray-500 text-sm">Cliquez sur "Nouveau Projet" pour en créer un</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import QuillEditor from './QuillEditor.vue'

// État
const projects = ref([])
const showForm = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const isUploadingImage = ref(false)
const statusMessage = ref('')
const fileInput = ref(null)
const currentFile = ref(null)
const previewImage = ref(null)  // Preview locale en base64
const isDraggingImages = ref(false)
const isDraggingMainImage = ref(false)
const pendingImages = ref([])

// Formulaire
const formData = ref({
  title: '',
  category: '',
  location: '',
  date: '',
  slug: '',
  shortDescription: '',
  description: '',
  mainImage: '',
  images: [],
  results: [],
  mainCharacteristics: [],
  advantages: []
})

const defaultFormData = {
  title: '',
  category: '',
  location: '',
  date: '',
  slug: '',
  shortDescription: '',
  description: '',
  mainImage: '',
  images: [],
  results: [],
  mainCharacteristics: [],
  advantages: []
}

// Charger les projets
const loadProjects = async () => {
  try {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    projects.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    console.error('Erreur chargement projets:', err)
    showStatus('❌ Erreur lors du chargement des projets', 'error')
  }
}

// Générer un slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[éèê]/g, 'e')
    .replace(/[àâ]/g, 'a')
    .replace(/[ù]/g, 'u')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

// Afficher un statut
const showStatus = (message, type = 'success') => {
  statusMessage.value = message
  setTimeout(() => {
    statusMessage.value = ''
  }, 4000)
}

// Réinitialiser le formulaire
const resetForm = () => {
  formData.value = { ...defaultFormData }
  previewImage.value = null
  currentFile.value = null
  isEditing.value = false
  showForm.value = false
  pendingImages.value = []
}

// Éditer un projet
const editProject = (project) => {
  formData.value = {
    id: project.id,
    title: project.title || '',
    category: project.category || '',
    location: project.location || '',
    date: project.date || '',
    slug: project.slug || '',
    shortDescription: project.shortDescription || '',
    description: project.description || '',
    mainImage: project.mainImage || '',
    images: project.images ? JSON.parse(JSON.stringify(project.images)) : [],
    results: project.results ? JSON.parse(JSON.stringify(project.results)) : [],
    mainCharacteristics: project.mainCharacteristics ? JSON.parse(JSON.stringify(project.mainCharacteristics)) : [],
    advantages: project.advantages ? JSON.parse(JSON.stringify(project.advantages)) : []
  }
  previewImage.value = project.mainImage  // URL depuis Firestore pour la preview
  pendingImages.value = []
  isEditing.value = true
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Gérer l'image (drag & drop)
const handleImageDrop = (e) => {
  const files = e.dataTransfer.files
  if (files.length > 0) {
    readImage(files[0])
  }
}

// Gérer l'image (sélection fichier)
const handleFileInput = (e) => {
  const files = e.target.files
  if (files.length > 0) {
    readImage(files[0])
  }
}

// Lire l'image
const readImage = (file) => {
  if (!file.type.startsWith('image/')) {
    showStatus('❌ Sélectionnez une image valide', 'error')
    return
  }
  
  if (file.size > 5 * 1024 * 1024) {
    showStatus('❌ L\'image ne doit pas dépasser 5 MB', 'error')
    return
  }
  
  currentFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.value = e.target.result  // Preview locale UNIQUEMENT
  }
  reader.onerror = () => {
    showStatus('❌ Erreur lors de la lecture de l\'image', 'error')
  }
  reader.readAsDataURL(file)
}

// Gestion des images supplémentaires
const handleDragOver = (e) => {
  e.preventDefault()
  isDraggingImages.value = true
}

const handleDragLeave = () => {
  isDraggingImages.value = false
}

const handleDragOverMainImage = (e) => {
  e.preventDefault()
  isDraggingMainImage.value = true
}

const handleDragLeaveMainImage = () => {
  isDraggingMainImage.value = false
}

const handleDrop = (e) => {
  e.preventDefault()
  isDraggingImages.value = false
  const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
  processImageFiles(files)
}

const handleDropMainImage = (e) => {
  e.preventDefault()
  isDraggingMainImage.value = false
  const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
  if (files.length > 0) {
    processMainImageFile(files[0])
  }
}

const handleImageSelect = (e) => {
  const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'))
  processImageFiles(files)
}

const handleMainImageSelect = (e) => {
  const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'))
  if (files.length > 0) {
    processMainImageFile(files[0])
  }
}

const processMainImageFile = (file) => {
  currentFile.value = file  // Stocker le fichier original pour upload
  const reader = new FileReader()
  reader.onload = (e) => {
    // Compresser l'image avant d'afficher la preview
    compressImage(e.target.result, (compressedBase64) => {
      previewImage.value = compressedBase64  // Afficher la preview comprimée
      formData.value.mainImage = compressedBase64  // Stocker le base64 comprimé
    })
  }
  reader.readAsDataURL(file)
}

// Compresser une image
const compressImage = (base64Data, callback) => {
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    let width = img.width
    let height = img.height
    
    // Réduire la taille max à 800px pour les images
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
    
    // Compression très agressive: 0.5 = 50% de qualité
    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5)
    callback(compressedBase64)
  }
  img.src = base64Data
}

const processImageFiles = (files) => {
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      // Compresser l'image avant de l'ajouter
      compressImage(e.target.result, (compressedBase64) => {
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

const removeImage = (id) => {
  pendingImages.value = pendingImages.value.filter(img => img.id !== id)
}

const addImagesToProject = () => {
  if (pendingImages.value.length > 0) {
    const newImages = pendingImages.value.map(img => img.src)
    if (!formData.value.images) {
      formData.value.images = []
    }
    formData.value.images = [...formData.value.images, ...newImages]
    pendingImages.value = []
    showStatus(`✅ ${newImages.length} image(s) ajoutée(s) au projet!`)
  }
}

const removeExistingImage = (idx) => {
  formData.value.images.splice(idx, 1)
}

// Soumettre le formulaire
const submitForm = async () => {
  try {
    isSubmitting.value = true
    statusMessage.value = '⏳ Traitement...'

    // Validation
    if (!formData.value.title || !formData.value.category) {
      throw new Error('Les champs Titre et Catégorie sont obligatoires')
    }

    // Auto-générer le slug s'il est vide
    if (!formData.value.slug) {
      formData.value.slug = generateSlug(formData.value.title)
    }

    // Préparer les données (les images restent en base64)
    const data = {
      title: formData.value.title,
      category: formData.value.category,
      location: formData.value.location || '',
      date: formData.value.date || '',
      slug: formData.value.slug,
      shortDescription: formData.value.shortDescription || '',
      description: formData.value.description || '',
      mainImage: formData.value.mainImage || '',
      images: formData.value.images || [],
      results: formData.value.results || [],
      mainCharacteristics: formData.value.mainCharacteristics || [],
      advantages: formData.value.advantages || []
    }

    if (isEditing.value) {
      // Mise à jour
      await updateDoc(doc(db, 'projects', formData.value.id), {
        ...data,
        updatedAt: serverTimestamp()
      })
      showStatus('✅ Projet mis à jour avec succès!')
    } else {
      // Créer
      await addDoc(collection(db, 'projects'), {
        ...data,
        createdAt: serverTimestamp()
      })
      showStatus('✅ Projet créé avec succès!')
    }

    await loadProjects()
    resetForm()
  } catch (err) {
    console.error('Erreur:', err)
    showStatus(`❌ ${err.message}`, 'error')
  } finally {
    isSubmitting.value = false
    isUploadingImage.value = false
  }
}

// Confirmer la suppression
const confirmDelete = (project) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${project.title}"?`)) {
    deleteProjectMethod(project.id)
  }
}

// Supprimer un projet
const deleteProjectMethod = async (id) => {
  try {
    statusMessage.value = '⏳ Suppression...'
    await deleteDoc(doc(db, 'projects', id))
    await loadProjects()
    showStatus('✅ Projet supprimé avec succès!')
  } catch (err) {
    console.error('Erreur:', err)
    showStatus(`❌ ${err.message}`, 'error')
  }
}

// Charger au montage
onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
