const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
  name: Joi.string().required(),
  description: Joi.string().required(),
  quizzes: Joi.array(),
  image: Joi.string().required(),
})
