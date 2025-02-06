<template>
  <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
    <div class="relative h-48">
      <img
        v-if="tutorial.image"
        :src="tutorial.image"
        :alt="tutorial.titre"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
        <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
    </div>

    <div class="p-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ tutorial.titre }}</h3>
        <span 
          class="px-2 py-1 text-xs font-medium rounded"
          :class="categoryClasses"
        >
          {{ tutorial.categorie }}
        </span>
      </div>
      <div class="mt-2 text-sm text-gray-600 line-clamp-3 prose">
        <div v-html="previewContent"></div>
      </div>

      <!-- Auteur du tutoriel -->
      <div class="mt-4">
        <p class="text-sm text-gray-600">
          Créé par <span class="font-medium">{{ tutorial.nom + " " +  tutorial.prenom }}</span>
        </p>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <div class="flex space-x-4">
          <button
            v-if="canDelete"
            @click="handleDelete"
            class="text-red-600 hover:text-red-900"
            title="Supprimer le tutoriel"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            @click="goToDetail"
            class="text-gray-600 hover:text-gray-900"
            title="Voir le tutoriel"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
        <span class="text-sm text-gray-500">
          {{ formatDate(tutorial.dateCreation) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Configuration de marked pour la prévisualisation
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false
})

const router = useRouter()
const props = defineProps({
  tutorial: {
    type: Object,
    required: true
  },
  canDelete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete'])



const previewContent = computed(() => {
  if (!props.tutorial?.content) return ''
  // Limiter le contenu à environ 300 caractères et ajouter "..."
  const preview = props.tutorial.content.slice(0, 300)
  const rawHtml = marked(preview + (props.tutorial.content.length > 300 ? '...' : ''))
  return DOMPurify.sanitize(rawHtml)
})

const categoryClasses = computed(() => ({
  'bg-blue-100 text-blue-800': props.tutorial.categorie === 'Développement Web',
  'bg-purple-100 text-purple-800': props.tutorial.categorie === 'Base de données',
  'bg-green-100 text-green-800': props.tutorial.categorie === 'Programmation',
  'bg-yellow-100 text-yellow-800': props.tutorial.categorie === 'DevOps',
  'bg-red-100 text-red-800': props.tutorial.categorie === 'Sécurité',
  'bg-indigo-100 text-indigo-800': props.tutorial.categorie === 'Autre'
}))

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}


const goToDetail = () => {
  router.push({
    name: 'TutorialDetail',
    params: { id: props.tutorial.id }
  })
}
</script>
