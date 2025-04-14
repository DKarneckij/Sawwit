const postsRouter = require('express').Router({mergeParams: true });
const commentsRouter = require('@routers/comments-router')
const { createPost, getPost, upvotePost, downvotePost } = require("@controllers/posts-controller");
const requireAuth = require('@routers/utils/requireAuth');
const validateRequest = require('@routers/utils/validateRequest');
const validatePost = require('@routers/utils/validatePost');
const optionalAuth = require('@routers/utils/optionalAuth')
const { validateCreatePost } = require('@routers/validators/postValidator');

postsRouter.post('/submit', validateCreatePost, validateRequest, requireAuth, createPost )

postsRouter.get('/:postId', optionalAuth, validatePost, getPost)

postsRouter.post('/:postId/upvote', requireAuth, validatePost, upvotePost)

postsRouter.post('/:postId/downvote', requireAuth, validatePost, downvotePost)

postsRouter.use('/:postId/comments', validatePost, commentsRouter)

module.exports = postsRouter
