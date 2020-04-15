import { Channel } from 'epics'

import { connect } from './ca'

const channels = new Map<string, {
  channel: Channel;
  connections: number;
}>()

export const removeCon = (pvname: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (channels.has(pvname)) {
      channels.get(pvname).channel.disconnect(err => {
        if (err) {
          console.log(err)
          reject(err)
        }
        channels.delete(pvname)
        resolve()
      })
    } else {
      resolve()
    }
  })
}

export const addCon = async (pvname: string): Promise<Channel> => {
  if (!channels.has(pvname)) {
    channels.set(pvname, {
      channel: await connect(pvname),
      connections: 0
    })
  }
  return channels.get(pvname).channel
}

export default monitor
