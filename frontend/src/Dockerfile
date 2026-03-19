# Dockerfile pour le développement
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Démarrer en mode développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]