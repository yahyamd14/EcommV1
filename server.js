const express = require("express");
const bodyParser = require("body-parser");
const serverConfig = require("./config/server.Config");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const dbconnection = require("./config/db.config");
const Category = require("./model/category");
const Products = require("./model/product");
const Roles = require("./model/Roles");
const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

Category.hasMany(Products);

let init = async() => {
    await dbconnection.sync({ force: true });
    insertCategories();
    insertRoles();
};

let insertCategories = async() => {
    await Category.bulkCreate([{
            name: "fasion",
        },
        {
            name: "mobiles",
        },
        {
            name: "Electronics",
        },
        {
            name: "Appliance",
        },
    ]);
};

let insertRoles = async() => {
    await Roles.bulkCreate([{
            id: 1,
            name: "user",
        },
        {
            id: 2,
            name: " admin",
        },
    ]);
};

expressApp.listen(serverConfig.PORT, () => {
    console.log("server is running at port " + serverConfig.PORT);
    init();
});