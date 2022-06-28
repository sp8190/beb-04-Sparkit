import commentModel from "../../models/comment.model";
import {status} from "../../constants/code"
import { verifyAccessToken } from '../../utils/jwt';

type comment = {
    id:number,
    post_id:number,
    user_id:number,
    comment:string,
    access_token:string
}

export default {
    Mutation: {
        async createComment(_:any, args:comment) {
            if(!verifyAccessToken(args.access_token)){
                return status.TOKEN_EXPIRED
            }
            let commentInfo = await commentModel.create({
                post_id:args.post_id,
                user_id:args.user_id,
                comment:args.comment
            })
            if(!commentInfo) {
                return status.SERVER_ERROR
            }
            return status.SUCCESS 
        }
    }
}