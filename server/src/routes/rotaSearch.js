const express = require('express')
const router = express.Router()
const controllerSearch = require('../controllers/controllerSearch')

router.get('/search', controllerSearch.pesquisar)

module.exports = router;