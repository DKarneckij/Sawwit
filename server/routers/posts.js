const postsRouter = require('express').Router({mergeParams: true });

const { createPost, getPost, upvotePost, downvotePost } = require("@controllers/posts");
const requireAuth = require('./utils/requireAuth');
const validateSubsaw = require('./utils/validateSubsaw');

postsRouter.post('/submit', validateSubsaw, requireAuth, createPost )

postsRouter.get('/:postId', validateSubsaw, getPost)

postsRouter.post('/:postId/upvote', validateSubsaw, requireAuth, upvotePost)

postsRouter.post('/:postId/downvote', validateSubsaw, requireAuth, downvotePost)

module.exports = postsRouter