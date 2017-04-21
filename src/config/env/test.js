/* eslint-disable no-process-env */

module.exports = {
  logging: {
    stdout: {
      enabled: true,
      level: 'error',
    },
  },
  database: {
    options: {
      dialectOptions: {
        ssl: false,
      },
      logging: false,
    },
    connectionString: process.env.DATABASE_URL_TEST
      || 'postgres://postgres@localhost:5432/koa-database-test',
  },
}
