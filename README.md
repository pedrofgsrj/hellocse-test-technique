# HelloMovies (HelloCSE - Test technique)

## Observations:

- Dans un contexte plus réaliste, la recherche et le tri de la liste de films devraient se faire côté back. Actuellement ils s'appliquent qu'aux éléments de la page affichée.

## Quelques idées d'améliorations :

- Gestion des erreurs (avec affichage d'un toast, par exemple)
- Afficher les états de chargement (loading)
- Gérer les tailles des images pour éviter que le contenu bouge quand elles sont chargées
- Peaufiner le côté responsive
- Ajouter des transitions et animations
- Peut être utiliser un composable pour la gestion des tailles des images
- Afficher un placeholder si une image ne charge pas
- Améliorer le design

## Installation du projet

```
pnpm install
```

### Pour lancer le projet (en mode développement)

Créer un fichier `.env` sur la racine du project avec la variable utilisé pour stocker la clé de l'api TMDB (https://developers.themoviedb.org/3/getting-started/authentication)

```
VITE_API_KEY=<<api_key>>
```

Lancer le script de dev

```
pnpm dev
```

### Pour lancer les tests :

```
pnpm test
```
