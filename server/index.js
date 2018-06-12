import path from 'path';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import helmet from 'helmet';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

// keys
import SECRET1 from './utils/SECRET1.json';
import SECRET2 from './utils/SECRET2.json';

import models from './models';
import { refreshTokens } from './utils/auth';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const grapqhlEndpoint = '/graphql';
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

// middleware to auth
const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET1.key);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET1, SECRET2);
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
  .use(grapqhlEndpoint, express.json(), graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user,
      SECRET: SECRET1.key,
      SECRET2: SECRET2.key,
    },
  })))
  .use('/graphiql', graphiqlExpress({ endpointURL: grapqhlEndpoint }));

models.sequelize.sync().then(() => app.listen(process.env.PORT || 8080));
