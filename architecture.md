# Architecture du projet Eventopia

## Vue d'ensemble

Eventopia est une plateforme de gestion d'événements construite en **monorepo fullstack** avec :

- **Backend** : Node.js / Express 5 / Sequelize / MySQL / Redis
- **Frontend** : React 19 / Vite / Tailwind CSS 4
- **Infra** : Docker Compose (MySQL, Redis, Backend, Frontend via Nginx)

```
┌─────────────────────────────────────────────────────────┐
│                      NAVIGATEUR                         │
│                   http://localhost:3000                  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────┐
│               NGINX (frontend container)                 │
│  - Sert les fichiers statiques (React build)             │
│  - Proxy /api/* → backend:4000                           │
│  - Proxy /uploads/* → backend:4000                       │
└──────────┬───────────────────────┬───────────────────────┘
           │ fichiers statiques    │ /api/*
           ▼                       ▼
┌─────────────────┐   ┌───────────────────────────────────┐
│   React SPA     │   │        EXPRESS BACKEND             │
│   (dist/)       │   │        http://backend:4000         │
│                 │   │                                     │
│                 │   │  ┌─────────┐  ┌─────────────────┐  │
│                 │   │  │ Routes  │→ │  Middlewares     │  │
│                 │   │  └────┬────┘  │  - auth (JWT)   │  │
│                 │   │       │       │  - validation   │  │
│                 │   │       ▼       │  - rate limit   │  │
│                 │   │  ┌─────────┐  │  - error handler│  │
│                 │   │  │Controll.│  └─────────────────┘  │
│                 │   │  └────┬────┘                        │
│                 │   │       │                              │
│                 │   │       ▼                              │
│                 │   │  ┌─────────┐                        │
│                 │   │  │Services │ (logique métier)       │
│                 │   │  └────┬────┘                        │
│                 │   │       │                              │
│                 │   │       ▼                              │
│                 │   │  ┌─────────┐                        │
│                 │   │  │  Repos  │ (accès BDD)           │
│                 │   │  └────┬────┘                        │
│                 │   │       │                              │
│                 │   └───────┼──────────────────────────────┘
│                 │           │
└─────────────────┘           ▼
                   ┌─────────────────┐   ┌──────────────┐
                   │    MySQL 8.0    │   │  Redis 7     │
                   │  (données)      │   │  (tokens,    │
                   │                 │   │   cache)     │
                   └─────────────────┘   └──────────────┘
```

---

## Arborescence des fichiers

```
eventopia/
├── .env                          # Variables d'env globales (Docker)
├── docker-compose.yml            # Stack complète
├── package.json                  # Monorepo (script concurrently)
│
├── backend/
│   ├── .env                      # Variables d'env backend
│   ├── Dockerfile                # Image Node 20 Alpine
│   ├── package.json
│   └── src/
│       ├── server.js             # Point d'entrée Express
│       ├── config/
│       │   ├── db.js             # Connexion Sequelize / MySQL
│       │   ├── redis.js          # Connexion Redis + gestion tokens
│       │   ├── logger.js         # Winston logger
│       │   └── env.js            # Helper lecture variables d'env
│       ├── models/
│       │   ├── index.js          # Associations entre modèles
│       │   ├── User.js
│       │   ├── Event.js
│       │   ├── Inscription.js
│       │   ├── Payment.js
│       │   └── RefreshToken.js
│       ├── repositories/         # Couche d'accès aux données
│       │   ├── UserRepository.js
│       │   ├── EventRepository.js
│       │   └── InscriptionRepository.js
│       ├── services/             # Logique métier
│       │   ├── AuthService.js
│       │   ├── UserService.js
│       │   ├── EventService.js
│       │   └── InscriptionService.js
│       ├── controllers/          # Gestion des requêtes HTTP
│       │   ├── AuthController.js
│       │   ├── UserController.js
│       │   ├── EventController.js
│       │   └── InscriptionController.js
│       ├── routes/               # Définition des endpoints
│       │   ├── index.js          # Routeur principal
│       │   ├── auth.routes.js
│       │   ├── users.routes.js
│       │   ├── events.routes.js
│       │   └── inscriptions.routes.js
│       ├── middlewares/
│       │   ├── auth.middleware.js       # Vérification JWT
│       │   ├── role.middleware.js       # Vérification rôles
│       │   ├── validate.middleware.js   # Validation Joi
│       │   ├── rateLimiter.middleware.js
│       │   └── error.middleware.js      # Gestion erreurs globale
│       ├── validators/           # Schémas de validation Joi
│       │   ├── auth.validator.js
│       │   ├── user.validator.js
│       │   ├── event.validator.js
│       │   └── inscription.validator.js
│       └── utils/
│           ├── jwt.util.js       # Génération/vérification JWT
│           └── hash.util.js      # Hashage bcrypt
│
└── frontend/
    ├── Dockerfile                # Build Vite + Nginx Alpine
    ├── nginx.conf                # Config Nginx (SPA + proxy API)
    ├── vite.config.js            # Vite + plugin Tailwind v4
    ├── index.html
    ├── package.json
    └── src/
        ├── main.jsx              # Point d'entrée React
        ├── App.jsx               # Routeur principal (React Router)
        ├── index.css             # Styles globaux + thème Tailwind v4
        ├── context/
        │   └── AuthContext.jsx   # État d'authentification global
        ├── components/
        │   ├── Layout.jsx        # Layout principal (Header + Footer)
        │   ├── Header.jsx        # Navigation responsive
        │   ├── Footer.jsx
        │   ├── ProtectedRoute.jsx # Garde de route (auth + rôles)
        │   ├── EventCard.jsx
        │   ├── Pagination.jsx
        │   ├── LoadingSpinner.jsx
        │   ├── Container.jsx
        │   └── SectionHeading.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── EventList.jsx
        │   ├── EventDetails.jsx
        │   ├── CreateEvent.jsx
        │   ├── Profile.jsx
        │   ├── DashboardUser.jsx
        │   ├── DashboardOrganizer.jsx
        │   └── NotFound.jsx
        ├── services/             # Appels API (Axios)
        │   ├── api.js            # Instance Axios + intercepteurs
        │   ├── events.js
        │   └── users.js
        └── assets/
            └── animations.css    # Animations CSS custom
```

---

## Architecture Backend (couches)

Le backend suit un pattern **Controller → Service → Repository** :

```
Requête HTTP
    │
    ▼
┌──────────┐     Joi valide le body/params/query
│  Route   │ ──→ Middleware validate()
└────┬─────┘     Middleware authenticate() vérifie le JWT
     │           Middleware requireRole() vérifie le rôle
     ▼
┌──────────────┐
│  Controller  │  Extrait les données de req, appelle le Service
└──────┬───────┘
       ▼
┌──────────────┐
│   Service    │  Logique métier, règles de gestion, validations
└──────┬───────┘
       ▼
┌──────────────┐
│  Repository  │  Requêtes Sequelize vers MySQL
└──────┬───────┘
       ▼
   Base de données
```

---

## Endpoints API

### Auth (`/api/auth`)
| Méthode | Route | Description | Accès |
|---------|-------|-------------|-------|
| POST | `/register` | Inscription | Public |
| POST | `/login` | Connexion | Public |
| POST | `/refresh` | Rafraîchir le token | Public |
| POST | `/logout` | Déconnexion | Public |
| POST | `/logout-all` | Déconnexion tous appareils | Authentifié |
| GET | `/me` | Utilisateur courant | Authentifié |

### Users (`/api/users`)
| Méthode | Route | Description | Accès |
|---------|-------|-------------|-------|
| GET | `/me` | Mon profil | Authentifié |
| PATCH | `/me` | Modifier mon profil | Authentifié |
| POST | `/me/change-password` | Changer mot de passe | Authentifié |
| GET | `/me/inscriptions` | Mes inscriptions | Authentifié |

### Events (`/api/events`)
| Méthode | Route | Description | Accès |
|---------|-------|-------------|-------|
| GET | `/` | Lister les événements | Public |
| GET | `/my-events` | Mes événements | Organisateur |
| POST | `/` | Créer un événement | Organisateur |
| GET | `/:id` | Détails d'un événement | Public |
| PATCH | `/:id` | Modifier un événement | Propriétaire |
| DELETE | `/:id` | Supprimer un événement | Propriétaire |
| POST | `/:id/publish` | Publier un événement | Propriétaire |
| POST | `/:eventId/inscriptions` | S'inscrire à un événement | Authentifié |

### Inscriptions (`/api/inscriptions`)
| Méthode | Route | Description | Accès |
|---------|-------|-------------|-------|
| PATCH | `/:id/cancel` | Annuler une inscription | Propriétaire |

---

## Modèle de données

```
┌──────────────┐       ┌──────────────────┐
│    User      │       │     Event        │
├──────────────┤       ├──────────────────┤
│ id (UUID)    │       │ id (UUID)        │
│ email        │──┐    │ organizer_id (FK)│──┐
│ password_hash│  │    │ title            │  │
│ full_name    │  │    │ description      │  │
│ role (ENUM)  │  │    │ location         │  │
│ bio          │  │    │ start_datetime   │  │
│ avatar_url   │  │    │ end_datetime     │  │
│ is_verified  │  │    │ capacity         │  │
└──────┬───────┘  │    │ current_particip.│  │
       │          │    │ price / currency │  │
       │          │    │ status (ENUM)    │  │
       │          │    │ image_url / tags │  │
       │          │    └────────┬─────────┘  │
       │          │             │             │
       │          └─────────────┼─────────────┘
       │                        │
       │    ┌───────────────────┘
       │    │
       ▼    ▼
┌──────────────────┐       ┌──────────────────┐
│  Inscription     │       │    Payment       │
├──────────────────┤       ├──────────────────┤
│ id (UUID)        │       │ id (UUID)        │
│ user_id (FK)     │       │ user_id (FK)     │
│ event_id (FK)    │──────→│ event_id (FK)    │
│ status (ENUM)    │       │ inscription_id   │
│ notes            │       │ amount / currency│
└──────────────────┘       │ status (ENUM)    │
                           │ stripe_payment_id│
┌──────────────────┐       └──────────────────┘
│  RefreshToken    │
├──────────────────┤
│ id (UUID)        │
│ user_id (FK)     │
│ token_hash       │
│ revoked          │
│ expires_at       │
│ user_agent       │
│ ip_address       │
└──────────────────┘
```

**Rôles utilisateur** : `USER`, `ORGANIZER`, `ADMIN`
**Statuts événement** : `DRAFT`, `PUBLISHED`, `CANCELLED`
**Statuts inscription** : `PENDING`, `CONFIRMED`, `CANCELLED`
**Statuts paiement** : `PENDING`, `COMPLETED`, `FAILED`, `REFUNDED`

---

## Authentification (JWT)

```
┌────────┐                    ┌─────────┐                 ┌───────┐
│ Client │                    │ Backend │                 │ Redis │
└───┬────┘                    └────┬────┘                 └───┬───┘
    │  POST /auth/login            │                          │
    │─────────────────────────────→│                          │
    │                              │  Vérifie email/password  │
    │                              │  Génère accessToken (15m)│
    │                              │  Génère refreshToken(30d)│
    │                              │  Hash du refreshToken    │
    │                              │─────────────────────────→│ SETEX
    │  { accessToken, refreshToken}│                          │
    │←─────────────────────────────│                          │
    │                              │                          │
    │  GET /api/events             │                          │
    │  Authorization: Bearer xxx   │                          │
    │─────────────────────────────→│                          │
    │                              │  Vérifie JWT             │
    │                              │  Vérifie blacklist ─────→│ GET
    │                              │  Charge User en BDD      │
    │  { events: [...] }           │                          │
    │←─────────────────────────────│                          │
    │                              │                          │
    │  POST /auth/refresh          │                          │
    │  { refreshToken }            │                          │
    │─────────────────────────────→│                          │
    │                              │  Vérifie JWT refresh     │
    │                              │  Vérifie dans Redis ────→│ GET
    │                              │  Révoque ancien token ──→│ DEL
    │                              │  Stocke nouveau token ──→│ SETEX
    │  { newAccessToken,           │                          │
    │    newRefreshToken }         │                          │
    │←─────────────────────────────│                          │
```

---

## Stack Docker

| Service | Image | Port exposé | Port interne |
|---------|-------|-------------|-------------|
| `mysql` | `mysql:8.0` | 3307 | 3306 |
| `redis` | `redis:7-alpine` | 6380 | 6379 |
| `backend` | Node 20 Alpine | 4000 | 4000 |
| `frontend` | Nginx Alpine | 3000 | 80 |

**Réseau** : `eventopia_network` (bridge)
**Volumes** : `eventopia_mysql_data`, `eventopia_redis_data`

---

## Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Frontend | React | 19 |
| Build tool | Vite | 6 |
| CSS | Tailwind CSS | 4 |
| Routing frontend | React Router | 7 |
| State server | TanStack React Query | 5 |
| HTTP client | Axios | 1.x |
| Backend | Express | 5 |
| ORM | Sequelize | 6 |
| BDD | MySQL | 8.0 |
| Cache | Redis (ioredis) | 7 |
| Auth | JWT (jsonwebtoken) | 9 |
| Hash | bcryptjs | 3 |
| Validation | Joi | 18 |
| Logging | Winston | 3 |
| Sécurité | Helmet, CORS, Rate Limit | - |
| Conteneurs | Docker Compose | - |
