import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Channel {
  @Field({ nullable: false })
  pvname: string

  @Field({ nullable: false })
  value: string
}

