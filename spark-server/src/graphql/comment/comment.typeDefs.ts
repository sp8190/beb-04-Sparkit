import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    postId:Int,
    userId:Int,
    comment:String
  }
  type Mutation {
    createComment(postId:Int, userId:Int, comment:String):Int
  }
`;