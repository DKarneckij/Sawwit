const postsRouter = require('express').Router({mergeParams: true });

const { createPost, getPost, upvotePost, downvotePost } = require("@controllers/posts");
const requireAuth = require('./utils/requireAuth');
const validateSubsaw = require('./utils/validateSubsaw');
const validateRequest = require('./utils/validateRequest');
const { validateCreatePost } = require('./validators/postValidator')

postsRouter.post('/submit', validateCreatePost, validateRequest, requireAuth, validateSubsaw, createPost )

postsRouter.get('/:postId', validateSubsaw, getPost)

postsRouter.post('/:postId/upvote', validateSubsaw, requireAuth, upvotePost)

postsRouter.post('/:postId/downvote', validateSubsaw, requireAuth, downvotePost)

module.exports = postsRouter
