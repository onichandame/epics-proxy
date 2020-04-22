import { CA } from 'epics-ioc-connection'
import { PubSub } from 'apollo-server'

import { camonitor } from './ca'

export const pubsub = new PubSub()

const channels = new Map<string, {
  channel: CA.Channel;
  connections: number;
}>()

export const add = async (pvname: string): Promise<CA.Channel> => {
  let channel: CA.Channel
  try {
    channel = await camonitor(pvname)
  } catch (e) {
    pubsub.publish(pvname, e)
    throw e
  }
  if (!channels.has(pvname)) {
    channels.set(pvname, {
      channel,
      connections: 0
    })
    channels.get(pvname).channel.on('value', data => pubsub.publish(pvname, data))
  }
  return channel
}

export const get = async (pvname: string): Promise<CA.Channel> => {
  if (channels.has(pvname)) {
    return channels.get(pvname).channel
  } else {
    throw new Error(`connection ${pvname} not found`)
  }
}

export const remove = async (pvname: string): Promise<void> => {
  if (channels.has(pvname)) {
    const con = channels.get(pvname)
    con.connections -= 1
    if (con.connections < 1) {
      await con.channel.disconnect()
      channels.delete(pvname)
    }
  }
}
