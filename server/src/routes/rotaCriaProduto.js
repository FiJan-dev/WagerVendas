const express = require("express");
const router = express.Router();
const controllerCriaProduto = require("../controllers/controllerCriaProduto");

router.post("/CriaProduto", controllerCriaProduto.criarProduto);

router.get("/CriaProduto/:id_produto", controllerCriaProduto.getProduto);

module.exports = router;
