import { defineStore } from 'pinia'
import { supabase } from '@/supabase'

export const useProjectStore = defineStore('projects', {
    state: () => ({
        projects: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchProjects() {
            this.loading = true
            this.error = null
            try {
                const { data, error } = await supabase
                    .from('projets')
                    .select('*')
                    .order('date_creation', { ascending: false })

                if (error) throw error
                this.projects = data
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        async addProject(projectData) {
            this.loading = true
            this.error = null

            try {
                // Validation des champs obligatoires
                const requiredFields = ['titre', 'description', 'type', 'prenom', 'nom', 'email']
                const missingFields = requiredFields.filter(field => !projectData[field])

                if (missingFields.length > 0) {
                    throw new Error(`Champs manquants : ${missingFields.join(', ')}`)
                }

                // Formatage des données pour Supabase
                const formattedData = {
                    ...projectData,
                    technologies: projectData.technologies || [],
                    lien_github: projectData.lien_github,
                    lien_demo: projectData.lien_demo,
                    image: projectData.image || null // Assurez-vous que l'image est gérée
                }

                const { data, error } = await supabase
                    .from('projets')
                    .insert([formattedData])
                    .select()

                if (error) throw error
                this.projects.unshift(data[0]) // Ajoute le nouveau projet en tête de liste
                return data[0]
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateProject(projectId, updates) {
            this.loading = true
            this.error = null

            try {
                // Mise à jour des champs modifiables
                const formattedUpdates = {
                    ...updates,
                    technologies: updates.technologies || [],
                    lien_github: updates.lien_github,
                    lien_demo: updates.lien_demo,
                    image: updates.image || null // Assurez-vous que l'image est gérée
                }

                const { data, error } = await supabase
                    .from('projets')
                    .update(formattedUpdates)
                    .eq('id', projectId)
                    .select()

                if (error) throw error
                const index = this.projects.findIndex(p => p.id === projectId)
                if (index !== -1) this.projects[index] = data[0] // Met à jour le projet dans la liste
                return data[0]
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },


    },

    getters: {
        projectCount() {
            return this.projects.length
        },

        getProjectById() {
            return (projectId) => this.projects.find(p => p.id === projectId)
        },

        getProjectsByType() {
            return (type) => this.projects.filter(p => p.type === type)
        }
    }
})