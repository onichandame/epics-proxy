import { caget, caput, camonitor } from '.'

describe('ca', () => {
  test('exports all functions', () => {
    expect(caget).toBeTruthy()
    expect(caput).toBeTruthy()
    expect(camonitor).toBeTruthy()
    expect(typeof caget).toEqual('function')
    expect(typeof caput).toEqual('function')
    expect(typeof camonitor).toEqual('function')
  })
})
