const models = require('../models/index');
const Pedido = models.Pedido;
const Produto = models.Produto;

// Lista todos os Pedidos.
exports.index = async function (req, res) {

    var result = {
        data: '',
    };

    var offset = 0
    var limit = req.query.limit

    if (req.query.page != undefined && req.query.limit != undefined) {
        offset = ((req.query.page - 1) * req.query.limit)
    }

    const {
        Op
    } = require("sequelize");
    var query_filtro = {};
    if (req.query.ID_Cliente != undefined && req.query.ID_Cliente != '') {
        query_filtro.ID_Cliente = {
            [Op.eq]: req.query.ID_Cliente
        }
    }


    console.log("res", ((req.query.page - 1) * req.query.limit));


    Pedido.findAndCountAll({
        where: query_filtro,
        offset: offset,
        limit: limit,
        include: [{
            model: models.Produto,
            as: 'produtos',
            through: {
                attributes: []
            }
        }],
        order: [
            ["ID_Pedido", "ASC"]
        ],
        distinct: true,
    }, ).then((data => {
        result.data = data.rows
        if (req.query.page != undefined && req.query.limit != undefined) {
            result.paginate = {
                current_page: parseInt(req.query.page),
                count_pages: Math.ceil(data.count / req.query.limit),
                count_objects: data.count,
                limit_per_page: parseInt(req.query.limit)
            }
            res.send(result);
        }
        res.send(result.data);
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro desconhecido ocorreu"
        });
    });
};

// Busca Pedido expecifico.
exports.buscarPedido = async function (req, res) {
    Pedido.findByPk(req.params.ID_Pedido).then((data => {
        res.send(data);
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro desconhecido ocorreu"
        });
    });
};

// Adiciona um novo Pedido.
exports.adicionarPedido = async function (req, res) {
    const {
        produtos,
        ...body
    } = req.body;

    console.log("req.body", req.body);
    console.log("body", body);
    console.log("produtos", produtos);

    Pedido.create(body).then((data => {
        if (produtos && produtos.length > 0) {
            data.setProdutos(produtos)
        }

        res.send(data);
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro desconhecido ocorreu"
        });
    });
};

// Editar um Pedido.
exports.editarPedido = async function (req, res) {
    const {
        produtos,
        ...body
    } = req.body;

    Pedido.update(body, {
        where: {
            ID_Pedido: req.params.ID_Pedido
        },
        returning: true,
        plain: true,
    }).then((data => {

        if (produtos && produtos.length > 0) {
            data[1].setProdutos(produtos)
        }

        res.send(data[1]);
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro desconhecido ocorreu"
        });
    });
};

// Remover um Pedido.
exports.removerPedido = async function (req, res) {
    Pedido.destroy({
        where: {
            ID_Pedido: req.params.ID_Pedido
        }
    }).then((data => {
        res.sendStatus(200)
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro desconhecido ocorreu"
        });
    });
};