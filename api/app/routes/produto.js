var express = require('express');
var router = express.Router();

// Require controller modules.
var produto_controller = require('../controllers/ProdutoController');

/** ROUTER Produto */

router.get('/', produto_controller.index); // Lista os Produtos.
router.get('/buscar/:ID_Produto', produto_controller.buscarProduto); // Busca um Produto especifico
router.post('/adicionar', produto_controller.adicionarProduto); // Adiciona um novo Produto
router.put('/editar/:ID_Produto', produto_controller.editarProduto); // Edita um Produto
router.delete('/remover/:ID_Produto', produto_controller.removerProduto); // DELET Remove um Produto

module.exports = router;