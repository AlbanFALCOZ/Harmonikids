const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    label: Joi.string().required(),
    typeOfQuestion: Joi.string().required(),
    niveau: Joi.string().required(),
    image: Joi.string(),
    audio: Joi.string(),
    answers: Joi.array().items(
        Joi.object({
            value: Joi.string().required(),
            isCorrect: Joi.boolean().required(),
        })
    ),
    hint:Joi.items(),
    quizId: Joi.number().required(),
})
