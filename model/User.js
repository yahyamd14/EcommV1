module.exports = (sequelize, dbconnection) => {
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
    return User;
};