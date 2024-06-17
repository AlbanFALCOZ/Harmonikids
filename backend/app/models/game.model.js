const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Game', {
    childId: Joi.number().required(),
    quizId: Joi.number().required(),
    correctFirstAttemptCount: Joi.number().required(),
    chosenAnswers: Joi.object().pattern(
        Joi.number(),
        Joi.array()
    ).required(),
    isQuizCompleted: Joi.boolean().required(),
});


