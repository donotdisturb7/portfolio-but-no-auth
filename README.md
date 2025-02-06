# Portfolio BUT -  Sans authentification

[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?logo=vuedotjs)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

Application de portfolio développée avec Vue.js 3 et Supabase pour le BUT Informatique.

## 📦 Guide d'installation

### Prérequis
- Node.js v16+
- npm 9+
- Git
- Compte Supabase

### Configuration du projet

1. Cloner le dépôt :
```bash
git clone git@github.com:donotdisturb7/portfolio-but-no-auth.git
cd portfolio-but-no-auth
```

2. Configuration de l'environnement :
```bash
cp .env.example .env
```
Remplir les variables dans `.env` avec vos credentials Supabase :
- VITE_SUPABASE_URL : URL de votre projet Supabase
- VITE_SUPABASE_KEY : Clé anonime de votre projet

3. Migrations de base de données :
- Exécuter le fichier `supabase.sql` dans l'éditeur SQL de Supabase

4. Installer les dépendances :
```bash
npm install
```

### 🚀 Utilisation
```bash
# Démarre le serveur de développement
npm run dev

# Compilation pour la production
npm run build

# Prévisualisation de la build de production
npm run preview
```

L'application est accessible sur `http://localhost:5173` après le démarrage du serveur.

## 🗂 Structure du projet
```tree
PortfolioBUT/
├── src/
│   ├── components/    # Composants réutilisables
│   ├── assets/        # Ressources statiques (images/styles)
│   ├── views/         # Pages de l'application
│   └── main.js        # Point d'entrée de l'application
├── public/            # Fichiers publics (favicon, robots.txt)
├── index.html         # Template principal
└── package.json       # Gestion des dépendances
```

## 💻 Technologies clés
- **Framework** : Vue.js 3 (Composition API)
- **Bundler** : Vite 4
- **Stylage** : Tailwind CSS v4
- **Base de données** : Supabase
- **Routing** : Vue Router 4

## 📄 Licence
Distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations. 