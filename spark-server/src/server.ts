import express from 'express';
import dotenv from 'dotenv'
import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server-express';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import { sequelize } from "./models";
import user from "./models/user.model";

dotenv.config();

const typeDefs = gql`
  type User {
    email:String!
    nickname:String!
    publicKey:String!
    privateKey:String!
  }
  type Query {
    ping: String
  }
  type Mutation {
    createUser(email:String!, nickname:String!, publicKey:String!, privateKey:String!):Boolean!
  }
`;

export const resolvers = {
  Query: {
    ping: () => '👋 pong! 👋',
  },
  Mutation: {
    async createUser(_:any,args:{email:string, nickname:string, publicKey:string, privateKey:string}) {
      await user.create({ 
        email:args.email,
        nickname:args.nickname,
        public_key:args.publicKey,
        private_key:args.privateKey
      });
      console.log(`email: ${args.email}, nickname: ${args.nickname}, publicKey:${args.publicKey}, privateKey:${args.privateKey}`)
      return true
    },
  }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

const app = express();
const httpServer = http.createServer(app)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function initApolloServer() {
    await apolloServer.start()
    apolloServer.applyMiddleware({app})
    await new Promise<void>(resolve => httpServer.listen({ port: "4000" }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    await sequelize
        .sync({ force: false })
        .then(async () => {
            console.log("seq connection success");
        })
        .catch((e:any) => {
            console.log("seq ERROR: ", e);
        });
}

initApolloServer()