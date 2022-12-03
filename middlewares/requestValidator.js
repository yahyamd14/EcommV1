const Categories = require("./../model/category");

const validReqForCategoryName = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "category name is required",
        });
    }
    next();
};

const validReqForCategoryId = async(req, res, next) => {
    let categoryId = req.params.categoryId;
    if (categoryId) {
        let category = await Categories.findByPk(categoryId);
        if (!category) {
            res.status(400).send({
                message: "Category does not exist",
            });
        }
    } else {
        res.status(400).send({
            message: "Category id is missing",
        });
    }
    res.end();
};

module.exports = { validReqForCategoryName, validReqForCategoryId };