module.exports = (sequelize, dbconnection) => {
    const Role = dbconnection.define("roles", {
        id: {
            type: sequelize.STRING,
            primaryKey: true,
        },
        name: {
            type: sequelize.STRING,
        },
    });
    return Role;
};