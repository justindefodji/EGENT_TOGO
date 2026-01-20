#!/bin/bash

# Script pour appliquer les règles Firestore
# Utilise Firebase CLI

echo "🔐 Configuration des Règles Firestore - EGENT-TOGO"
echo "=================================================="
echo ""

# Vérifier si Firebase CLI est installé
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI n'est pas installé"
    echo ""
    echo "Installation rapide:"
    echo "npm install -g firebase-tools"
    echo ""
    exit 1
fi

echo "✅ Firebase CLI détecté"
echo ""

# Se connecter à Firebase
echo "📝 Connexion à Firebase..."
firebase login

echo ""
echo "📂 Configuration du projet..."
firebase use EGENT-TOGO

echo ""
echo "🔐 Application des règles Firestore..."

# Créer le fichier de règles
cat > firestore.rules << 'EOF'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /articles/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /projects/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /contact_forms/{document=**} {
      allow create: if true;
      allow read: if false;
      allow update: if false;
      allow delete: if false;
    }
    match /quotes/{document=**} {
      allow create: if true;
      allow read: if false;
      allow update: if false;
      allow delete: if false;
    }
  }
}
EOF

# Publier les règles
firebase deploy --only firestore:rules

echo ""
echo "✅ Règles Firestore appliquées avec succès!"
echo ""
echo "Testez maintenant:"
echo "npm run dev"
echo "http://localhost:5173/contact"
