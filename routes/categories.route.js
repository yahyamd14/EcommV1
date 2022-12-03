let express = require("express");
let categoryRouter = express.Router();
let categoryController = require("./../controller/category.controller");
let requestValidator = require("./../middlewares/requestValidator");

categoryRouter.get("/", categoryController.getAllCategories);

categoryRouter.get(
    "/:categoryId", [requestValidator.validReqForCategoryId],
    categoryController.getCategoryById
);

categoryRouter.put(
    "/:categoryId", [
        requestValidator.validReqForCategoryName,
        requestValidator.validReqForCategoryId,
    ],
    categoryController.updateCategoryById
);

categoryRouter.post(
    "/", [requestValidator.validReqForCategoryName],
    categoryController.addNewCategory
);

categoryRouter.delete(
    "/:categoryId", [requestValidator.validReqForCategoryName],
    categoryController.deleteCategoryById
);

module.exports = categoryRouter;