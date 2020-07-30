const express = require('express')
const router = express.Router()
const pagarmeController = require('../controllers/pagarmeController')

// const login = require('../middleware/login')


router.post('/api/pagarme/assinatura', pagarmeController.assinatura)
router.put('/api/pagarme/assinatura', pagarmeController.UpdateAssinatura)
router.post('/api/pagarme/cancelamento', pagarmeController.cancelamento)
router.post('/api/postback', pagarmeController.notificacoes)
router.post('/api/postbackLive', pagarmeController.notificacoesLive)

module.exports = router


