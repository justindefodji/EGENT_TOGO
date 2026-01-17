#!/bin/bash

# Script de test pour vérifier les métadonnées Open Graph des articles

echo "🧪 Test des Métadonnées Open Graph"
echo "===================================="
echo ""

# URLs à tester
declare -a urls=(
    "http://localhost:5173/actualites/inauguration-nouveau-centre"
    "http://localhost:5173/actualites/partenariat-international"
    "http://localhost:5173/actualites/prix-reconnaissance"
)

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

for url in "${urls[@]}"
do
    echo -e "${BLUE}Testing: $url${NC}"
    
    # Récupérer le HTML et chercher les balises og:
    curl -s "$url" | grep -E 'og:title|og:description|og:image|og:url|og:type' | sed 's/<meta/  <meta/g'
    
    echo ""
done

echo -e "${GREEN}✅ Test terminé${NC}"
echo ""
echo "Pour vérifier correctement dans Facebook:"
echo "1. Accédez à: https://developers.facebook.com/tools/debug/sharing/"
echo "2. Collez l'URL de l'article"
echo "3. Cliquez 'Scrape Again'"
echo ""
