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
    Query: {
      async getUserInfo(_:any, args:{user_id:number}) {
        let userInfo = await userModel.findOne({
          where:{
            id:args.user_id
          }
        })
        return userInfo
      }
    },
    Mutation: {
      async createUser(_:any,args:user) {
        let user = await userModel.create({ 
          email:args.email,
          password:args.password,
          nickname:args.nickname,
          account:args.account,
          private_key:args.private_key
        });
        //TODO: 테스트용 코드 -> 차후 성공 시 200 리턴으로 수정 예정
        // return status.SUCCESS
        let userId = user.id
        console.log("userId", userId)
        return userId
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