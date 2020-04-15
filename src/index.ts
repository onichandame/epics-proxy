import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import { ChannelResolver } from './db/resolvers'

(async (): Promise<void> => {
  const PORT = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT)

  const server = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [ChannelResolver]
    })
  })

  const { url } = await server.listen({ port: PORT })
  console.log(`🚀 server ready at ${url}`)
})()
