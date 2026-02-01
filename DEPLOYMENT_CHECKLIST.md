# ✅ Checklist de Déploiement - EGENT TOGO

## 🔍 Avant le Déploiement

- [ ] Vérifier que les certificats SSL sont en place dans `/ssl`
- [ ] Vérifier que `.env.production` existe et contient les bonnes variables
- [ ] Tester localement: `docker-compose up`
- [ ] Vérifier les logs pour erreurs: `docker-compose logs app`
- [ ] Confirmer que la base de données Firebase est accessible
- [ ] Tester les emails: `docker-compose exec app curl http://localhost:3000`

## 📦 Fichiers de Configuration

- [x] **Dockerfile** - Multi-stage build pour production ✓
- [x] **docker-compose.yml** - Avec Nginx et variables d'environnement ✓
- [x] **nginx.conf** - Reverse proxy, SSL, sécurité ✓
- [x] **.env.production** - Variables d'environnement production
- [x] **deploy.sh** - Script de déploiement (Linux/Mac)
- [x] **deploy.bat** - Script de déploiement (Windows)

## 🚀 Étapes de Déploiement

### Sur le Serveur

```bash
# 1. Cloner le projet
git clone https://github.com/ALIFOE/EGENT_TOGO.git /app/egent_togo
cd /app/egent_togo

# 2. Configurer les variables d'environnement
# Copier .env.production et remplir les valeurs réelles
cp .env.production.example .env.production
nano .env.production

# 3. Configurer SSL
mkdir -p ssl
# Copier les certificats ou exécuter certbot

# 4. Lancer le déploiement
# Linux/Mac:
bash deploy.sh

# Windows:
deploy.bat

# 5. Vérifier que tout fonctionne
docker-compose ps
docker-compose logs app
```

## 🔐 Configuration SSL

### Option 1: Let's Encrypt (Recommandé - Gratuit)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d www.egenttogo.com -d egenttogo.com
sudo cp /etc/letsencrypt/live/www.egenttogo.com/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/www.egenttogo.com/privkey.pem ssl/key.pem
```

### Option 2: Certificat Existant

```bash
# Copier vos certificats dans ssl/
cp /chemin/cert.pem ssl/cert.pem
cp /chemin/key.pem ssl/key.pem
```

### Option 3: Auto-signé (Test seulement)

```bash
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes
```

## 🌍 Configuration DNS

- [ ] Pointer `www.egenttogo.com` vers l'IP du serveur
- [ ] Pointer `egenttogo.com` vers l'IP du serveur (A record)
- [ ] Vérifier: `nslookup www.egenttogo.com`

## 📋 Points Clés

### Application
- **Port Application**: 3000 (interne)
- **Port HTTP**: 80 (Nginx)
- **Port HTTPS**: 443 (Nginx)
- **Base de données**: Firebase (externe)
- **Email**: EmailJS (externe)

### Performance
- **Gzip**: Activé
- **Rate Limiting**: Activé (10 req/s général, 30 req/s API)
- **Cache**: Statiques (30j), Images (1y)
- **Health Check**: Actif (30s)

### Sécurité
- **SSL/TLS**: 1.2 et 1.3
- **HSTS**: Activé
- **CSP**: Configuré
- **X-Frame-Options**: SAMEORIGIN
- **Certificats**: Stockés dans `/ssl`

## 📊 Vérifications Post-Déploiement

- [ ] Accédez à https://www.egenttogo.com
- [ ] Vérifiez le certificat SSL (cadenas vert)
- [ ] Testez la navigation
- [ ] Testez le formulaire de contact
- [ ] Vérifiez les images chargent
- [ ] Vérifiez l'analytics Google
- [ ] Testez sur mobile

## 🆘 Troubleshooting

### Si le site ne démarre pas
```bash
docker-compose logs app
docker-compose logs nginx
```

### Si SSL échoue
```bash
# Vérifier les fichiers
ls -la ssl/
# Vérifier que les chemins dans nginx.conf correspondent
```

### Si les images ne chargent pas
```bash
docker-compose exec app ls -la dist/
```

### Si c'est lent
```bash
docker stats
# Vérifier la mémoire disponible sur le serveur
```

## 🔄 Mises à Jour

```bash
cd /app/egent_togo
git pull origin main
docker-compose build --no-cache
docker-compose down
docker-compose up -d
```

## 📝 Documentation Référence

- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Vue.js Production Deployment](https://vuejs.org/guide/best-practices/production-deployment.html)

---

**Statut**: ✅ Prêt pour déploiement
**Dernière mise à jour**: Février 2026
