import { createLogger, transports } from 'winston'

export const logger = createLogger({
  transports: [
    new transports.Console()
  ]
})

export default logger
