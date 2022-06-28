import userModel from "../../models/user.model";
import {status} from "../../constants/code"
import postModel from "../../models/post.model";
import imageModel from "../../models/image.model"
import { sequelize } from '../../models/index';
import commentModel from "../../models/comment.model"
import likeModel from "../../models/like.model";

type user = {
  id:number,
  email:string,
  password:string,
  nickname:string,
  account:string,
  balance:string,
  private_key:string,
  created_at:string
}

type token = {
  access_token:string
}

export default {
    User: {
      async posts(root:any) {
        let posts = await postModel.findAll({
          where: {
            user_id:root.id
          }
        })
        return posts;
      }
    },
    Post: {
      async hashtags(root:any) {
        const getHashtagsQuery = `SELECT hashtags.* FROM hashtags, posts_hashtags where hashtags.id = posts_hashtags.hashtag_id and posts_hashtags.post_id = :post_id`
        const getHashtagsValue = {
            post_id: root.id
        }
        const hashtags = await sequelize.query(getHashtagsQuery, {replacements: getHashtagsValue})
        return hashtags[0]
      },
      async comments(root:any) {
          let comments = await commentModel.findAll({
              where: {
                  post_id:root.id
              }
          })
          return comments
      },
      async writer(root:any) {
          let userInfo = await userModel.findOne({
              where: {
                  id: root.user_id
              }
          })
          return userInfo
      },
      async likes(root:any) {
          let likeCount = await likeModel.count({
              where: {
                  post_id:root.id
              }
          })
          return likeCount
      },
      async images(root:any) {
          let images = await imageModel.findAll({
              where: {
                  post_id:root.id
              }
          })
          return images
      } 
    },
    Query: {
      async getUserInfo(_:any, args:{user_id:number, access_token:string}) {
        try {
          const jwt = require('jsonwebtoken')
          const decodedToken = jwt.verify(args.access_token, process.env.ACCESS_SECRET)
          if(!decodedToken) {
              return status.TOKEN_EXPIRED
          }
      }catch(e) {
          return status.TOKEN_EXPIRED
      }
        let userInfo = await userModel.findOne({
          where:{
            id:args.user_id
          }
        })
        return userInfo
      }
    },
    Mutation: {
      async createUser(_:any,args:user) {
        var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      	if(!reg.test(args.email)) return status.WRONG_USER_INFO
        
        await userModel.create({ 
          email:args.email,
          password:args.password,
          nickname:args.nickname,
          account:args.account,
          private_key:args.private_key

        });
        return status.SUCCESS
      },
      async login(_:any, args:user){
        let user = await userModel.findOne({
          where: {
            email:args.email,
            password:args.password
          }
        })
        if(!user) {
          return status.WRONG_USER_INFO
        }
        const jwt = require('jsonwebtoken')        
        const accessToken = jwt.sign({
            id:user.id,
            email:user.email,
            nickname:user.nickname,
            account:user.account
          },
          process.env.ACCESS_SECRET, 
          {expiresIn:'1d'}
        )
        return {"access_token":accessToken}
      }
    }
  };