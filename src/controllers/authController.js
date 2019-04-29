/*
@author: Sumeet Kumar
*/

const UserModel = require('../models/userModel');
const { errorResponse, successResponse, httpCode } = require('../utils').controllerResponse;
const bcryptUtil = require('../utils/utilBycrypt');
let fileName = 'authController';


let registerUser = function (request, response) {
  UserModel.createObj(request.body)
    .then((user) => {
      let authToken = user.generateAuthToken();
      const responseJson = user.toJSON();
      responseJson['authToken'] = authToken;
      return successResponse(response, httpCode.OK_REQUEST, responseJson);
    })
    .catch((error) => {
      return errorResponse(request, response, httpCode.BAD_REQUEST, error, false, { functionName: 'registerUser', fileName });
    });
};
let loginUserByPassword = function (request, response) {
  if (!request.body.phone || !request.body.password) {
    return errorResponse(request, response, httpCode.BAD_REQUEST, false, false, { functionName: 'loginUserByPassword', fileName });
  }
  UserModel.getByPhone(request.body.phone).then((user) => {
    if (bcryptUtil.compareHash(request.body.password, user.password)) {
      let authToken = user.generateAuthToken();
      const responseJson = user.toJSON();
      responseJson['authToken'] = authToken;
      return successResponse(response, httpCode.OK_REQUEST, responseJson);
    }
  }).catch((error) => {
    return errorResponse(request, response, httpCode.BAD_REQUEST, error, false, { functionName: 'loginUserByPassword', fileName });
  });
};

let logout = function (request, response) {
  if (!request.body.logoutAll) {
    UserModel.getUserByToken(request.token).then((user) => {
      user.tokens = [];
      user.save();
      return successResponse(response, httpCode.OK_REQUEST, {});
    }).catch((error) => {
      return errorResponse(request, response, httpCode.BAD_REQUEST, error, false, { functionName: 'logout', fileName });
    });
  } else {
    UserModel.getUserByToken(request.token).then((user) => {
      user.tokens.pop(request.token);
      user.save();
      return successResponse(response, httpCode.OK_REQUEST, {});
    }).catch((error) => {
      return errorResponse(request, response, httpCode.BAD_REQUEST, error, false, { functionName: 'logout', fileName });
    });
  }
};

module.exports = {
  registerUser,
  loginUserByPassword,
  logout,
};
