const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
  label: Joi.string().required(),
  answers: Joi.array().items(
    Joi.object({
      value: Joi.string().required(),
      isCorrect: Joi.boolean().required(),
    })
  ).required(),
  quizId: Joi.number().required(),
})
