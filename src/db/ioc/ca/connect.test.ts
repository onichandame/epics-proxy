import { Channel } from 'epics'

import { connect as Subject } from './connect'

const mockConnect = jest.fn()

jest.mock('epics', () => ({
  Channel: jest.fn().mockImplementation(() => {
    return {
      connect: mockConnect
    }
  })
}))

describe('caconnect', () => {
  test('returns object with correct functions', () => {
    expect(typeof Subject).toEqual('function')
    Subject('')
    expect(Channel).toHaveBeenCalledTimes(1)
    expect(mockConnect).toHaveBeenCalledTimes(1)
  })
})
