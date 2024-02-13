const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    User.find({}).then(users => {
        response.status(200).json(users)
    })
})

usersRouter.get('/:id', async (request, response) => {

    const user = User.findById(request.params.id)
    
    if (user) {
        response.status(200).json(user)
    } else {
        response.status(400).end()
    }
})

usersRouter.post('/', async (request, response) => {

    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const User = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await User.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter