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
// const authRouter = require('./controllers/auth')
// const subredditsRouter = require('./controllers/subreddits')
// const postsRouter = require('./controllers/posts')
// const commentsRouter = require('./controllers/comments')
const usersRouter = require('./controllers/users')
// const searchesRouter = require('./controllers/searches')

//Connect to MongoDB Server
mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')

if (process.env.NODE_ENV === 'test') {
    // Start the in-memory MongoDB server

    const { MongoMemoryServer } = require('mongodb-memory-server');

    (async () => {
        const mongoServer = await MongoMemoryServer.create();
        config.MONGODB_URI = await mongoServer.getUri()
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
// app.use('/api/auth', authRouter)
// app.use('/api/subreddits', subredditsRouter)
// app.use('/api/posts', postsRouter)
// app.use('/api/comments', commentsRouter)
app.use('/api/users', usersRouter)
// app.use('/api/searches', searchesRouter)

//Use Middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app