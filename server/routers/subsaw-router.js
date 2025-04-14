const subsawRouter = require('express').Router();

// Routers
const postsRouter = require('@routers/posts-router');

// Controllers
const { createSubsaw, getSubsaw, joinSubsaw, leaveSub } = require('@controllers/subsaw-controller');

// Middlewares
const requireAuth = require('@routers/utils/requireAuth');
const validateRequest = require('@routers/utils/validateRequest');
const validateSubsaw = require('@routers/utils/validateSubsaw');

// Validators
const { validateCreateSubsaw } = require('@routers/validators/subsawValidator');

// Routes
subsawRouter.post('/', validateCreateSubsaw, validateRequest, requireAuth, createSubsaw);
subsawRouter.get('/:subsawName', validateSubsaw, getSubsaw);
subsawRouter.post('/:subsawName/join', validateSubsaw, requireAuth, joinSubsaw);
subsawRouter.post('/:subsawName/leave', validateSubsaw, requireAuth, leaveSub);
subsawRouter.use('/:subsawName/posts', validateSubsaw, postsRouter);

module.exports = subsawRouter;
