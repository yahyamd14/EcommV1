const db = require("./../model");

let createCart = async(req, res, next) => {
    const cart = { cost: 0 };
    try {
        await Cart.create(cart);
        res.status(200).json({
            message: "Cart Created",
        });
    } catch (err) {
        res.status(401).json({
            message: "Some interal error happened",
        });
    }
};

let updateCart = async(req, res, next) => {
    const cartId = req.params.cartId;
    let cartTOUpdate = await db.cart.findByPk(cartId);
    if (cartTOUpdate) {
        let productsTOAdd = await db.product.findAll({
            where: {
                id: req.body.productIds,
            },
        });
        if (productsTOAdd) {
            await cartTOUpdate.setProducts(productsTOAdd);
            console.log("Prodct added");
            let totalCost = 0;
            let productsSelected = [];
            let products = await cartTOUpdate.getProducts();
            for (i = 0; i < products.length; i++) {
                totalCost = totalCost + products[i].price;
                productsSelected.push({
                    id: products[i].id,
                    name: products[i].name,
                    totalCost: products[i].price,
                });
            }

            res.status(200).json({
                id: cartToUpdate.id,
                productsSelected,
                totalCost,
            });
        }
    }
};

let getCart = async(req, res, next) => {
    let cart = await db.cart.findByPk(req.params.cartId);
    let totalCost = 0;
    let productsSelected = [];
    let products = await cart.getProducts();
    for (i = 0; i < products.length; i++) {
        totalCost = cost + products[i].cost;
        productsSelected.push({
            id: products[i].id,
            name: products[i].name,
            cost: products[i].cost,
        });
    }

    res.status(200).json({
        id: cart.id,
        productsSelected,
        totalCost,
    });
};

module.exports = {
    createCart,
    getCart,
    updateCart,
};