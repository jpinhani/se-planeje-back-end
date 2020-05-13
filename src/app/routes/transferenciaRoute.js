const express = require('express')
const router = express.Router()
const transferenciaController = require('../controllers/transferenciaController')
const login = require('../middleware/login')

router.get('/api/transferencia/:id', transferenciaController.getTransferenciaAll)
router.post('/api/transferencia', login, transferenciaController.insertTransferencia)
router.put('/api/transferencia/:id', login, transferenciaController.updateTransferencia)
router.delete('/api/transferencia/:id', login, transferenciaController.deleteTransferencia)

module.exports = router