/*
Summary: USE to check CORS
Author: Sumeet Kumar
TODO:
*/
'use strict';

module.exports = function (allowedOrigins) {
  allowedOrigins = (process.env.ALLOWED_HOSTS || '').split('::::');
  if (process.env.NODE_ENV !== 'localhost' && (allowedOrigins[0] == '' || allowedOrigins.length < 1)) {
    throw new Error('Please set allowed Origins before running service in dev/staging/production');
  }

  return function (request, response, next) {
    // Website you wish to allow to connect
    let origin = request.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      response.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers',
      'X-Requested-With, content-type, authorization, password, authentication, \
      dauthentication, deviceType');

    next();
  };
};
