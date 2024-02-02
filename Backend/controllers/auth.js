const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const User = require('../models/user')

usersRouter.Router.post('/', async (request, response) => {
    const {username, email, password} = request.body

    /*
    add functionality to test password and username input
    */

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        email,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = authRouter