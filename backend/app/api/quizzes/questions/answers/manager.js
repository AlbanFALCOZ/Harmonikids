const { Answer, Question } = require('../../../../models')
const NotFoundError = require('../../../../utils/errors/not-found-error')

/**
 * Answers Manager.
 * This file contains all the logic needed by the answer routes.
 */

/**
 * filterAnswersFromQuestion.
 * This function filters among the answers to return only the answers linked with the given questionId.
 * @param questionId
 */
const filterAnswersFromQuestion = (questionId) => {
  const answers = Answer.get()
  const parsedId = parseInt(questionId, 10)
  return answers.filter((answer) => answer.questionId === parsedId)
}

/**
 * getAnswerFromQuestion.
 * This function retrieves an answer from a question. It will throw a not found exception if the questionId in the answer is different from the one provided in parameter.
 * @param questionId
 * @param answerId
 */
const getAnswerFromQuestion = (questionId, answerId) => {
  // Check if questionId exists, if not it will throw a NotFoundError
  const question = Question.getById(questionId)
  const questionIdInt = parseInt(questionId, 10)
  const answer = Answer.getById(answerId)
  if (answer.questionId !== questionIdInt) throw new NotFoundError(`Answer id=${answerId} was not found for question id=${question.id}`)
  return answer
}

module.exports = {
  filterAnswersFromQuestion,
  getAnswerFromQuestion,
}
