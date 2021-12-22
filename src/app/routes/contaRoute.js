
const express = require('express')
const router = express.Router()
const contaController = require('../controllers/contaController')
const login = require('../middleware/login')

router.get('/api/contas/search/:id/:iduser', login, contaController.getConta)
router.get('/api/contas/:id', /*login,*/ contaController.getContaAll)

router.post('/api/contas', login, contaController.insertConta)
router.put('/api/contas/:id', login, contaController.updateConta)
router.delete('/api/contas/:id', login, contaController.deleteConta)

module.exports = router