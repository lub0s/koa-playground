const { expect } = require('../common/chai')
const generate = require('../data/generate')
const userService = require('../../src/services/user-services')
const { resetDb } = require('../data/cleaner')


describe('userService', () => {

  beforeEach(async () => {
    await resetDb()
  })

  it('should create a new user', async () => {
    const user = generate.user()
    const registered = await userService.register(user)


    expect(registered.isRight)
  })

  it('should not allow creating duplicate user based on email', async () => {
    const data = generate.user()

    // Create first one
    await userService.register(data)

    // Expect conflict in form of Left
    expect((await userService.register(data)).isLeft)
  })

  it('should not allow with short password', async () => {
    const data = generate.userShortPwd()

    expect(await userService.register(data).isLeft)
  })

})
