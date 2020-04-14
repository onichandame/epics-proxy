import { PubSub } from 'apollo-server'

import { get, put, monitor } from './ioc'

export const resolvers = {
  Query: {
    async caget (pvname: string): Promise<string> {
      return get(pvname)
    }
  },
  Mutation: {
    async caput (pvname: string, value: string): Promise<boolean> {
      return put(pvname, value)
        .then(() => true)
        .catch(() => false)
    }
  },
  Subscription: {
    camonitor: {
      subscribe: (pvname: string): Promise<ReturnType<PubSub['asyncIterator']>> => monitor(pvname)
    }
  }
}
