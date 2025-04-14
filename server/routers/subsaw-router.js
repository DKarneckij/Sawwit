const subsawRouter = require('express').Router();
const { createSubsaw, getSubsaw, joinSubsaw, leaveSub } = require('@controllers/subsaw-controller');
const validateRequest = require('@routers/utils/validateRequest');
const validateSubsaw = require('@routers/utils/validateSubsaw')
const requireAuth = require('@routers/utils/requireAuth');
const { validateCreateSubsaw } = require('@routers/validators/subsawValidator')
const postsRouter = require('@routers/posts-router')

subsawRouter.post('/', validateCreateSubsaw, validateRequest, requireAuth, createSubsaw)

subsawRouter.get('/:subsawName', validateSubsaw, getSubsaw)

subsawRouter.post('/:subsawName/join', validateSubsaw, requireAuth, joinSubsaw)

subsawRouter.post('/:subsawName/leave', validateSubsaw, requireAuth, leaveSub)

subsawRouter.use('/:subsawName/posts', validateSubsaw, postsRouter)

module.exports = subsawRouter