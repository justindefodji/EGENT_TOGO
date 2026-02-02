# Dockerfile universel pour EGENT TOGO - Dev & Production

# Arguments de build
ARG NODE_VERSION=20
ARG NODE_VARIANT=alpine
ARG BUILD_ENV=production
ARG PORT=3000

# Stage 1: Dependencies
FROM node:${NODE_VERSION}-${NODE_VARIANT} AS dependencies

WORKDIR /app

# Désactiver le téléchargement du navigateur Puppeteer
ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY package.json package-lock.json* ./

# Installer toutes les dépendances
RUN npm ci && npm cache clean --force

# Stage 2: Build
FROM dependencies AS builder

COPY . .
RUN npm run build

# Stage 3: Runtime base (Production)
FROM node:${NODE_VERSION}-${NODE_VARIANT} AS runtime-prod

# Installer les dépendances système pour Puppeteer et Chromium
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      dumb-init

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY server.js .
COPY .env* ./

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:${PORT}', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]

# Stage 4: Runtime dev
FROM dependencies AS runtime-dev

ENV NODE_ENV=development

WORKDIR /app

COPY . .

EXPOSE ${PORT}
EXPOSE 5173

CMD ["npm", "run", "dev"]

# Stage final: Sélectionner dev ou prod
FROM runtime-${BUILD_ENV}
