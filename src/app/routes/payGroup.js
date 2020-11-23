const express = require('express')
const paygroupController = require('../controllers/paygroupController')
const login = require('../middleware/login')
const router = express.Router()

router.post('/api/paygroup', login, paygroupController.insertLote)
// router.get('/api/gordinho', () => console.log("Muleque Lixo"))

module.exports = router 