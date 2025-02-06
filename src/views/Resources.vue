<template>
  <section class="bg-white">
    <div class="container px-6 py-10 mx-auto">
      <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">Ressources</h1>

      <p class="mt-4 text-center text-gray-500">
        Bienvenue sur le recueil des ressources
      </p>

      <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 md:grid-cols-2 xl:grid-cols-3">
        <ResourceCard
          v-for="resource in resources"
          :key="resource.id"
          :resource="resource"
          :class="{
            'cursor-pointer': resource.titre && resource.description && resource.url,
            'cursor-not-allowed': !(resource.titre && resource.description && resource.url)
          }"
          
        />
      </div>
    </div>

    <ResourceModal
      :show="showModal"
      :title="modalTitle"
      :content="modalContent"
      :link="modalLink"

    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import ResourceModal from '@/components/resource/ResourceModal.vue'
import ResourceCard from '@/components/resource/ResourceCard.vue'

const resources = ref([])
const showModal = ref(false)
const modalTitle = ref('')
const modalContent = ref('')
const modalLink = ref('')

// Fonction d'hydratation : charge les ressources depuis le cache s'ils existent
const hydrateResources = () => {
  const cached = localStorage.getItem('resources')
  if (cached) {
    resources.value = JSON.parse(cached)
  }
}

onMounted(async () => {
  hydrateResources() // Charge les ressources depuis le cache immédiatement

  const { data, error } = await supabase
    .from('ressources')
    .select('*')

  if (error) {
    console.error('Erreur lors du chargement des ressources:', error)
  } else {
    resources.value = data
    localStorage.setItem('resources', JSON.stringify(data))
  }
})


</script>