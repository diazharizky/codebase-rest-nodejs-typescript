import pino from 'pino'
import config from 'config'

const logger = pino({
  name: config.get('app_name'),
  level: process.env.NODE_ENV === 'test' ? 'warn' : 'info',
  timestamp: () => {
    return `,"time":"${new Date().toISOString()}"`
  },
})

export default logger
