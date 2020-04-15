import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import { ChannelResolver } from './db/resolvers'

(async (): Promise<void> => {
  const PORT = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT)

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ChannelResolver]
    })
  })

  server.listen({
    port: PORT
  })
    .then(({ url }) => {
      console.log(`🚀 server ready at ${url}`)
    })
})()
