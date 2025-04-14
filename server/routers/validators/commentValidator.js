const { check } = require('express-validator');

const validateCreateComment = [
  check('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required for a comment')
    .isLength({ max: 5000 })
    .withMessage('Comment cannot be longer than 5000 characters')
    .custom(value => {
      if (value.trim().length === 0) {
        throw new Error('Content cannot be only spaces');
      }
      return true;
    }),
  
  check('commentableType')
    .notEmpty()
    .withMessage('commentableType is required')
    .isIn(['Post', 'Comment'])
    .withMessage('commentableType must be either "Post" or "Comment"')
];

module.exports = { validateCreateComment };
