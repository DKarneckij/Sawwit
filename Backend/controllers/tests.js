const express = require('express')
const testsRouter = express.Router()

testsRouter.get('/', async (request, response) => { 
    const responseString = "Testing Backend Communication"
    response.status(200).json(responseString);
});

module.exports = testsRouter