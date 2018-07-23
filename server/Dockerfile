FROM node:10.7
ENV NODE_ENV production
USER node
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY dist .
COPY wait-for-it.sh .
EXPOSE 8080
CMD npm run prod