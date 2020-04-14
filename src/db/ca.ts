import { Channel, Data } from 'epics'

const connect = (pvname: string): Promise<Channel> => {
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

export const caget = async (pvname: string): Promise<Data> => {
  const pv = await connect(pvname)
  return new Promise<Data>((resolve, reject) => {
    pv.get((e, d) => {
      if (e) {
        reject(e)
      } else {
        resolve(d)
      }
    })
  })
}

export const caput = async (pvname: string, value: Data): Promise<void> => {
  const pv = await connect(pvname)
  return new Promise<void>((resolve, reject) => {
    pv.put(value, e => {
      if (e) {
        reject(e)
      } else {
        resolve()
      }
    })
  })
}

export const camonitor = async (pvname: string): Promise<Channel> => {
  const pv = await connect(pvname)
  return pv.monitor()
}
