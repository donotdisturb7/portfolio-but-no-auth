import { createClient } from '@supabase/supabase-js'

// Configuration des variables d'environnement Supabase
const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY

// Création du client Supabase avec configuration de l'authentification
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true, // Persiste la session dans le localStorage
        autoRefreshToken: true, // Rafraîchit automatiquement le token
        storageKey: 'portfolio-auth', // Clé unique pour le stockage
        storage: window.localStorage // Utilise le localStorage du navigateur
    }
})