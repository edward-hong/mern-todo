const express = require('express')
const router = express.Router()

const { signup, signin, accountActivation } = require('../controllers/auth')
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth')
const { runValidation } = require('../validators')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/activation', accountActivation)
router.post('/signin', userSigninValidator, runValidation, signin)

module.exports = router
