const subsawRouter = require('express').Router();
const { createSubsaw, getSubsaw, joinSubsaw, leaveSub } = require('@controllers/subsaw');
const validateRequest = require('./utils/validateRequest');
const validateSubsaw = require('./utils/validateSubsaw')
const requireAuth = require('./utils/requireAuth');
const { validateCreateSubsaw } = require('./validators/subsawValidator')
const postsRouter = require('@routers/posts')

subsawRouter.post('/', validateCreateSubsaw, validateRequest, requireAuth, createSubsaw)

subsawRouter.get('/:subsawName', validateSubsaw, getSubsaw)

subsawRouter.post('/:subsawName/join', validateSubsaw, requireAuth, joinSubsaw)

subsawRouter.post('/:subsawName/leave', validateSubsaw, requireAuth, leaveSub)

subsawRouter.use('/:subsawName/posts', validateSubsaw, postsRouter)

module.exports = subsawRouter