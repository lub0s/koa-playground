import db from '../database'
import utils from '../utils'
import log from '../common/logger'


export default {

  async register(user) {
    log.info('Register hit! ', { user })
    const collection = db.get('users')

    const conflictUser = await collection.findOne({ email: user.email })

    if (conflictUser) {
      return {
        code: 409,
        message: 'User with this email already exists',
      }
    } else {
      user.password = await utils.crypto.hashPassword(user.password)
      return await collection.insert(user)
    }

  },

  getUsers() {
    return db.get('users').find()
  },

  getUser(userId) {
    return fromDb(db.get('users').findOne, { _id: userId })
  },
}

async function fromDb(fun, cond) {
  try {
    const result = await fun(cond)
    return result
  } catch (err) {
    return {
      code: 500,
      message: `Error occured, ${err}!`,
    }
  }
}
