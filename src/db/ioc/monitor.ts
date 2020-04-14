import { Channel } from 'epics'
import { PubSub } from 'apollo-server'

import { connect } from './ca'
import withClose from '../utils/withClose'

const pubsub = new PubSub()

const channels = new Map<string, {
  channel: Channel;
  connections: number;
}>()

const unmonitor = (pvname: string): Promise<void> => {
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

export const monitor = async (pvname: string): Promise<ReturnType<PubSub['asyncIterator']>> => {
  if (!channels.has(pvname)) {
    channels.set(pvname, {
      channel: await connect(pvname),
      connections: 0
    })
    channels.get(pvname).channel.on('value', value => pubsub.publish(pvname, value))
  }
  return withClose(pubsub.asyncIterator([pvname]), () => {
    unmonitor(pvname)
  })
}

export default monitor
