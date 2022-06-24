import {status} from "../../constants/code"
import { sequelize } from '../../models/index';

type hashtag = {
    id:number,
    hashtag:string
}

export default {
    Query: {
        async getHashtags() {
            const getHashtagsOrderByCountQuery = `SELECT hashtags.id, hashtags.hashtag FROM posts_hashtags, hashtags where hashtags.id = posts_hashtags.hashtag_id group by posts_hashtags.hashtag_id order by count(posts_hashtags.hashtag_id) desc`
            let hashtags = await sequelize.query(getHashtagsOrderByCountQuery, {})
            if(!hashtags) {
                return status.SERVER_ERROR
            }
            return hashtags[0]
        }
    }
}