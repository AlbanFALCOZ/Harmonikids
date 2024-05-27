const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UsersRouter = require('./users')
const QuestionsRouter = require('./questions') // Ajouter cette ligne

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
const QuizzesRouter = require('./quizzes')
const UsersRouter = require('./users')
const QuestionsRouter = require('./questions') // Ajouter cette ligne

module.exports = router
