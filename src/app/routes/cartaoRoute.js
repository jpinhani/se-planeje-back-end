const express = require('express')
const router = express.Router()
const cartaoController = require('../controllers/cartaoController')

router.get('/api/cartoes/search/:iduser/:id', cartaoController.getCartao)
router.get('/api/cartoes/:id', cartaoController.getCartaoAll)
router.post('/api/cartoes', cartaoController.insertCartao)
router.put('/api/cartoes/:id', cartaoController.updateCartao)
router.delete('/api/cartoes/:id', cartaoController.deleteCartao)

module.exports = router