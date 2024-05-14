const jwt = require('jsonwebtoken')
const meRouter = require('express').Router();
const User = require('../models/user');

const getTokenFrom = require('../controllers/utils/getTokenFrom')

meRouter.get('/', async (request, response) => {

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  console.log(decodedToken);

  if (!decodedToken._id) {
    return response.status(401).json({error: 'token invalid'})
  }
  const user = await User.findById(decodedToken._id)
  return response.send(user)
})

module.exports = meRouter;