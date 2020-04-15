import { Field, Resolver, Query, Mutation, Subscription, Args, ArgsType, Root } from 'type-graphql'

import { get, put } from './ioc'
import { Channel } from './channel'
import { pubsub, addSub, removeSub } from './submanager'
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
    console.log('calling get')
    const value = await get(pvname)
    console.log('called get')
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
      const itr = pubsub.asyncIterator(args.pvname)
      addSub(args.pvname)
      withClose(itr, () => removeSub(args.pvname))
      return itr
    }
  })
  camonitor (@Root() value: Channel['value']): Channel {
    return {
      value
    }
  }
}
