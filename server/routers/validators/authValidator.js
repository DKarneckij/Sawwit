const { check } = require('express-validator');

const validateSignup = [
  check('username')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),

  check('email')
    .isEmail().withMessage('Invalid email format'),

  check('password')
    .isLength({ min: 8, max: 24 }).withMessage('Password must be between 8 and 24 characters'),
];

const validateLogin = [
  check('identifier')
    .notEmpty().withMessage('Username or email is required'),

  check('password')
    .notEmpty().withMessage('Password is required'),
];

module.exports = {
  validateSignup,
  validateLogin,
};
