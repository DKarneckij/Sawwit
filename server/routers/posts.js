const postsRouter = require('express').Router({mergeParams: true })

const { createPost, getPost, upvotePost, downvotePost } = require("@controllers/posts")
const requireAuth = require('./utils/requireAuth')

postsRouter.post('/submit', requireAuth, createPost )

postsRouter.get('/:postId', getPost)

postsRouter.post('/:postId/upvote', requireAuth, upvotePost)

postsRouter.post('/:postId/downvote', requireAuth, downvotePost)

module.exports = postsRouter