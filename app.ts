import config from 'config'
import express from 'express'
import 'express-async-errors'
import routes from './src/routes/router'
import catchMiddleware from './src/routes/middlewares/catch'
import log from './src/utils/log'

const listenPort: number = config.get('listen_port')
const listenHost: string = config.get('listen_host')
const app = express()

export default () => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(routes)
  app.use(catchMiddleware())
  app.listen(listenPort, listenHost, () =>
    log.info({ msg: 'app_server', host: listenHost, port: listenPort })
  )
}
