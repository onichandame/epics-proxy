import { Channel } from 'epics'

export const connect = (pvname: string): Promise<Channel> => {
  return new Promise<Channel>((resolve, reject) => {
    const pv = new Channel(pvname)
      .connect(e => {
        if (e) {
          reject(e)
        } else {
          resolve(pv)
        }
      })
  })
}
