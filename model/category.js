let sequelize = require("sequelize");
let dbconnection = require("./../config/db.config");

let categories = dbconnection.define(
    "categories", {
        id: {
            primaryKey: true,
            notNull: true,
            type: sequelize.DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            notNull: true,
            type: sequelize.DataTypes.STRING,
        },
    }, {
        timestamps: false,
    }
);

module.exports = categories;