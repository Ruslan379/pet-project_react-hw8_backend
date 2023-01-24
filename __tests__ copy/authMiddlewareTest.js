const authMiddleware = require("../middlewares/authMiddleware.js");
const jwt = require('jsonwebtoken');
// require("dotenv").config();
// const { JWT_SECRET } = process.env;

JWT_SECRET = "secret"

// ----------------------------------------------------------------------------------------
//! Test suite (Набор тестов)
describe('Auth Middleware Test', () => {
    //! Первый Unit-Test case
    it("1.Should call next() and add user and token properties to req object", () => {
        const user = {
            _id: "1",
            email: "test1@ukr.net"
        };
        const payload = { id: user._id, email: user.email, };
        const token = jwt.sign(payload, JWT_SECRET);

        const mReq = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
        const mRes = {};
        const mockNext = jest.fn();

        authMiddleware(mReq, mRes, mockNext);

        expect(mReq.token).toEqual(token);
        expect(mReq.user._id).toEqual(user._id);
        expect(mReq.user.email).toEqual(user.email);
        expect(mockNext).toHaveBeenCalled();
    });
    //! Второй Unit-Test case (не валидный)
    it("2.Should call next() with error in case autorization header is absent", () => {
        // const user = {
        //     _id: "1",
        //     email: "test1@ukr.net"
        // };
        // const payload = { id: user._id, email: user.email, };
        // const token = jwt.sign(payload, JWT_SECRET);

        const mReq = {
            headers: {
                // authorization: `Bearer ${token}`
            }
        };
        const mRes = {};
        const mockNext = jest.fn();

        authMiddleware(mReq, mRes, mockNext);

        // expect(mReq.token).toEqual(token);
        // expect(mReq.user._id).toEqual(user._id);
        // expect(mReq.user.email).toEqual(user.email);
        expect(mockNext).toHaveBeenCalled(new Error("Not authorized. No token"));
    });
});