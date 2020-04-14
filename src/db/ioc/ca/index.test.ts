import { caget, caput, connect } from '.'

describe('ca', () => {
  test('exports all functions', () => {
    expect(caget).toBeTruthy()
    expect(caput).toBeTruthy()
    expect(connect).toBeTruthy()
    expect(typeof caget).toEqual('function')
    expect(typeof caput).toEqual('function')
    expect(typeof connect).toEqual('function')
  })
})
