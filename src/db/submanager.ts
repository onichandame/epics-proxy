import { Channel } from 'epics'
import { PubSub } from 'apollo-server'

import { addCon, removeCon } from './ioc'

export const pubsub = new PubSub()

const subscriptions = new Map<string, {
  channel: Channel;
  subscriptions: number;
}>()

export const addSub = async (pvname: string): Promise<void> => {
  if (!subscriptions.has(pvname)) {
    subscriptions.set(pvname, { channel: await addCon(pvname), subscriptions: 0 })
    subscriptions.get(pvname).channel.on('value', data => {
      pubsub.publish(pvname, data.toString())
    })
  }
}

export const removeSub = async (pvname: string): Promise<void> => {
  if (subscriptions.has(pvname)) {
    removeCon(pvname)
    if (subscriptions.get(pvname).subscriptions < 1) {
      subscriptions.get(pvname).channel.disconnect()
      subscriptions.delete(pvname)
    }
  }
}
