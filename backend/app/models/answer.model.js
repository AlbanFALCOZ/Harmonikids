const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
  value: Joi.string().required(),
  isCorrect: Joi.boolean().required(),
  questionId: Joi.number().required(),
  isSelected: Joi.boolean(),
  alreadySelected: Joi.boolean()
})
