const fs = require('fs');
const path = require('path');
const {
    Sequelize,
    DataTypes
} = require('sequelize');
const config = require('../../config/database.js');

const db = {};
const sequelize = new Sequelize(config);

fs
    .readdirSync(__dirname)
    .filter((file) => {
        const returnFile = (file.indexOf('.') !== 0) &&
            (file !== path.basename(__filename)) &&
            (file.slice(-3) === '.js');
        return returnFile;
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes)
        db[model.name] = model;
    });


Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;