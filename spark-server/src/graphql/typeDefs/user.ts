import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    email:String!
    nickname:String!
    publicKey:String!
    privateKey:String!
  }
  type Mutation {
    createUser(email:String!, nickname:String!, publicKey:String!, privateKey:String!):Boolean!
  }
  type Query {
    hi: String
  }
`;

export {typeDefs}