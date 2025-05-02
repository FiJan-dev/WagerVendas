const express = require('express')
const router = express.Router()
const controllerUsuario = require('../controllers/controllerUsuario')

router.post('/cadastro', controllerUsuario.cadastrar)
router.post('/login', controllerUsuario.logar)

module.exports = router;