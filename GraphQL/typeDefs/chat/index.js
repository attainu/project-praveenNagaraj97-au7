import { gql } from "apollo-server-express";

const ChatTypeDefs = gql`
  extend type Query {
    getMyChats(withWhom: ID!): ChatsList!
  }

  extend type Mutation {
    sendMessage(to: ID!, message: String!): Message!
  }

  extend type Subscription {
    messenger(userId: ID!): Message
  }

  type ChatsList {
    message: String
    chats: [Chat]
  }

  type Chat {
    _id: ID!
    from: ID!
    to: ID!
    message: String
    at: String
  }

  type messager {
    _id: ID!
    name: String!
  }

  type Message {
    chats: [Chat!]
    _id: ID!
    sender: messager
    reciever: messager
  }
`;

export default ChatTypeDefs;
