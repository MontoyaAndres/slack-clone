import { tryLogin } from '../utils/auth';
import formatErrors from '../utils/formatErrors';

export default {
  Query: {
    getUser: (_, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (_, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (_, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (_, args, { models }) => {
      try {
        const user = await models.User.create(args);

        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};

