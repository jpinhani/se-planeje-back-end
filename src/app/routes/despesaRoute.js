const express = require('express')
const router = express.Router()
const despesaController = require('../controllers/despesaController')

router.get('/api/despesas/:idUser', despesaController.getDespesaAll)
router.get('/api/despesas/category/:idUser', despesaController.getCategory)
router.get('/api/despesas/cartao/:idUser', despesaController.getCartao)
router.post('/api/despesas', despesaController.insertDespesa)
router.put('/api/despesas/:id', despesaController.updateDespesa)
router.delete('/api/despesas/:id', despesaController.deleteDespesa)


module.exports = router