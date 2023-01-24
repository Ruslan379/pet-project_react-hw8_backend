// const { italic } = require("colors");

const addTwoNumbers = (a, b) => {
    try {
        if (!a || !b) {
            throw new Error();
        }
        return a + b;
    } catch (err) {
        throw new Error("Please provide valid numbers!")
    }
}

//! Test suite (Набор тестов)
describe('Additional service test', () => {
    //! Первый Unit-Test case
    it("1.Add two valid numbers", () => {
        const firstNumber = 1;
        const secondNumber = 1;
        const addTwoNumbersReult = addTwoNumbers(firstNumber, secondNumber);
        expect(addTwoNumbersReult).toEqual(firstNumber + secondNumber);
    });
    //! Второй Unit-Test case
    it("2.Add two valid numbers", () => {
        const firstNumber = -10;
        const secondNumber = 1;
        const addTwoNumbersReult = addTwoNumbers(firstNumber, secondNumber);
        expect(addTwoNumbersReult).toEqual(firstNumber + secondNumber);
    });
    //! Третий Unit-Test case
    it("3.addTwoNumbers returns error in case of valid params", () => {
        // const firstNumber = null;
        const secondNumber = 1;
        // const addTwoNumbersReult = addTwoNumbers(firstNumber, secondNumber);
        expect(() => addTwoNumbers(secondNumber)).toThrow("Please, provide valid numbers!!!");
    });
});