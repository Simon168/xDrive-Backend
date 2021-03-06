'use strict';
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
    login(email_mobile: String!, password: String!): AuthData!

  }

  extend type Mutation {
    signUp(email: String!, mobile: String!, password: String!, firstname: String!, lastname: String): User


  }

  type User {
    id: ID!
    email: String!
    mobile: String!
    firstname: String!
    lastname: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

`;

// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
// type Booking {
//   _id: ID!
//   plan: Plan!
//   user: User!
//   bookingDate: String!
//   bookingTime: String!
//   instructions: String!
//   createdAt: String!
//   updatedAt: String!
// }
//
//
// type Plan {
//   _id: ID!
//   name: String!
//   description: String!
//   price: Float!
//   creator: User!
//
// }
//
// type User {
//   _id: ID!
//   email: String!
//   mobile: String!
//   image: Buffer
//   firstname: String
//   lastname: String
//   password: String!
// }
//
// type AuthData {
//   userId: ID!
//   token: String!
//   tokenExpiration: Int!
// }
//
// input PlanInput {
//   name: String!
//   description: String!
//   price: Float!
// }
//
// input UserInput {
//   email: String!
//   mobile: String!
//   image: Buffer!
//   firstname: String!
//   lastname: String!
//   password: String!
// }
//
// type RootQuery {
//   plans: [Plan!]!
//   bookings: [Booking!]!
//   login(email_mobile: String!, password: String!): AuthData!
// }
//
// type RootMutation {
//   createPlan(planInput: PlanInput): Plan
//   createUser(userInput: UserInput): User
//   bookPlan(planId: ID!): Booking!
//   cancelBooking(bookingId: ID!): Plan!
// }
//
// schema {
//   query: RootQuery
//   mutation: RootMutation
// }
// `;
//
// export default typeDefs;
