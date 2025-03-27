module.exports = {
  // ...other settings
  moduleNameMapper: {
    '^@app$': '<rootDir>/app.js',
    '^@models(.*)$': '<rootDir>/models$1',
    '^@controllers(.*)$': '<rootDir>/controllers$1',
    '^@routers(.*)$': '<rootDir>/routers$1',
    '^@utils(.*)$': '<rootDir>/utils$1'
  }
};