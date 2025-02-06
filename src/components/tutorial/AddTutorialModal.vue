<template>
  <div v-if="show" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

      <div class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button
            @click="close"
            class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span class="sr-only">Fermer</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="sm:flex sm:items-start">
          <div class="mt-3 w-full text-center sm:mt-0 sm:text-left">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Nouveau tutoriel
            </h3>

            <div class="mt-4">
              <form @submit.prevent="handleSubmit">
                <div class="space-y-4">
                  <!-- Titre -->
                  <div>
                    <label for="titre" class="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                      type="text"
                      id="titre"
                      v-model="formData.titre"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <!-- Catégorie -->
                  <div>
                    <label for="categorie" class="block text-sm font-medium text-gray-700">Catégorie</label>
                    <select
                      id="categorie"
                      v-model="formData.categorie"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      <option v-for="category in categories" :key="category" :value="category">
                        {{ category }}
                      </option>
                    </select>
                  </div>

                  <!-- Contenu -->
                  <div>
                    <label for="contenu" class="block text-sm font-medium text-gray-700">Contenu (Markdown)</label>
                    <textarea
                      id="contenu"
                      v-model="formData.contenu"
                      rows="6"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    ></textarea>
                  </div>

                  <!-- Image -->
                  <div>
                    <label for="image" class="block text-sm font-medium text-gray-700">Image (optionnel)</label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      @change="handleImageChange"
                      class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>

                <div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {{ loading ? 'Création...' : 'Créer' }}
                  </button>
                  <button
                    type="button"
                    @click="close"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'

// Déclarez la prop "show" pour que le composant sache quand s'afficher
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

// Déclaration des événements émis (ex : fermer le modal, notifier l'ajout d'un tutoriel)
const emit = defineEmits(['close', 'tutorialAdded'])

// Exemple de déclaration d'état et de méthodes
const loading = ref(false)
const formData = ref({
  titre: '',
  categorie: '',
  contenu: '',
  image: null
})
const categories = ref(['Développement Web', 'Base de données', 'Programmation', 'DevOps', 'Sécurité', 'Autre'])

const handleImageChange = (event) => {
  const file = event.target.files[0]
  formData.value.image = file
}

const handleSubmit = async () => {
  // Exemple : vous pouvez ajouter ici la logique de création du tutoriel via Supabase
  loading.value = true
  // Effectuez votre appel API ici...
  // Une fois terminé, on émet un événement pour notifier l'ajout et fermer le modal
  emit('tutorialAdded')
  loading.value = false
  emit('close')
}
</script> 