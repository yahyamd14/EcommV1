module.exports = (sequelize, dbconnection) => {
    let Products = dbconnection.define(
        "products", {
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
            price: {
                notNull: true,
                type: sequelize.DataTypes.BIGINT,
            },
        }, {
            timestamps: false,
        }
    );
    return Products;
};