import { CA } from 'epics-ioc-connection'

export const camonitor = async (pvname: string): Promise<CA.Channel> => {
  const channel = await CA.connect(pvname)
  await channel.monitor()
  return channel
}
