import formatErrors from '../utils/formatErrors';
import requiresAuth from '../utils/permissions';

export default {
  Mutation: {
    createTeam: requiresAuth.createResolver(async (_, args, { models, user }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    })
  }
};
