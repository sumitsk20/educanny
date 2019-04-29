/*
Author: Sumeet Kumar
Summary: This file will contain database connection for initialized service.
*/
'use strict';

module.exports = function (logger) {
  const LOGGER = logger;
  const mongoose = require('mongoose');
  // mongoose.Promise = require('bluebird');
  mongoose.Promise = global.Promise;

  let dbOptions = {
    dbName: process.env.MONGO_DATABASE_NAME || 'educanny_db',
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 10,
  };

  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost', dbOptions);
  // Create connection object.
  const db = mongoose.connection;

  db.on('connection', function (error) {
    if (error) {
      LOGGER('error', `Connection error on port ${process.env.MONGO_URI}`,
        {
          error: error,
          action: 'modelConnection-connect',
          console: false,
        });
    } else {
      LOGGER('info', `Connection mongo established on port ${process.env.MONGO_URI}`,
        {
          action: 'modelConnection-connect',
          console: false,
        });
    }
  });

  db.on('error', function (error) {
    error ? LOGGER('error', `connection error on: ${process.env.MONGO_URI} error is: ${error.message}`,
      {
        action: 'modelConnection-error',
        error,
        console: false,
      }) : '';
  });

  // When the connection is disconnected
  db.on('disconnected', function () {
    LOGGER('info', 'database connection disconnected',
      {
        action: 'modelConnection-index',
        console: false,
      });
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function () {
    db.close(function () {
      LOGGER('info', 'Mongoose default connection disconnected through app termination',
        {
          action: 'modelConnection-SIGINT-termination',
          console: false,
        });
      process.exit();
    });
  });
  mongoose.set('debug', (process.env.MONGOOSE_DEBUG || true));
};
