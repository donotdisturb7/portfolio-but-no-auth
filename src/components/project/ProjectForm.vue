<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <BaseInput
      v-model="formData.titre"
      label="Titre"
      required
      :error="errors.titre"
    />

    <BaseInput
      v-model="formData.description"
      label="Description"
      type="textarea"
      required
      :error="errors.description"
    />

    <div>
      <label class="mb-2 block text-sm font-medium text-gray-700">Type</label>
      <select
        v-model="formData.type"
        required
        class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
      >
        <option value="">Sélectionner un type</option>
        <option
          v-for="option in PROJECT_TYPE_OPTIONS"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <div>
      <label class="mb-2 block text-sm font-medium text-gray-700">Image de couverture</label>
      <ImageUploader
        v-model="formData.image"
        bucket="images"
        folder="projects"
        :maxSize="5 * 1024 * 1024"
        @error="errors.image = $event"
      />
    </div>

    <BaseInput
      v-model="formData.lien_github"
      label="Lien GitHub (optionnel)"
      placeholder="username/repository"
      :error="errors.lien_github"
    />

    <BaseInput
      v-model="formData.lien_demo"
      label="Lien démo (optionnel)"
      placeholder="example.com"
      :error="errors.lien_demo"
    />

    <div class="flex justify-end space-x-2">
      <BaseButton
        variant="ghost"
        @click="$emit('cancel')"
      >
        Annuler
      </BaseButton>
      <BaseButton
        type="submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PROJECT_TYPE_OPTIONS } from '@/constants/projectTypes'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import ImageUploader from '@/components/common/ImageUploader.vue'

const props = defineProps({
  project: {
    type: Object,
    default: () => ({
      titre: '',
      description: '',
      type: '',
      image: '',
      lien_github: '',
      lien_demo: ''
    })
  }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = reactive({ ...props.project })
const errors = reactive({})
const isSubmitting = ref(false)

const validateForm = () => {
  errors.titre = !formData.titre ? 'Le titre est requis' : ''
  errors.description = !formData.description ? 'La description est requise' : ''
  errors.type = !formData.type ? 'Le type est requis' : ''
  
  if (formData.lien_github && !formData.lien_github.match(/^[a-zA-Z0-9-]+\/[a-zA-Z0-9-_.]+$/)) {
    errors.lien_github = 'Format invalide (exemple: username/repository)'
  }
  
  if (formData.lien_demo && !formData.lien_demo.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)) {
    errors.lien_demo = 'URL invalide'
  }

  return !Object.values(errors).some(error => error)
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  try {
    await emit('submit', { ...formData })
  } finally {
    isSubmitting.value = false
  }
}
</script>
