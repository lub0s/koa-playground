import * as R from 'ramda'
import { Either } from 'ramda-fantasy'

const foldEither = Either.either

export const successResponse = R.curry((koa, succ) => {
  koa.status = succ.status
  koa.body = succ.body
})

// put together with if on status ?
export const errorResponse = R.curry((koa, error) => {
  koa.status = error.status
  koa.body = { error: error.message }
})

export const fold = (koa, result) => {
  foldEither(errorResponse(koa), successResponse(koa))(result)
}
