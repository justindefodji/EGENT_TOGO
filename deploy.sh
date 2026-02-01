#!/bin/bash

# ============================================
# Script de Déploiement Rapide - EGENT TOGO
# ============================================

set -e

echo "🚀 Démarrage du déploiement..."

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Vérifications préalables
echo -e "${YELLOW}📋 Vérifications préalables...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker n'est pas installé${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose n'est pas installé${NC}"
    exit 1
fi

# Vérifier les fichiers de configuration
if [ ! -f ".env.production" ]; then
    echo -e "${RED}❌ .env.production n'existe pas${NC}"
    exit 1
fi

if [ ! -f "nginx.conf" ]; then
    echo -e "${RED}❌ nginx.conf n'existe pas${NC}"
    exit 1
fi

if [ ! -d "ssl" ]; then
    echo -e "${YELLOW}⚠️  Créer le répertoire ssl...${NC}"
    mkdir -p ssl
fi

echo -e "${GREEN}✓ Vérifications OK${NC}"

# Arrêter les conteneurs existants
echo -e "${YELLOW}🛑 Arrêt des services existants...${NC}"
docker-compose down --remove-orphans || true

# Nettoyer les images inutilisées
echo -e "${YELLOW}🧹 Nettoyage des images inutilisées...${NC}"
docker image prune -f || true

# Construire les images
echo -e "${YELLOW}🔨 Construction des images Docker...${NC}"
docker-compose build --no-cache

# Lancer les services
echo -e "${YELLOW}🚀 Lancement des services...${NC}"
docker-compose up -d

# Attendre que l'application soit prête
echo -e "${YELLOW}⏳ Attente du démarrage de l'application...${NC}"
sleep 10

# Vérifier la santé des services
echo -e "${YELLOW}🏥 Vérification de la santé des services...${NC}"

if docker-compose ps | grep -q "app.*healthy"; then
    echo -e "${GREEN}✓ Application est saine${NC}"
else
    echo -e "${YELLOW}⚠️  Application en cours de démarrage, vérifier avec: docker-compose logs app${NC}"
fi

# Afficher le statut
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Déploiement réussi!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""

docker-compose ps

echo ""
echo -e "${YELLOW}📋 Vérifications:${NC}"
echo -e "  • Application: http://localhost:3000"
echo -e "  • Nginx: https://www.egenttogo.com (si certificats SSL configurés)"
echo ""
echo -e "${YELLOW}📊 Logs:${NC}"
echo -e "  • docker-compose logs -f          # Tous les logs"
echo -e "  • docker-compose logs app         # Logs de l'application"
echo -e "  • docker-compose logs nginx       # Logs de Nginx"
echo ""
echo -e "${YELLOW}🔧 Commandes utiles:${NC}"
echo -e "  • docker-compose restart          # Redémarrer les services"
echo -e "  • docker-compose down             # Arrêter et supprimer"
echo -e "  • docker stats                    # Ressources utilisées"
echo ""
