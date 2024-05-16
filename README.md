[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7jXcq0Zs)
# Gestion de Parkings

Le projet de gestion de parkings vise à faciliter l'utilisation des places de stationnement en créant une plateforme pour rendre le stationnement plus fluide.

## Construction du Projet

### Frontend
Pour construire la partie frontend du projet, vous aurez besoin de Node.js installé sur votre machine.

### Backend
Pour la partie backend, vous aurez besoin d'une base de données MySQL ainsi que du JDK 17 ou version ultérieure.

## Exécution Locale

Pour exécuter le projet localement, suivez les étapes ci-dessous :

1. Téléchargez et installez XAMPP, un ensemble de logiciels libres permettant de faciliter le déploiement d'un serveur Web local. XAMPP inclut MySQL pour la base de données et Apache pour le serveur Web.

2. Lancez XAMPP et démarrez les services MySQL et Apache à partir du panneau de contrôle.

3. Utilisez phpMyAdmin, fourni avec XAMPP, pour gérer votre base de données MySQL de manière conviviale.

4. Importez le script SQL fourni dans le fichier init.sql pour créer la base de données.

5. Déployez votre application backend dans le répertoire `htdocs` de votre installation XAMPP pour qu'elle soit accessible par le serveur Apache.

6. Accédez à votre application frontend en ouvrant un navigateur Web et en accédant à l'URL `http://localhost:<port>` où `<port>` est le port que vous avez configuré pour votre application frontend par défaut 3000.

## Utilisation de Docker

Vous pouvez également utiliser Docker pour construire et exécuter votre projet. Assurez-vous que les services de base de donner et backend et de frontend sont bien démarrés avant de lancer Docker.

Pour construire et exécuter les images de projet, utilisez le fichier docker-compose.yaml fourni et exécutez la commande suivante :

```bash
docker-compose up --build
```
Assurez-vous que tous les conteneurs sont démarrés et fonctionnent correctement après l'exécution de cette commande. Si ce n'est pas le cas, vous devrez les redémarrer manuellement.

   

