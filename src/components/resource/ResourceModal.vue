<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">{{ title }}</h2>
      <p class="text-gray-800">{{ content }}</p>
      <div class="mt-4 flex justify-end space-x-4">
        <a :href="link" target="_blank" class="bg-blue-500 text-white px-4 py-2 rounded-md">Voir plus</a>
        <button @click="closeModal" class="bg-red-500 text-white px-4 py-2 rounded-md">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: Boolean,
  title: String,
  content: String,
  link: String
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>