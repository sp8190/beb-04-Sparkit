import express from 'express';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { sequelize } from "./models";
import 'reflect-metadata';

const resolvers = require('./graphql/resolvers/index').resolvers
const typeDefs = require('./graphql/typeDefs/index').typeDefs

require('dotenv').config();

const SPARK_IT_SERVER_PORT = 4000
// 각 index에서 머지한 resolver, typeDefs 가져오기
const app = express();
const httpServer = http.createServer(app)
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

async function initApolloServer() {
    await apolloServer.start()
    // apollo server에 express 연동
    apolloServer.applyMiddleware({app})
    await new Promise<void>(resolve => httpServer.listen({ port: SPARK_IT_SERVER_PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${SPARK_IT_SERVER_PORT}${apolloServer.graphqlPath}`);
    //DB 싱크
    await sequelize
        .sync({ force: false }) // force:true 로 변경시 서버 재시작 할 때마다 테이블 삭제
        .then(async () => {
            console.log("seq connection success");
        })
        .catch((e:any) => {
            console.log("seq ERROR: ", e);
        });
}

initApolloServer()