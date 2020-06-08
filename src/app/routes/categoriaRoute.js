const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoriaController')
const login = require('../middleware/login')

router.get('/api/categorias/search/:id/:iduser', login, categoriaController.getCategoria)
router.get('/api/categorias/comboDependencia/:iduser/:tipo/:nivel', login, categoriaController.getCategoriaComboDepencia)
router.get('/api/categorias/:id', login, categoriaController.getCategoriaAll)

router.post('/api/categorias/', login, categoriaController.insertCategoria)
router.post('/api/categorias/default', login, categoriaController.insertCategoriaDefault)
router.put('/api/categorias/', login, categoriaController.updateCategoria)
router.delete('/api/categorias/:id', login, categoriaController.deleteCategoria)

module.exports = router