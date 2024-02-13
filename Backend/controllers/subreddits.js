const subredditRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

subredditRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if(!decodedToken) {
        response.status(401).json({error: 'token invalid'})
    }

    const user = User.findById(decodedToken.id)

})

module.exports = subredditRouter