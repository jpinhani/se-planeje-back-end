const express = require('express')
const router = express.Router()
const pagarmeController = require('../controllers/pagarmeController')

const login = require('../middleware/login')


router.post('/api/pagarme/assinatura', pagarmeController.assinatura)
router.post('/api/pagarme/cancelamento', pagarmeController.cancelamento)
router.post('/api/postback', (valor) => { console.log("Passou aqui", valor) })

module.exports = router


