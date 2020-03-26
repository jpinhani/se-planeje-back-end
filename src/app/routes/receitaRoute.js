const express = require('express')
const router = express.Router()
const receitaController = require('../controllers/receitaController')
const login = require('../middleware/login')

router.get('/api/receitas/:idUser', receitaController.getReceitaAll)
router.get('/api/receitas/category/:idUser', receitaController.getCategory)

router.post('/api/receitas', login, receitaController.insertReceita)
router.put('/api/receitas/:id', login, receitaController.updateReceita)
router.put('/api/receitas/teste/:id', login, receitaController.deleteReceita)


module.exports = router