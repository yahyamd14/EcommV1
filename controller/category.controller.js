let categories = require("./../model/category");
let sequelizeInstance = require("./../config/db.config");
let express = require("express");
let bodyParser = require("body-parser");

let expressApp = express();
expressApp.use(bodyParser);

let getAllCategories = async(req, res, next) => {
    let cats = await categories.findAll();
    res.writeHead(200, { "Contend-type": "application/json" });
    res.write(JSON.stringify(cats));
    res.end();
};

let getCategoryById = async(req, res, next) => {
    let id = req.params.CategoryId;
    let cats = await categories.findAll({
        where: {
            id: id,
        },
    });
    req.status(200).json(cats);
    res.end();
};

let addNewCategory = async(req, res, next) => {
    try {
        let categoryTOAdd = req.body;
        await categories.create(categoryTOAdd);
        res.status(201).send("new category added");
        res.end();
    } catch (err) {
        next(err);
        //res.status(400).send("something went wrong");
        // } finally {
        //     res.end();
        // }
    }
};

let deleteCategoryById = async(req, res, next) => {
    let id = req.params.categoryId;

    let category = await categories.findByPk(id);

    if (category) {
        await categories.destroy({
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

let updateCategoryById = async(req, res, next) => {
    if (!req.body.name) {
        res.status(500).send("please pass a value");
        res.end();
    }

    let id = req.params.categoryId;
    let categoryToUpdate = {
        name: req.body.name,
    };
    await categories.update(categoryToUpdate, {
        where: {
            id: id,
        },
    });

    let updateCategory = await categories.findByPk(id);
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