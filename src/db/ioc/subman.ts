const channels = new Map<string, number>()

export const add = (pvname: string) => {
  if (!channels.has(pvname)) {
    channels.set(pvname, 0)
  }
  channels.set(pvname, channels.get(pvname) + 1)
}

export const remove = (pvname: string) => {
}
