import Promise from 'bluebird'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export default {

  generateAccessToken(userId) {
    const payload = { userId }
    return jwt.sign(payload, 'mEOLaKAkgnr0z/IzS9bju4xquOk', { expiresIn: 2 * 60 * 60 })
  },

  hashPassword(password) {
    return Promise.fromCallback(done =>
      bcrypt.hash(pepperify(password), 10, done)
    )
  },

  comparePasswords(plaintext, ciphertext) {
    return Promise.fromCallback(done =>
      bcrypt.compare(pepperify(plaintext), ciphertext, done)
    )
  },

  async generateResetPasswordToken() {
    const bytes = await Promise.fromCallback(done =>
      crypto.randomBytes(20, done)
    )

    return bytes.toString('hex')
  },
}

/**
 * Apply system-configured pepper to any given string
 *
 * @param {String} string The string to pepperify
 * @return {String} SHA-1 hash of the input string with pepper applied
 */
function pepperify(string) {
  return crypto
    .createHmac('sha1', 'mEOLaKAkgnr0z/IzS9bju4xquOk')
    .update(string)
    .digest('hex')
}
