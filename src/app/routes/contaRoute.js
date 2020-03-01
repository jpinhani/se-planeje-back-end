const express = require('express')
const router = express.Router()
const contaController = require('../controllers/contaController')

router.get('/api/contas/search/:id/:iduser', contaController.getConta)
router.get('/api/contas/:id', contaController.getContaAll)
router.post('/api/contas', contaController.insertConta)
router.put('/api/contas/:id', contaController.updateConta)
router.delete('/api/contas/:id', contaController.deleteConta)

module.exports = router