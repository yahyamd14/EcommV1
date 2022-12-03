const db = require("./../model/index");
const Roles = db.Roles; // constant and not the roles model
const User = db.user;

let checkDuplicateUserName = async(req, res, next) => {
    let user = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (user) {
        res.status(400).json({
            message: "User already exist",
        });
        return;
    }
    next();
};

const verifySignUp = {
    checkDuplicateUserName: checkDuplicateUserName,
};

module.exports = verifySignUp;