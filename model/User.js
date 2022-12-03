let dbconnection = require("./../config/db.config");
const sequelize = require("sequelize");

const User = dbconnection.define("users", {
    username: {
        type: sequelize.STRING,
    },
    email: {
        type: sequelize.STRING,
    },
    password: {
        type: sequelize.STRING,
    },
});

module.exports = User;