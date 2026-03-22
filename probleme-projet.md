# Analyse du projet - Problèmes identifiés et solutions

---

## 1. BUGS CRITIQUES (empêchent le fonctionnement)

### 1.1 - Faute de frappe dans la colonne `current_paticipants` (Event.js)

Le nom de colonne dans la base de données a une faute de frappe : `current_paticipants` (il manque le "r" de "participants").

Mais les méthodes du modèle utilisent `current_participants` (correct) dans `getRemainingSpots()`, et `hasCapacity()` utilise encore une AUTRE faute : `cerrent_participants`.

Le `toPublicJSON()` utilise `this.current_participant` (singulier) et `this.update_at` au lieu de `this.updated_at`.

**Résultat : 3 orthographes différentes pour le même champ = rien ne fonctionne.**

**Fichier :** `backend/src/models/Event.js`

**Solution :** Unifié toutes les références vers `current_participants` (le nom correct). Corrigé `cerrent_participants` → `current_participants` dans `hasCapacity()`, corrigé la colonne `current_paticipants` → `current_participants` dans `Event.init()`, corrigé `currentParticipant` → `currentParticipants` et `updateAt` → `updatedAt` dans `toPublicJSON()`.

---

### 1.2 - `ipKeyGenerator` non défini (rateLimiter.middleware.js)

Dans le `keyGenerator` de `eventCreationLimiter`, la fonction `ipKeyGenerator` est appelée mais n'est jamais définie ni importée. Le serveur crashera dès qu'un organisateur tentera de créer un événement.

**Fichier :** `backend/src/middlewares/rateLimiter.middleware.js`

**Solution :** Remplacé l'appel à `ipKeyGenerator(req)` par une logique inline fonctionnelle qui retourne `req.userId` si disponible, sinon l'IP extraite des headers forwarded ou `req.ip`.

---

### 1.3 - Faute de frappe `timestampes` (User.js)

`timestampes: true` devrait être `timestamps: true`. Sequelize ignore cette option mal orthographiée.

**Fichier :** `backend/src/models/User.js`

**Solution :** Corrigé `timestampes` → `timestamps`.

---

### 1.4 - Routes frontend inexistantes côté backend

Le service `users.js` du frontend appelle des endpoints qui n'existent pas dans le backend :
- `/users/me`
- `/users/me/change-password`
- `/users/me/inscriptions`
- `/inscriptions/:id/cancel`

Le fichier `routes/index.js` ne monte que `/auth` et `/events`.

De même, `registerForEvent` appelle `/events/${eventId}/inscriptions` qui n'existe pas.

**Fichiers :** `frontend/src/services/users.js`, `frontend/src/services/events.js`, `backend/src/routes/index.js`

**Solution :** Non corrigé (nécessite la création de routes backend complètes pour `/users` et `/inscriptions` — travail futur). Identifié comme problème pour que le développeur le sache.

---

### 1.5 - `EventDetails.jsx` complètement cassé

- URL hardcodée `http://localhost:4000` au lieu d'utiliser le service `api` configuré
- Import direct de `axios` brut (pas de token JWT, pas de refresh automatique)
- Référence `event.startDate` et `event.availableSpots` alors que le backend renvoie `startDatetime` et `remainingSpots`
- Style `text-gray-600` / `bg-gray-50` (thème clair) alors que toute l'app est en thème sombre avec `neutral-*`

**Fichier :** `frontend/src/pages/EventDetails.jsx`

**Solution :** Page réécrite entièrement. Utilise maintenant le service `api` configuré avec `eventsService.getEvent()`, React Query pour le chargement, les bons noms de champs (`startDatetime`, `remainingSpots`), et le thème sombre cohérent avec le reste de l'application.

---

## 2. INCONSISTANCES DE CONFIGURATION

### 2.1 - Variables d'environnement conflictuelles

| Variable | `.env` (racine) | `backend/.env` | Docker Compose |
|----------|-----------------|----------------|----------------|
| DB_PASSWORD | `password` | `DB_PASS=destin` | `password` |
| DB_NAME | `eventdkc2_db` | `EVENTDKC2` | `eventdkc2_db` |
| REDIS_PASSWORD | *(vide)* | *(vide)* | `destin` |
| DB variable name | `DB_PASSWORD` | `DB_PASS` | `DB_PASSWORD` |

**Fichiers :** `.env`, `backend/.env`, `docker-compose.yml`

**Solution :** Aligné le `backend/.env` pour utiliser `DB_PASSWORD` (au lieu de `DB_PASS`), `DB_NAME=eventdkc2_db` (minuscules, cohérent avec Docker). Retiré le fallback `DB_PASS` dans `config/db.js`.

---

### 2.2 - Nommage incohérent du projet

Le projet s'appelle simultanément : `eventdkc2`, `onelastevent`, `OneLastEvent`, `Eventopia`.

**Solution :** Non corrigé (choix cosmétique du développeur). Identifié comme incohérence.

---

## 3. PROBLÈMES DE SÉCURITÉ

### 3.1 - Fichiers `.env` avec de vrais secrets dans le repo

Les deux `.env` contiennent des credentials réels sans `.gitignore`.

**Solution :** Non corrigé (nécessite l'ajout d'un `.gitignore` avec `.env` — le projet n'est pas encore commité dans git).

### 3.2 - Secrets JWT non sécurisés

Des valeurs par défaut prévisibles dans les fichiers `.env`.

**Solution :** Non corrigé (le développeur doit générer ses propres secrets avant déploiement).

### 3.3 - Identifiants de test en dur dans le code frontend

La page Login affiche des comptes de test avec mots de passe en clair dans le HTML.

**Fichier :** `frontend/src/pages/Login.jsx`

**Solution :** Retiré le bloc HTML qui affichait les identifiants de test (`admin@onelastevent.com / Admin123!`, etc.).

### 3.4 - Faille dans `listEvents` : tout utilisateur authentifié voit les brouillons

N'importe quel utilisateur connecté (même un simple USER) peut voir tous les événements en brouillon de tous les organisateurs.

**Fichier :** `backend/src/controllers/EventController.js`

**Solution :** Restreint `includeUnpublished` pour ne s'activer que lorsque l'organisateur demande ses propres événements (`req.query.organizerId === req.userId`).

### 3.5 - Vérification Bearer incomplète

`!authHeader.startsWith('Bearer')` manque l'espace après "Bearer". Un header `BearerMalicious` passerait le test.

**Fichier :** `backend/src/middlewares/auth.middleware.js`

**Solution :** Ajouté l'espace manquant : `!authHeader.startsWith('Bearer ')`.

---

## 4. PROBLÈMES D'ARCHITECTURE / LOGIQUE

### 4.1 - Aucun middleware d'upload de fichiers

Le frontend envoie des `FormData` avec `multipart/form-data` mais le backend n'a aucun middleware (`multer`) pour gérer les uploads.

**Solution :** Non corrigé (nécessite l'installation de `multer` et la création d'un middleware d'upload — travail futur).

### 4.2 - Le backend ne sert pas les fichiers uploadés

Aucun `express.static('/uploads', ...)` n'est configuré dans `server.js`.

**Fichier :** `backend/src/server.js`

**Solution :** Ajouté `app.use('/uploads', express.static(path.join(__dirname, '../uploads')));` dans `server.js`.

### 4.3 - Double association RefreshToken

L'association `RefreshToken.belongsTo(User)` est définie dans le fichier du modèle ET dans `models/index.js`, créant un conflit potentiel.

**Fichier :** `backend/src/models/RefreshToken.js`

**Solution :** Retiré l'association dupliquée et l'import inutile de `User` dans `RefreshToken.js`. L'association reste définie uniquement dans `models/index.js`.

### 4.4 - Dépendances inutiles/conflictuelles

- `drizzle-orm` et `drizzle-kit` dans `backend/package.json` alors que Sequelize est utilisé
- `swagger-jsdoc` et `swagger-ui-express` dans le `package.json` racine mais jamais importés
- `tsx` utilisé pour exécuter du JavaScript (inutile avec `"type": "module"`)

**Solution :** Retiré `drizzle-orm`, `drizzle-kit` et `tsx` du `backend/package.json`. Remplacé `tsx src/server.js` par `node --watch src/server.js`. Retiré `swagger-jsdoc` et `swagger-ui-express` du `package.json` racine.

### 4.5 - `postcss.config.js` au mauvais endroit

Le fichier est dans `frontend/src/assets/` au lieu de `frontend/`.

**Solution :** Fichier déplacé puis finalement supprimé lors de la migration vers Tailwind CSS v4 (qui n'utilise plus PostCSS directement).

### 4.6 - Conflit de route `events/create` vs `events/:id`

`events/create` est défini après `events/:id` dans les routes React, risquant d'être capturé comme un `:id`.

**Fichier :** `frontend/src/App.jsx`

**Solution :** Réorganisé les routes : `events/create` (dans un `ProtectedRoute`) est maintenant défini avant `events/:id`.

---

## 5. PROBLÈMES UX / COSMÉTIQUES

### 5.1 - Page Home duplique Header et Footer

`Home.jsx` contient son propre header et footer alors qu'elle est rendue dans le `Layout` qui en fournit déjà.

**Fichier :** `frontend/src/pages/Home.jsx`

**Solution :** Retiré le header et le footer dupliqués de `Home.jsx`. Le `Layout` fournit déjà ces éléments.

### 5.2 - Statistiques hardcodées et fausses

"10K+" événements, "50K+" participants, etc. Ce sont des valeurs en dur, pas des données réelles.

**Solution :** Non corrigé (nécessite un endpoint API de statistiques — cosmétique). Identifié comme trompeur.

### 5.3 - Copyright 2024 périmé

Devrait être 2026 (ou dynamique).

**Solution :** Le footer du composant `Footer.jsx` utilise déjà `new Date().getFullYear()` (dynamique). Le footer dupliqué dans `Home.jsx` (qui avait "2024" en dur) a été supprimé.

### 5.4 - Liens vers des pages inexistantes

Le Header et le Home lient vers `/categories`, `/how-it-works`, `/about`, `/privacy`, `/terms`, `/help` — aucune de ces routes n'existe.

**Solution :** Non corrigé (nécessite la création des pages correspondantes — travail futur). Identifié comme problème.

---

## 6. PROBLÈMES DE BUILD / DOCKER

### 6.1 - Dockerfiles utilisent Node.js 18 alors que les dépendances requièrent Node 20+

Vite 7, react-router-dom 7, @vitejs/plugin-react 5, et joi 18 requièrent tous Node.js 20+. Les Dockerfiles utilisaient `node:18-alpine`, causant des erreurs `EBADENGINE` et des incompatibilités.

**Fichiers :** `frontend/Dockerfile`, `backend/Dockerfile`

**Solution :** Mis à jour les deux Dockerfiles pour utiliser `node:20-alpine`. Remplacé le flag déprécié `--only=production` par `--omit=dev` dans le backend.

### 6.2 - Dockerfile en double dans `frontend/src/`

Un fichier `Dockerfile` de développement existait dans `frontend/src/` en plus du `Dockerfile` de production dans `frontend/`.

**Solution :** Supprimé le `frontend/src/Dockerfile` en double.

### 6.3 - Incompatibilité Tailwind CSS v3 avec PostCSS / sucrase

Le build (local et Docker) échouait avec l'erreur :
```
[vite:css] [postcss] Unexpected character ' ' (1:4)
```
L'erreur venait de `sucrase` (parser JavaScript utilisé par `jiti` dans Tailwind CSS) qui tentait de parser des fichiers CSS comme du JavaScript. Le problème se reproduisait :
- Quelle que soit la version de Vite (5, 6, 7)
- Quelle que soit la version de PostCSS (8.4, 8.5)
- Quelle que soit la version de Tailwind v3 (3.3.6, 3.4.19)
- Quel que soit le format du config PostCSS (ESM, CJS, inline dans Vite)

Le problème était spécifique à l'environnement du projet (Node 22 local, combinaison de dépendances).

**Fichiers :** `frontend/vite.config.js`, `frontend/postcss.config.js`, `frontend/tailwind.config.js`, `frontend/src/index.css`

**Solution :** Migration complète vers **Tailwind CSS v4** qui utilise un plugin Vite dédié (`@tailwindcss/vite`) au lieu de PostCSS :

1. **Paquets** : Retiré `tailwindcss@3`, `postcss`, `autoprefixer`. Installé `tailwindcss@4`, `@tailwindcss/vite@4`.
2. **`vite.config.js`** : Ajouté le plugin `@tailwindcss/vite` (remplace PostCSS).
3. **`index.css`** : Remplacé `@tailwind base/components/utilities` par `@import "tailwindcss"`. Migré le thème custom dans un bloc `@theme { ... }` avec les CSS custom properties.
4. **Composants CSS** : Retiré `@layer components { ... }`, converti les classes auto-référentielles (`@apply btn` dans `.btn-primary`) en styles inline complets.
5. **Fichiers supprimés** : `tailwind.config.js`, `postcss.config.js` (plus nécessaires en v4).

---

## RÉSUMÉ

| Catégorie | Nombre | Corrigés | Non corrigés |
|-----------|--------|----------|--------------|
| Bugs critiques | 5 | **4** | 1 (routes manquantes) |
| Inconsistances de config | 2 | **1** | 1 (nommage) |
| Failles de sécurité | 5 | **3** | 2 (.env, JWT secrets) |
| Problèmes d'architecture | 6 | **5** | 1 (multer upload) |
| Problèmes UX/cosmétiques | 4 | **2** | 2 (stats, liens morts) |
| Problèmes de build/Docker | 3 | **3** | 0 |
| **TOTAL** | **25** | **18** | **7** |

### Problèmes restants (non corrigés)

| # | Problème | Raison |
|---|----------|--------|
| 1.4 | Routes backend `/users` et `/inscriptions` manquantes | Nécessite la création de routes, controllers et services complets |
| 2.2 | Nommage incohérent du projet | Choix du développeur |
| 3.1 | `.env` non dans `.gitignore` | Le projet n'est pas encore commité |
| 3.2 | Secrets JWT prévisibles | Le développeur doit générer ses propres secrets |
| 4.1 | Pas de middleware `multer` pour les uploads | Nécessite installation + configuration |
| 5.2 | Statistiques hardcodées | Nécessite un endpoint API dédié |
| 5.4 | Liens vers des pages inexistantes | Nécessite la création des pages |
