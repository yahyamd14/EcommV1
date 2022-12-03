let sum = (a, b) => {
    if (typeof a != "number" || typeof b != "number") {
        return "please enter number";
    }
    return a + b;
};

let square = (a, b) => {
    if (typeof a != "number" || typeof b != "number") {
        return "please enter number";
    }
    return a * b;
};

module.exports = { sum, square };