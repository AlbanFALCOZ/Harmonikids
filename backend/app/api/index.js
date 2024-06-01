const { Router } = require('express')
const userRouter = require('./user')


const QuizzesRouter = require('./quizzes')
//const UsersRouter = require('./users')
//const QuestionsRouter = require('./quizzes/questions')
//const AnswersRouter = require('./quizzes/questions/answers')



const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
<<<<<<< HEAD
router.use('/user', userRouter)
=======
router.use('/quizzes', QuizzesRouter)
//router.use('/questions',QuestionsRouter)
//router.use('/answers', AnswersRouter)
>>>>>>> a249d8910ef9e0f82fb4f66cb8e49b037f60988b

module.exports = router
