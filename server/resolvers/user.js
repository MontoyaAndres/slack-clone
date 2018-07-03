import { tryLogin } from '../utils/auth';
import formatErrors from '../utils/formatErrors';
import requiresAuth from '../utils/permissions';

export default {
  User: {
    teams: (parent, args, { models, user }) =>
      models.sequelize.query(
        'select * from teams as team join members as member on team.id = member.team_id where member.user_id = ?',
        {
          replacements: [user.id],
          model: models.Team,
          raw: true
        }
      )
  },
  Query: {
    allUsers: (_, args, { models }) => models.User.findAll(),
    me: requiresAuth.createResolver((parent, args, { models, user }) => models.User.findOne({ where: { id: user.id } }))
  },
  Mutation: {
    login: (_, { email, password }, { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),
    register: async (_, args, { models }) => {
      try {
        const user = await models.User.create(args);

        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
