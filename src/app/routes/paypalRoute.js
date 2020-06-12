const express = require('express')
const router = express.Router()
const paypallController = require('./../controllers/paypalController')



router.post('/api/paypal', paypallController.novotest)




module.exports = router