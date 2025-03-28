const subsawRouter = require('express').Router();
const { check, param } = require('express-validator');
const { createSubsaw, getSubsaw, joinSubsaw, leaveSub } = require('@controllers/subsaw');
const validateRequest = require('./utils/validateRequest');
const requireAuth = require('./utils/requireAuth');

subsawRouter.post('/', [
  check('name')
  .isLength({min: 3, max: 20}).withMessage("Subsaw name must be between 3 and 20 characters")
], requireAuth, validateRequest, createSubsaw
)

subsawRouter.get('/:name', 
  [
    param('name')
    .trim()
    .isLength({ min: 3, max: 21 }).withMessage('Name must be between 3 and 21 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Invalid subsaw name')
  ],
  validateRequest, getSubsaw
)

subsawRouter.post('/:name/join', 
  [
    param('name')
    .trim()
    .isLength({ min: 3, max: 21 }).withMessage('Name must be between 3 and 21 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Invalid subsaw name')
  ],
  requireAuth, validateRequest, joinSubsaw
)

subsawRouter.post('/:name/leave', 
  [
    param('name')
    .trim()
    .isLength({ min: 3, max: 21 }).withMessage('Invalid subsaw Name')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Invalid subsaw name')
  ],
  requireAuth, validateRequest, leaveSub)

module.exports = subsawRouter