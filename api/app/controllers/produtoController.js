const models = require('../models/index');
const Produto = models.Produto;

// Lista todos os Produtos.
exports.index = async function (req, res) {

    var result = {
        data: '',
        paginate: '',
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
    if (req.query.Nome_Produto != undefined && req.query.Nome_Produto != '') {
        query_filtro.Nome_Produto = {
            [Op.iLike]: `%${req.query.Nome_Produto}%`
        }
    }

    Produto.findAndCountAll({
        where: query_filtro,
        offset: offset,
        limit: limit,
        order: [
            ["ID_Produto", "ASC"]
        ],
        distinct: true,
    }).then((data => {
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

// Busca Produto expecifico.
exports.buscarProduto = async function (req, res) {
    Produto.findByPk(req.params.ID_Produto).then((data => {
        res.send(data);
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro desconhecido ocorreu"
        });
    });
};

// Adiciona um novo Produto.
exports.adicionarProduto = async function (req, res) {
    Produto.create(req.body).then((data => {
        res.send(data);
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro desconhecido ocorreu"
        });
    });
};

// Editar um Produto.
exports.editarProduto = async function (req, res) {
    Produto.update(req.body, {
        where: {
            ID_Produto: req.params.ID_Produto
        },
        returning: true,
        plain: true,
    }).then((data => {
        res.send(data[1]);
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro desconhecido ocorreu"
        });
    });
};

// Remover um Produto.
exports.removerProduto = async function (req, res) {
    Produto.destroy({
        where: {
            ID_Produto: req.params.ID_Produto
        }
    }).then((data => {
        res.sendStatus(200)
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro desconhecido ocorreu"
        });
    });
};