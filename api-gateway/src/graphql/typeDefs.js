import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type Listing {
    id: ID!
    title: String!
    description: String!
  }

  type User {
    id: ID!
    email: String!
  }

  type UserSession {
    id: ID!
    user: User!
    expiredAt: Date!
    createdAt: Date!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    createUserSession(email: String!, password: String!): UserSession
    deleteUserSession(sessionId: ID!): Boolean!
    createListing(title: String!, description: String!): Listing!
  }

  type Query {
    listings: [Listing!]!
    users: [User!]!
    userSession(me: Boolean!): UserSession
  }
`;

export default typeDefs;
