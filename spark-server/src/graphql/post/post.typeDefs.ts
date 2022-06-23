import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id:Int,
    title:String,
    post_content:String,
    user_id:Int,
    created_at:String
    hashtags:[Hashtag]
    comments:[Comment]
    writer:User,
    likes:Int
  }
  type User {
    id:Int,
    nickname:String,
    email:String
  }
  type Comment {
    id:Int,
    comment:String,
    post_id:Int,
    user_id:Int
    writer:User
  }
  type Hashtag{
    id:Int,
    hashtag:String
  }
  type Query {
    getPosts:[Post]
    getPost(post_id:Int):Post
    getPostsByHashtag(hashtag_id:Int):[Post]
  }
  type Mutation {
    createPost(title:String!, postContent:String!, userId:Int, hashtags:[String]):Boolean!
  }
`;