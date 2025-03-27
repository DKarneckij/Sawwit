require('module-alias/register')
const app = require('./app.js')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const { connectDB } = require('./utils/mongo.js')

const start = async () => {

  await connectDB()

  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })

}

start()