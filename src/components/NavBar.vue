<template>
  <nav class="relative px-8 py-4 flex justify-between items-center bg-white">
    <router-link to="/" class="text-3xl font-bold leading-none">
      <h2 class="h-10">Portfolio BUT</h2>
    </router-link>

    <!-- Menu burger mobile -->
    <div class="lg:hidden">
      <button class="navbar-burger flex items-center text-gray-600 p-3" @click="toggleMobileMenu">
        <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>
    </div>

    <!-- Menu principal desktop -->
    <ul class="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6 lg:ml-6">
      <li v-for="item in menuItems" :key="item.path">
        <router-link 
          :to="item.path" 
          class="text-sm text-gray-500 hover:text-blue-600"
          :class="{ 'text-blue-600 font-medium border-b-2 border-blue-600': route.path === item.path }"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>

  <!-- Menu mobile -->
  <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50">
    <div class="fixed inset-0  bg-opacity-50" @click="isMobileMenuOpen = false"></div>
    <nav class="fixed top-0 right-0 bottom-0 w-64 bg-white">
      <div class="p-4 border-b">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Menu</h2>
          <button @click="isMobileMenuOpen = false" class="p-2 text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="px-2 py-3">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          :class="{ 'bg-blue-50 text-blue-600': route.path === item.path }"
          @click="isMobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const menuItems = [
  { path: '/', name: 'Accueil' },
  { path: '/projets', name: 'Projets' },
  { path: '/tutoriels', name: 'Tutoriels' },
  { path: '/ressources', name: 'Ressources' }
]
</script>