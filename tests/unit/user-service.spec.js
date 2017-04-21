const { expect } = require('../common/chai')
const generate = require('../data/generate')
const userService = require('../../src/services/user-services')
// const errors = require('../../src/common/errors')
// import { Either } from 'ramda-fantasy'
//
// const error = Either.Left
// const value = Either.Right

describe('userService', () => {

  // beforeEach(resetDb)

  it('should create a new user', async () => {
    const user = generate.user()
    const registered = await userService.register(user)


    expect(registered.isRight)
  })

  it('should not allow creating duplicate user based on email', async () => {
    const data = generate.user()

    // Create first one
    await userService.register(data)

    // Create conflict
    expect((await userService.register(data)).isLeft)
  })
})
