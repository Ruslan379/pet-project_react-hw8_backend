//! +++++++++++++++++++++++++ ITeam ++++++++++++++++++++++++++++
const testTasksITeam = () => {
    console.log("------------------------------------------".green)
    console.log("Тестовое задание от ITeam (14.01.2023)".red);
    console.log("");
    let x = 12
    let y = 21
    console.log("ДО:    ", "x =", x, "y =", y); // x = 12 y = 21

    //--------
    x = x + y;
    y = x - y;
    x = x - y;
    console.log("ПОСЛЕ: ", "x =", x, "y =", y); // x = 21 y = 12
    console.log("");


    //----------------------------------------------------------------
    const arr2 = { a: 1, b: 2 };
    const arr3 = { a: 1, b: 2, c: 3 };
    const arr4 = { a: 1, b: 2, c: 3, d: 4 };
    const arr5 = { a: 1, b: 2, c: 3, d: 4, e: 5 }

    const arr9 = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9
    }

    const arr9res = {
        a: 2,
        b: 1,
        c: 4,
        d: 3,
        e: 6,
        f: 5,
        g: 8,
        h: 7,
        i: 9
    }

    const arr9result = {
        a: 2,
        b: 1,
        c: 4,
        d: 3,
        e: 6,
        f: 5,
        g: 8,
        h: 9,
        i: 7
    }

    //! Количество входных данных: n
    const n = Object.keys(arr9).length; //9
    // const n = 7
    console.log("Количество входных данных --> n =", n);

    //? 1-й вариант
    //! Вычислительная временная сложность(time complexity) --> 
    // const timeComplexity = parseInt(((n + 1) / 2), 10) * 3;

    //? 2-й вариант
    //! Вычислительная временная сложность(time complexity)
    const timeComplexity = Math.floor((n + 1) / 2) * 3;

    console.log("timeComplexity =", timeComplexity);

    //! Вычислительная ёмкостная сложность (space complexity)
    const spaceComplexity = 2 * n;
    console.log("spaceComplexity =", spaceComplexity);

    console.log("__________________________________________".green);
    console.log("");
}

module.exports = testTasksITeam