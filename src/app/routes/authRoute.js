const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/api/authenticate', authController.signIn)

module.exports = router