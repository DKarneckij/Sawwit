const subsawRouter = require('express').Router()
const { createSubsaw, getSubsaw, joinSubsaw } = require('@controllers/subsaw')

const { check, param } = require('express-validator');
const validateRequest = require('./utils/validateRequest');
const requireAuth = require('./utils/requireAuth');

subsawRouter.post('/', [
  check('name')
  .isLength({min: 3, max: 20}).withMessage("Subsaw name must be between 3 and 20 characters")
], validateRequest, createSubsaw)

subsawRouter.get('/:name', 
  [
    param('name')
    .trim()
    .isLength({ min: 3, max: 21 }).withMessage('Name must be between 3 and 21 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Invalid subsaw name')
  ],
  getSubsaw)

subsawRouter.post('/:name/join', 
  [
    param('name')
    .trim()
    .isLength({ min: 3, max: 21 }).withMessage('Name must be between 3 and 21 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Invalid subsaw name')
  ],
  requireAuth, validateRequest, joinSubsaw)

module.exports = subsawRouter