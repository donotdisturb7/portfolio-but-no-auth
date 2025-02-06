<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Titre</label>
        <input
          v-model="projectDetails.titre"
          type="text"
          required
          class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Type</label>
        <select
          v-model="projectDetails.type"
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

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700">Description</label>
      <textarea
        v-model="projectDetails.description"
        required
        rows="2"
        class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
      ></textarea>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Lien GitHub</label>
        <input
          v-model="projectDetails.lien_github"
          type="url"
          class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Lien Demo</label>
        <input
          v-model="projectDetails.lien_demo"
          type="url"
          class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const projectDetails = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
