const bcrypt = require('bcrypt');
const { loginController } = require('../controllers/authControllers');
const { User } = require('../models/contactModel.js');
const jwt = require('jsonwebtoken');

describe('usersControllers', () => {
    describe('loginController', () => {
        let email;
        let password;
        let mockRequest;
        let mockResponse;
        let mockNext;

        beforeEach(() => {
            email = "avatar222@i.ua";
            password = "avatar222";

            mockRequest = {
                body: {
                    email,
                    password
                }
            };

            mockResponse = {
                status: jest.fn(function () {
                    return this;
                }),
                json: jest.fn(function () {
                    return this;
                })
            };

            mockNext = jest.fn();
        });

        test('if user was not found it should send and error response with status 404', async () => {
            User.findOne = jest.fn(() => undefined);

            await loginController(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toBeCalledWith(404);
            expect(mockResponse.json).toBeCalledWith({ message: 'This user does not exist.' });
        });

        test('if is incorrect it should send an error response with status 401', async () => {
            User.findOne = jest.fn(() => true);
            bcrypt.compare = jest.fn(() => false);

            await loginController(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toBeCalledWith(401);
            expect(mockResponse.json).toBeCalledWith({ message: 'Wrong password.' });
        });

        test('if user exists and password is correct send success response with status 200 and token and user object', async () => {
            const subscription = 'starter';
            const token = 'token';
            const mockSave = jest.fn();

            User.findOne = jest.fn(() => ({ email, subscription, save: mockSave }));
            bcrypt.compare = jest.fn(() => true);
            jwt.sign = jest.fn(() => token);

            await loginController(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toBeCalledWith(200);
            expect(mockResponse.json).toBeCalledWith({
                user: { email, subscription, password: null, token, save: mockSave },
                token
            });
        });
    });
});