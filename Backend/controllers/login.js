const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const generateToken = require('../controllers/utils/generateToken')

loginRouter.post('/', async (request, response) => {

    const {identifier, password} = request.body

    const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]})
    
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const token = generateToken(user)

    response
        .status(200)
        .send({token, email: user.email, username: user.username, _id: user._id})
})

module.exports = loginRouter