# ==================================
# Stage 1 : Dépendances de production
# ==================================
FROM node:20-alpine AS dependencies

WORKDIR /app

# Copier uniquement les fichiers de dépendances
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --omit=dev

# ==================================
# Stage 2 : Image finale
# ==================================
FROM node:20-alpine

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier les dépendances depuis le stage précédent
COPY --from=dependencies /app/node_modules ./node_modules

# Copier le code source
COPY . .

# Installer `wget` pour que le HEALTHCHECK fonctionne dans l'image alpine
RUN apk add --no-cache wget

# Créer les dossiers nécessaires
RUN mkdir -p uploads logs && \
    chown -R appuser:appgroup /app

# Utiliser l'utilisateur non-root
USER appuser

# Exposer le port
EXPOSE 4000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/api/health || exit 1

# Commande de démarrage
CMD ["node", "src/server.js"]