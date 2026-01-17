# Dockerfile pour EGENT-TOGO
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Exposer le port Vite
EXPOSE 5173

# Commande de démarrage
CMD ["npm", "run", "dev"]
