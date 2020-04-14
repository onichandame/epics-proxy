import { ApolloServer } from 'apollo-server'

import { typeDefs } from './db/schema'
import { resolvers } from './db/resolvers'

const PORT = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT)

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({
  port: PORT
})
  .then(({ url }) => {
    console.log(`🚀 server ready at ${url}`)
  })
