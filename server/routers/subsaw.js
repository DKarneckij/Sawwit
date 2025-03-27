const subsawRouter = require('express').Router()
const { createSubsaw, getSubsaw } = require('@controllers/subsaw')

const { check } = require('express-validator');
const validateRequest = require('./utils/validateRequest');

subsawRouter.post('/', [
  check('name')
  .isLength({min: 3, max: 20}).withMessage("Subsaw name must be between 3 and 20 characters")
], validateRequest, createSubsaw)

// subsawRouter.get('/:id', getSubsaw)
subsawRouter.post('/:displayName', getSubsaw)


module.exports = subsawRouter