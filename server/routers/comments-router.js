const commentsRouter = require('express').Router({ mergeParams: true });

// Controllers
const { createComment, getComment, upvoteComment, downvoteComment } = require('@controllers/comments-controller');

// Middlewares
const requireAuth = require('@routers/utils/requireAuth');
const optionalAuth = require('@routers/utils/optionalAuth');
const validateRequest = require('@routers/utils/validateRequest');

// Validators
const { validateCreateComment } = require('@routers/validators/commentValidator');

// Routes
commentsRouter.post('/', validateCreateComment, validateRequest, requireAuth, createComment);
commentsRouter.get('/', optionalAuth, getComment);
commentsRouter.post('/:commentId/upvote', requireAuth, upvoteComment);
commentsRouter.post('/:commentId/downvote', requireAuth, downvoteComment);

module.exports = commentsRouter;
