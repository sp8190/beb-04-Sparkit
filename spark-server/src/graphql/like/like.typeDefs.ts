import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createLikes(post_id:Int, user_id:Int, access_token:String):Int
  }
`;