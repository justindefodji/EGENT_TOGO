@echo off
REM Script PowerShell pour déployer les règles Firestore facilement
REM Windows batch script

echo.
echo 🔐 Deployment des Règles Firestore - EGENT-TOGO
echo ================================================
echo.

REM Vérifier si Firebase CLI est installé
where firebase >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Firebase CLI n'est pas installé
    echo.
    echo Installation rapide:
    echo npm install -g firebase-tools
    echo.
    pause
    exit /b 1
)

echo ✅ Firebase CLI détecté
echo.

REM Se connecter à Firebase
echo 📝 Connexion à Firebase...
call firebase login

echo.
echo 📂 Configuration du projet...
call firebase use --add

echo.
echo 🔐 Application des règles Firestore...

REM Créer le fichier de règles
(
echo rules_version = '2';
echo service cloud.firestore {
echo   match /databases/{database}/documents {
echo     match /products/{document=**} {
echo       allow read: if true;
echo       allow write: if false;
echo     }
echo     match /articles/{document=**} {
echo       allow read: if true;
echo       allow write: if false;
echo     }
echo     match /gallery/{document=**} {
echo       allow read: if true;
echo       allow write: if false;
echo     }
echo     match /projects/{document=**} {
echo       allow read: if true;
echo       allow write: if false;
echo     }
echo     match /contact_forms/{document=**} {
echo       allow create: if true;
echo       allow read: if true;
echo       allow update: if true;
echo       allow delete: if true;
echo     }
echo     match /quotes/{document=**} {
echo       allow create: if true;
echo       allow read: if true;
echo       allow update: if true;
echo       allow delete: if true;
echo     }
echo   }
echo }
) > firestore.rules

REM Publier les règles
call firebase deploy --only firestore:rules

echo.
echo ✅ Règles Firestore appliquées avec succès!
echo.
echo 🧪 Testez maintenant:
echo npm run dev
echo http://localhost:5173/contact
echo.

REM Nettoyage
del /f /q firestore.rules

pause
