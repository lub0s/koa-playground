import joi from 'joi'

export const note = joi.object().keys({
  title: joi.string().required(),
  note: joi.string().max(1200),
})
