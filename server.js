const express = require("express");
const bodyParser = require("body-parser");
const serverConfig = require("./config/server.Config");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const db = require("./model");
const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

db.category.hasMany(db.product);

let init = async() => {
    await db.connection.sync({ force: true });
    insertCategories();
    insertRoles();
};

let insertCategories = async() => {
    await db.category.bulkCreate([{
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
    await db.roles.bulkCreate([{
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