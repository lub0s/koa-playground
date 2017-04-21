/* eslint-disable no-process-env */

const pkg = require('../../package')

module.exports = {
  appName: 'koa-simple',
  version: pkg.version,
  server: {
    concurrency: process.env.WEB_CONCURRENCY || 1,
    port: process.env.PORT || 3000,
    maxMemory: process.env.WEB_MEMORY || 512,
    killTimeout: 3000,
  },
  auth: {
    pepper: process.env.PEPPER || 'mEOLaKAkgnr0z/IzS9bju4xquOk',
    saltRounds: 10,
    resetPasswordTokenLength: 20,
    tokenExpiration: 2 * 60 * 60, // 2 hours (in seconds)
  },
  database: {
    options: {
      dialectOptions: {
        ssl: true,
      },
      logging: false,
    },
    connectionString: process.env.DATABASE_URL
      || 'postgres://postgres@localhost:5432/koa-database',
  },
  logging: {
    stdout: {
      enabled: true,
      level: 'debug',
    },
  },
}
