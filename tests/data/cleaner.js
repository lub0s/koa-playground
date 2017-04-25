const db = require('../../src/database')

exports.resetDb = function resetDb() {
  return db.get('users').drop()
}
