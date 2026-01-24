# Script PowerShell pour appliquer les règles Firestore
# Utilise Firebase CLI

Write-Host "🔐 Configuration des Règles Firestore - EGENT TOGO" -ForegroundColor Cyan
Write-Host "=================================================="
Write-Host ""

# Vérifier si Firebase CLI est installé
$firebaseExists = Get-Command firebase -ErrorAction SilentlyContinue

if (-not $firebaseExists) {
    Write-Host "❌ Firebase CLI n'est pas installé" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installation rapide:" -ForegroundColor Yellow
    Write-Host "npm install -g firebase-tools"
    Write-Host ""
    exit 1
}

Write-Host "✅ Firebase CLI détecté" -ForegroundColor Green
Write-Host ""

# Se connecter à Firebase
Write-Host "📝 Connexion à Firebase..." -ForegroundColor Cyan
firebase login

Write-Host ""
Write-Host "📂 Configuration du projet..." -ForegroundColor Cyan
firebase use EGENT TOGO

Write-Host ""
Write-Host "🔐 Application des règles Firestore..." -ForegroundColor Cyan

# Créer le fichier de règles
$rulesContent = @'
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
'@

$rulesContent | Out-File -FilePath "firestore.rules" -Encoding UTF8

# Publier les règles
Write-Host ""
Write-Host "📤 Publication des règles..." -ForegroundColor Cyan
firebase deploy --only firestore:rules

Write-Host ""
Write-Host "✅ Règles Firestore appliquées avec succès!" -ForegroundColor Green
Write-Host ""
Write-Host "🧪 Testez maintenant:" -ForegroundColor Yellow
Write-Host "npm run dev"
Write-Host "Puis allez à: http://localhost:5173/contact"
Write-Host ""

# Nettoyage
Remove-Item "firestore.rules" -Force
