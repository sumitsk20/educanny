/**
 * @author: Sumeet Kumar
 * @description: Main Entry point of the project. Responsible to create httpServer
 *      using express APP, import all routes and bind requests accordingly.
 *      First of all we try to set all environment variables asap and also set
 *      required middleware.
 * @created: 28th April, 2019
 */
require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const format = require('string-format');
format.extend(String.prototype);

const MONGOHELPER = require('./config/mongo');
const MIDDLEWARE = require('./middlewares');
const logger = require('./utils/logging/logger');
const { errorResponse, httpCode } = require('./utils').controllerResponse;

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'localhost';

const app = express();
require('events').EventEmitter.defaultMaxListeners = process.env.DEFAULT_MAX_LISTENER || 20;

MONGOHELPER.connection(logger);
app.use(MIDDLEWARE.responseTracker(logger));
app.use(MIDDLEWARE.corsHandler(process.env.ALLOWED_HOSTS));
app.disable('x-powered-by');
/*
Helmet helps us secure your Express apps by setting various HTTP headers.
*/
app.use(require('helmet')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(process.env.API_VERSION || '/api/v1', require('./routes/'));

app.use(function (request, response, next) {
  let error = new Error('API route Not Found');
  error.statusCode = httpCode.NOT_FOUND;
  error.name = 'InvalidAPIError';
  return errorResponse(request, response, httpCode.NOT_FOUND, error, error.Message, {
    fileName: 'initializer-index',
    functionName: 'errorHandler-middleware'
  });
});

/*
- Node JS Application listen at port 3000
- We are using Cluster module of node
*/
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
if (process.env.NODE_ENV != 'production') {
  app.listen(process.env.PORT || 3000, function () {
    logger('info', `[${process.env.NODE_ENV || 'localhost'}]:: Server is running at port ${process.env.PORT || 3000}`);
  });
} else {
  if (cluster.isMaster) {
    logger('info', `[${process.env.NODE_ENV || 'localhost'}]::Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      logger('error', `[${process.env.NODE_ENV || 'localhost'}]::worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.listen(process.env.PORT, function () {
      logger('info', `[${process.env.NODE_ENV || 'localhost'}]:: Server is running at port ${process.env.PORT}`);
    });
  }
}

module.exports = app;
