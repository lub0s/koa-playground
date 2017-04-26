import compose from 'koa-compose'
import middleware from '../middleware'
import schema from '../validation/schema'
import notesService from '../services/notes-services'

const either = require('../common/eithers')
const success = require('../common/successes')

export default {

  createNote: compose([
    middleware.validation.validateBody(schema.notes.note),
    async ctx => {

      const body = ctx.request.validatedBody

      const databaseResult = await body.chain(inn => notesService.createNote(inn.body))

      either.fold(ctx, databaseResult)
    },
  ]),

  async getNotes(ctx) {
    const result = await notesService.getNotes()
    either.successResponse(ctx, new success.Ok({ notes: result }))
  },

  async getNote(ctx) {
    const findResult = await notesService.getNote(ctx.params.noteId)
    either.fold(ctx, findResult)
  },
}
