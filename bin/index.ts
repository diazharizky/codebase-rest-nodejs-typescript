import os from 'os'
import cluster from 'cluster'
import config from 'config'
import app from '../app'
import log from '../src/utils/log'

const clusterWorkerSize = os.cpus().length
const listenPort: number = config.get('listen_port')
const listenHost: string = config.get('listen_host')

const start = () => {
  if (!cluster.isPrimary || clusterWorkerSize <= 1) {
    app.listen(listenPort, listenHost, 50, () => {
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
