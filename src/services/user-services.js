import db from '../database'
import utils from '../utils'

import { Either } from 'ramda-fantasy'

const error = Either.Left
const value = Either.Right

export default {

  async register(user) {

    const collection = db.get('users')

    const conflictUser = await collection.findOne({ email: user.email })

    if (conflictUser) {
      return new error({
        code: 409,
        message: 'User with this email already exists',
      })
    }

    const hashed = await utils.crypto.hashPassword(user.password)
    user.password = hashed
    const inserted = await collection.insert(user)
    return new value(inserted)
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
    return new value(result)
  } catch (err) {
    return new error({
      code: 500,
      message: `Error occured, ${err}!`,
    })
  }
}
