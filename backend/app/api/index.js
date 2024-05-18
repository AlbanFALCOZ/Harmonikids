const { Router } = require('express')
const userRouter = require('./user')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/user', userRouter)

module.exports = router
