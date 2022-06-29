import likeModel from "../../models/like.model";
import userModel from "../../models/user.model";
import { status } from "../../constants/code";
import { sequelize } from "../../models/index";
import { voteToOtherUser } from "../../token/tokenUtil";
import { verifyAccessToken } from "../../utils/jwt";

type inputLike = {
  post_id: number;
  user_id: number;
  access_token: string;
};

export default {
  Mutation: {
    async createLikes(_: any, args: inputLike) {
      if (!verifyAccessToken(args.access_token)) {
        return status.TOKEN_EXPIRED;
      }

      let like = await likeModel.create({
        post_id: args.post_id,
        user_id: args.user_id,
      });

      if (!like) {
        return status.SERVER_ERROR;
      }

      let senderInfo = await userModel.findOne({
        where: {
          id: args.user_id,
        },
      });

      const getReceiverQuery = `select users.* from posts, users where posts.id = :post_id and users.id = posts.user_id`;
      const getReceiverValue = {
        post_id: args.post_id,
      };
      const receiverInfoResult = await sequelize.query(getReceiverQuery, {
        replacements: getReceiverValue,
      });
      const receiverInfo = Object(receiverInfoResult[0][0]);

      if (senderInfo && receiverInfo) {
        voteToOtherUser(
          senderInfo.account,
          senderInfo.private_key,
          senderInfo.id,
          receiverInfo.account,
          receiverInfo.id
        );
      }

      return status.SUCCESS;
    },
  },
};
