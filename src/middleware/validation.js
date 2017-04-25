import joi from 'joi'
import Promise from 'bluebird'
import { Either } from 'ramda-fantasy'

const errors = require('../common/errors')
const success = require('../common/successes')

const error = Either.Left
const value = Either.Right

export default {

  validateBody(schema) {
    return async (ctx, middleware) => {

      try {
        const res = await Promise.fromCallback(done => joi.validate(ctx.request.body, schema, done))
        ctx.request.validatedBody = new value(new success.Ok(res))
      } catch (err) {
        ctx.request.validatedBody = new error(new errors.ValidationError())
      }

      await middleware()
    }
  },
}
