import { connect } from './connect'

export const caput = async (pvname: string, value: string): Promise<void> => {
  const pv = await connect(pvname)
  return new Promise<void>((resolve, reject) => {
    pv.put(value, e => {
      if (e) {
        reject(e)
      } else {
        resolve()
      }
      pv.disconnect()
    })
  })
}
