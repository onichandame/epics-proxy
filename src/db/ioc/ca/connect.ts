import { Channel } from 'epics'

export const connect = (pvname: string): Promise<Channel> => {
  return new Promise<Channel>((resolve, reject) => {
    const pv = new Channel(pvname)
    pv.connect(e => {
      if (e) {
        reject(e)
      } else {
        resolve(pv)
      }
    })
  })
    .then(pv => {
      console.log('hi')
      return pv
    })
}
