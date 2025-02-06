import { createRouter, createWebHistory } from 'vue-router'

// Routes publiques accessibles à tous
const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('@/views/Home.vue')
    },
    {
        path: '/projets',
        name: 'Projets',
        component: () =>
            import ('@/views/Projects.vue')
    },
    {
        path: '/tutoriels',
        name: 'Tutoriels',
        component: () =>
            import ('@/views/Tutoriels.vue')
    },
    {
        path: '/tutoriels/:id',
        name: 'TutorialDetail',
        component: () =>
            import ('@/views/TutorialDetail.vue')
    },
    {
        path: '/ressources',
        name: 'Ressources',
        component: () =>
            import ('@/views/Resources.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () =>
            import ('@/views/NotFound.vue')
    }
]

// Création du routeur avec configuration
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router