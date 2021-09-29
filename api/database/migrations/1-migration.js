'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "TB_Pedido", deps: []
 * createTable "TB_Produto", deps: []
 * createTable "REL_Itens", deps: [TB_Pedido, TB_Produto]
 *
 **/

var info = {
    "revision": 1,
    "name": "migration",
    "created": "2021-09-28T05:23:03.765Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "TB_Pedido",
                {
                    "ID_Pedido": {
                        "type": Sequelize.INTEGER,
                        "field": "ID_Pedido",
                        "primaryKey": true,
                        "allowNull": false,
                        "unique": true,
                        "autoIncrement": true
                    },
                    "Data_Pedido": {
                        "type": Sequelize.DATE,
                        "field": "Data_Pedido",
                        "allowNull": false
                    },
                    "Forma_Pagamento": {
                        "type": Sequelize.STRING,
                        "field": "Forma_Pagamento",
                        "allowNull": false
                    },
                    "Data_Entrega_Prevista": {
                        "type": Sequelize.DATE,
                        "field": "Data_Entrega_Prevista",
                        "allowNull": false
                    },
                    "Data_Entrega_Efetivada": {
                        "type": Sequelize.DATE,
                        "field": "Data_Entrega_Efetivada",
                        "allowNull": true
                    },
                    "ID_Cliente": {
                        "type": Sequelize.INTEGER,
                        "field": "ID_Cliente",
                        "allowNull": false
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deleted_at": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "TB_Produto",
                {
                    "ID_Produto": {
                        "type": Sequelize.INTEGER,
                        "field": "ID_Produto",
                        "primaryKey": true,
                        "allowNull": false,
                        "unique": true,
                        "autoIncrement": true
                    },
                    "Nome_Produto": {
                        "type": Sequelize.STRING,
                        "field": "Nome_Produto",
                        "allowNull": false
                    },
                    "Tamanho_Produto": {
                        "type": Sequelize.INTEGER,
                        "field": "Tamanho_Produto",
                        "allowNull": false
                    },
                    "Cor": {
                        "type": Sequelize.INTEGER,
                        "field": "Cor",
                        "allowNull": false
                    },
                    "Valor": {
                        "type": Sequelize.INTEGER,
                        "field": "Valor",
                        "allowNull": false
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deleted_at": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "REL_Itens",
                {
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "ID_Pedido": {
                        "type": Sequelize.INTEGER,
                        "field": "ID_Pedido",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "TB_Pedido",
                            "key": "ID_Pedido"
                        },
                        "primaryKey": true
                    },
                    "ID_Produto": {
                        "type": Sequelize.INTEGER,
                        "field": "ID_Produto",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "TB_Produto",
                            "key": "ID_Produto"
                        },
                        "primaryKey": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["TB_Pedido", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["TB_Produto", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["REL_Itens", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
