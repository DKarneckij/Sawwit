const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('./config');

let mongoServer = null;

const connectDB = async () => {
  try {
    let uri = config.MONGODB_URI;

    // Use in-memory DB for tests
    if (process.env.NODE_ENV === 'test' ) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('\n Using in-memory MongoDB \n');
    } else {
      console.log(`\n Connecting to MongoDB at ${uri} \n`);
    }

    // Connect to server
    await mongoose.connect(uri, {});
    logger.info('MongoDB connected');

  } catch (error) {
    logger.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};