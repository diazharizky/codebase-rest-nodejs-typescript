import os from 'os'
import cluster from 'cluster'
import config from 'config'
import app from '../app'
import log from '../src/utils/log'

const clusterWorkerSize = os.cpus().length
const listenPort: number = config.get('listen_port')
const listenHost: string = config.get('listen_host')
const backlogNumber: number = 511

const start = () => {
  // since v16.0.0 `isMaster` was deprecated, use `isPrimary` instead
  if (!cluster.isMaster || clusterWorkerSize <= 1) {
    app.listen(listenPort, listenHost, backlogNumber, () => {
      log.info({ msg: 'App started!', host: listenHost, port: listenPort })
    })
  } else {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork()
    }
    cluster.on('exit', (worker) => {
      log.info({ msg: `Worker ${worker.id} has exitted.` })
    })
  }
}

export default start()
