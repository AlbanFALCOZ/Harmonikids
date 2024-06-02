const { Router } = require('express')

const QuizzesRouter = require('./quizzes')
const ThemesRouter = require('./themes')
//const UsersRouter = require('./users')
//const QuestionsRouter = require('./quizzes/questions')
//const AnswersRouter = require('./quizzes/questions/answers')



const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/themes', ThemesRouter)
//router.use('/questions',QuestionsRouter)
//router.use('/answers', AnswersRouter)

module.exports = router
