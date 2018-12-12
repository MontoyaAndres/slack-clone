## Client

yarn install

yarn prod || yarn dev

# Server

mkdir server/src/files

chmod -R 777 dist/files // use it on the docker node component

chmod +x server/wait-for-it.sh

yarn install

yarn build // to be sure folder files exists

sudo docker build -t slack-clone-server . // Building image

sudo docker build --no-cache -t slack-clone-server . // Rebuilding image

sudo docker-compose up