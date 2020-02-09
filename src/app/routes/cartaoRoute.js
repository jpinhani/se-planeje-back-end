const express = require('express')
const router = express.Router()
const cartaoController = require('../controllers/cartaoController')

router.get('/api/cartoes/:id', cartaoController.getCartao)
router.post('/api/cartoes/:id', cartaoController.insertCartao)
router.put('/api/cartoes/:id', cartaoController.updateCartao)
router.delete('/api/cartoes/:id', cartaoController.deleteCartao)

module.exports = router