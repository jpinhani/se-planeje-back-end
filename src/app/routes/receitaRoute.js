const express = require('express')
const router = express.Router()
const receitaController = require('../controllers/receitaController')
const login = require('../middleware/login')

router.get('/api/receitas/:idUser', login, receitaController.getReceitaAll)
router.get('/api/receitas/paga/:idUser', login, receitaController.getReceitaAllPaga)

router.get('/api/receitas/category/:idUser', login, receitaController.getCategory)

router.post('/api/receitas', login, receitaController.insertReceita)
router.put('/api/receitas/:id', login, receitaController.updateReceita)
router.put('/api/receitas/teste/:id', login, receitaController.deleteReceita)

router.put('/api/receitas/pagar/:id', login, receitaController.pagarReceitaMeta)

router.post('/api/receitas/real', login, receitaController.insertReceitaReal)
router.put('/api/receitas/real/:id', login, receitaController.updateReceitaReal)
router.put('/api/receitas/delete/real/:id', login, receitaController.deleteReceitaReal)



module.exports = router