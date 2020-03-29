const express = require('express')
const router = express.Router()
const visionController = require('../controllers/visaoController')
const login = require('../middleware/login')

const endpoint = '/api/visions'

router.get(`${endpoint}/:id`, visionController.getVision)
router.get(`${endpoint}/:id/:name`, visionController.getVisionBySimilarName)

router.post(endpoint, login, visionController.insertVision)
router.put(endpoint, login, visionController.updateVision)
router.delete(`${endpoint}/:id`, login, visionController.deleteVision)

module.exports = router