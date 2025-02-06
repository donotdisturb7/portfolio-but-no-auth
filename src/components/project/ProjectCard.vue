<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 h-full">
    <!-- Image avec catégorie -->
    <div class="relative mb-4">
      <img 
        :src="project.image" 
        alt="Project cover" 
        class="w-full h-48 object-cover rounded-lg"
      >
      <span class="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
        {{ project.type }}
      </span>
    </div>

    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">{{ project.titre }}</h3>
        <p class="text-sm text-gray-500">{{ project.auteur }}</p>
      </div>
     
    </div>

    <p class="text-gray-600 mb-4">{{ project.description }}</p>

    <div class="space-y-2 text-sm">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <span>{{ project.prenom }} {{ project.nom }}</span>
      </div>
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <a :href="`mailto:${project.email}`" class="text-blue-600">{{ project.email }}</a>
      </div>
    </div>

    <div v-if="project.technologies.length" class="mt-4">
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="(tech, index) in project.technologies"
          :key="index"
          class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <div class="mt-4 flex space-x-3">
      <a 
        v-if="project.lien_github"
        :href="project.lien_github"
        target="_blank"
        class="inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.602-3.369-1.34-3.369-1.34-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.891 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 7.07c.85.004 1.705.114 2.504.336 1.909-1.295 2.747-1.026 2.747-1.026.547 1.376.202 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.307.678.915.678 1.846 0 1.335-.012 2.41-.012 2.737 0 .269.18.579.688.481A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"/>
        </svg>
        GitHub
      </a>
      <a 
        v-if="project.lien_demo"
        :href="project.lien_demo"
        target="_blank"
        class="inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Démo
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'


const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['delete'])
</script>