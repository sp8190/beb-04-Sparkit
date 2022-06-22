const {merge} = require('lodash')

const User = require('./user')
const Post = require('./post')

const resolvers = merge(
  User.resolver,
  Post.resolver
)

export {resolvers}