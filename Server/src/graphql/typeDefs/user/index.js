import { gql } from "apollo-server-express";

const UserTypeDefs = gql`
  extend type Mutation {
    signUp(data: SignUpInput): LoggedUser
    signIn(data: SignInInput): LoggedUser
  }

  input SignInInput {
    email: String!
    password: String!
    keepLoggedIn: Boolean!
  }

  input SignUpInput {
    name: String!
    email: String!
    phoneNumber: BigInt!
    password: String!
    confirmPassword: String!
  }

  type LoggedUser {
    _id: ID!
    message: String!
    token: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    phoneNumber: BigInt!
    password: String
    confirmPassword: String
    accountActive: Boolean!
    passwordModified: String
    resetToken: String
  }
`;

export default UserTypeDefs;
