<template>
  <div class="min-h-screen bg-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Tutoriels</h1>
        <div class="flex space-x-4">
          <button
            @click="showMarkdownHelp = true"
            class="inline-flex items-center px-4 py-2 border focus:ring-gray-500 border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-100 text-gray-700  hover:bg-gray-200  focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
          
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
            Guide Markdown
          </button>
          <button
            @click="showToast"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un tutoriel
          </button>
        </div>
      </div>

      <div class="flex py-4 overflow-x-auto overflow-y-hidden md:justify-center">
        <button
          v-for="category in categories"
          :key="category"
          :class="[
            'h-12 px-8 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none',
            selectedCategory === category
              ? 'text-blue-600 border-blue-500'
              : 'text-gray-700 border-gray-200 hover:border-gray-400'
          ]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div v-if="filteredTutorials.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun tutoriel dans cette catégorie</h3>
        <p class="mt-1 text-sm text-gray-500">
          Commencez par créer votre premier tutoriel.
        </p>
        <div class="mt-6">
          <button
            @click="showAddTutorial = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Créer un tutoriel
          </button>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        <TutorialCard
          v-for="tutorial in filteredTutorials"
          :key="tutorial.id"
          :tutorial="tutorial"
          @delete="deleteTutorial"
        />
      </div>
    </div>

    <!-- Modal d'ajout de tutoriel -->
    <AddTutorialModal
      :show="showAddTutorial"
      @close="closeModal"
      @tutorial-added="addTutorial"
    />

    <MarkdownHelp
      :show="showMarkdownHelp"
      @close="showMarkdownHelp = false"
    />

    <!-- Intégration du composant toast -->
    <Toast 
      :show="showToastModal" 
      title="Bientôt disponible" 
      message="Vous pourrez bientôt ajouter vos propres tutoriels !" 
      @close="showToastModal = false" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { supabase } from '@/supabase'
import AddTutorialModal from '@/components/tutorial/AddTutorialModal.vue'
import TutorialCard from '@/components/tutorial/TutorialCard.vue'
import MarkdownHelp from '@/components/tutorial/markdown/MarkdownHelp.vue'
import Toast from '@/components/Toast.vue'

const tutorials = ref([])
const showAddTutorial = ref(false)
const showMarkdownHelp = ref(false)
const selectedCategory = ref('Tous')

// Variable pour le toast
const showToastModal = ref(false)

const categories = computed(() => {
  const uniqueCategories = new Set(tutorials.value.map(t => t.categorie))
  return ['Tous', ...Array.from(uniqueCategories)]
})

const filteredTutorials = computed(() => {
  if (selectedCategory.value === 'Tous') {
    return tutorials.value
  }
  return tutorials.value.filter(tutorial => tutorial.categorie === selectedCategory.value)
})

// Fonction d'hydratation : charge les tutoriels depuis le cache s'ils existent
const hydrateTutorials = () => {
  const cached = localStorage.getItem('tutorials')
  if (cached) {
    tutorials.value = JSON.parse(cached)
  }
}

const fetchTutorials = async () => {
  try {
    const { data: tutorialsData, error: tutorialsError } = await supabase
      .from('tutoriels')
      .select('*')
      .order('dateCreation', { ascending: false })

    if (tutorialsError) throw tutorialsError

    tutorials.value = tutorialsData
    localStorage.setItem('tutorials', JSON.stringify(tutorialsData))
  } catch (error) {
    console.error('Erreur lors du chargement des tutoriels:', error)
  }
}

const closeModal = () => {
  showAddTutorial.value = false
}

const addTutorial = async () => {
  await fetchTutorials()
  closeModal()
}

const deleteTutorial = async (tutorial) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce tutoriel ?')) {
    return
  }

  try {
    if (tutorial.image) {
      const { error: storageError } = await supabase.storage
        .from('images')
        .remove([tutorial.image])

      if (storageError) {
        console.error('Erreur lors de la suppression de l\'image:', storageError)
      }
    }

    const { error } = await supabase
      .from('tutoriels')
      .delete()
      .eq('id', tutorial.id)

    if (error) throw error

    await fetchTutorials()
  } catch (error) {
    console.error('Erreur lors de la suppression du tutoriel:', error)
    alert('Erreur lors de la suppression du tutoriel')
  }
}

const showToast = () => {
  // Au lieu de "alert()", on affiche le modal toast
  showToastModal.value = true
}

// Surveiller les changements de visibilité de la page
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    fetchTutorials()
  }
})

onMounted(async () => {
  hydrateTutorials()          // Hydrater immédiatement depuis le cache
  await fetchTutorials()      // Rafraîchir ensuite les données en fetchant depuis Supabase
})
</script>
