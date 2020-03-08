const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoriaController')

router.get('/api/categorias/search/:id/:iduser', categoriaController.getCategoria)
router.get('/api/categorias/comboDependencia/:iduser/:tipo/:nivel', categoriaController.getCategoriaComboDepencia)
router.get('/api/categorias/:id', categoriaController.getCategoriaAll)
router.post('/api/categorias/', categoriaController.insertCategoria)
router.post('/api/categorias/default', categoriaController.insertCategoriaDefault)
router.put('/api/categorias/', categoriaController.updateCategoria)
router.delete('/api/categorias/:id', categoriaController.deleteCategoria)

module.exports = router