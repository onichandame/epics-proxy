import { Data } from 'epics'
import { PubSub } from 'apollo-server'

import { caget, caput, camonitor } from './ca'

const pubsub = new PubSub()

export const resolvers = {
  Query: {
    async caget (pvname: string): Promise<Data> {
      return caget(pvname)
    }
  },
  Mutation: {
    async caput (pvname: string, value: string): Promise<boolean> {
      return caput(pvname, value)
        .then(() => true)
        .catch(() => false)
    }
  },
  Subscription: {
    camonitor: {
      subscribe: (pvname: string) => pubsub.asyncIterator([pvname])
    }
  }
}
const pv = await camonitor(pvname)
pv.on('value', value => pubsub.publish(pvname, { pvname, value }))
