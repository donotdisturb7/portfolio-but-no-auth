<template>
  <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
    <div class="relative ">
      <img
        v-if="resource.image_url"
        :src="resource.image_url"
        :alt="resource.titre"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full bg-gray-100 flex items-center justify-center"
      >
        <svg
          class="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5z"
          />
        </svg>
      </div>
    </div>

    <div class="p-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ resource.titre }}
        </h3>
        <span class="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
          {{ resource.type }}
        </span>
      </div>
      <p class="mt-2 text-sm text-gray-600">{{ resource.description }}</p>

      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="(tag, index) in resource.tags"
          :key="index"
          class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
        >
          {{ tag }}
        </span>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <div class="flex space-x-4">
          <a
            :href="resource.url"
            target="_blank"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Accéder
          </a>
          <button
            v-if="canDelete"
            @click="$emit('delete', resource)"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
        <span class="text-sm text-gray-500">
          {{ formatDate(resource.dateCreation) }}
        </span>
      </div>

      <!-- Affichage du nom et prénom de l'étudiant -->
      <div class="mt-4  p-2 " >
        <p class="text-sm text-blue-600">
          Ajouté par : {{ resource.nom }} {{ resource.prenom }}
        </p>
      </div>


    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  resource: {
    type: Object,
    required: true
  },
  canDelete: {
    type: Boolean,
    default: false
  }
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>