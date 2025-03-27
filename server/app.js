const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// require('express-async-errors');

const middleware = require('./utils/middleware');
const authRouter = require('@routers/auth');
const subsawRouter = require('@routers/subsaw');

const app = express();

// Middleware
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(cookieParser())
// app.use(middleware.requestLogger);


// Routes
app.use('/api/auth', authRouter);
app.use('/api/s', subsawRouter)

// Fallback + Error Handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;