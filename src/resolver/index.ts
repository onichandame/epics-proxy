import { Field, Resolver, Query, Mutation, Subscription, Args, ArgsType, Root } from 'type-graphql'

import { logger } from '../logger'
import { get, put, manager as con } from './connection'
import { Channel } from './channel'
import { manager as sub } from './subscription'
import { withClose } from './utils'

@ArgsType()
class PutArgs {
  @Field(() => String)
  pvname: string

  @Field(() => String)
  value: string
}

@ArgsType()
class GetArgs {
  @Field(() => String)
  pvname: string
}

@Resolver(() => Channel)
export class CAGetResolver {
  @Query(() => Channel)
  async ca (@Args(){ pvname }: GetArgs) {
    try {
      const value = await get(pvname)
      logger.info(`caget ${pvname} read`)
      return { value }
    } catch (e) {
      logger.info(`caget ${pvname} failed due to ${e}`)
      throw e
    }
  }
}

@Resolver(() => Channel)
export class CAPutResolver {
  @Mutation(() => Boolean)
  async ca (@Args(){ pvname, value }: PutArgs) {
    try {
      await put(pvname, value)
      logger.info(`caput ${pvname} ${value} success`)
      return true
    } catch (e) {
      logger.info(`caput ${pvname} ${value} failed due to ${e}`)
      return false
    }
  }
}

@Resolver(() => Channel)
export class CAMonitorResolver {
  @Subscription({
    subscribe: (_, { pvname }: GetArgs, context) => {
      const itr = con.pubsub.asyncIterator(pvname)
      try {
        sub.add(pvname)
          .catch(e => console.log(e))
        logger.info(`camonitor ${pvname} created`)
        return withClose(itr, () => sub.remove(pvname))
      } catch (e) {
        logger.info(`camonitor ${pvname} failed creation`)
      }
    }
  })
  ca (@Args() _: GetArgs, @Root() value: Channel['value']): Channel {
    return {
      value
    }
  }
}

export const Resolvers = [CAGetResolver, CAPutResolver, CAMonitorResolver]
