var express = require('express');
var router = express.Router();

// Require controller modules.
var pedido_controller = require('../controllers/pedidoController');

/** ROUTER Pedido */

router.get('/', pedido_controller.index); // Lista os pedidos.
router.get('/buscar/:ID_Pedido', pedido_controller.buscarPedido); // Busca um pedido especifico
router.post('/adicionar', pedido_controller.adicionarPedido); // Adiciona um novo pedido
router.put('/editar/:ID_Pedido', pedido_controller.editarPedido); // Edita um pedido
router.delete('/remover/:ID_Pedido', pedido_controller.removerPedido); // DELET Remove um pedido

module.exports = router;