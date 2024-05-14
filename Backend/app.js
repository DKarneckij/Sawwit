// Imports
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')

const middleware = require('./utils/middleware')

//Setup routers
const meRouter = require('./controllers/me')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const subredditsRouter = require('./controllers/subreddits')
const testsRouter = require('./controllers/tests')
// const postsRouter = require('./controllers/posts')
// const commentsRouter = require('./controllers/comments')
// const searchesRouter = require('./controllers/searches')

//Connect to MongoDB Server
mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')

if (process.env.NODE_ENV !== 'production') {

    // Start the in-memory MongoDB server
    logger.info('Creating in-memory MongoDB server')
    const { MongoMemoryServer } = require('mongodb-memory-server');
    (async () => {
        const mongoServer = await MongoMemoryServer.create();
    })
}

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})



//Use Middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

//Use Routers
app.use('/api/me', meRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/subreddits', subredditsRouter)
app.use('/api/tests', testsRouter)
// app.use('/api/posts', postsRouter)
// app.use('/api/comments', commentsRouter)
// app.use('/api/searches', searchesRouter)

//Use Middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app