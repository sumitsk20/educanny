/*
Summary: This middleware will track which request tooks how many ms to complete.
Author: Sumeet Kumar(sumeet@grappus.com || sumitsk20@gmail.com)
TODO:
*/
'use strict';

const uuid = require('uuid4');

// Middleware, this will track time to complete the request
module.exports = function (logger) {
  return function (request, response, next) {
    let startTime = Date.now();
    let url = request.url;
    let requestMethod = request.method;
    if (!request.headers['requestid']) request.headers['requestid'] = uuid();
    logger('info', `REQUEST::${request.headers['requestid']} ${requestMethod} --> ${url} | IP - ${request.headers['x-forwarded-for'] || request.ip}`);

    response.on('finish', function () {
      logger('info', `RESPONSE::${request.headers['requestid']} ${requestMethod} --> ${url} --> ${response.statusCode} | ${(Date.now() - startTime)}ms`);
    });
    next();
  };
};
