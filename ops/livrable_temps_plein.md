# Rendu Final de la semaine PS6

## Informations générales

Mot de passe pour activer le mode ergothérapeute : `admin`

Pour exécuter les différents codes, il faut se rendre au dossier `ops` puis exécuter les commandes suivantes :

- Pour les dockers compose : `./run.sh`
- Pour les dockers compose e2e : `./run-e2e.sh`

Avant de commencer un quiz, il faut obligatoirement avoir sélectionné le profil d’un enfant auparavant.

## Critères de priorisation

1. **Satisfaction de l’enfant** : Le but premier de notre site, c’est que l’enfant soit satisfait lorsqu’il utilise notre site, c’est donc le critère de priorisation principal.
2. **Suivi de l’enfant par l’ergothérapeute** : L’ergothérapeute doit également pouvoir suivre les progrès de l’enfant, pour bien voir sa progression, c’est donc le deuxième critère principal.
3. **Personnalisation du site** : Enfin, le site doit pouvoir être personnalisé, pour que l’enfant puisse jouer aux quiz qu’il aime.

## Scénarios de test en priorité

### 1. Jouer à un quiz

- **Satisfaction de l’enfant** : 10/10
- **Suivi de l’enfant par l’ergothérapeute** : 8/10
- **Personnalisation du site** : 2/10

**Note générale** : 20/30

Ce scénario de test nous assure le bon fonctionnement de la fonctionnalité principale de notre site et couvre ainsi le parcours complet de l'utilisateur : de la sélection d'un quiz à la validation des réponses jusqu’à la fin du quiz. Suivant notre scénario de test, on commence par se rendre sur la page qui liste tous les quiz disponibles et on en sélectionne un. Durant le quiz, parfois on choisit la bonne réponse directement, parfois on choisit une mauvaise réponse pour s’assurer que les indices s’affichent bien. On joue à trois quiz pour tester les différents niveaux des quiz : facile, moyen et difficile.

### 2. Créer un quiz

- **Satisfaction de l’enfant** : 2/10
- **Suivi de l’enfant par l’ergothérapeute** : 9/10
- **Personnalisation du site** : 7/10

**Note générale** : 18/30

Pour maintenir l’intérêt des enfants à utiliser notre site web et donc apprendre de nouvelles choses à chaque fois, il est nécessaire de pouvoir créer de nouveaux quiz avec de nouvelles questions. C’est donc tout l’intérêt de ce test : voir si on peut toujours créer le quiz avec succès et gérer les cas d’erreurs lorsque l’on oublie de remplir des champs. On crée donc un quiz et toutes les questions qui lui sont associées.

En commençant le test, on arrive directement sur la page des quiz en mode ergothérapeute (dans le cas où on ne se connecte pas en tant qu'ergothérapeute, on n'affiche pas le bouton d’ajout des quiz pour ne pas perturber les enfants) puis on récupère le nombre de quiz déjà existants. La manière dont on crée les quiz fait en sorte qu’on crée aussi les questions avec leurs réponses et indices. On enchaîne sur la saisie des informations, on fait en sorte d’oublier des champs, pour pouvoir gérer les oublis et on crée. Une fois le quiz créé, nous allons voir si le nombre a été incrémenté de 1, et s’il contient bien le nombre de questions qu’on a créées et que les questions contiennent bien les réponses et un indice.

### 3. Configurations

- **Satisfaction de l’enfant** : 6/10
- **Suivi de l’enfant par l’ergothérapeute** : 3/10
- **Personnalisation du site** : 7/10

**Note générale** : 16/30

Pour la partie configuration, nous avons un test qui sélectionne un thème dans les paramètres de configuration, puis navigue vers la page de profil pour vérifier que le thème est bien affiché pour s'assurer que les paramètres de recommandation de thème peuvent être modifiés correctement et que ces modifications sont bien appliquées dans le profil de l'utilisateur.

### 4. Les statistiques

- **Satisfaction de l’enfant** : 5/10
- **Suivi de l’enfant par l’ergothérapeute** : 9/10
- **Personnalisation du site** : 1/10

**Note générale** : 15/30

Les tests des statistiques de quiz nous permettent de s'assurer de l’affichage correct des données d’avancement des utilisateurs. Avec les noms des quiz, les scores, les tentatives correctes et les pourcentages de réussite, pour s’assurer que l’ergothérapeute peut consulter les résultats et progrès des enfants. Ainsi pour chaque différent test de la partie statistique, on va d’abord jouer à un quiz pour s’assurer qu’on récupère bien les informations de jeux de l’enfant. On s’assure ainsi que chaque quiz prend bien le nombre de bonnes réponses de l’enfant, qu’au niveau des thèmes on a bien le nombre de quiz terminés et que l'historique des quiz affiche bien les quiz joués permettant ainsi de voir les activités passées. Ces tests permettent également de vérifier que les statistiques sont personnelles à chaque enfant en vérifiant qu’on récupère bien les informations personnelles de l’enfant choisi. Ces tests couvrent ainsi les aspects essentiels de l'affichage des données de performance des utilisateurs.

### 5. Login de l’ergothérapeute / ajout de membre

- **Satisfaction de l’enfant** : 1/10
- **Suivi de l’enfant par l’ergothérapeute** : 9/10
- **Personnalisation du site** : 4/10

**Note générale** : 14/30

Ce scénario de test a pour but de vérifier les fonctionnalités qui permettent à l’ergothérapeute de gérer des paramètres d'utilisation du mode Ergo : d'ajouter des membres et de configurer les recommandations de thèmes. On teste tout d’abord l’activation du mode Ergo avec mot de passe incorrect pour vérifier que le système refuse l'activation, garantissant ainsi la sécurité. On teste ensuite l’activation fonctionnelle du mode Ergo avec le bon mot de passe. Suivant notre scénario de test, on passe à l’ajout d'un nouveau membre en ajoutant ses différentes informations (nom, prénom, âge, description, photo de profil optionnel), vérifie que le profil a bien été créé puis la désactivation correcte du mode Ergo après l’ajout. On voit ensuite un test d’ajout d'un nouveau membre avec des champs vides pour bien vérifier que le système ne permet pas l’ajout après validation, garantissant l'intégrité des données.

## Pourquoi avoir choisi ces priorités ?

Commençons par rappeler les besoins auxquels répond notre site : permettre à des enfants avec des troubles d’apprendre en jouant à des quiz et aider les soignants à mieux gérer les enfants et suivre leur avancement. La partie la plus importante est donc de pouvoir jouer à un quiz, pour que l’enfant s’amuse et ait envie de retourner sur notre site. Ensuite, on a envie que l’enfant veuille toujours utiliser notre site, qu’il prenne du plaisir. On retrouve alors deux scénarios : le premier est celui qui va permettre de créer des quiz adaptés à ce qu’il aime (le Quiz Mario a bien eu du succès avec les enfants) et adaptés à l’avancement de leur apprentissage. Pour le second, malgré le fait que les quiz soient adaptés aux enfants, il se peut qu’ils soient mal à l’aise à l’idée de ne pas avoir d’indices ou que le son les dérange, on vient donc configurer les paramètres pour créer un environnement idéal pour lui. C’est une fois que les enfants sont à l’aise et contents qu’on peut alors se concentrer sur gérer les différents membres et leurs statistiques. Les statistiques sont importantes pour l’ergothérapeute pour que ce dernier puisse suivre leur avancement, pour voir s’il doit mettre des quiz plus durs, plus faciles, voir quels quiz l’enfant préfère, etc. Enfin, la dernière partie concerne le login en mode ergothérapeute (donc en mode admin) et l’ajout d’un membre. Le login est la partie la moins importante car elle ne sert qu’uniquement pour que les enfants ne puissent pas supprimer un quiz/thème/membre par erreur. L’ajout d’un membre est utile pour créer les différents profils des enfants mais n’est pas vital pour son expérience de jeu de quiz.

## Documentation OPS

Dans notre dossier OPS, nous retrouvons comme demandé :
- `docker-compose.yml`
- `run.sh`
- `docker-compose-e2e.yml`
- `run-e2e.sh`
- `demo.sh`

Pour les healthchecks, nous les avons bien définis dans chacun de nos conteneurs. Les healthchecks jouent un rôle crucial dans le maintien de la stabilité et de la fiabilité de nos services. Ils permettent de :

1. **Vérifier la disponibilité** : S'assurer que chaque service est opérationnel et capable de répondre aux requêtes.
2. **Détecter les pannes** : Identifier rapidement les services défaillants pour éviter des comportements inattendus de l'application.
3. **Automatiser la récupération** : Faciliter la relance automatique des conteneurs défaillants par Docker, garantissant ainsi une haute disponibilité de l'application.
4. **Assurer la dépendance des services** : Garantir que les services démarrent dans le bon ordre et que les services dépendants attendent que leurs dépendances soient prêtes avant de démarrer.

Nous avons bien suivi les étapes demandées dans le cours. Dans ce rendu, nous allons expliquer notre approche et nos différents codes.

Nous avons bien suivi les étapes demandées dans le cours. Dans ce rendu, nous allons expliquer notre approche et nos différents codes.

### 1ère étape

Nous avons mis en place deux conteneurs indépendants : un pour le backend et un autre pour le frontend. Le Dockerfile du backend construit une application Node.js en deux étapes : une étape de build où les dépendances sont installées et les fichiers sources copiés, et une étape d'exécution où le contenu de l'étape de build est copié dans une nouvelle image. L'image finale expose le port 9428 et démarre l'application avec `["npm", "start"]`. Cette approche permet de séparer la phase de build de la phase d'exécution pour optimiser la taille de l'image finale. En ce qui concerne la dockerisation du front sans le composer, dans les fichiers Dockerfile, on retrouve la compilation de l’application avec le Node.js dans un conteneur de build, puis on sert le conteneur Nginx et l’expose dans le port 80.

Pour vérifier cette étape : lancer le fichier `demo.sh`

### 2ème étape

Nous avons défini deux services, backend et frontend, en spécifiant leurs configurations via le build, les ports, les volumes, et la vérification des healthchecks. Le service frontend dépend du service backend pour s'assurer que le backend est opérationnel avant de démarrer. Lorsqu’on veut démarrer le docker compose, nous venons récupérer le bon environnement passé en paramètre pour différencier le docker de test et le docker “normal”. Cette approche facilite la gestion et la maintenance de l'application en orchestrant les services nécessaires via Docker Compose.

Pour vérifier cette étape : lancer le fichier `run.sh`

### 3ème étape

Dans cette étape, nous avons créé un fichier `docker-compose-e2e.yml` qui définit trois services pour exécuter des tests end-to-end (E2E) d'une application web. Ces services incluent `backend-e2e` pour le serveur backend, `frontend-e2e` pour le frontend en production, et `test-e2e` pour l'exécution des tests avec Playwright. Chaque service est configuré avec des ports exposés, des dépendances entre services, des volumes pour le stockage de données, et healthcheck pour assurer la disponibilité des composants nécessaires avant le démarrage des tests ainsi qu’un même network pour les trois services.

Pour vérifier cette étape : lancer le fichier `run-e2e.sh`

## Annexe

### Pour lancer tout le projet :

1. S’assurer d’installer toutes les dépendances nécessaires : `npm install`
2. Backend : se rendre dans le dossier backend et faire `npm run dev`
3. Frontend : se rendre dans le dossier frontend et faire `npm start`
