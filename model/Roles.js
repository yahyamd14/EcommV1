let dbconnection = require("./../config/db.config");
const sequelize = require("sequelize");

const Role = dbconnection.define("roles", {
    id: {
        type: sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING,
    },
});

module.exports = Role;