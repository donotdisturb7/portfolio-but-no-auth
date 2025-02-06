# Installation et Configuration de Git

## Introduction

Git est un système de contrôle de version très populaire. C'est un outil essentiel pour tout développeur, permettant de gérer efficacement les modifications de code et la collaboration en équipe.

GitHub est une plateforme web qui permet d'héberger et de gérer vos projets utilisant Git avec une interface web conviviale.

Bien que GitHub et Git aient des noms similaires, ce sont deux choses différentes et ils n'ont pas été créés par la même entreprise.

## 1. Installation de Git

### Linux

#### 1.1 Mise à jour du système

Exécutez ces commandes dans le terminal pour mettre à jour votre système Linux :

```bash
sudo apt update
sudo apt upgrade
```

**Note sur la saisie des mots de passe dans le terminal**

Lorsque vous utilisez une commande qui nécessite votre mot de passe (comme `sudo`), vous remarquerez que les caractères ne sont pas visibles pendant la saisie. C'est normal !

C'est une fonctionnalité de sécurité pour protéger vos informations confidentielles, similaire aux champs de mot de passe sur les sites web qui utilisent des astérisques. Le terminal masque votre mot de passe pour le garder sécurisé.

#### 1.2 Installation de Git

Vous avez probablement déjà Git installé, mais pour s'assurer d'avoir la version la plus récente, exécutez :

```bash
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```

#### 1.3 Vérification de la version

Assurez-vous d'avoir au moins la version 2.28 en exécutant :

```bash
git --version
```

Si la version est inférieure à 2.28, suivez à nouveau les instructions d'installation.

### MacOS

#### 1.0 Installation de Homebrew

D'abord, installez Homebrew. Vérifiez que vous répondez aux prérequis puis exécutez :

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Sur un Mac Apple Silicon, suivez les étapes supplémentaires indiquées dans le terminal après l'installation pour ajouter Homebrew au PATH.

#### 1.1 Mise à jour de Git

MacOS est livré avec Git, mais mettez-le à jour avec :

```bash
brew install git
```

#### 1.2 Vérification de la version

Fermez le terminal actuel, ouvrez-en un nouveau et vérifiez la version :

```bash
git --version
```

## 2. Configuration de Git et GitHub

### 2.1 Création d'un compte GitHub

1. Allez sur [GitHub.com](https://github.com) et créez un compte
2. Utilisez une adresse email valide
3. Pour protéger votre vie privée, activez ces options dans les paramètres email :
   - "Keep my email addresses private"
   - "Block command line pushes that expose my email"

### 2.2 Configuration de Git

Configurez votre identité Git (utilisez votre email privé GitHub si vous l'avez activé) :

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

Configurez la branche par défaut :

```bash
git config --global init.defaultBranch main
```

Configurez le comportement de fusion :

```bash
git config --global pull.rebase false
```

Vérifiez vos paramètres :

```bash
git config --get user.name
git config --get user.email
```

Pour les utilisateurs MacOS, ignorez les fichiers .DS_Store :

```bash
echo .DS_Store >> ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
```

### 2.3 Création d'une clé SSH

Vérifiez si vous avez déjà une clé Ed25519 :

```bash
ls ~/.ssh/id_ed25519.pub
```

Si le fichier n'existe pas, créez une nouvelle clé :

```bash
ssh-keygen -t ed25519
```

- Appuyez sur Entrée pour accepter l'emplacement par défaut
- Entrez un mot de passe si vous le souhaitez (optionnel)

### 2.4 Liaison de votre clé SSH avec GitHub

1. Connectez-vous à GitHub
2. Cliquez sur votre photo de profil → Settings
3. Dans le menu de gauche, cliquez sur "SSH and GPG keys"
4. Cliquez sur "New SSH Key"
5. Donnez un nom descriptif à votre clé

Copiez votre clé publique :

```bash
cat ~/.ssh/id_ed25519.pub
```

Copiez la sortie complète et collez-la dans le champ "Key" sur GitHub.

### 2.5 Test de la connexion SSH

Une fois votre clé SSH ajoutée à GitHub, testez la connexion :

```bash
ssh -T git@github.com
```

La première fois, vous verrez un avertissement comme celui-ci :

```
The authenticity of host 'github.com (IP ADDRESS)' can't be established.
ECDSA key fingerprint is SHA256:p2QAMXNIC1TJYWeIOttrVc98/R1BUFWu3/LiyKgUfQM.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Tapez "yes" et appuyez sur Entrée.

Vous devriez voir un message comme celui-ci :

```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

Si vous voyez ce message, cela signifie que votre clé SSH est correctement configurée !

Votre configuration Git est maintenant terminée ! Vous pouvez commencer à utiliser Git et GitHub pour vos projets.
