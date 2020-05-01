const express = require('express')
const router = express.Router()
const faturaController = require('../controllers/faturaController')
const login = require('../middleware/login')

router.get('/api/fatura/:idUser', faturaController.getfaturaAll)
router.get('/api/fatura/detalhe/:idUser', faturaController.getfaturaDetalhe)

// getfaturaDetalhe


module.exports = router

