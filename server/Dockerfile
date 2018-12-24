FROM node:8.14.1-alpine
ENV NODE_ENV production
RUN apk add --no-cache bash
WORKDIR /app
COPY ["package.json", "yarn.lock", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --prod && mv node_modules ../
COPY dist .
COPY wait-for-it.sh .
EXPOSE 8080
CMD ["yarn", "prod"]