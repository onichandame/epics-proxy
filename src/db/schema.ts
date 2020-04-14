import { gql } from 'apollo-server'

export const typeDefs = gql`
type Channel{
  pvname: String!
  value: String!
}
type Query{
  caget(pvname:String!): Channel!
}
type Mutation{
  caput(pvname:String!, value:String!): Boolean!
}
type Subscription{
  camonitor(pvname:String!): Channel!
}
`
