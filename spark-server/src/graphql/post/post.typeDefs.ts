import { gql } from "apollo-server-express";

export default gql`
  type Post {
    id: Int
    title: String
    post_content: String
    user_id: Int
    created_at: String
    hashtags: [Hashtag]
    comments: [Comment]
    writer: User
    likes: [Like]
    images: [Image]
  }

  type User {
    id: Int
    nickname: String
    email: String
  }

  type Comment {
    id: Int
    comment: String
    post_id: Int
    user_id: Int
    writer: User
  }

  type Hashtag {
    id: Int
    hashtag: String
  }

  type Image {
    id: Int
    image_path: String
    post_id: Int
  }

  type Like {
    id: Int
    post_id: Int
    user_id: Int
  }

  type Query {
    getPosts: [Post]
    getPost(post_id: Int): Post
    getPostByUser(user_id: Int): [Post]
    getPostsByHashtag(hashtag_id: Int): [Post]
  }

  type Mutation {
    createPost(
      title: String!
      post_content: String!
      user_id: Int
      hashtags: [String]
      images: [String]
      access_token: String
    ): Int!
  }
`;
