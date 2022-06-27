import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    post_id:Int,
    user_id:Int,
    comment:String
  }
  
  type Mutation {
    createComment(post_id:Int, user_id:Int, comment:String):Int
  }
`;