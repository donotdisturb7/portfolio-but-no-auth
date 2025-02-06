<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="fixed inset-0 bg-opacity-50" @click="$emit('close')" 
           style="backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);"></div>

      <div class="relative w-full max-w-2xl rounded-lg bg-white p-4 shadow-xl">
        <div class="max-h-[80vh] overflow-y-auto">
          <h2 class="mb-4 text-xl font-bold">Ajouter un projet</h2>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Première ligne: Titre et Type -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Titre</label>
                <input
                  v-model="formData.titre"
                  type="text"
                  required
                  class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Type</label>
                <select
                  v-model="formData.type"
                  required
                  class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="web">Web</option>
                  <option value="jeuxvideo">Jeux vidéo</option>
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                  <option value="ia">Intelligence Artificielle</option>
                  <option value="cybersecurite">Cybersécurité</option>
                  <option value="robotique">Robotique</option>
                  <option value="realite_virtuelle">Réalité Virtuelle</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                v-model="formData.description"
                required
                rows="2"
                class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <!-- Informations personnelles -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  v-model="formData.prenom"
                  type="text"
                  required
                  class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Nom</label>
                <input
                  v-model="formData.nom"
                  type="text"
                  required
                  class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div class="col-span-2">
                <label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <!-- Deuxième ligne: Liens -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Lien GitHub</label>
                <input
                  v-model="formData.lien_github"
                  type="url"
                  class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Lien Demo</label>
                <input
                  v-model="formData.lien_demo"
                  type="url"
                  class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <!-- Technologies -->
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Technologies</label>
              <div class="flex items-center space-x-2">
                <input
                  v-model="technologyInput"
                  type="text"
                  placeholder="Ajouter une technologie"
                  class="flex-grow rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  @keyup.enter.prevent="addTechnology"
                />
                <button
                  type="button"
                  @click="addTechnology"
                  class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  +
                </button>
              </div>
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="(tech, index) in formData.technologies"
                  :key="index"
                  class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                >
                  {{ tech }}
                  <button
                    type="button"
                    @click="removeTechnology(index)"
                    class="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>

            <!-- Image -->
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Image de couverture</label>
              <input 
                type="file" 
                accept="image/*"
                @change="handleImageUpload"
                class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              />
              <div v-if="imagePreview" class="mt-2">
                <img :src="imagePreview" alt="Preview" class="h-32 w-full object-cover rounded-lg">
              </div>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="$emit('close')"
                class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Créer le projet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useProjectStore } from '@/stores/projects'
import { supabase } from '@/supabase'

const props = defineProps(['show'])
const projectStore = useProjectStore()
const formData = ref({
  titre: '',
  description: '',
  type: '',
  prenom: '',
  nom: '',
  email: '',
  technologies: [],
  lien_github: '',
  lien_demo: '',
  image: null
})

const technologyInput = ref('')
const imagePreview = ref(null)

const emit = defineEmits(['close'])

const addTechnology = () => {
  if (technologyInput.value.trim()) {
    formData.value.technologies.push(technologyInput.value.trim())
    technologyInput.value = ''
  }
}

const removeTechnology = (index) => {
  formData.value.technologies.splice(index, 1)
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${file.name.split('.').pop()}`
    
   
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    
    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(data.path)

    formData.value.image = publicUrl
    imagePreview.value = publicUrl

  } catch (error) {
    console.error("Erreur d'upload :", error)
    
  }
}


const handleSubmit = async () => {
  try {
    await projectStore.addProject(formData.value)
    resetForm()
    emit('close')
  } catch (error) {
    console.error('Erreur lors de l\'ajout du projet:', error)
  }
}

const resetForm = () => {
  formData.value = {
    titre: '',
    description: '',
    type: '',
    prenom: '',
    nom: '',
    email: '',
    technologies: [],
    lien_github: '',
    lien_demo: '',
    image: null
  }
}
</script>