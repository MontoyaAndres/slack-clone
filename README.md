# Slack chat clone

This is an application which is inspiraded in the big software of online communication Slack. This app has the funtionality to create and login users who will can create workspaces, channels and send text or multimedia messages which are going to send through real time.

<p align="center">
  <img src="http://i.imgur.com/CaT2ODt.gif">
</p>

To install it you need to follow this steps:

## Client side

First to all, getting in to the folder *client*, then install the dependencies running this command:

```
yarn install
```

Then, we can run it in *development* or *production* mode.

#### Development

First, we need to put the server api on the *.env.development* file, like this for example:

```
REACT_APP_SERVER_URL="http://localhost:8080"
```

And then run it!

```
yarn dev
```

#### Production

First, we need to put the server api on the *.env.production* file, like this for example:

```
REACT_APP_SERVER_URL="api.any-website.com"
```

> Only put the dns, not put any / or protocol like http or https. More info in *src/apollo.js*.

And then pass the jsx code to js!

```
yarn build
```

You can run it on python SimpleHTTPServer, apache2 or whatever... It's only a static web page.

## Server side

First to all, getting in to the folder *server*, then install the dependecies running this command:

```
yarn install
```

Then, we can run it in *development* or *production* mode.

#### Development

We need to have installed mysql, node and redis installed in your computer, if you have them, only change the config of the file *src/models/index.js* to your mysql user. For redis only check if the config from *src/utils/pubsub.js* is right.

Then create a folder called *files*:

```
mkdir src/files && chmod -R 777 src/files
```

If everything is done, run:

```
yarn start
```

#### Production

We need to give all permissions to the bash file wait-for-it.sh, like this:

```
chmod +x wait-for-it.sh
```
Then run:

> Being sure that the folder *files* is within the folder *dist* created by the command below.

```
yarn build
```

Then, you need to open the docker-compose.yml file and put in the variable SERVER_URL the host of you api, something like:

```
server:
    build:
      context: .
    environment:
      DB_HOST: db
      REDIS_HOST: redis
      SERVER_URL: http://api.any-website.com
    volumes:
      - files:/app/files
    depends_on:
      - db
      - redis
    command: ["./wait-for-it.sh", "db:3306", "--", "yarn", "prod"]
```

And run the docker-compose file!

```
sudo docker-compose up
```

To finish this, run the container that runs the server of nodejs, once inside, run:

```
// Using it on the docker node container of slack.
chmod -R 777 dist/files
```

Thanks for reading! Any question? Here you go:

andresmontoyafcb@gmail.com
