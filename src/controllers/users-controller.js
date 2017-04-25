import compose from 'koa-compose'
import middleware from '../middleware'
import schema from '../validation/schema'
import userService from '../services/user-services'
import * as R from 'ramda'
import { Either } from 'ramda-fantasy'

const foldEither = Either.either
const success = require('../common/successes')


const successResponse = R.curry((koa, succ) => {
  koa.status = succ.status
  koa.body = succ.body
})

const errorResponse = R.curry((koa, error) => {
  koa.status = error.status
  koa.body = { error: error.message }
})

const fold = (koa, result) => {
  foldEither(errorResponse(koa), successResponse(koa))(result)
}

export default {

  register: compose([
    middleware.validation.validateBody(schema.users.register),
    async ctx => {

      const body = ctx.request.validatedBody

      const databaseResult = await body.chain(inn => userService.register(inn.body))

      fold(ctx, databaseResult)
    },
  ]),

  async getUsers(koa) {
    const result = await userService.getUsers()
    successResponse(koa, new success.Ok({ users: result }))
  },

  async getUser(koa) {
    const findResult = await userService.getUser(koa.params.id)
    fold(koa, findResult)
  },
}
