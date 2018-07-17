import { createWriteStream } from 'fs';
import { withFilter } from 'graphql-subscriptions';

import requiresAuth, { requiresTeamAccess } from '../utils/permissions';
import pubsub from '../utils/pubsub';

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';
const UPLOAD_ROUTE = `${__dirname}/../files`;

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(`${UPLOAD_ROUTE}/${filename}`))
      .on('finish', () => resolve())
      .on('error', reject)
  );

export default {
  Subscription: {
    newChannelMessage: {
      subscribe: requiresTeamAccess.createResolver(
        withFilter(
          () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
          (payload, args) => payload.channelId === args.channelId
        )
      )
    }
  },
  Message: {
    url: parent => (parent.url ? `http://localhost:8080/${parent.url}` : parent.url),
    user: ({ user, userId }, args, { models }) => {
      if (user) {
        return user;
      }

      return models.User.findOne({ where: { id: userId } }, { raw: true });
    }
  },
  Query: {
    messages: requiresAuth.createResolver(async (parent, { offset, channelId }, { models, user }) => {
      const channel = await models.Channel.findOne({ where: { id: channelId }, raw: true });

      if (!channel.public) {
        const member = await models.PCMember.findOne({ where: { channelId, userId: user.id }, raw: true });

        if (!member) {
          throw new Error('Not Authorized');
        }
      }

      return models.Message.findAll(
        { order: [['created_at', 'ASC']], where: { channelId }, limit: 35, offset },
        { raw: true }
      );
    })
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, { file, ...args }, { models, user }) => {
      try {
        const messageData = args;

        if (file) {
          // save file
          const { stream, filename, mimetype } = await file;
          await storeUpload({ stream, filename });

          messageData.filetype = mimetype;
          messageData.url = `files/${filename}`;
        }

        const message = await models.Message.create({
          ...messageData,
          userId: user.id
        });

        const asyncFunc = async () => {
          const currentUser = await models.User.findOne({
            where: {
              id: user.id
            }
          });

          pubsub.publish(NEW_CHANNEL_MESSAGE, {
            channelId: args.channelId,
            newChannelMessage: {
              ...message.dataValues,
              user: currentUser.dataValues
            }
          });
        };

        asyncFunc();

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    })
  }
};
