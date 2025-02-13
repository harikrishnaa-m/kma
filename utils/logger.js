const { createLogger, format, transports } = require('winston');
require('winston-mongodb');

const logger = createLogger({
  level: 'info', 
  format: format.combine(
    format.timestamp(), 
    format.json()
  ),
  transports: [
    new transports.Console(), 
    new transports.MongoDB({
      db: process.env.MongoURI, 
      collection: 'requestlogs', 
      level: 'info',
      handleExceptions: true
    })
  ]
});

module.exports = logger;
