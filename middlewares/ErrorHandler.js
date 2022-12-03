let path = require("path");

const ErrorHandler = (err, req, res, next) => {
    console.log("Middleware Error Handling");
    const statusCode = err.statusCode || 500;
    const message = err.message || "something went wrong";

    // res.status(errStatus).json({
    //     success: false,
    //     statusCode: errStatus,
    //     message: errMsg,
    // });

    res.sendFile(path.join(__dirname + "./../views/error.html"));
};

module.exports = ErrorHandler;