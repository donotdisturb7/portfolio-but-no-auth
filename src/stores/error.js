import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const errors = ref([])
  
  const addError = (error) => {
    errors.value.push({
      message: error.message,
      code: error.code,
      timestamp: new Date(),
    })
  }

  const clearErrors = () => {
    errors.value = []
  }

  return {
    errors,
    addError,
    clearErrors,
  }
})
