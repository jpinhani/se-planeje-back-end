const express = require('express')
const router = express.Router()
const chartController = require('../controllers/chartController.js')
const login = require('../middleware/login')

router.get('/api/chartDespesa/:id', login, chartController.getChartDespesa)
router.get('/api/chartReceita/:id', login, chartController.getChartReceita)


module.exports = router