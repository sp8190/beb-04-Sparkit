import userModel from '../../models/user.model'
import { status } from '../../constants/code'
import {generateWallet} from '../../utils/wallet'
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
      const encryptedPrivateKey = aes256.encrypt(process.env.PRIVATE_KEY_SECRET, privateKey)

      //유저가 회원가입하게 되면 aes256암호화를 통해 암호화됌
      let user = await userModel.create({
        email: email,
        password: password,
        nickname: nickname,
        account: publicKey,
        private_key: encryptedPrivateKey
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
          account: user.account
        },
        process.env.ACCESS_SECRET,
        {expiresIn:'1d'}
      )
      return { "access_token": accessToken}
    },
  },
}
