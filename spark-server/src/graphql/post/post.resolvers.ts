import postModel from "../../models/post.model";
import hashtagModel from "../../models/hashtag.model";
import postHashtagModel from "../../models/post.hashtag.model"
import userModel from "../../models/user.model";
import likeModel from "../../models/like.model";
import commentModel from "../../models/comment.model"
import {status} from "../../constants/code"
import { sequelize } from '../../models/index';

type inputPost = {
    title:string,
    post_content:string,
    user_id:number,
    hashtags:[string]
}

type post = {
    id:number,
    title:string,
    post_content:string,
    user_id:number
    created_at:string
  }

type hashtag = {
    id:number,
    hashtag:string
}

type comment = {
    id:number,
    comment:string,
    post_id:number,
    user_id:number
}

type user = {
    id:number,
    email:string,
    nickname:string
}

export default {
    Post: {
        async hashtags(root:any) {
            const getHashtagsQuery = `SELECT hashtags.* FROM hashtags, posts_hashtags where hashtags.id = posts_hashtags.hashtag_id and posts_hashtags.post_id = :postId`
            const getHashtagsValue = {
                postId: root.id
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
        } 
    },
    Comment: {
        async writer(root:any) {
            let userInfo = await userModel.findOne({
                where: {
                    id: root.user_id
                }
            })
            return userInfo
        } 
    },
    Query: {
        async getPosts(){
            let posts = await postModel.findAll()
            return posts
        },
        async getPost(_:any, args:{postId:number}) {
            var postInfo = await postModel.findOne({
                where: {
                    id:args.postId
                }
            })
            return postInfo
        }
    },
    Mutation: {
        async createPost(_:any, args:inputPost) {
            let post = await postModel.create({
                title:args.title,
                post_content:args.post_content,
                user_id:args.user_id
            });
            if(!post) {
                return status.SERVER_ERROR
            }
            for (let inputHashtag of args.hashtags) {
                var hashtag = await hashtagModel.findOne({
                    where: {
                        hashtag:inputHashtag 
                    }
                })
                if(!hashtag) {
                    hashtag = await hashtagModel.create({
                        hashtag:inputHashtag
                    })
                }
                await postHashtagModel.create({
                    post_id:post.id,
                    hashtag_id: hashtag.id
                })
                
            } 
            return status.SUCCESS
        }
    }
}