const {merge} = require('lodash')

const User = require('./user')
const Post = require('./post')

const typeDefs = merge (
    User.typeDefs,
    Post.typeDefs
)

export {typeDefs}