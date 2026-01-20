<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6" style="color: #016E98">Formulaires de Contact</h2>
    
    <div class="mb-4 flex gap-2">
      <button
        @click="loadForms"
        class="px-4 py-2 rounded text-white"
        style="background-color: #0392C7"
      >
        Actualiser
      </button>
      <span class="text-sm text-gray-600 pt-2">{{ forms.length }} formulaires</span>
    </div>

    <!-- Message si aucun formulaire -->
    <div v-if="forms.length === 0" class="text-center py-8 text-gray-500">
      <p>Aucun formulaire de contact pour le moment.</p>
    </div>

    <!-- Tableau des formulaires -->
    <div v-else class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr style="background-color: #f5f5f5; border-bottom: 2px solid #016E98">
            <th class="text-left p-3 font-semibold" style="color: #016E98">Nom</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Email</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Téléphone</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Sujet</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Date</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Statut</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="form in forms"
            :key="form.id"
            style="border-bottom: 1px solid #ddd"
            :style="{ 'background-color': form.isRead ? '#f9f9f9' : '#fff9e6' }"
          >
            <td class="p-3">{{ form.name }}</td>
            <td class="p-3 text-sm">{{ form.email }}</td>
            <td class="p-3 text-sm">{{ form.phone }}</td>
            <td class="p-3 text-sm">{{ form.subject }}</td>
            <td class="p-3 text-sm">{{ formatDate(form.createdAt) }}</td>
            <td class="p-3">
              <span
                v-if="form.status === 'new'"
                class="px-3 py-1 rounded text-white text-sm"
                style="background-color: #FF9D35"
              >
                Nouveau
              </span>
              <span
                v-else-if="form.status === 'read'"
                class="px-3 py-1 rounded text-white text-sm"
                style="background-color: #0392C7"
              >
                Consulté
              </span>
              <span
                v-else
                class="px-3 py-1 rounded text-white text-sm"
                style="background-color: #1abc9c"
              >
                Répondu
              </span>
            </td>
            <td class="p-3 space-x-2">
              <button
                @click="viewForm(form)"
                class="text-white px-3 py-1 rounded text-sm"
                style="background-color: #0392C7"
              >
                Voir
              </button>
              <button
                v-if="form.status === 'new'"
                @click="markAsRead(form.id)"
                class="text-white px-3 py-1 rounded text-sm"
                style="background-color: #1abc9c"
              >
                Lire
              </button>
              <button
                @click="deleteForm(form.id)"
                class="text-white px-3 py-1 rounded text-sm"
                style="background-color: #e74c3c"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de vue détaillée -->
    <div
      v-if="selectedForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <h3 class="text-2xl font-bold mb-4" style="color: #016E98">
          Message de {{ selectedForm.name }}
        </h3>

        <div class="space-y-4 mb-6">
          <div>
            <label class="font-semibold" style="color: #016E98">Nom :</label>
            <p class="text-gray-700">{{ selectedForm.name }}</p>
          </div>
          <div>
            <label class="font-semibold" style="color: #016E98">Email :</label>
            <p class="text-gray-700">
              <a :href="`mailto:${selectedForm.email}`" style="color: #0392C7" class="hover:underline">
                {{ selectedForm.email }}
              </a>
            </p>
          </div>
          <div>
            <label class="font-semibold" style="color: #016E98">Téléphone :</label>
            <p class="text-gray-700">
              <a :href="`tel:${selectedForm.phone}`" style="color: #0392C7" class="hover:underline">
                {{ selectedForm.phone }}
              </a>
            </p>
          </div>
          <div>
            <label class="font-semibold" style="color: #016E98">Sujet :</label>
            <p class="text-gray-700">{{ selectedForm.subject }}</p>
          </div>
          <div>
            <label class="font-semibold" style="color: #016E98">Date :</label>
            <p class="text-gray-700">{{ formatDate(selectedForm.createdAt) }}</p>
          </div>
          <div>
            <label class="font-semibold" style="color: #016E98">Message :</label>
            <p class="text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-wrap">
              {{ selectedForm.message }}
            </p>
          </div>
          <div v-if="selectedForm.ipAddress" class="text-xs text-gray-500">
            <p>IP: {{ selectedForm.ipAddress }}</p>
          </div>
        </div>

        <div class="flex gap-2 justify-end">
          <button
            @click="selectedForm = null"
            class="px-4 py-2 rounded text-gray-700 border"
            style="border-color: #016E98"
          >
            Fermer
          </button>
          <button
            v-if="selectedForm.status === 'new'"
            @click="markAsRead(selectedForm.id); selectedForm = null"
            class="px-4 py-2 rounded text-white"
            style="background-color: #1abc9c"
          >
            Marquer comme consulté
          </button>
          <a
            :href="`mailto:${selectedForm.email}`"
            class="px-4 py-2 rounded text-white"
            style="background-color: #0392C7"
          >
            Répondre
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

const forms = ref([])
const selectedForm = ref(null)

const loadForms = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'contact_forms'))
    forms.value = snapshot.docs
      .map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      .sort((a, b) => {
        const timeA = a.createdAt?.toDate?.() || new Date(0)
        const timeB = b.createdAt?.toDate?.() || new Date(0)
        return timeB - timeA
      })
  } catch (error) {
    console.error('Erreur chargement formulaires:', error)
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate?.() || new Date(timestamp)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const viewForm = (form) => {
  selectedForm.value = form
  if (form.status === 'new') {
    markAsRead(form.id)
  }
}

const markAsRead = async (formId) => {
  try {
    await updateDoc(doc(db, 'contact_forms', formId), {
      status: 'read'
    })
    await loadForms()
  } catch (error) {
    console.error('Erreur mise à jour:', error)
  }
}

const deleteForm = async (formId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce formulaire ?')) {
    try {
      await deleteDoc(doc(db, 'contact_forms', formId))
      await loadForms()
      selectedForm.value = null
    } catch (error) {
      console.error('Erreur suppression:', error)
    }
  }
}

onMounted(() => {
  loadForms()
})
</script>
