const express = require('express')
const router = express.Router()
const receitaController = require('../controllers/receitaController')

router.get('/api/receitas/:id', receitaController.getReceita)
router.post('/api/receitas/:id', receitaController.insertReceita)
router.put('/api/receitas/:id', receitaController.updateReceita)
router.delete('/api/receitas/:id', receitaController.deleteReceita)

module.exports = router