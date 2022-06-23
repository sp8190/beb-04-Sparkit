import hashtagModel from "../../models/hashtag.model";
import {status} from "../../constants/code"

type hashtag = {
    id:number,
    hashtag:string
}

export default {
    Query: {
        async getHashtags() {
            let hashtags = await hashtagModel.findAll()
            if(!hashtags) {
                return status.SERVER_ERROR
            }
            return hashtags
        }
    }
}