import commentModel from "../../models/comment.model";
import {status} from "../../constants/code"

type comment = {
    id:number,
    postId:number,
    userId:number,
    comment:string
}

export default {
    Mutation: {
        async createComment(_:any, args:comment) {
            let commentInfo = await commentModel.create({
                post_id:args.postId,
                user_id:args.userId,
                comment:args.comment
            })
            if(!commentInfo) {
                return status.SERVER_ERROR
            }
            return status.SUCCESS 
        }
    }
}