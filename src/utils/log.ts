import pino from 'pino'
import config from 'config'

const nodeEnv = process.env.NODE_ENV

export default pino({
  name: config.get('app_name'),
  level: nodeEnv === 'test' ? 'warn' : 'info',
  enabled: nodeEnv !== 'test',
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
})
