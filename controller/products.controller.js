const db = require("../model");

let insertProducts = async(req, res, next) => {
    await db.product.bulkCreate([{
            name: "Samsung Galaxy Note",
            categoryId: 2,
            price: 18000,
        },
        {
            name: "Iphone 13",
            categoryId: 2,
            price: 60000,
        },
        {
            name: "Sony bravia",
            categoryId: 4,
            price: 40000,
        },
        {
            name: "Boat Rugged",
            categoryId: 3,
            price: 4000,
        },
        {
            name: "JBL Storm",
            categoryId: 3,
            price: 9000,
        },
        {
            name: "Dress 5",
            categoryId: 1,
            price: 32000,
        },
    ]);

    res.status(201).json({
        message: "Products added",
    });
};

let createProduct = async(req, res, next) => {
    let productToAdd = req.body;
    try {
        await db.product.create(productToAdd);
        res.status(201).json(productToAdd);
    } catch (err) {
        res.status(500).json({
            message: "Some internal error occured",
        });
    }
};

let getAllProducts = async(req, res, next) => {
    let categoryId = req.query.categoryId;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let prod = [];

    if (Object.keys(req.query).length == 0) {
        prod = await db.product.findAll();
    } else {
        if (categoryId && !(minPrice || maxPrice)) {
            prod = await filterByCategory(categoryId);
        } else if (!categoryId && minPrice && maxPrice) {
            prod = await filterByPriceRange(minPrice, maxPrice);
        } else {
            prod = await db.product.findAll({
                where: {
                    categoryId: categoryId,
                    price: {
                        [db.sequelize.Op.gte]: minPrice,
                        [db.sequelize.Op.lte]: maxPrice,
                    },
                },
            });
        }
    }

    res.status(200).json(prod);
    res.end();
};

let filterByCategory = async(categoryId) => {
    let filteredProducts = await db.product.findAll({
        where: {
            categoryId: categoryId,
        },
    });

    return filteredProducts;
};

let filterByPriceRange = async(minPrice, maxPrice) => {
    let filteredProducts = await db.product.findAll({
        where: {
            price: {
                [db.sequelize.Op.gte]: minPrice,
                [db.sequelize.Op.lte]: maxPrice,
            },
        },
    });

    return filteredProducts;
};

let getProductById = async(req, res, next) => {
    let id = req.params.productId;
    if (!id) {
        res.status(400).send("ID is not passed");
    }
    let prod = await db.product.findOne({
        where: {
            id: id,
        },
    });
    res.writeHead(200, { "Contend-type": "application/json" });
    res.write(JSON.stringify(prod));
    res.end();
};

let addNewProduct = async(req, res, next) => {
    let productTOAdd = req.body.name;
    await db.product.create({
        name: productTOAdd,
    });
    res.status(201).send("new Product added");
    res.end();

    // try {
    //     let productTOAdd = req.body.name;
    //     await Products.create({
    //         name: productTOAdd,
    //     });
    //     res.status(201).send("new Product added");
    //     res.end();
    // } catch (err) {
    //     next(err);
    //     //res.status(400).send("something went wrong");
    //     // } finally {
    //     //     res.end();
    //     // }
    // }
};

let deleteProductById = async(req, res, next) => {
    let id = req.params.productId;

    let ProductToDelete = await db.product.findByPk(id);

    if (ProductToDelete) {
        await db.product.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).send("category deleted");
    } else {
        res.status(404).send("category not found");
    }
    res.end();
};

let updateProductById = async(req, res, next) => {
    if (!req.body.name) {
        res.status(500).send("please pass a value");
        res.end();
    }

    let id = req.params.productId;
    let ProductToUpdate = {
        name: req.body.name,
    };
    await db.product.update(ProductToUpdate, {
        where: {
            id: id,
        },
    });

    let updateProduct = await db.product.findByPk(id);
    res.status(200).send(updateProduct);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    addNewProduct,
    deleteProductById,
    updateProductById,
    insertProducts,
};