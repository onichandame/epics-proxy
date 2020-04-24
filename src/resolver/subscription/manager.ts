import { CA } from 'epics-ioc-connection'

import { manager } from '../connection'

const subscriptions = new Map<string, number>()

export const add = async (pvname: string): Promise<CA.Channel> => {
  if (!subscriptions.has(pvname)) {
    await manager.add(pvname)
    subscriptions.set(pvname, 0)
  }
  subscriptions.set(pvname, subscriptions.get(pvname) + 1)
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
