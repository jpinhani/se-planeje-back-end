const express = require('express')
const router = express.Router()
const naturezaController = require('../controllers/naturezaController')

router.get('/api/naturezas/:id', naturezaController.getNatureza)
router.get('/api/naturezas', naturezaController.getNaturezaAll)
router.post('/api/naturezas', naturezaController.insertNatureza)
router.put('/api/naturezas/:id', naturezaController.updateNatureza)
router.delete('/api/naturezas/:id', naturezaController.deleteNatureza)

module.exports = router