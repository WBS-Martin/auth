const express = require('express')
const router = express.Router()

const {
  login,
  signup,
  getUserInfo,
  approveSession,
} = require('../controllers/authController')
const { verifyToken } = require('../middlewares/verifyToken')

router.post('/login', login)
router.post('/signup', signup)
router.get('/me', verifyToken, getUserInfo)
router.get('/verify-session', verifyToken, approveSession)

module.exports = router
