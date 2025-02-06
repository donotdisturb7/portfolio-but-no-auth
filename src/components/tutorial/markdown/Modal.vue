<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="$emit('close')"></div>

        <!-- Modal panel -->
        <div 
          class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle"
          :class="{
            'sm:max-w-3xl': size === 'md',
            'sm:max-w-5xl': size === 'lg',
            'sm:max-w-7xl': size === 'xl'
          }"
        >
          <!-- Header -->
          <div class="bg-white px-6 pt-6 pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <slot name="header"></slot>
              </div>
            </div>
          </div>

          <!-- Body -->
          <div class="bg-white px-6 py-4">
            <slot name="body"></slot>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['md', 'lg', 'xl'].includes(value)
  }
})

defineEmits(['close'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Personnalisation de la barre de défilement */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
