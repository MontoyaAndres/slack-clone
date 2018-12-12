## Client

yarn install

yarn prod || yarn dev

## Server

mkdir server/src/files

chmod -R 777 dist/files // use it on the docker node component

chmod +x server/wait-for-it.sh

yarn install

yarn build // to be sure folder files exists

sudo docker-compose up

## Heroku

curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

heroku login

