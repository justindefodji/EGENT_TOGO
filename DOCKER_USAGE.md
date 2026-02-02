# Guide d'utilisation Docker - EGENT TOGO

## 🎯 Dockerfile Universel

Le Dockerfile est maintenant universel et supporte dev et production avec des arguments de build.

### Arguments disponibles

```dockerfile
ARG NODE_VERSION=20          # Version de Node.js (par défaut 20)
ARG NODE_VARIANT=alpine      # Variante (alpine, slim, bookworm)
ARG BUILD_ENV=production     # Mode dev ou prod (par défaut prod)
ARG PORT=3000                # Port (par défaut 3000)
```

---

## 📦 Options de lancement

### 1️⃣ Docker Compose (Recommandé)

#### Mode Développement
```bash
docker-compose up app-dev
```
- Volumes montés pour modification du code en temps réel
- Vite dev server sur `http://localhost:5173`
- App sur `http://localhost:3000`

#### Mode Production
```bash
docker-compose up app-prod
```
- Image optimisée et lean
- Health check activé
- Restart automatique

### 2️⃣ Docker build direct

#### Production (défaut)
```bash
docker build -t egent-togo:latest .
docker run -p 3000:3000 egent-togo:latest
```

#### Développement
```bash
docker build \
  --build-arg BUILD_ENV=dev \
  -t egent-togo:dev .

docker run -p 3000:3000 -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  egent-togo:dev
```

#### Autre Node.js (ex: Node 18)
```bash
docker build \
  --build-arg NODE_VERSION=18 \
  -t egent-togo:node18 .
```

#### Custom port
```bash
docker build \
  --build-arg PORT=8080 \
  -t egent-togo:custom .

docker run -p 8080:8080 egent-togo:custom
```

### 3️⃣ Docker run direct

#### Production optimisée
```bash
docker build -f Dockerfile --target runtime-prod -t egent-togo:prod .
docker run -p 3000:3000 --restart unless-stopped egent-togo:prod
```

#### Dev avec hot-reload
```bash
docker run -it \
  -p 3000:3000 \
  -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  egent-togo:dev
```

---

## 🔧 Architecture multi-stage

```
dependencies (Stage 1)
    ↓
builder (Stage 2) → runtime-prod (Stage 3)
                 ↘
                  runtime-dev (Stage 4)
                        ↓
                    Final Image
```

- **dependencies**: Cache des node_modules
- **builder**: Build avec npm run build
- **runtime-prod**: Image lean pour production (npm ci --only=production)
- **runtime-dev**: Dev complet avec tous les modules (npm run dev)

---

## 📊 Tests et vérification

### Vérifier la build
```bash
docker build -t test:latest .
docker inspect test:latest
```

### Test d'exécution
```bash
docker run --rm -p 3000:3000 test:latest
# Dans un autre terminal
curl http://localhost:3000
```

### Logs du conteneur
```bash
docker logs <container-id>
docker logs -f <container-id>  # Suivi en temps réel
```

### Health check
```bash
docker inspect --format='{{json .State.Health}}' <container-id>
```

---

## 🚀 Optimisations

✅ **Layers cachées** : Dependencies et builder sont réutilisables
✅ **Image lean** : ~400MB pour prod (vs 1GB+ sans optimisation)
✅ **Puppeteer optimisé** : Utilise Chromium du système
✅ **dumb-init** : Gestion propre des signaux en prod
✅ **Health check** : Vérification automatique en prod
✅ **Multi-variant** : Support alpine, slim, bookworm

---

## ⚠️ Notes importantes

1. **Puppeteer** : Configuré pour utiliser le Chromium installé par apk (skip download)
2. **.env** : Les fichiers `.env*` sont copiés en prod - utilisez des secrets Docker en production réelle
3. **Hot-reload dev** : Remonte les changements du code en temps réel
4. **Port 5173** : Port Vite dev server (ne pas mapper en prod)

---

## 📝 Exemples complets

### Dev sur machine locale
```bash
docker-compose up app-dev
# Éditer les fichiers src/, ils se rechargent automatiquement
```

### CI/CD Production
```bash
docker build -t gcr.io/myproject/egent-togo:latest .
docker push gcr.io/myproject/egent-togo:latest
```

### Déploiement local multi-env
```bash
# Terminal 1: Dev
docker-compose up app-dev

# Terminal 2: Prod (pour test)
docker-compose up app-prod

# Les deux tournent en parallèle sur des ports différents
```
