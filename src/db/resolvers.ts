import { PubSub } from 'apollo-server'

import { get, put, removeCon, addCon } from './ioc'
import { Resolvers } from './types/graphql'

import { withClose } from './utils'

const pubsub = new PubSub()

export const resolvers: Resolvers = {
  Query: {
    caget: async (_, args) => {
      const { pvname } = args
      const value = await get(pvname)
      return { pvname, value }
    }
  },
  Mutation: {
    caput: async (_, args) => {
      const { pvname, value } = args
      try {
        await put(pvname, value)
        return true
      } catch (e) {
        return false
      }
    }
  },
  Subscription: {
    camonitor: {
      subscribe: async (_, args): Promise<AsyncIterator<{pvname: string;value: string}>> => {
        const { pvname } = args
        const pv = await addCon(pvname)
        pv.on('value', data => pubsub.publish(pvname, data))
        const itr = pubsub.asyncIterator<{pvname: string; value: string}>([pvname])
        itr.return = value => {
          return value || { value: undefined, done: true }
        }
        return Promise.resolve(itr)
      }
    }
  }
}
