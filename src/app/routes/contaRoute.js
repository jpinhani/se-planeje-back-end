const express = require('express')
const router = express.Router()
const contaController = require('../controllers/contaController')
const login = require('../middleware/login')

router.get('/api/contas/search/:id/:iduser', contaController.getConta)
router.get('/api/contas/:id', contaController.getContaAll)

router.post('/api/contas', login, contaController.insertConta)
router.put('/api/contas/:id', contaController.updateConta)
router.delete('/api/contas/:id', contaController.deleteConta)

module.exports = router