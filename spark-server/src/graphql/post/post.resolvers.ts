import postModel from "../../models/post.model";
import hashtagModel from "../../models/hashtag.model";
import postHashtagModel from "../../models/post.hashtag.model";
import userModel from "../../models/user.model";
import likeModel from "../../models/like.model";
import commentModel from "../../models/comment.model";
import imageModel from "../../models/image.model";
import { status } from "../../constants/code";
import { sequelize } from "../../models/index";
import { sendTokenToWriter } from "../../token/tokenUtil";
import { verifyAccessToken } from "../../utils/jwt";

type inputPost = {
  title: string;
  post_content: string;
  user_id: number;
  hashtags: [string];
  images: [string];
  access_token: string;
};

type post = {
  id: number;
  title: string;
  post_content: string;
  user_id: number;
  created_at: string;
};

type hashtag = {
  id: number;
  hashtag: string;
};

type comment = {
  id: number;
  comment: string;
  post_id: number;
  user_id: number;
};

type user = {
  id: number;
  email: string;
  nickname: string;
};

type image = {
  id: number;
  image_path: string;
  post_id: number;
};

type like = {
  id: number;
  post_id: number;
  user_id: number;
};

export default {
  Post: {
    async hashtags(root: any) {
      const getHashtagsQuery = `SELECT hashtags.* FROM hashtags, posts_hashtags where hashtags.id = posts_hashtags.hashtag_id and posts_hashtags.post_id = :post_id`;
      const getHashtagsValue = {
        post_id: root.id,
      };
      const hashtags = await sequelize.query(getHashtagsQuery, {
        replacements: getHashtagsValue,
      });
      return hashtags[0];
    },
    async comments(root: any) {
      let comments = await commentModel.findAll({
        where: {
          post_id: root.id,
        },
      });
      return comments;
    },
    async writer(root: any) {
      let userInfo = await userModel.findOne({
        where: {
          id: root.user_id,
        },
      });
      return userInfo;
    },
    async likes(root: any) {
      let like = await likeModel.findAll({
        where: {
          post_id: root.id,
        },
      });
      return like;
    },
    async images(root: any) {
      let images = await imageModel.findAll({
        where: {
          post_id: root.id,
        },
      });
      return images;
    },
  },
  Comment: {
    async writer(root: any) {
      let userInfo = await userModel.findOne({
        where: {
          id: root.user_id,
        },
      });
      return userInfo;
    },
  },
  Query: {
    async getPosts() {
      let posts = await postModel.findAll();
      return posts;
    },
    async getPost(_: any, args: { post_id: number }) {
      let postInfo = await postModel.findOne({
        where: {
          id: args.post_id,
        },
      });
      return postInfo;
    },
    async getPostByUser(_: any, args: { user_id: number }) {
      let postInfo = await postModel.findAll({
        where: {
          user_id: args.user_id,
        },
      });
      return postInfo;
    },
    async getPostsByHashtag(_: any, args: { hashtag_id: number }) {
      const getPostsByHashtagQuery = `select posts.* FROM posts, posts_hashtags where posts_hashtags.hashtag_id = :hashtag_id and posts.id = posts_hashtags.post_id`;
      const getPostsByHashtagValue = {
        hashtag_id: args.hashtag_id,
      };
      const posts = await sequelize.query(getPostsByHashtagQuery, {
        replacements: getPostsByHashtagValue,
      });
      return posts[0];
    },
  },
  Mutation: {
    async createPost(_: any, args: inputPost) {
      if (!verifyAccessToken(args.access_token)) {
        return status.TOKEN_EXPIRED;
      }

      let post = await postModel.create({
        title: args.title,
        post_content: args.post_content,
        user_id: args.user_id,
      });

      if (!post) {
        return status.SERVER_ERROR;
      }

      let userInfo = await userModel.findOne({
        where: {
          id: args.user_id,
        },
      });
      if (userInfo) {
        sendTokenToWriter(userInfo.account, userInfo.id);
      }

      if (args.images != null && args.images.length > 0) {
        for (let image of args.images) {
          let savedImage = await imageModel.create({
            image_path: image,
            post_id: post.id,
          });
          if (!savedImage) {
            return status.SERVER_ERROR;
          }
        }
      }

      if (args.hashtags != null && args.hashtags.length > 0) {
        for (let inputHashtag of args.hashtags) {
          var hashtag = await hashtagModel.findOne({
            where: {
              hashtag: inputHashtag,
            },
          });
          if (!hashtag) {
            hashtag = await hashtagModel.create({
              hashtag: inputHashtag,
            });
          }
          await postHashtagModel.create({
            post_id: post.id,
            hashtag_id: hashtag.id,
          });
        }
      }

      return post.id;
    },
  },
};
