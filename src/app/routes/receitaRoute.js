const express = require('express')
const router = express.Router()
const receitaController = require('../controllers/receitaController')

router.get('/api/receitas/:idUser', receitaController.getReceitaAll)
router.get('/api/receitas/category/:idUser', receitaController.getCategory)
router.post('/api/receitas', receitaController.insertReceita)
router.put('/api/receitas/:id', receitaController.updateReceita)
router.put('/api/receitas/teste/:id', receitaController.deleteReceita)


module.exports = router