const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require("../models/user")
const helper = require("../tests/test_helper")

const api = supertest(app)

describe('some users are already saved', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initialUsers)
    })

    test('new user returned as json', async () => {
        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        console.log(response.body)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})