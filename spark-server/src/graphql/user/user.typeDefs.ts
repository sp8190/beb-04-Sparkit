import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id:Int,
    email:String,
    password:String,
    nickname:String,
    account:String,
    balance:String,
    private_key:String,
    created_at:String,
    updated_at:String
  }
  type Token {
    access_token:String,
    refresh_token:String

  }
  type Mutation {
    createUser(email:String!, password:String!, nickname:String!, account:String!, private_key:String!):Boolean!
    login(email:String!, password:String!):Token
  }

  type Query {
    getUserInfo(user_id:Int):User
  }
`;