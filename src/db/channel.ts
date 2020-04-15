import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Channel {
  @Field()
  value: string
}
