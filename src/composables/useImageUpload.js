/**
 * Composable pour gérer les uploads d'images avec Firebase Storage
 * Uploade les images sur Firebase Storage et retourne l'URL
 */

import { ref } from 'vue'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export function useImageUpload() {
  const uploadStatus = ref({
    isUploading: false,
    progress: 0,
    error: null,
    success: false
  })

  const storage = getStorage()

  /**
   * Convertit un fichier en base64 (pour preview local)
   */
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  /**
   * Upload une image sur Firebase Storage et retourne son URL
   */
  const uploadImageToStorage = async (file) => {
    if (!isValidImageFile(file)) {
      throw new Error(uploadStatus.value.error)
    }

    try {
      uploadStatus.value.isUploading = true
      uploadStatus.value.error = null

      // Générer un nom unique pour le fichier
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const fileName = `${timestamp}-${randomStr}-${file.name}`
      
      // Créer la référence de stockage
      const imageRef = storageRef(storage, `articles/${fileName}`)
      
      // Compresser l'image avant upload
      const compressedFile = await compressImageFile(file)
      
      // Uploader le fichier
      const snapshot = await uploadBytes(imageRef, compressedFile)
      
      // Récupérer l'URL de téléchargement
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      uploadStatus.value.success = true
      uploadStatus.value.progress = 100
      
      return downloadURL
    } catch (error) {
      uploadStatus.value.error = `Erreur upload: ${error.message}`
      console.error('Erreur upload Firebase Storage:', error)
      throw error
    } finally {
      uploadStatus.value.isUploading = false
    }
  }

  /**
   * Compresse une image avant upload
   */
  const compressImageFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          
          let width = img.width
          let height = img.height
          const maxWidth = 1200
          
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
          
          canvas.toBlob((blob) => {
            resolve(blob)
          }, 'image/jpeg', 0.8)
        }
        img.onerror = () => reject(new Error('Impossible de charger l\'image'))
        img.src = e.target.result
      }
      reader.onerror = () => reject(new Error('Erreur lecture fichier'))
      reader.readAsDataURL(file)
    })
  }

  /**
   * Valide si le fichier est une image
   */
  const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const maxSize = 5 * 1024 * 1024 // 5MB
    
    if (!validTypes.includes(file.type)) {
      uploadStatus.value.error = 'Format non supporté. Utilisez JPG, PNG, WEBP ou GIF.'
      return false
    }
    
    if (file.size > maxSize) {
      uploadStatus.value.error = 'Image trop grande. Maximum 5MB.'
      return false
    }
    
    return true
  }

  /**
   * Gère le drop d'images (drag & drop) - retourne l'URL Firebase Storage
   */
  const handleImageDrop = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    const files = event.dataTransfer?.files || event.target?.files || []
    
    uploadStatus.value.isUploading = true
    uploadStatus.value.error = null
    uploadStatus.value.progress = 0
    
    try {
      if (files.length === 0) {
        throw new Error('Aucun fichier sélectionné')
      }
      
      const file = files[0]
      
      if (!isValidImageFile(file)) {
        throw new Error(uploadStatus.value.error)
      }
      
      // Upload sur Firebase Storage
      const downloadURL = await uploadImageToStorage(file)
      
      uploadStatus.value.success = true
      uploadStatus.value.progress = 100
      
      return downloadURL
    } catch (error) {
      uploadStatus.value.error = error.message
      console.error('Erreur:', error)
      throw error
    } finally {
      uploadStatus.value.isUploading = false
    }
  }

  /**
   * Traite les fichiers sélectionnés via input file
   */
  const handleFileSelect = async (files) => {
    return handleImageDrop({
      dataTransfer: { files },
      preventDefault: () => {},
      stopPropagation: () => {}
    })
  }

  /**
   * Crée une URL temporaire pour un blob (pour preview)
   */
  const createObjectURL = (blob) => {
    return URL.createObjectURL(blob)
  }

  /**
   * Libère la mémoire d'une URL blob
   */
  const revokeObjectURL = (url) => {
    URL.revokeObjectURL(url)
  }

  return {
    uploadStatus,
    handleImageDrop,
    handleFileSelect,
    uploadImageToStorage,
    fileToBase64,
    isValidImageFile,
    createObjectURL,
    revokeObjectURL
  }
}
