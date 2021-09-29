'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Pedido extends Model {};
    Pedido.init({
        ID_Pedido: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        Data_Pedido: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Forma_Pagamento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Data_Entrega_Prevista: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Data_Entrega_Efetivada: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ID_Cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Pedido',
        tableName: 'TB_Pedido',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
        timestamps: true,
    });

    Pedido.associate = (models) => {
        Pedido.belongsToMany(models.Produto, {
            as: 'produtos',
            through: 'REL_Itens',
            foreignKey: 'ID_Pedido',
        });
    }
    return Pedido;
};