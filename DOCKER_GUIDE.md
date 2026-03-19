# 🐳 Guide Docker - EventDKC

## Configuration Docker pour le projet EventDKC

Ce guide explique comment lancer le projet avec Docker et Docker Compose.

---

## 📋 Prérequis

- **Docker Desktop** installé ([Télécharger ici](https://www.docker.com/products/docker-desktop))
- **Docker Compose** (inclus dans Docker Desktop)
- Port `4000` disponible pour le backend
- Port `3306` disponible pour MySQL
- Port `6379` disponible pour Redis

---

## 🚀 Démarrage rapide

### 1️⃣ Créer le fichier `.env`

Copier le fichier `.env.example` vers `.env`:

```bash
cp .env.example .env
```

### 2️⃣ Lancer les services avec Docker Compose

```bash
docker-compose up -d
```

Cela va:
- 🗄️ Créer et démarrer un conteneur MySQL
- 🔴 Créer et démarrer un conteneur Redis
- 🚀 Construire et démarrer le conteneur backend Node.js

### 3️⃣ Vérifier le statut

```bash
docker-compose ps
```

Vous devriez voir:
```
NAME                COMMAND                  SERVICE      STATUS       PORTS
eventdkc_backend    "dumb-init -- node s…"   backend      Up           0.0.0.0:4000->4000/tcp
eventdkc_mysql      "docker-entrypoint.s…"   mysql        Up           0.0.0.0:3306->3306/tcp
eventdkc_redis      "redis-server --requ…"   redis        Up           0.0.0.0:6379->6379/tcp
```

### 4️⃣ Accès à l'API

```
API disponible sur: http://localhost:4000/api
```

---

## 📝 Commandes utiles

### Voir les logs

```bash
# Tous les services
docker-compose logs -f

# Un service spécifique
docker-compose logs -f backend
docker-compose logs -f mysql
docker-compose logs -f redis
```

### Arrêter les services

```bash
docker-compose down
```

### Arrêter et supprimer les données

⚠️ **ATTENTION**: Cette commande supprime les volumes (données MySQL, Redis)

```bash
docker-compose down -v
```

### Redémarrer un service

```bash
docker-compose restart backend
```

### Construire l'image (après modifications du code)

```bash
docker-compose build backend
docker-compose up -d backend
```

---

## 🔧 Variables d'environnement

Modifier le fichier `.env` pour configurer les paramètres:

```env
# Port du serveur
PORT=4000

# Base de données MySQL
DB_HOST=mysql
DB_PORT=3306
DB_NAME=eventdkc
DB_USER=eventdkc
DB_PASSWORD=password
DB_ROOT_PASSWORD=root

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=redis_password

# JWT
JWT_SECRET=votre_secret_jwt_ici
JWT_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=info
```

---

## 🗄️ Accès à la base de données

### Avec MySQL Client

```bash
mysql -h localhost -P 3306 -u eventdkc -p
# Mot de passe: password
```

### Avec Docker

```bash
docker exec -it eventdkc_mysql mysql -u eventdkc -p eventdkc
# Mot de passe: password
```

---

## 🔴 Accès à Redis

### Avec Redis CLI

```bash
docker exec -it eventdkc_redis redis-cli
> AUTH redis_password
> PING
PONG
```

---

## 🐛 Dépannage

### Le backend ne démarre pas

1. Vérifier les logs:
```bash
docker-compose logs -f backend
```

2. Vérifier que MySQL est prêt:
```bash
docker-compose logs -f mysql
```

3. Redémarrer les services:
```bash
docker-compose restart
```

### Port déjà utilisé

Si le port 4000/3306/6379 est déjà utilisé, modifier le fichier `.env`:

```env
PORT=5000  # au lieu de 4000
DB_PORT=3307  # au lieu de 3306
REDIS_PORT=6380  # au lieu de 6379
```

---

## 📦 Architecture Docker

```
┌─────────────────────────────────────┐
│       Docker Compose Network        │
│     (eventdkc_network)              │
│                                     │
│  ┌──────────────┐                  │
│  │   Backend    │ :4000             │
│  │ (Node.js)    │                  │
│  └──────┬───────┘                  │
│         │                          │
│  ┌──────┴──────┐  ┌──────────┐    │
│  │             │  │          │    │
│  ▼             ▼  ▼          ▼    │
│ MySQL        Redis                │
│ :3306        :6379                │
└─────────────────────────────────────┘
```

---

## 🌟 Bonnes pratiques

✅ Toujours utiliser Docker Compose en développement
✅ Monter les volumes pour les modifications en direct (dev mode)
✅ Utiliser des variables d'environnement sensibles
✅ Vérifier les logs régulièrement
✅ Utiliser des images officielles (mysql, redis)
✅ Toujours supprimer les conteneurs avant de rebuilt

---

## 🚀 Production

Pour la production, prévoir:
- Variables d'environnement sécurisées
- Mots de passe forts
- Certificats SSL/TLS
- Limites de ressources
- Monitoring et logs
- Backups MySQL réguliers
- Reverse proxy (Nginx/Traefik)

---

## 📚 Ressources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Guide](https://docs.docker.com/compose/)
- [Best Practices for Node.js in Docker](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
