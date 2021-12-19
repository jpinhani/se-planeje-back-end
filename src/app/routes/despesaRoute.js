const express = require('express')

const router = express.Router()
const despesaController = require('../controllers/despesaController')
const login = require('../middleware/login')

router.get('/api/despesas/:idUser', login, despesaController.getDespesaAll)
router.get('/api/despesas/category/:idUser', login, despesaController.getCategory)
router.get('/api/despesas/cartao/:idUser', login, despesaController.getCartao)

router.post('/api/despesas', login, despesaController.insertDespesa)
router.put('/api/despesas/:id', login, despesaController.updateDespesa)
router.put('/api/despesas/delete/:id', login, despesaController.deleteDespesa)

router.put('/api/despesas/pagar/:id', login, despesaController.pagarDespesaMeta)
router.post('/api/despesas/real', login, despesaController.insertDespesaReal)
router.put('/api/despesas/real/:id', login, despesaController.updateDespesaReal)
router.put('/api/despesas/delete/real/:id', login, despesaController.deleteDespesaReal)

router.get('/api/despesas/paga/:idUser', login, despesaController.getDespesaAllPaga)
router.get('/api/despesas/fatura/:idUser', login, despesaController.getDespesaAllFatura)
router.get('/api/despesas/faturadetalhe/:idUser', login, despesaController.getDespesaAllFaturaDetalhe)
router.post('/api/despesas/fatura', login, despesaController.insertDespesaFatura)

module.exports = router

