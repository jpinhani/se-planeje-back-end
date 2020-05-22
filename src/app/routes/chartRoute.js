const express = require('express')
const router = express.Router()
const chartController = require('../controllers/chartController.js')

router.get('/api/chartDespesa/:id', chartController.getChartDespesa)
router.get('/api/chartReceita/:id', chartController.getChartReceita)


module.exports = router