require("colors");
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false); //!!!!!

const express = require("express");

const request = require("supertest");

// const jwt = require('jsonwebtoken');

// require("dotenv").config()
// const { JWT_SECRET } = process.env;
// const { DB_HOST, PORT = 3000 } = process.env;

const loginController = require("../controllers/authControllers/loginController.js");


const app = express();


//----------------------------------------------------------------
// app.post("/localhost:3000/api/users/login", loginController);


describe("Test loginController", () => {
    //! 1
    // beforeAll(() => app.listen(3000));

    //! 2
    // let server;
    // beforeAll(() => server = app.listen(3000));
    // afterAll(() => server.close());

    //! 3
    // (async () => {
    //     try {
    //         let server;
    //         await mongoose.connect(DB_HOST);
    //         beforeAll(() => server = app.listen(PORT));
    //         // app.listen(PORT);
    //         console.log(`Server-TEST is running on the port: ${PORT}`.bgGreen.red);
    //         console.log(`Start HW-5 --> TEST`.bgRed.green);
    //         console.log("Database connection successful-TEST".bgBlue.yellow);
    //         console.log("---------------------------------------".yellow);
    //         afterAll(() => server.close());
    //     } catch (error) {
    //         console.log(error.message);
    //         process.exit(1); //? закрыть все неиспользуемые процессы
    //     }
    // })();


    //! 4
    // let server;
    // beforeAll(async () => {
    //     await mongoose.connect(DB_HOST);
    //     server = app.listen(3000)
    // });
    // afterAll(() => server.close());


    test("loginController return status 200", async () => {
        // const user = {
        //     _id: "63bdd5fb79362aec37c7558e",
        //     email: "avatar222@i.ua",
        //     subscription: "business"
        // };
        // const payload = { id: user._id, email: user.email, };
        // const token = jwt.sign(payload, JWT_SECRET);

        const mReq = {
            // headers: {
            //     authorization: `Bearer ${token}`
            // },
            body: {
                email: "avatar222@i.ua",
                password: "avatar222"
            },
        };
        const mRes = {};
        // const mockNext = jest.fn();

        loginController(mReq, mRes);
        // loginController(mReq, mRes, mockNext);
        // app.post("/api/users/login", loginController);


        //---------------------------------------------------------
        // const response = await request(app).post("/login", loginController(mReq, mRes)); //!!!
        // const response = await request(app).post("http://localhost:3000/api/users/login", loginController(mReq, mRes));
        // const response = await request(app).post("localhost:3000/api/users/login", loginController(mReq, mRes));  //!  POST /:63963localhost/api/users/login 404 3.986 ms - 29  ------  POST /:58341localhost/api/users/login 404 4.394 ms - 29


        // console.log("TEST --> response:", response);
        // console.log(response);

        // expect(response.status).toBe(200);
        expect(mRes.status).toEqual(200);

    });
})