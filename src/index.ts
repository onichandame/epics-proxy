import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import { logger } from './logger'
import { Resolvers } from './resolver'

(async (): Promise<void> => {
  const PORT = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT)

  const server = new ApolloServer({
    subscriptions: {
      path: '/'
    },
    schema: await buildSchema({
      validate: false,
      resolvers: [...Resolvers]
    })
  })

  const { url, subscriptionsUrl } = await server.listen({ port: PORT })
  logger.info(`🚀 server ready at ${url}`)
  logger.info(`🚀 subscriptions ready at ${subscriptionsUrl}`)
})()
