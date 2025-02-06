<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-gray-500 opacity-75"></div>
      <!-- Conteneur du toast -->
      <div class="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full z-10">
        <div class="px-4 py-5 sm:p-6">
          <div class="text-center">
            <h3 class="text-lg font-bold text-gray-900 mb-4">{{ title }}</h3>
            <p class="text-sm text-gray-600">{{ message }}</p>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:justify-center">
          <button
            @click="closeToast"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:w-auto sm:text-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Information'
  },
  message: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const closeToast = () => {
  emit('close')
}
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>