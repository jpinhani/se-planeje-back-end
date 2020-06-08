const express = require('express')
const router = express.Router()
const cartaoController = require('../controllers/cartaoController')
const login = require('../middleware/login')

router.get('/api/cartoes/search/:iduser/:id', login, cartaoController.getCartao)
router.get('/api/cartoes/:id', login, cartaoController.getCartaoAll)
router.post('/api/cartoes', login, cartaoController.insertCartao)
router.put('/api/cartoes/:id', login, cartaoController.updateCartao)
router.delete('/api/cartoes/:id', login, cartaoController.deleteCartao)

module.exports = router