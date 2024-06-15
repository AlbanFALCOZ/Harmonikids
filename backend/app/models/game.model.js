const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Game', {
    userId: Joi.string().required(),
    quizId: Joi.number().required(),
    currentQuestionIndex: Joi.number().required(),
    correctFirstAttemptCount: Joi.number().required(),
    questionProgress: Joi.array().items(Joi.object({
        questionId: Joi.number().required(),
        selectedAnswers: Joi.array().items(Joi.object({
            value: Joi.string().required(),
            isCorrect: Joi.boolean().required(),
            isSelected: Joi.boolean().required(),
        })),
    })),
    isQuizCompleted: Joi.boolean().required(),
    completedQuizzesCount: Joi.number().required(),
});
