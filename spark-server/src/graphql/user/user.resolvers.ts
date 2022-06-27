import userModel from "../../models/user.model";
import {status} from "../../constants/code"

type user = {
  id:number,
  email:string,
  password:string,
  nickname:string,
  account:string,
  balance:string,
  private_key:string,
  created_at:string
}

type token = {
  access_token:string,
  refresh_token:string
}

export default {
    Mutation: {
      async createUser(_:any,args:user) {
        await userModel.create({ 
          email:args.email,
          password:args.password,
          nickname:args.nickname,
          account:args.account,
          private_key:args.private_key,
          balance:args.balance
        });
        return status.SUCCESS
      },
      async login(_:any, args:user){
        let user = await userModel.findOne({
          where: {
            email:args.email,
            password:args.password
          }
        })
        if(!user) {
          return status.WRONG_USER_INFO
        }

        const jwt = require('jsonwebtoken')
        const accessToken = jwt.sign({
          id:user.id,
          email:user.email,
          nickname:user.nickname,
          account:user.account,
          iat:new Date().getTime()/1000,
          exp:1485270000000
        }, process.env.ACCESS_SECRET)
        const refreshToken = jwt.sign({
          id:user.id,
          email:user.email,
          nickname:user.nickname,
          account:user.account
        }, process.env.REFRESH_SECRET)
        return {"access_token":accessToken, "refresh_token":refreshToken}
      }
    }
  };