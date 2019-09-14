set -ev

DOCKER_TAG=$1
DOCKER_IMAGE="manager.allonounouicicbebe.fr:5000/manager-webapp:$DOCKER_TAG"

SERVICE_PATH="/home/corentin/services/$2"

docker login -u $DOCKER_LOGIN -p $DOCKER_PASSWORD
docker build -t $DOCKER_IMAGE .
docker push $DOCKER_IMAGE

ssh -p 2220 manager.allonounouicicbebe.fr << EOF
cd $SERVICE_PATH
docker-compose down
docker-compose pull
docker-compose up -d
EOF
