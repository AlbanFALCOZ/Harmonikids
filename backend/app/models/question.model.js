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
            value: Joi.string(),
            isCorrect: Joi.boolean(),
        })
    ),
    hint: Joi.object({
        text: Joi.string().optional(),
        imageUrl: Joi.string().uri().optional()
    }).optional(),
    quizId: Joi.number()
})
