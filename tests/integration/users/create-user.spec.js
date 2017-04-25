const _ = require('lodash')
const request = require('supertest-koa-agent')
const { expect } = require('../../common/chai')
const { resetDb } = require('../../data/cleaner')
const generate = require('../../data/generate')
const app = require('../../../src/app')

describe('users', () => {

  after(async () => {
    await resetDb()
  })

  beforeEach(async () => {
    await resetDb()
  })

  it('should create a new user', async () => {
    const user = generate.user()
    const res = await request(app)
      .post('/users')
      .send(user)
      .expect(201)

    expect(res.body).to.have.keys(['email', 'password', 'username', '_id'])
  })

  it('should return 400 when user record is not valid', () => {
    const user = _.omit(generate.user(), 'password')
    return request(app)
      .post('/users')
      .send(user)
      .expect(400)
  })

})
