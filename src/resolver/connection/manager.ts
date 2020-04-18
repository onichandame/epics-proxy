import { CA } from 'epics-ioc-connection'

import { camonitor } from './ca'

const channels = new Map<string, {
  channel: CA.Channel;
  connections: number;
}>()

export const add = async (pvname: string): Promise<CA.Channel> => {
  if (!channels.has(pvname)) {
    channels.set(pvname, {
      channel: await camonitor(pvname),
      connections: 0
    })
  }
  return channels.get(pvname).channel
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
