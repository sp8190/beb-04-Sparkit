import likeModel from "../../models/like.model";
import {status} from "../../constants/code"

type inputLike = {
    post_id:number,
    user_id:number
}

export default {
    Mutation: {
        async createLikes(_:any, args: inputLike) {
            let like = await likeModel.create({
                post_id:args.post_id,
                user_id:args.user_id
            })
            if(!like) {
                return status.SERVER_ERROR
            }
            return status.SUCCESS
        }
    }
}