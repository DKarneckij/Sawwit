const authRouter = require('express').Router();
const { signupUser, loginUser, logoutUser, getMe } = require('@controllers/auth-controller');
const { validateSignup, validateLogin } = require('@routers/validators/authValidator')

const validateRequest = require('@routers/utils/validateRequest');
const requireAuth = require('@routers/utils/requireAuth')

authRouter.post('/signup', validateSignup, validateRequest, signupUser);

authRouter.post('/login', validateLogin, validateRequest, loginUser);

authRouter.post('/logout', logoutUser);

authRouter.get('/me', requireAuth, getMe);

module.exports = authRouter
