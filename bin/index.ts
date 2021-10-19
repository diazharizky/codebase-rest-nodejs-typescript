import os from 'os'
import cluster from 'cluster'
import config from 'config'
import express from 'express'
import { AggregatorRegistry } from 'prom-client'
import app from '../app'
import log from '../src/utils/log'

const clusterSize = os.cpus().length

const start = () => {
  // since v16.0.0 `isMaster` was deprecated, use `isPrimary` instead
  if (!cluster.isMaster) {
    app()
  } else {
    for (let i = 0; i < clusterSize; i++) {
      cluster.fork()
    }
    cluster.on('exit', (worker) =>
      log.info({ msg: `Worker ${worker.id} has exitted.` })
    )

    const metricsServer = express()
    const aggRegistry = new AggregatorRegistry()
    const listenHost: string = config.get('listen_host')
    const metricsPort: number = config.get('metrics_port')

    metricsServer.get('/metrics', async (_, res) => {
      try {
        res.set('Content-Type', aggRegistry.contentType)
        res.send(await aggRegistry.clusterMetrics())
      } catch (err) {
        res.statusCode = 500
        if (err instanceof Error) {
          return res.send(err.message)
        }
        res.send('Error happened.')
      }
    })

    metricsServer.listen(metricsPort, listenHost, () =>
      log.info({ msg: 'metrics_server', host: listenHost, port: metricsPort })
    )
  }
}

export default start()
