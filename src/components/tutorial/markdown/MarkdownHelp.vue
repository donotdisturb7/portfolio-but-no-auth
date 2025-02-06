<template>
  <Modal :show="show" @close="$emit('close')" size="xl">
    <template #header>
      <h3 class="text-2xl font-bold text-indigo-700 mb-2">
        Guide Markdown
      </h3>
      <p class="text-gray-600">
        Apprenez à formater vos tutoriels avec le Markdown
      </p>
    </template>

    <template #body>
      <div class="space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)]">
          <!-- Code Markdown -->
          <div class="bg-gray-900 p-6 rounded-xl shadow-lg overflow-auto">
            <h5 class="text-lg font-medium text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Code Markdown
            </h5>
            <pre class="text-sm text-gray-300 font-mono whitespace-pre-wrap bg-gray-800 p-4 rounded-lg overflow-auto">
# Titre principal

## Sous-titre

Voici du texte **en gras** et *en italique*.

### Liste à puces
- Premier élément
- Deuxième élément
  - Sous-élément
  - Autre sous-élément

### Code
```javascript
function hello() {
  console.log("Hello world!");
}
```

### bash
```bash
echo "Hello world!"
```

### python
```python
print("Hello world!")
```

### Liens et images
[Lien vers Google](https://google.com)
![Alt text](url_image)

### Citations
> Ceci est une citation
> Sur plusieurs lignes

### Tableaux
| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Cellule 1 | Cellule 2 |</pre>
          </div>

          <!-- Preview -->
          <div class="bg-white p-6 rounded-xl shadow-lg border-2 border-indigo-100 overflow-auto">
            <h5 class="text-lg font-medium text-indigo-700 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Aperçu
            </h5>
            <div class="prose prose-lg max-w-none">
              <h1 class="text-4xl font-bold text-indigo-900">Titre principal</h1>

              <h2 class="text-2xl font-semibold text-indigo-700 mt-6">Sous-titre</h2>

              <p class="text-gray-700 mt-4">Voici du texte <strong class="text-indigo-700">en gras</strong> et <em class="text-indigo-600">en italique</em>.</p>

              <h3 class="text-xl font-medium text-indigo-600 mt-6">Liste à puces</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li>Premier élément</li>
                <li>Deuxième élément
                  <ul class="list-circle list-inside ml-4 mt-2 space-y-2">
                    <li>Sous-élément</li>
                    <li>Autre sous-élément</li>
                  </ul>
                </li>
              </ul>

              <h3 class="text-xl font-medium text-indigo-600 mt-6">Code</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code class="language-javascript">function hello() {
  console.log("Hello world!");
}</code></pre>

              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-4"><code class="language-bash">echo "Hello world!"</code></pre>

              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-4"><code class="language-python">print("Hello world!")</code></pre>

              <h3 class="text-xl font-medium text-indigo-600 mt-6">Liens et images</h3>
              <p><a href="https://google.com" class="text-blue-600 hover:text-blue-800 underline">Lien vers Google</a></p>

              <h3 class="text-xl font-medium text-indigo-600 mt-6">Citations</h3>
              <blockquote class="border-l-4 border-indigo-500 pl-4 italic text-gray-700">
                <p>Ceci est une citation<br>Sur plusieurs lignes</p>
              </blockquote>

              <h3 class="text-xl font-medium text-indigo-600 mt-6">Tableaux</h3>
              <table class="min-w-full divide-y divide-gray-200 mt-4">
                <thead class="bg-indigo-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Colonne 1</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Colonne 2</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Cellule 1</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Cellule 2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
          <h4 class="text-xl font-semibold text-indigo-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            Conseils pour bien utiliser le Markdown
          </h4>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <svg class="h-6 w-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Utilisez les titres (#, ##, ###) pour organiser votre contenu de manière hiérarchique
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pour le code, utilisez des backticks simples (`) pour le code en ligne ou triples (```) pour les blocs
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              N'oubliez pas d'ajouter des espaces après les marqueurs de liste (-) et les dièses (#)
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Laissez une ligne vide entre les paragraphes pour une meilleure lisibilité
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template #footer>
      <button
        @click="$emit('close')"
        class="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
      >
        J'ai compris !
      </button>
    </template>
  </Modal>
</template>

<script setup>
import Modal from '@/components/tutorial/markdown/Modal.vue'

defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

defineEmits(['close'])
</script>
