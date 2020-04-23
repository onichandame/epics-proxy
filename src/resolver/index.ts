import { Field, Resolver, Query, Mutation, Subscription, Args, ArgsType, Root } from 'type-graphql'

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
    const value = await get(pvname)
    return { value }
  }
}

@Resolver(() => Channel)
export class CAPutResolver {
  @Mutation(() => Boolean)
  async ca (@Args(){ pvname, value }: PutArgs) {
    try {
      await put(pvname, value)
      return true
    } catch (e) {
      return false
    }
  }
}

@Resolver(() => Channel)
export class CAMonitorResolver {
  @Subscription({
    subscribe: (_, { pvname }: GetArgs, context) => {
      const itr = con.pubsub.asyncIterator(pvname)
      sub.add(pvname)
        .catch(e => console.log(e))
      return withClose(itr, () => sub.remove(pvname))
    }
  })
  ca (@Args() _: GetArgs, @Root() value: Channel['value']): Channel {
    return {
      value
    }
  }
}

export const Resolvers = [CAGetResolver, CAPutResolver, CAMonitorResolver]
