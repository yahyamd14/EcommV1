const db = require("./../model");
const categories = db.categories;

let getAllCategories = async(req, res, next) => {
    let categories = await db.categories.findAll();
    res.writeHead(200, { "Contend-type": "application/json" });
    res.write(JSON.stringify(categories));
    res.end();
};

let getCategoryById = async(req, res, next) => {
    let id = req.params.CategoryId;
    let categories = await db.categories.findAll({
        where: {
            id: id,
        },
    });
    req.status(200).json(categories);
    res.end();
};

let addNewCategory = async(req, res, next) => {
    try {
        let categoryTOAdd = req.body;
        await db.categories.create(categoryTOAdd);
        res.status(201).send("new category added");
        res.end();
    } catch (err) {
        next(err);
    }
};

let deleteCategoryById = async(req, res, next) => {
    let id = req.params.categoryId;
    let category = await db.category.findByPk(id);
    try {
        if (!category) {
            throw new Error("Category not found");
        }

        await db.category.destroy({
            where: {
                categoryId: id,
            },
        });

        res.status(200).send("category deleted");
        res.end();
    } catch (err) {
        next(err);
    }
};

let updateCategoryById = async(req, res, next) => {
    if (!req.body.name) {
        res.status(500).send("please pass a value");
        res.end();
    }

    let id = req.params.categoryId;
    let categoryToUpdate = {
        name: req.body.name,
        price: req.body.price,
    };
    await db.category.update(categoryToUpdate, {
        where: {
            categoryId: id,
        },
    });

    let updateCategory = await db.category.findByPk(id);
    res.status(200).send(updateCategory);
};

let all = {
    getAllCategories,
    getCategoryById,
    addNewCategory,
    deleteCategoryById,
    updateCategoryById,
};

module.exports = all;