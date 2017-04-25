import joi from 'joi'

export const register = joi.object().keys({
  username: joi.string().min(3).required(),
  email: joi.string().email(),
  password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
})
