import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import { Resolvers } from './resolver'

(async (): Promise<void> => {
  const PORT = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT)

  const server = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [...Resolvers]
    })
  })

  const { url } = await server.listen({ port: PORT })
  console.log(`🚀 server ready at ${url}`)
})()
