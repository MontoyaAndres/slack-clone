# Slack chat clone

This is and application which is inspiraded in the big software of online communication Slack. This app has the funtionality of create and login users who will can create workspeaces, channels and send text or multimedia messages which are going to send through real time.

<p align="center">
  <video width="320" height="240" controls>
    <source src="https://cdn-b-east.streamable.com/video/mp4/37rov.mp4?token=hEVXHNT3NAEmtChPGBdVTg&expires=1544670804" type="video/mp4">
  </video>
</p>

`[![asciicast](https://asciinema.org/a/113463.png)](https://cdn-b-east.streamable.com/video/mp4/37rov.mp4?token=hEVXHNT3NAEmtChPGBdVTg&expires=1544670804)`

## Client

yarn install

yarn prod || yarn dev

## Server

mkdir server/src/files && chmod -R 777 server/src/files

chmod +x server/wait-for-it.sh

yarn install

yarn build // to be sure folder files exists

sudo docker-compose up

chmod -R 777 dist/files // use it on the docker node component
