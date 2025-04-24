const subsawRouter = require('express').Router();

// Routers
const postsRouter = require('@routers/posts-router');

// Controllers
const { createSubsaw, getSubsaw, joinSubsaw, leaveSub, updateSubsaw } = require('@controllers/subsaw-controller');

// Middlewares
const requireAuth = require('@routers/utils/requireAuth');
const validateRequest = require('@routers/utils/validateRequest');
const validateSubsaw = require('@routers/utils/validateSubsaw');
const optionalAuth = require('@routers/utils/optionalAuth.js')

// Validators
const { validateCreateSubsaw } = require('@routers/validators/subsawValidator');

// Routes
subsawRouter.post('/', validateCreateSubsaw, validateRequest, requireAuth, createSubsaw);
subsawRouter.get('/:subsawName', validateSubsaw, optionalAuth, getSubsaw);
subsawRouter.patch('/:subsawName', validateSubsaw, requireAuth, updateSubsaw);
subsawRouter.post('/:subsawName/join', validateSubsaw, requireAuth, joinSubsaw);
subsawRouter.post('/:subsawName/leave', validateSubsaw, requireAuth, leaveSub);
subsawRouter.use('/:subsawName/posts', validateSubsaw, postsRouter);

module.exports = subsawRouter;
