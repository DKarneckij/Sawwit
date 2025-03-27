const authRouter = require('express').Router();
const { signupUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/auth');

const { check } = require('express-validator');
const validateRequest = require('./utils/validateRequest');
const requireAuth = require('./utils/requireAuth')

authRouter.post('/signup',
  [
    check('username')
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores'),

    check('email')
      .isEmail()
      .withMessage('Invalid email format'),

    check('password')
      .isLength({ min: 8, max: 24 })
      .withMessage('Password must be between 8 and 24 characters'),
       
  ], validateRequest, signupUser
);

authRouter.post('/login', loginUser)

authRouter.post('/logout', logoutUser)

authRouter.get('/me', requireAuth, getCurrentUser)

module.exports = authRouter
