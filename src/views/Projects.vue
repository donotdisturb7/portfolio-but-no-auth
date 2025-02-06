<template>
  <div class="min-h-screen bg-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Projets</h1>
      <div class="flex space-x-4">

      
      <button
        @click="showAddProject = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center transition-colors"
      >
      <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
        Nouveau projet
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
   
    <AddProjectModal 
      v-if="showAddProject"
      @close="showAddProject = false"
      @project-added="fetchProjects"
    />

    <!-- Liste des projets -->
    <div v-if="filteredProjects.length === 0" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun projet dans cette catégorie</h3>
      <p class="mt-1 text-sm text-gray-500">
        Commencez par créer votre premier projet.
      </p>
      <div class="mt-6">
        <button
          @click="showAddProject = true"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Créer un projet
        </button>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard 
        v-for="project in filteredProjects" 
        :key="project.id" 
        :project="project"
        
      />
    </div>
    <AddProjectModal
      :show="showAddProject"
      @close="showAddProject = false"
      @project-added="fetchProjects"
    />
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProjectStore } from '@/stores/projects'
import ProjectCard from '@/components/project/ProjectCard.vue'
import AddProjectModal from '@/components/project/AddProjectModal.vue'

const projectStore = useProjectStore()
const projects = ref([])
const showAddProject = ref(false)
const selectedCategory = ref('Tous')

const categories = computed(() => {
  const types = projects.value.map(project => project.type)
  return ['Tous', ...new Set(types)]
})

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'Tous') {
    return projects.value
  }
  return projects.value.filter(project => project.type === selectedCategory.value)
})

const fetchProjects = async () => {
  await projectStore.fetchProjects()
  projects.value = projectStore.projects
}

onMounted(fetchProjects)
</script>



