# Guide de Déploiement - EGENT TOGO sur www.egenttogo.com

## 📋 Prérequis

- Docker et Docker Compose installés
- Certificats SSL valides (Let's Encrypt recommandé)
- Variables d'environnement configurées
- Accès serveur avec droits sudo

## 🚀 Étapes de Déploiement

### 1. Préparer le Serveur

```bash
# Se connecter au serveur
ssh root@www.egenttogo.com

# Installer Docker et Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Créer un utilisateur non-root (optionnel mais recommandé)
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Cloner et Configurer le Projet

```bash
# Cloner le repository
git clone https://github.com/ALIFOE/EGENT_TOGO.git /app/egent_togo
cd /app/egent_togo

# Créer les répertoires nécessaires
mkdir -p ssl

# Créer le fichier .env.production avec vos clés
cat > .env.production << 'EOF'
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://www.egenttogo.com
VITE_ENVIRONMENT=production

# Firebase
VITE_FIREBASE_API_KEY=votre_clé_firebase
VITE_FIREBASE_AUTH_DOMAIN=votre_domaine.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_projet_id
VITE_FIREBASE_STORAGE_BUCKET=votre_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id

# EmailJS
EMAILJS_SERVICE_ID=votre_service_id
EMAILJS_TEMPLATE_ID=votre_template_id
EMAILJS_PUBLIC_KEY=votre_public_key
EOF
```

### 3. Configurer les Certificats SSL

**Option A: Let's Encrypt (Gratuit - Recommandé)**

```bash
# Installer Certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Générer les certificats
sudo certbot certonly --standalone -d www.egenttogo.com -d egenttogo.com

# Copier les certificats
sudo cp /etc/letsencrypt/live/www.egenttogo.com/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/www.egenttogo.com/privkey.pem ssl/key.pem
sudo chown $USER:$USER ssl/*
```

**Option B: Auto-générer des certificats (Test uniquement)**

```bash
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes
```

### 4. Construire et Lancer les Conteneurs

```bash
# Construire l'image Docker
docker-compose build

# Lancer les services (mode détaché)
docker-compose up -d

# Vérifier l'état
docker-compose ps

# Voir les logs
docker-compose logs -f
```

### 5. Vérifier le Déploiement

```bash
# Test local du service Node
curl http://localhost:3000

# Test via Nginx
curl https://www.egenttogo.com

# Vérifier les logs
docker-compose logs app
docker-compose logs nginx
```

## 🔧 Commandes Utiles

```bash
# Redémarrer les services
docker-compose restart

# Redémarrer un service spécifique
docker-compose restart app
docker-compose restart nginx

# Arrêter les services
docker-compose stop

# Démarrer les services
docker-compose start

# Supprimer tout et recommencer
docker-compose down

# Reconstruire sans cache
docker-compose build --no-cache

# Voir les ressources utilisées
docker stats

# Accéder au shell du conteneur
docker-compose exec app sh
```

## 📊 Monitoring

### Vérifier la santé des services

```bash
# État de l'application
docker-compose exec app curl http://localhost:3000

# Vérifier Nginx
docker-compose logs nginx | tail -20

# Utilisation mémoire
docker stats --no-stream
```

### Logs

```bash
# Tous les logs
docker-compose logs

# Logs en temps réel
docker-compose logs -f

# Logs d'un service
docker-compose logs app
docker-compose logs nginx

# Logs des N dernières lignes
docker-compose logs --tail=100
```

## 🔄 Mise à Jour (CI/CD)

### Automatiser les mises à jour

```bash
#!/bin/bash
# update.sh - Script de mise à jour

cd /app/egent_togo

# Récupérer les derniers changements
git pull origin main

# Reconstruire les images
docker-compose build --no-cache

# Redémarrer les services
docker-compose down
docker-compose up -d

# Afficher l'état
docker-compose ps
```

### Planifier les mises à jour (Cron)

```bash
# Ajouter à crontab (mise à jour quotidienne à 2h du matin)
0 2 * * * /app/egent_togo/update.sh >> /app/egent_togo/update.log 2>&1
```

## 🔒 Sécurité

### Certificats SSL Auto-renouvellement

```bash
# Ajouter un cron job pour renouveler Let's Encrypt
sudo crontab -e

# Ajouter cette ligne:
0 3 * * 0 certbot renew --quiet && \
  cp /etc/letsencrypt/live/www.egenttogo.com/fullchain.pem /app/egent_togo/ssl/cert.pem && \
  cp /etc/letsencrypt/live/www.egenttogo.com/privkey.pem /app/egent_togo/ssl/key.pem && \
  docker-compose -C /app/egent_togo restart nginx
```

### Firewall (UFW)

```bash
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
```

## 🐛 Troubleshooting

### L'application ne démarre pas

```bash
# Vérifier les logs
docker-compose logs app

# Vérifier les variables d'environnement
docker-compose config

# Vérifier l'accès aux fichiers
docker-compose exec app ls -la
```

### Problèmes de connexion

```bash
# Test de connectivité
docker-compose exec app curl http://app:3000

# Vérifier les ports
netstat -tlnp | grep 3000
netstat -tlnp | grep 80
netstat -tlnp | grep 443
```

### Problèmes de fichiers statiques

```bash
# Vérifier que dist existe
docker-compose exec app ls -la dist

# Reconstruire l'application
docker-compose build --no-cache app
```

## 📈 Performance & Optimisation

### Limites de ressources

Modifier `docker-compose.yml`:

```yaml
app:
  deploy:
    resources:
      limits:
        cpus: '1'
        memory: 1G
      reservations:
        cpus: '0.5'
        memory: 512M
```

### Cache Nginx

```bash
# Vider le cache
docker-compose exec nginx nginx -s reload
```

## 📞 Support

Pour toute question ou problème:

1. Vérifier les logs: `docker-compose logs -f`
2. Consulter la documentation Nginx: https://nginx.org/
3. Documentation Docker: https://docs.docker.com/
4. Firebase: https://firebase.google.com/docs
5. Vue.js: https://vuejs.org/

---

**Dernière mise à jour:** Février 2026
**Version:** 1.0
