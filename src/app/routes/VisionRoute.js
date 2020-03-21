const express = require('express')
const router = express.Router()
const visionController = require('../controllers/visionController')

const endpoint = '/api/visions'

router.get(`${endpoint}/:id`, visionController.getVision)
router.get(`${endpoint}/:id/:name`, visionController.getVisionBySimilarName)
router.post(endpoint, visionController.insertVision)
router.put(endpoint, visionController.updateVision)
router.delete(`${endpoint}/:id`, visionController.deleteVision)

module.exports = router

