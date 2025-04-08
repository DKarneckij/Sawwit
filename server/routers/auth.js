const authRouter = require('express').Router();
const { signupUser, loginUser, logoutUser, getMe } = require('../controllers/auth');
const { validateSignup, validateLogin } = require('./validators/authValidator')

const { check } = require('express-validator');
const validateRequest = require('./utils/validateRequest');
const requireAuth = require('./utils/requireAuth')

authRouter.post('/signup', validateSignup, validateRequest, signupUser);

authRouter.post('/login', validateLogin, validateRequest, loginUser);

authRouter.post('/logout', logoutUser);

authRouter.get('/me', requireAuth, getMe);

module.exports = authRouter
