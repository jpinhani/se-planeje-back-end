const express = require('express')
const router = express.Router()
const paypallController = require('./../controllers/paypalController')



router.post('/api/ipnPaypal', paypallController.ipnModule)



module.exports = router