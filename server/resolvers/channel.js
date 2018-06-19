import formatErrors from '../utils/formatErrors';

export default {
  Mutation: {
    createChannel: async (_, args, { models }) => {
      try {
        const channel = await models.Channel.create(args);
        return {
          ok: true,
          channel
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
