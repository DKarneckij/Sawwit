const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require("../models/user")
const helper = require("../tests/test_helper")

const api = supertest(app)

describe('Login API tests', () => {
    test('Succesfful Login', () => {

    }) 

    test('Invalid Credentials', () => {

    })

    test('Missing Credentials', () => {

    })

    // test('Incorrect HTTP Method'), () => {

    // }

    // test('Rate Limiting', () => {

    // })

    // test('Concurrent Logins', () => {

    // })

    // test('Session Management: assign valid session or token after login', () => {

    // })

    // test('Logout', () => {

    // })

    // test('Token Expiry', () => {

    // })
})