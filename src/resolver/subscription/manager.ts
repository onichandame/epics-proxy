import { CA } from 'epics-ioc-connection'

import { logger } from '../../logger'
import { manager } from '../connection'

const subscriptions = new Map<string, number>()

// need to manipulate count before running async function
export const add = (pvname: string): Promise<CA.Channel> => {
  if (!subscriptions.has(pvname)) {
    subscriptions.set(pvname, 0)
  }
  subscriptions.set(pvname, subscriptions.get(pvname) + 1)
  return manager.add(pvname)
    .then(() => logger.info(`pvname ${pvname} added subscription. current subscription ${subscriptions.get(pvname)}`))
    .catch(e => {
      logger.error(`pvname ${pvname} failed adding subscription`)
      subscriptions.set(pvname, subscriptions.get(pvname) - 1)
      throw e
    })
    .then(() => manager.get(pvname))
}

// need to manipulate count before running async function
export const remove = (pvname: string): Promise<void> => {
  if (!subscriptions.has(pvname)) {
    logger.warn(`pvname ${pvname} has not been monitored`)
    return Promise.resolve()
  } else {
    subscriptions.set(pvname, subscriptions.get(pvname) - 1)
    if (subscriptions.get(pvname) < 1) {
      subscriptions.delete(pvname)
    }

    return manager.remove(pvname)
      .catch(e => {
        logger.error(`pvname ${pvname} failed remove subscription`)
        throw e
      })
      .then(() => {
        logger.info(`pvname ${pvname} removed subscription. current subscription ${subscriptions.get(pvname)}`)
      })
  }
}
