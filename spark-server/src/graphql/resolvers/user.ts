import userModel from "../../models/user.model";

type user = {
  email:string,
  nickname:string,
  publicKey:string,
  privateKey:string
}

const resolver = {
    Query: {
        hi: () => 'hello!'
    }, 
    Mutation: {
      async createUser(_:any,args:user) {
        await userModel.create({ 
          email:args.email,
          nickname:args.nickname,
          public_key:args.publicKey,
          private_key:args.privateKey
        });
        return true
      }
    }
  };

export {resolver, user}