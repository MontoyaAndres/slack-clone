export default `
  scalar Upload

  type Message {
    id: Int!
    text: String
    user: User!
    channel: Channel!
    created_at: String!
    url: String
    filetype: String
  }

  type Subscription {
    newChannelMessage(channelId: Int!): Message!
  }

  type Query {
    messages(cursor: String, channelId: Int!): [Message!]!
  }

  type Mutation {
    createMessage(channelId: Int!, text: String, file: Upload): Boolean!
  }
`;
