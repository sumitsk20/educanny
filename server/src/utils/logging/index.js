/*
Summary: Responsible for logging.
Author: Sumeet Kumar (sumeet@grappus.com || sumitsk20@gmail.com)
TODO:
*/
'use strict';
const WINSTON = require('winston');

/*
Use this method to do logging in file and on console
Initialize by passing name of the service and fileName in which you want to keep logs.
then call the object with logLevel, message and options.
NOTE:
  if you don't want to print it on console send console: false in options object
  if you don't want to save this in log file/db send log: false in options object
*/

function logging() {

  let loggerTransports = [
    new WINSTON.transports.File({ filename: process.env.LOG_FILE_PATH || '../../../logs/debug-local.log', handleExceptions: true, timestamp: true }),
  ];

  let consoleWinstonTransport = new WINSTON.transports.Console({
    level: 'info',
    format: WINSTON.format.combine(
      WINSTON.format.colorize({ all: true }),
      WINSTON.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      WINSTON.format.printf((info) => {
        const {
          timestamp, level, message, ...args
        } = info;
        const ts = timestamp.slice(0, 19).replace('T', ' ');
        return `[${ts}] [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      }),
    ),
    handleExceptions: true,
    json: false,
    timestamp: true,
  });

  // this logger will be used to log only to file and logzio
  let logger = WINSTON.createLogger({
    level: 'info',
    format: WINSTON.format.json(),
    transports: loggerTransports
  });

  // this logger will be used to log only to console
  let consoleLogger = WINSTON.createLogger({
    level: 'info',
    format: WINSTON.format.json(),
    transports: [
      consoleWinstonTransport,
    ]
  });

  function log(logLevel, message, options) {
    let toConsole = true, toLog = true;
    if (!options) options = {};
    if (options.hasOwnProperty('log')) {
      toLog = options.log;
      delete options.log;
    }
    if (options.hasOwnProperty('console')) {
      toConsole = options.console;
      delete options.console;
    }

    if (toConsole && process.env.NODE_ENV != 'production') consoleLogger.log(logLevel || 'warn', message, options);

    if (toLog) logger.log(logLevel || 'info', message, options);

  }
  log('info', 'initiated logger');
  return log;
}


module.exports = logging;

// test
if (require.main === module) {
  let logger = logging();
  logger('info', 'Jai Hanuman', { log: false });
  logger('info', 'Jai Hanuman-log');
}
