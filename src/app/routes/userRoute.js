
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const login = require('../middleware/login')

const endpoint = '/api/users/:id'

router.get(endpoint, login, userController.getUser)
router.put('/api/alterpsw/:id', userController.alterpsw)

module.exports = router