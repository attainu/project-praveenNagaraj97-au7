import { gql } from "apollo-server-express";

import UserTypeDefs from "./user";
import ProductTypeDefs from "./products";
import ChatTypeDefs from "./chat";

const RootSchema = gql`
  scalar BigInt

  type Query {
    "This **Query** Provides details about developer"
    aboutDeveloper: AboutMe
  }

  type Mutation {
    _rootMutation(name: String): String
  }

  type Subscription {
    _rootSubscription: String
  }

  type AboutMe {
    name: String!
    age: Int!
    location: String!
  }
`;

const typeDefs = [RootSchema, UserTypeDefs, ProductTypeDefs, ChatTypeDefs];

export default typeDefs;
