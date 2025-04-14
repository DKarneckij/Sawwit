const postsRouter = require('express').Router({ mergeParams: true });

// Routers
const commentsRouter = require('@routers/comments-router');

// Controllers
const { createPost, getPost, upvotePost, downvotePost } = require('@controllers/posts-controller');

// Middlewares
const requireAuth = require('@routers/utils/requireAuth');
const optionalAuth = require('@routers/utils/optionalAuth');
const validateRequest = require('@routers/utils/validateRequest');
const validatePost = require('@routers/utils/validatePost');

// Validators
const { validateCreatePost } = require('@routers/validators/postValidator');

// Routes
postsRouter.post('/submit', validateCreatePost, validateRequest, requireAuth, createPost);
postsRouter.get('/:postId', optionalAuth, validatePost, getPost);
postsRouter.post('/:postId/upvote', requireAuth, validatePost, upvotePost);
postsRouter.post('/:postId/downvote', requireAuth, validatePost, downvotePost);
postsRouter.use('/:postId/comments', validatePost, commentsRouter);

module.exports = postsRouter;
