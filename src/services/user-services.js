import db from '../database'
import utils from '../utils'
import { Either } from 'ramda-fantasy'

const success = require('../common/successes')
const errors = require('../common/errors')

const error = Either.Left
const value = Either.Right

const usersCollectionName = 'users'

export default {

  async register(user) {

    const collection = db.get(usersCollectionName)

    const conflictUser = await collection.findOne({ email: user.email })

    if (conflictUser) {
      return new error(new errors.ConflictError())
    }

    user.password = await utils.crypto.hashPassword(user.password)
    const inserted = await collection.insert(user)
    return new value(new success.Created(inserted))
  },

  getUsers() {
    return db.get(usersCollectionName).find()
  },

  getUser(userId) {
    return fromDb(db.get(usersCollectionName).findOne, { _id: userId })
  },
}

async function fromDb(fun, cond) {
  try {
    const result = await fun(cond)
    return new value(new success.Ok(result))
  } catch (err) {
    return new error(new errors.InternalServerError())
  }
}
