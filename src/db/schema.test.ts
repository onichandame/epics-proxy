import { typeDefs as Subject } from './schema'

describe('schema', () => {
  test('returns gql', () => {
    expect(typeof Subject).toEqual('object')
  })
})
