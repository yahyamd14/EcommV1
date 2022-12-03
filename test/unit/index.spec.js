let Math = require("../../myapp/Math");

describe("my claclator class", () => {
    test("should test sum method", () => {
        expect(Math.sum(2, 3)).toBe(5);
        expect(Math.sum(-1, -1)).toBe(-2);
        expect(Math.sum()).toBe("Please enter numbers");
        expect(Math.sum("a", "b")).toBe("Please enter numbers");
    });

    test("should test sum method", () => {
        expect(Math.square(2)).toBe(4);
        expect(Math.square(0)).toBe(0);
        expect(Math.square()).toBe("Please enter numbers");
        expect(Math.square(Infinity)).toBe(Infinity);
        expect(Math.square(2, 9)).toBe(4);
    });
});