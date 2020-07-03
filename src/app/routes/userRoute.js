
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const login = require('../middleware/login')
const details = require('../middleware/Details')

const endpoint = '/api/users/:id'

router.get(endpoint, login, userController.getUser)
router.get('/api/getUserData/:id', details, userController.getUserDetails)
router.put('/api/alterpsw/:id', details, userController.alterpsw)
router.post('/api/envpsw', userController.envpsw)

module.exports = router