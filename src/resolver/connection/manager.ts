import { CA } from 'epics-ioc-connection'
import { PubSub } from 'apollo-server'

import { logger } from '../../logger'
import { camonitor } from './ca'

export const pubsub = new PubSub()

const channels = new Map<string, {
  channel: CA.Channel;
  connections: number;
}>()

export const get = async (pvname: string): Promise<CA.Channel> => {
  if (channels.has(pvname)) {
    return channels.get(pvname).channel
  } else {
    throw new Error(`connection ${pvname} not found`)
  }
}

export const add = async (pvname: string): Promise<CA.Channel> => {
  let channel: CA.Channel
  try {
  // catch connection error
    try {
      channel = await camonitor(pvname)
    } catch (e) {
      pubsub.publish(pvname, e)
      throw e
    }
    // add subscription to ioc on the first connection
    if (!channels.has(pvname)) {
      channels.set(pvname, {
        channel,
        connections: 0
      })
      channels.get(pvname).channel.on('value', data => pubsub.publish(pvname, data))
    }
    // add one to the connection count
    channels.set(pvname, {
      channel: await get(pvname),
      connections: channels.get(pvname).connections + 1
    })
    logger.info(`pvname ${pvname} added connection. current connection ${channels.get(pvname).connections}`)
    return channel
  } catch (e) {
    logger.error(`pvname ${pvname} failed add connection`)
  }
}

export const remove = async (pvname: string): Promise<void> => {
  try {
    if (channels.has(pvname)) {
      const con = channels.get(pvname)
      con.connections -= 1
      logger.info(`pvname ${pvname} removed connection. current connections ${channels.get(pvname).connections}`)
      if (con.connections < 1) {
        // need to delete before running async function to avoid race condition
        channels.delete(pvname)
        await con.channel.disconnect()
      }
    } else {
      logger.warn(`pvname ${pvname} does not have connection`)
    }
  } catch (e) {
    logger.error(`pvname ${pvname} failed removing connection due to ${e}`)
    throw e
  }
}
