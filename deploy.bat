@echo off
REM ============================================
REM Script de Déploiement Rapide - EGENT TOGO (Windows)
REM ============================================

setlocal enabledelayedexpansion

echo.
echo ============================================
echo   ^>^> Démarrage du déploiement
echo ============================================
echo.

REM Vérifications préalables
echo ^[*^] Vérifications préalables...

docker --version >nul 2>&1
if errorlevel 1 (
    echo ^[!^] ERREUR: Docker n'est pas installé
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ^[!^] ERREUR: Docker Compose n'est pas installé
    pause
    exit /b 1
)

if not exist ".env.production" (
    echo ^[!^] ERREUR: .env.production n'existe pas
    pause
    exit /b 1
)

if not exist "nginx.conf" (
    echo ^[!^] ERREUR: nginx.conf n'existe pas
    pause
    exit /b 1
)

if not exist "ssl" (
    echo ^[*^] Créer le répertoire ssl...
    mkdir ssl
)

echo ^[OK^] Vérifications réussies
echo.

REM Arrêter les conteneurs existants
echo ^[*^] Arrêt des services existants...
docker-compose down --remove-orphans 2>nul

REM Construire les images
echo.
echo ^[*^] Construction des images Docker...
docker-compose build --no-cache
if errorlevel 1 (
    echo ^[!^] ERREUR: Échec de la construction
    pause
    exit /b 1
)

REM Lancer les services
echo.
echo ^[*^] Lancement des services...
docker-compose up -d
if errorlevel 1 (
    echo ^[!^] ERREUR: Échec du lancement
    pause
    exit /b 1
)

REM Attendre le démarrage
echo.
echo ^[*^] Attente du démarrage de l'application ^(10s^)...
timeout /t 10 /nobreak

REM Afficher le statut
echo.
echo ============================================
echo   ^>^> Déploiement réussi!
echo ============================================
echo.

docker-compose ps

echo.
echo ^[*^] Vérifications:
echo     - Application: http://localhost:3000
echo     - Nginx: https://www.egenttogo.com ^(si SSL configuré^)
echo.

echo ^[*^] Logs:
echo     - docker-compose logs -f          ^(tous les logs^)
echo     - docker-compose logs app         ^(logs app^)
echo     - docker-compose logs nginx       ^(logs nginx^)
echo.

echo ^[*^] Pour arrêter les services:
echo     - docker-compose down
echo.

pause
