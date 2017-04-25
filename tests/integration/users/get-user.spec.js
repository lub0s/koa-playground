const request = require('supertest-koa-agent')
const { expect } = require('../../common/chai')
const { resetDb } = require('../../data/cleaner')
const generate = require('../../data/generate')
const app = require('../../../src/app')

describe('users-reading', () => {

  after(async () => {
    await resetDb()
  })

  const user = generate.user()

  let insertedUser = null

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send(user)
      .expect(201)

    insertedUser = res.body
    expect(res.body).to.have.keys(['email', 'password', 'username', '_id'])
  })

  it('should get all users and return 200', async () => {
    const res = await request(app)
      .get('/users')
      .send()
      .expect(200)

    expect(res.body).to.have.property('users').to.have.lengthOf(1)
  })

  it('should find user and return 200', async () => {
    const endpoint = `/users/${insertedUser._id}`
    const res = await request(app)
      .get(endpoint)
      .send()
      .expect(200)

    expect(res.body).to.have.property('_id')
  })

})
