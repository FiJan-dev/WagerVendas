const express = require('express')
const router = express.Router()
const controllerUsuario = require('../controllers/controllerUsuario')
const controllerPerfil = require('../controllers/controllerPerfil')
const autenticarToken = require('../middlewares/authMiddleware')

router.post('/cadastro', controllerUsuario.cadastrar)
router.post('/login', controllerUsuario.logar)

//Controllers com autenticação
router.get('/perfil', autenticarToken, controllerPerfil.pegarPerfil)

module.exports = router;