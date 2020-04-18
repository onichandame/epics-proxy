import { CA } from 'epics-ioc-connection'

export const caget = async (pvname: string): ReturnType<typeof CA.get> => CA.get(pvname)
