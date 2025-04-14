const logger = require('./logger')

const requestLogger = (req, res, next) => {
  
    console.log('\n--- 🌐 Incoming Request ---');
    console.log('➡️ Method:', req.method);
    console.log('📍 Path:', req.path);
    
    if (Object.keys(req.query).length > 0) {
      console.log('🔍 Query:', req.query);
    }
  
    // if (req.headers) {
    //   console.log('📦 Headers:', req.headers);
    // }
  
    if (req.cookies) {
      console.log('🍪 Cookies:', req.cookies);
    }
  
    if (req.body ) {
      console.log('🧾 Body:', req.body);
    }
  
    console.log('----------------------------\n');
    next();
  };

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({error: error.message})
    }

}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}