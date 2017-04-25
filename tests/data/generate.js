const Chance = require('chance')

const chance = new Chance()

module.exports = {

  user: () => ({
    username: chance.word({ length: 10 }),
    email: chance.email(),
    password: chance.word({ length: 10 }),
  }),

  userShortPwd: () => ({
    username: chance.word({ length: 10 }),
    email: chance.email(),
    password: chance.word({ length: 5 }),
  }),

  login: () => ({
    email: chance.email(),
    password: chance.word({ length: 10 }),
  }),

}
