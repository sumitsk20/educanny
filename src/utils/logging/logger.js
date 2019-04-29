var logger = require('./index')(process.env.SERVICE_NAME, 'logging-index');

module.exports = logger;
