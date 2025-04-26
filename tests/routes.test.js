const request = require('supertest');
const app = require('../index');

// TODO - testing errors to fix
// see jest.config.js for detect open handles
// improper test teardown currently, leaking tests

describe("Route test suite", () => {

    test("get/users", async () => {
        const response = await request(app).get('/users');
        // need to mock userService.fetchAllUsers()
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
