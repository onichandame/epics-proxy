import { connect } from './connect'

export const caget = async (pvname: string): Promise<string> => {
  const pv = await connect(pvname)
  return new Promise<string>((resolve, reject) => {
    pv.get((e, d) => {
      if (e) {
        reject(e)
      } else {
        resolve(d.toString())
      }
    })
      .disconnect()
  })
}
