/*
Author: Sumeet Kumar, authMiddleware
Summary: This file contains a middleware function that verifies the given JWT and checks the global redis
  to ensure that the session exists.
*/
const JWT_UTIL = require('../utils').utilJWT;
const UserModel = require('../models/userModel.js');
const { errorResponse, httpCode } = require('../utils').controllerResponse;

module.exports = function (request, response, next) {
  const authToken = request.headers['authorization'] || request.headers['Authorization'] || request.headers['authentication'];
  if (!authToken) return errorResponse(request, response, httpCode.UNAUTHORIZED, false, 'You must be logged in to perform this action', { fileName: 'isAuthenticated', functionName: 'isAuthenticatedMiddleware-NoToken' });
  else {
    try {
      JWT_UTIL.verifyJWT(authToken);
    } catch (error) {
      return errorResponse(request, response, httpCode.UNAUTHORIZED, error, false, { fileName: 'authMiddleware', functionName: 'authMiddeware-invalidAuthPayload' });
    }
    UserModel.getUserByToken(authToken).then((user) => {
      if (!user) return errorResponse(request, response, httpCode.UNAUTHORIZED, false, 'Your session is expired, please login again', { fileName: 'isAuthenticated', functionName: 'isAuthenticatedMiddleware-SessionExpired' });
      else {
        request.user = user;
        request.token = authToken;
        next();
      }
    }).catch((error) => {
      return errorResponse(request, response, httpCode.UNAUTHORIZED, error, 'Invalid Token, are you robot or what?', { fileName: 'isAuthenticated', functionName: 'isAuthenticatedMiddleware-InvalidToken' });
    });
  }
};
