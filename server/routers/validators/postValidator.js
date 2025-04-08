const { check, body } = require('express-validator');

const validateCreatePost = [
  check('title')
    .notEmpty()
    .withMessage('Title is required'),

  check('type')
    .isIn(['text', 'image'])
    .withMessage('Type must be either "text" or "image"'),

  check('content')
  .notEmpty()
  .withMessage('Content is required')
];

module.exports = { validateCreatePost };
