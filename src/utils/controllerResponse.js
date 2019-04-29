/*
Author: Sumeet Kumar
Summary: This file contain functions to send response.
*/
'use strict';

const Q = require('q');
const { httpMessage, httpCode } = require('./httpConstant');
// let logger = require('../logging')(process.env.SERVICE_NAME, 'controllerResponse');
let logger = require('./logging/logger');

let errorResponse = function (request, response, code, error, userMessage, extraInfo) {
  let msg = '';
  let errRes = {};
  if (error) {
    if (error.code === 11000) userMessage = 'Entity with similar data already exist.';
    if (error.name === 'ValidationError') {
      userMessage = Object.entries(error.errors).map(item => ({ [item[0]]: item[1].message }));
    }
    msg = userMessage || error.message || httpMessage[code], errRes = {
      message: msg,
      stack: error.stack ? error.stack : (error.error ? error.error.stack : null),
      internalCode: error.code || error.errno,
      errorName: error.name || error.type,
      internalMessage: error.message,
      errorObject: error || error.errors
    };
  } else {
    msg = userMessage || httpMessage[code];
    errRes = {
      message: msg,
    };
  }
  let requestData = {
    requestID: request.headers['requestid'],
    requestQuery: request.query,
    requestParam: request.param,
    requestBody: request.body || request.data,
    requestIp: request.ips || request.ip,
    requestHeaders: request.headers,
  };
  logger('error', msg, {
    httpCode: code,
    error: errRes,
    extraInfo: extraInfo,
    requestData: requestData,
    action: 'errorResponse',
  });
  if (process.env.NODE_ENV === 'production') {
    delete errRes.stack;
    delete errRes.errorObject;
  }
  return response.status(code).json({
    statusCode: code,
    error: errRes,
    requestID: request.headers['requestid'],
  });
};


let successResponse = function (response, code, result) {
  if (result == null) {
    return response.sendStatus(code);
  } else {
    if (result.result) {
      return response.status(code).json({
        statusCode: code,
        ...result,
      });
    }
    return response.status(code).json({
      statusCode: code,
      result,
    });
  }
};

let paginatedResponse = function (response, code, result, next, prev, offset, count, totalCount) {
  return response.status(code).json({
    statusCode: code,
    next,
    prev,
    offset,
    count,
    totalCount,
    result
  });
};

let getPaginatedList = function (mongooseModel, options = { findQuery: {}, orderBy: -1, offset: 0, limit: 20, select: null }) {

  let deferred = Q.defer();

  if (!options) options = {};

  options.limit = Number(options.limit || 20);
  options.offset = Math.max(0, Number(options.offset || 0));
  options.findQuery = options.findQuery || {};
  if (options.orderBy) {
    options.orderBy = typeof options.orderBy === 'number' ? { createdAt: options.orderBy }
      : typeof options.orderBy === 'object' ? options.orderBy : { createdAt: -1 };
  } else {
    options.orderBy = { createdAt: -1 };
  }

  let query = mongooseModel.find(options.findQuery).sort(options.orderBy).limit(options.limit).skip((options.limit * options.offset));
  if (options.select) query = query.select(options.select);
  query.exec((error, result) => {
    if (error) deferred.reject(error);
    else deferred.resolve(result);
  });

  return deferred.promise;
};

module.exports = {
  httpCode,
  httpMessage,
  errorResponse,
  successResponse,
  paginatedResponse,
  getPaginatedList
};
