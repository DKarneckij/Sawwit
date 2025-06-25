const { check } = require('express-validator');

const validateCreateSubsaw = [
  check('name')
    .trim()
    .isLength({ min: 3, max: 21 }).withMessage('Name must be 3-21 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Only letters, numbers, and underscores allowed'),
  
  check('description')
    .optional()
    .isLength({ max: 300 }).withMessage('Description too long')
];

module.exports = {
  validateCreateSubsaw,
};
