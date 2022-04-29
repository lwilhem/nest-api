# Projet Devlab: Pour l'amour des Goodies: API & Backend

## Attends de comment ?

Dans le cadre de notre projets Devlab, Nous avons développer une infrastructure backend (respectueuses du standard REST, afin de faciliter l'intégration avec le front-end) afin de reproduire les fonctionnalités Backend. Nous avons utilisés les technologies suivantes :

- [NestJS](https://nestjs.com), un Framework [NodeJS](https://nodejs.dev/), qui utilise [Express](https://expressjs.com/) et [Typescript](https://www.typescriptlang.org/). Nous avons choisi ce framework pour sa facilité d'intégration, ainsi que pour son architecture, permettant une maintenance facile du code. C'était le meilleur outil dans l'ecosystéme Node pour le développement d'une solution API-Only.

- Nous utilisons une base de données [MySQL](https://www.mysql.com/fr/), Car c'était celle avec laquel nous étions la plus familière, Ainsi que [Prisma](https://www.prisma.io/); un ORM s'intégrant facilement en TypeScript, et permettant de réaliser des opérations CRUD Facilement.

- Un Système de paiement est intégré avec Stripe, et l'API est hébérgé sur Heroku (Le lien est ici)

## Ok Mais globalement, elle fait quoi ?

Voici les principales Fonctionnalitées de l'API :

- Un système d'authentification, utilisant les JWT afin d'authentifier les utilisateurs facilement, et
  l'authorisation avec la lecture du token coté serveur.

- Manipulation de données pour tout les éléments du site (Produits, Shop et utilisateurs, avec les permissions appropriées par role, grace au décorateurs de Nest).

- Rendu des images appropriées à chaque produits grâce à un ReadableStream (Flux HTTP).

## Installation et Initialisation du projet

```sh
    git clone #clone le projet depuis le repository ou le commit désiré
    npm install # Installe les dépendances
    npm run start:dev # lance le projet
```

## Déploiement

```sh
heroku create <votre-nom>
git push heroku master
heroku restart
```

## To-Do List

- [x] Initialisation du Projet avec Nest
- [x] Prisma ORM & Database

- [x] User Registration & authentication
- [x] JWT Integration
- [x] RBAC Implementation

- [x] Product CRUD
- [x] add products to cart
- [x] delete product from cart

- [x] Media handling on backend Side

- [x] Shop CRUD
- [x] add Product to a shop
- [x] every shop has a retailer

- [x] Order Generattion with retailers, items and buyer
- [x] Stripe integration on Backend Side
