import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id:Int,
    title:String,
    postContent:String,
    userId:Int,
    createdAt:String
  }
  type Query {
    ping:String
    posts:[Post]
  }
  type Mutation {
    createPost(title:String!, postContent:String!, userId:Int):Boolean!
  }
`;