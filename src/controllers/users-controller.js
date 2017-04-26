import compose from 'koa-compose'
import middleware from '../middleware'
import schema from '../validation/schema'
import userService from '../services/user-services'

const either = require('../common/eithers')
const success = require('../common/successes')


export default {

  register: compose([
    middleware.validation.validateBody(schema.users.register),
    async ctx => {

      const body = ctx.request.validatedBody

      const databaseResult = await body.chain(inn => userService.register(inn.body))

      either.fold(ctx, databaseResult)
    },
  ]),

  async getUsers(koa) {
    const result = await userService.getUsers()
    either.successResponse(koa, new success.Ok({ users: result }))
  },

  async getUser(koa) {
    const findResult = await userService.getUser(koa.params.id)
    either.fold(koa, findResult)
  },
}
