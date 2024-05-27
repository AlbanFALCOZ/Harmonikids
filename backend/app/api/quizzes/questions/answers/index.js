const { Router } = require('express')
const { Answer, Question } = require('../../../../models')
const manageAllErrors = require('../../../../utils/routes/error-management')
const { filterAnswersFromQuestion, getAnswerFromQuestion } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    Question.getById(req.params.questionId) // Check if questionId exists, if not it will throw a NotFoundError
    res.status(200).json(filterAnswersFromQuestion(req.params.questionId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:answerId', (req, res) => {
  try {
    const answer = getAnswerFromQuestion(req.params.questionId, req.params.answerId)
    res.status(200).json(answer)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    Question.getById(req.params.questionId) // Check if questionId exists, if not it will throw a NotFoundError
    const questionId = parseInt(req.params.questionId, 10)
    const answer = Answer.create({ ...req.body, questionId })
    res.status(201).json(answer)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:answerId', (req, res) => {
  try {
    const answer = getAnswerFromQuestion(req.params.questionId, req.params.answerId)
    const updatedAnswer = Answer.update(req.params.answerId, { ...req.body, questionId: answer.questionId })
    res.status(200).json(updatedAnswer)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:answerId', (req, res) => {
  try {
    getAnswerFromQuestion(req.params.questionId, req.params.answerId)
    Answer.delete(req.params.answerId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
