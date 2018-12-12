FROM node:8.12.0-alpine
ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "yarn.lock", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production=true --silent && mv node_modules ../
COPY dist .
EXPOSE 8080
CMD ["yarn", "prod"]
