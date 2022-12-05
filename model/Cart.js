module.exports = (sequelize, dbconnection) => {
    let Cart = dbconnection.define(
        "cart", {
            id: {
                type: sequelize.DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            cost: {
                type: sequelize.DataTypes.DECIMAL,
            },
        }, {
            timestamps: false,
        }
    );
    return Cart;
};