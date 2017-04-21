const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

// Allows assertions on promises
chai.use(chaiAsPromised)

module.exports = chai
