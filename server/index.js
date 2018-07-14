import path from 'path';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import helmet from 'helmet';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import expressPlayground from 'graphql-playground-middleware-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { apolloUploadExpress } from 'apollo-upload-server';

import models from './models';
import { refreshTokens } from './utils/auth';

const SECRET = 'secret';
const SECRET2 = 'secret';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
const grapqhlEndpoint = '/graphql';
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

// middleware to auth
const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app
  .use(cors(corsOptions))
  .use(addUser)
  .use(helmet())
  .use(
    grapqhlEndpoint,
    express.json(),
    apolloUploadExpress(),
    graphqlExpress(req => ({
      schema,
      context: {
        models,
        user: req.user,
        SECRET,
        SECRET2
      }
    }))
  )
  .get(
    '/graphiql',
    expressPlayground({ endpoint: grapqhlEndpoint, subscriptionEndpoint: 'ws://localhost:8080/subscriptions' })
  );

app.use('/files', express.static('files'));

const server = createServer(app);

models.sequelize.sync({ force: false }).then(() => {
  server.listen(8080, () => {
    // eslint-disable-next-line
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: async ({ token, refreshToken }, webSocket) => {
          // this the context based on websockets
          if (token && refreshToken) {
            try {
              const { user } = jwt.verify(token, SECRET);
              return { models, user };
            } catch (err) {
              const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
              return { models, user: newTokens.user };
            }
          }

          return { models };
        }
      },
      {
        server,
        path: '/subscriptions'
      }
    );
  });
});
