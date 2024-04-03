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

    const { email, username, password } = request.body
    console.log(email, username, password);

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        email,
        username,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter