var express = require("express");
const path = require("path");
const productsRoute = require("./products.route");
const categoriesRoute = require("./categories.route");
const authRoute = require("./auth.route");
const cartRoute = require("./cart.route");
var router = express.Router();

router.get("/", (req, res, next) => {
    res.write("this is base page");
    res.end();
});

router.use("/ecomm/api/v1/categories/", categoriesRoute);
router.use("/ecomm/api/v1/products", productsRoute);
router.use("/ecomm/api/v1/auth", authRoute);
router.use("/ecomm/api/v1/auth", cartRoute);

module.exports = router;