import { CA } from 'epics-ioc-connection'

export const caput = async (pvname: string, value: CA.Value): ReturnType<typeof CA.put> => CA.put(pvname, value)
