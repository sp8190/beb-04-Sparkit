import postModel from "../../models/post.model";
import {status} from "../../constants/code"

type post = {
    id:number,
    title:string,
    postContent:string,
    userId:number
    createdAt:string
  }

export default {
    Query: {
        ping: () => '👋 pong! from post query 👋',
        async posts(){
            let posts = await postModel.findAll()
            if(!posts) {
                return status.SERVER_ERROR
            }
            return posts
        }

    },
    Mutation: {
        async createPost(_:any, args:post) {
            let post = await postModel.create({
                title:args.title,
                post_content:args.postContent,
                user_id:args.userId
            });
            if(!post) {
                return status.SERVER_ERROR
            }
            return status.SUCCESS
        }
    }
}