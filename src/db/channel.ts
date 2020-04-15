import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Channel {
  @Field()
  pvname: string

  @Field()
  value: string
}
