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
  type Mutation {
    createUser(email:String!, password:String!, nickname:String!, account:String!, balance:String!, private_key:String!):Boolean!
    login(email:String!, password:String!):User
  }
`;