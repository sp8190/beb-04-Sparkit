import userModel from '../../models/user.model'
import { status } from '../../constants/code'

import { generateWallet } from '../../utils/wallet'
import postModel from '../../models/post.model'
import imageModel from '../../models/image.model'
import { sequelize } from '../../models/index'
import commentModel from '../../models/comment.model'
import likeModel from '../../models/like.model'

const aes256 = require('aes256')
type user = {
  id: number
  email: string
  password: string
  nickname: string
  account: string
  balance: string
  private_key: string
  created_at: string
}

type token = {
  access_token: string
  refresh_token: string
}

export default {
  User: {
    async posts(root: any) {
      let posts = await postModel.findAll({
        where: {
          user_id: root.id,
        },
      })
      return posts
    },
  },
  Post: {
    async hashtags(root: any) {
      const getHashtagsQuery = `SELECT hashtags.* FROM hashtags, posts_hashtags where hashtags.id = posts_hashtags.hashtag_id and posts_hashtags.post_id = :post_id`
      const getHashtagsValue = {
        post_id: root.id,
      }
      const hashtags = await sequelize.query(getHashtagsQuery, {
        replacements: getHashtagsValue,
      })
      return hashtags[0]
    },
    async comments(root: any) {
      let comments = await commentModel.findAll({
        where: {
          post_id: root.id,
        },
      })
      return comments
    },
    async writer(root: any) {
      let userInfo = await userModel.findOne({
        where: {
          id: root.user_id,
        },
      })
      return userInfo
    },
    async likes(root: any) {
      let likes = await likeModel.findAll({
        where: {
          post_id: root.id,
        },
      })
      return likes
    },
    async images(root: any) {
      let images = await imageModel.findAll({
        where: {
          post_id: root.id,
        },
      })
      return images
    },
  },
  Query: {
    async getUserInfo(_: any, args: { user_id: number }) {
      let userInfo = await userModel.findOne({
        where: {
          id: args.user_id,
        },
      })
      return userInfo
    },
  },
  Mutation: {
    async createUser(_: any, { email, password, nickname }: user) {
      if (!email || !password || !nickname) return status.WRONG_USER_INFO

      const { publicKey, privateKey }: any = await generateWallet(password)

      //인코딩
      const encryptedPrivateKey = aes256.encrypt(
        process.env.PRIVATE_KEY_SECRET,
        privateKey,
      )

      //유저가 회원가입하게 되면 aes256암호화를 통해 암호화됌
      let user = await userModel.create({
        email: email,
        password: password,
        nickname: nickname,
        account: publicKey,
        private_key: encryptedPrivateKey,
      })

      if (!user) {
        return status.WRONG_USER_INFO
      }

      return status.SUCCESS
    },
    //로그인시
    async login(_: any, args: user) {
      let user = await userModel.findOne({
        where: {
          email: args.email,
          password: args.password,
        },
      })
      if (!user) {
        return status.WRONG_USER_INFO
      }

      const jwt = require('jsonwebtoken')
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          account: user.account,
        },
        process.env.ACCESS_SECRET,
        { expiresIn: '1d' },
      )
      return { access_token: accessToken }
    },
  },
}
