import { Field, Resolver, Query, Mutation, Subscription, Args, ArgsType, Root } from 'type-graphql'

import { get, put } from './connection'
import { Channel } from './channel'
import { manager } from './subscription'
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
export class ChannelResolver {
  @Query(() => Channel)
  async caget (@Args(){ pvname }: GetArgs) {
    const value = await get(pvname)
    return { value }
  }

  @Mutation(() => Boolean)
  async caput (@Args(){ pvname, value }: PutArgs) {
    try {
      await put(pvname, value)
      return true
    } catch (e) {
      return false
    }
  }

  @Subscription({
    subscribe: ({ args }) => {
      const itr = manager.pubsub.asyncIterator(args.pvname)
      manager.add(args.pvname)
      withClose(itr, () => manager.remove(args.pvname))
      return itr
    }
  })
  camonitor (@Root() value: Channel['value']): Channel {
    return {
      value
    }
  }
}
