import compose from 'koa-compose'
import middleware from '../middleware'
import schema from '../validation/schema'
import userService from '../services/user-services'
import log from '../common/logger'
import * as R from 'ramda'
import { Either } from 'ramda-fantasy'

const foldEither = Either.either

const created = R.curry((koa, value) => {
  koa.status = 201
  koa.body = value
})

const errorResponse = R.curry((koa, error) => {
  koa.status = error.code
  koa.body = { error: error.message }
})

export default {

  register: compose([
    middleware.validation.validateBody(schema.users.register),
    async ctx => {

      const body = ctx.request.validatedBody

      const databaseResult = await body.chain(userService.register)

      foldEither(errorResponse(ctx), created(ctx))(databaseResult)
    },
  ]),

  async getUsers(coa) {
    log.info('Get users route hit.')
    const users = await userService.getUsers()
    log.info({ users }, 'Users returned.')
    coa.status = 200
    coa.body = { users }
  },

  async getUser(koa) {
    const findResult = await userService.getUser(koa.params.id)
    foldEither(errorResponse(koa), created(koa))(findResult)
  },
}
