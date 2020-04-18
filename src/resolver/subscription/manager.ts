import { CA } from 'epics-ioc-connection'
import { PubSub } from 'apollo-server'

import { manager } from '../connection'

export const pubsub = new PubSub()

const subscriptions = new Map<string, number>()

export const add = async (pvname: string): Promise<CA.Channel> => {
  if (!subscriptions.has(pvname)) {
    subscriptions.set(pvname, subscriptions.get(pvname) + 1)
    await manager.add(pvname)
  }
  return manager.get(pvname)
}

export const remove = async (pvname: string): Promise<void> => {
  if (subscriptions.has(pvname)) {
    await manager.remove(pvname)
    subscriptions.set(pvname, subscriptions.get(pvname) - 1)
    if (subscriptions.get(pvname) < 1) {
      subscriptions.delete(pvname)
    }
  }
}
