# Dockerfile pour EGENT TOGO - Production

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Désactiver le téléchargement du navigateur Puppeteer lors de l'installation des dépendances
ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

# Installer les dépendances système pour Puppeteer et Chromium
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

# Informer Puppeteer d'utiliser le Chromium installé par le système
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Installer Express et dépendances runtime uniquement
COPY package.json package-lock.json* ./
# Désactiver le téléchargement automatique de Puppeteer ici aussi
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm ci --only=production && npm cache clean --force

# Copier les fichiers compilés depuis le builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY server.js .
COPY .env* ./

# Exposer le port production
EXPOSE 3000


# Commande de démarrage production
CMD ["npm", "start"]
