<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <header class="bg-white">
      <div class="lg:flex w-full mt-16">
        <div class="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
          <div class="w-full">
            <h2 class="text-3xl font-semibold text-gray-800 lg:text-4xl">
              Bienvenue sur le Portfolio du <span class="text-blue-600">BUT Informatique</span>
            </h2>
            <h3 class="mt-2 text-xl text-gray-700">
              IUT de la Martinique
            </h3>

            <p class="mt-4 text-sm text-gray-500 lg:text-base">
              Cette plateforme collaborative est dédiée aux étudiants du BUT Informatique de l'IUT de la Martinique. 
              Découvrez les talents et les réalisations de notre communauté étudiante au cœur des Caraïbes.
            </p>

            <div class="mt-4 flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Campus de Schoelcher, Martinique
            </div>


          </div>
        </div>

        <!-- Image de fond -->
        <div class="w-full h-64 lg:w-1/2 lg:h-auto">
          <div class="w-full h-full bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${iutImage})` }">
            <div class="w-full h-full bg-black opacity-25"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- Section des fonctionnalités -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900">Explorez notre communauté</h2>
          <p class="mt-4 text-lg text-gray-600">
            Découvrez les réalisations des étudiants du BUT Informatique de la Martinique
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Projets -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Projets</h3>
            <p class="text-gray-600 mb-4">Découvrez et partagez les projets réalisés par les étudiants. Montrez vos compétences et inspirez-vous des réalisations de vos pairs.</p>

          </div>

          <!-- Tutoriels -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Tutoriels</h3>
            <p class="text-gray-600 mb-4">Accédez à des tutoriels créés par la communauté. Apprenez de nouvelles technologies et partagez vos connaissances.</p>
  
          </div>

          <!-- Ressources -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Ressources</h3>
            <p class="text-gray-600 mb-4">Explorez notre bibliothèque de ressources pédagogiques. Documentation, exercices et supports de cours à votre disposition.</p>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

import iutImage from '@/assets/images/iut_martinique.png'

</script>