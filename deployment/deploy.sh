set -ev

DOCKER_TAG=$1
DOCKER_IMAGE="manager.allonounouicibebe.fr:5000/manager-webapp:$DOCKER_TAG"
SERVICE_PATH="/home/corentin/services/$2"

sed -i -e "s/\\[\\[BASE_NAME\\]\\]/$2/" deployment/nginx.conf

docker login -u $DOCKER_LOGIN -p $DOCKER_PASSWORD
docker build -t $DOCKER_IMAGE .
docker push $DOCKER_IMAGE

eval "$(ssh-agent -s)"
ssh-add deployment/id_rsa

ssh -p 2220 -o BatchMode=yes -o StrictHostKeyChecking=no corentin@manager.allonounouicibebe.fr << EOF
cd $SERVICE_PATH
docker-compose down
docker-compose pull
docker-compose up -d
EOF
