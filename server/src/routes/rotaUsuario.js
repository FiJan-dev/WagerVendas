const express = require('express')
const router = express.Router()
const controllerUsuario = require('../controllers/controllerUsuario')
const controllerPerfil = require('../controllers/controllerPerfil')
const controllerPagamento = require('../controllers/controllerPagamento')
const autenticarToken = require('../middlewares/authMiddleware')

router.post('/cadastro', controllerUsuario.cadastrar)
router.post('/login', controllerUsuario.logar)

//Controllers com autenticação
router.get('/perfil', autenticarToken, controllerPerfil.pegarPerfil)
router.get('/pagamento/:id_usuario', controllerPagamento.verPG)
router.post('/editar', controllerUsuario.editar)
router.post('/pagamento', controllerPagamento.cadastrarPG)
router.post('/pagamento/editar', controllerPagamento.editarPG)


module.exports = router;