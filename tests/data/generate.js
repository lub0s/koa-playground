const Chance = require('chance')

const chance = new Chance()

module.exports = {

  user: () => ({
    username: chance.word({ length: 10 }),
    email: chance.email(),
    password: chance.word({ length: 10 }),
  }),

  login: () => ({
    email: chance.email(),
    password: chance.word({ length: 10 }),
  }),

}
