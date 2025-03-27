const jwt = require('jsonwebtoken');

const generateToken  = (user) =>  {

  const userForToken = {
    email: user.email,
    username: user.username,
    _id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return token
}

module.exports = generateToken
