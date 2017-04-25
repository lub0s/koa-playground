import Koa from 'koa'
import koaBody from 'koa-body'
import koaCompress from 'koa-compress'
import koaCors from 'kcors'
import routes from './routes/index'
import db from './database'

const log = require('./common/logger')
const config = require('./config')
const cluster = require('cluster')
const timeout = require('koa-timeout-v2')

const app = new Koa()

app.use(koaCompress())
app.use(koaBody({ multipart: true }))
app.use(koaCors({ origin: '*' }))
app.use(timeout(10000, { status: 408, message: 'Service timeout' }))

app.use(routes)

app.start = () => {
  log.info('Starting server ...')
  app.server = app.listen(config.server.port, () => {
    log.info(`==> 🌎  Server listening on port ${config.server.port}.`)
  })
}

app.stop = () => {
  if (!app.server) {
    log.warn('Server not initialized yet.')
    return
  }

  log.info('Closing database connections.')
  db.close()

  log.info('Stopping server ...')
  app.server.close(() => {
    log.info('Server stopped.')
  })
}

app.on('error', err => log.error(err, 'Unhandled application error.'))

// Something can go terribly wrong, keep track of that
process.on('uncaughtException', fatal)
process.on('unhandledRejection', fatal)

function fatal(err) {
  process.removeAllListeners('uncaughtException')
  process.removeAllListeners('unhandledRejection')

  log.fatal(err, 'Fatal error occurred. Exiting the app.')

  // If the server does not terminate itself in a specific time, just kill it
  setTimeout(() => {
    throw err
  }, 5000).unref()
}

function stopApp() {

  // Do call app stop multiple times if another terminating signal appears
  process.removeListener('SIGINT', stopApp)
  process.removeListener('SIGTERM', stopApp)

  // Start stop procedure
  app.stop()
}

// If app was executed directly through node command or in a worker process
if (require.main === module || cluster.isWorker) {
  app.start()

  process.once('SIGINT', stopApp)
  process.once('SIGTERM', stopApp)
}


export default app
