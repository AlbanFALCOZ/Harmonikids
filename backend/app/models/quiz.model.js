const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  name: Joi.string().required(),
  description: Joi.string().required(),
  theme: Joi.string().required(),
  questions: Joi.array(),
  statut: Joi.string().required(),
  image: Joi.string().required(),

})
