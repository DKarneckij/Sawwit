const commentsRouter = require('express').Router({ mergeParams: true });
const { createComment, getComment, upvoteComment, downvoteComment } = require('@controllers/comments-controller');
const requireAuth = require('@routers/utils/requireAuth');
const validateRequest = require('@routers/utils/validateRequest');
const optionalAuth = require('@routers/utils/optionalAuth');
const { validateCreateComment } = require('@routers/validators/commentValidator'); // <-- you'll want a comment validator

commentsRouter.post('/', validateCreateComment, validateRequest, requireAuth, createComment);

commentsRouter.get('/', optionalAuth, getComment);

commentsRouter.post('/:commentId/upvote', requireAuth, upvoteComment);

commentsRouter.post('/:commentId/downvote', requireAuth, downvoteComment);

module.exports = commentsRouter;
