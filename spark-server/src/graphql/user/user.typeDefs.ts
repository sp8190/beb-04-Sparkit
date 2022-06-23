import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id:Int,
    email:String,
    password:String,
    nickname:String,
    account:String,
    balance:String,
    privateKey:String,
    createdAt:String,
    updatedAt:String
  }
  type Mutation {
    createUser(email:String!, password:String!, nickname:String!, account:String!, balance:String!, privateKey:String!):Boolean!
    login(email:String!, password:String!):User
  }
  type Query {
    hi: String
  }
`;