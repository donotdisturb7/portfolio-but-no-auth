import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

// Création de l'application Vue
const app = createApp(App)
const pinia = createPinia()

// Installation des plugins
app.use(pinia)
app.use(router)




// Montage de l'application
app.mount('#app')