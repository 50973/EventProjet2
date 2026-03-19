@echo off
REM Script Docker Helper pour EventDKC
REM Usage: docker-helper.bat [command]

if "%1%"=="" goto help

REM Vérifier si docker-compose est installé
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose n'est pas installé ou n'est pas dans le PATH
    echo Téléchargez Docker Desktop: https://www.docker.com/products/docker-desktop
    exit /b 1
)

if "%1%"=="start" goto start
if "%1%"=="stop" goto stop
if "%1%"=="restart" goto restart
if "%1%"=="logs" goto logs
if "%1%"=="clean" goto clean
if "%1%"=="build" goto build
if "%1%"=="status" goto status
if "%1%"=="shell" goto shell
if "%1%"=="db" goto db
if "%1%"=="redis" goto redis
if "%1%"=="help" goto help

echo ❌ Commande inconnue: %1%
goto help

:start
echo 🚀 Démarrage des services...
docker-compose up -d
echo ✅ Services démarrés!
echo 📍 API disponible sur: http://localhost:4000/api
exit /b 0

:stop
echo 🛑 Arrêt des services...
docker-compose down
echo ✅ Services arrêtés!
exit /b 0

:restart
echo 🔄 Redémarrage des services...
docker-compose restart
echo ✅ Services redémarrés!
exit /b 0

:logs
if "%2%"=="" (
    docker-compose logs -f
) else (
    docker-compose logs -f %2%
)
exit /b 0

:clean
echo ⚠️  Suppression des services ET des données...
docker-compose down -v
echo ✅ Nettoyage terminé!
exit /b 0

:build
echo 🔨 Construction de l'image Docker...
docker-compose build backend
echo ✅ Build terminée!
exit /b 0

:status
echo 📊 Statut des services:
docker-compose ps
exit /b 0

:shell
echo 🐚 Accès au shell du backend...
docker exec -it eventdkc_backend sh
exit /b 0

:db
echo 🗄️  Connexion à MySQL...
docker exec -it eventdkc_mysql mysql -u eventdkc -ppassword eventdkc
exit /b 0

:redis
echo 🔴 Connexion à Redis...
docker exec -it eventdkc_redis redis-cli -a redis_password
exit /b 0

:help
echo.
echo 🐳 Docker Helper - EventDKC
echo.
echo Commandes disponibles:
echo.
echo   docker-helper.bat start       - Démarrer les services
echo   docker-helper.bat stop        - Arrêter les services
echo   docker-helper.bat restart     - Redémarrer les services
echo   docker-helper.bat logs        - Afficher les logs (tous les services)
echo   docker-helper.bat logs [service] - Logs d'un service spécifique
echo   docker-helper.bat status      - Voir le statut des services
echo   docker-helper.bat build       - Reconstruire l'image Docker
echo   docker-helper.bat clean       - Arrêter et supprimer tout (données incluses!)
echo   docker-helper.bat shell       - Accès au shell du container backend
echo   docker-helper.bat db          - Connexion à MySQL
echo   docker-helper.bat redis       - Connexion à Redis
echo   docker-helper.bat help        - Afficher cette aide
echo.
echo Services disponibles:
echo   - backend
echo   - mysql
echo   - redis
echo.
echo Exemples:
echo   docker-helper.bat logs backend
echo   docker-helper.bat logs mysql
echo   docker-helper.bat logs redis
echo.
exit /b 0
