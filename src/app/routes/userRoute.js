const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

const endpoint = '/api/users/:id'

router.get(endpoint, userController.getUser)

module.exports = router