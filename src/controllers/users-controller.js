import compose from 'koa-compose'
import middleware from '../middleware'
import schema from '../validation/schema'
import userService from '../services/user-services'
import log from '../common/logger'
import * as R from 'ramda'

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

      const databaseResult = body.hasOwnProperty('status') === false ? await userService.register(body) : null

      if(databaseResult.message !== null) {
        return created(ctx)(databaseResult)
      } else {
        return errorResponse(ctx)(databaseResult)
      }
    },
  ]),

  async getUsers(coa) {
    const users = await userService.getUsers()
    coa.status = 200
    coa.body = { users }
  },

  async getUser(koa) {
    const findResult = await userService.getUser(koa.params.id)
    if(findResult.message !== null) {
      return created(koa)(findResult)
    } else {
      return errorResponse(koa)(findResult)
    }
  },
}
