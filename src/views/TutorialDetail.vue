<template>
  <div class="min-h-screen bg-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">{{ error }}</div>
        <router-link
          to="/tutoriels"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Retour aux tutoriels
        </router-link>
      </div>

      <template v-else>
        <div class="mb-6 flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">{{ tutorial.titre }}</h1>
          <router-link
            to="/tutoriels"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Retour aux tutoriels
          </router-link>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div v-if="tutorial.image" class="relative h-64">
            <img
              :src="tutorial.image"
              :alt="tutorial.titre"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span 
                class="px-2 py-1 text-xs font-medium rounded"
                :class="categoryClasses"
              >
                {{ tutorial.categorie }}
              </span>
              <span class="text-sm text-gray-500">
                {{ formatDate(tutorial.dateCreation) }}
              </span>
            </div>

            <div class="prose">
              <div v-html="compiledContent"></div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img
                    :src="authorAvatar"
                    :alt="tutorial.nom + ' ' + tutorial.prenom"
                    class="h-10 w-10 rounded-full"
                  />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">{{  tutorial.nom + " " +  tutorial.prenom }} </p>
                  <p class="text-sm text-gray-500">Auteur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/supabase'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Configuration de marked
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
})

// Configuration du renderer pour ajouter les attributs data-language
const renderer = new marked.Renderer()
renderer.code = function(code, language) {
  return `<div class="code-block" data-language="${language || ''}">
    <pre><code class="language-${language}">${code}</code></pre>
  </div>`
}

marked.use({ renderer })

const route = useRoute()
const tutorial = ref(null)
const loading = ref(true)
const error = ref(null)

const compiledContent = computed(() => {
  if (!tutorial.value?.content) return ''
  const htmlContent = marked(tutorial.value.content)
  return DOMPurify.sanitize(htmlContent)
})

const categoryClasses = computed(() => ({
  'bg-blue-100 text-blue-800': tutorial.value?.categorie === 'Développement Web',
  'bg-purple-100 text-purple-800': tutorial.value?.categorie === 'Base de données',
  'bg-green-100 text-green-800': tutorial.value?.categorie === 'Programmation',
  'bg-yellow-100 text-yellow-800': tutorial.value?.categorie === 'DevOps',
  'bg-red-100 text-red-800': tutorial.value?.categorie === 'Sécurité',
  'bg-indigo-100 text-indigo-800': tutorial.value?.categorie === 'Autre'
}))

const authorName = computed(() => {
  return tutorial.value?.nom && tutorial.value?.prenom 
    ? `${tutorial.value.nom} ${tutorial.value.prenom}`
    : 'Utilisateur inconnu'
})

const authorAvatar = computed(() => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${authorName.value}`
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchTutorial = async () => {
  try {
    loading.value = true
    error.value = null

    const { id } = route.params
    const { data: tutorialData, error: tutorialError } = await supabase
      .from('tutoriels')
      .select('*')
      .eq('id', id)
      .single()

    if (tutorialError) throw tutorialError
    if (!tutorialData) throw new Error('Tutoriel non trouvé')

    tutorial.value = {
      ...tutorialData,
    }
  } catch (err) {
    console.error('Erreur lors du chargement du tutoriel:', err)
    error.value = 'Impossible de charger le tutoriel'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTutorial()
})
</script>

<style>
.prose {
  color: #111827;
  max-width: none;
}

.prose h1 {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  color: #312e81;
  margin-bottom: 1.5rem;
}

.prose h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  color: #4338ca;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: #4f46e5;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  color: #374151;
  margin-bottom: 1rem;
  line-height: 1.625;
}

.prose ul {
  list-style-type: disc;
  list-style-position: inside;
  color: #374151;
  margin: 1rem 0;
  gap: 0.5rem;
}

.prose ul ul {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

.prose ol {
  list-style-type: decimal;
  list-style-position: inside;
  color: #374151;
  margin: 1rem 0;
  gap: 0.5rem;
}

.prose pre {
  margin: 1rem 0;
  border-radius: 0.5rem;
  overflow-x: auto;
}

.prose pre code {
  display: block;
  padding: 1rem;
  background-color: #111827;
  color: #f3f4f6;
}

.prose code:not(pre code) {
  padding: 0.125rem 0.375rem;
  background-color: #f3f4f6;
  color: #4f46e5;
  border-radius: 0.25rem;
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
}

.prose img {
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: 100%;
  height: auto;
}

.prose blockquote {
  margin: 1.5rem 0;
  padding-left: 1rem;
  border-left: 4px solid #3b82f6;
  font-style: italic;
  color: #4b5563;
}

.prose table {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
}

.prose th {
  padding: 0.5rem 1rem;
  background-color: #f9fafb;
  font-weight: 600;
  text-align: left;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.prose td {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
}

.prose a:not(.anchor) {
  color: #2563eb;
  text-decoration: underline;
}

.prose a:not(.anchor):hover {
  color: #1e40af;
}

.prose hr {
  margin: 2rem 0;
  border-color: #e5e7eb;
}

/* Styles spécifiques pour les blocs de code */
.prose .language-javascript,
.prose .language-js {
  color: #fbbf24;
}

.prose .language-python {
  color: #60a5fa;
}

.prose .language-bash {
  color: #34d399;
}

/* Style pour le conteneur de code avec indication du langage */
.prose .code-block {
  position: relative;
}

.prose .code-block::before {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
  content: attr(data-language);
}
</style>
