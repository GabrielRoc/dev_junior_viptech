'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Produto extends Model {};
    Produto.init({
        ID_Produto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        Nome_Produto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Tamanho_Produto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Cor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Valor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Produto',
        tableName: 'TB_Produto',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
        timestamps: true,
    });

    Produto.associate = (models) => {
        Produto.belongsToMany(models.Pedido, {
            as: 'pedidos',
            through: 'REL_Itens',
            foreignKey: 'ID_Produto',
        });
    }
    return Produto;
};