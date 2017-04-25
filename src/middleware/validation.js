import joi from 'joi'
import Promise from 'bluebird'
const log = require('../common/logger')
const errors = require('../common/errors')

export default {

  validateBody(schema) {
    return async (ctx, middleware) => {

      try {
        ctx.request.validatedBody = await Promise.fromCallback(done => joi.validate(ctx.request.body, schema, done))
      } catch (err) {
        log.warn(err, 'Request validation error.')
        ctx.request.validatedBody = new errors.ValidationError()
      }

      await middleware()
    }
  },
}
