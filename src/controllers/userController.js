/*
@author: Sumeet Kumar

*/

const model = require('../models/userModel.js');
const { errorResponse, successResponse, httpCode } = require('../utils').controllerResponse;
let fileName = 'userController';


let createNew = function (request, response) {
  model.create(request.body)
    .then((result) => {
      return successResponse(response, httpCode.OK_REQUEST, result);
    })
    .catch((error) => {
      return errorResponse(request, response, httpCode.BAD_REQUEST, error, false, { functionName: 'createNew', fileName });
    });
};

let getList = function (request, response) {
  model.getByQuery(request.query).populate('createdBy', 'firstName lastName image')
    .then((result) => {
      return successResponse(response, httpCode.OK_REQUEST, result);
    })
    .catch((error) => {
      return errorResponse(request, response, httpCode.BAD_REQUEST, error, false, { functionName: 'getList', fileName });
    });
};

let getDetail = function (request, response) {
  model.getById(request.params.id).populate('createdBy', 'firstName lastName image')
    .then((result) => {
      return successResponse(response, httpCode.OK_REQUEST, result);
    })
    .catch((error) => {
      return errorResponse(request, response, httpCode.BAD_REQUEST, error, false, { functionName: 'getDetail', fileName });
    });
};

let updateObj = (request, response) => {
  model.update(request.params.id, request.body).populate('createdBy', 'firstName lastName image')
    .then((result) => {
      if (!result) return errorResponse(request, response, httpCode.NOT_FOUND, false, false, { functionName: 'updateObj', fileName });
      return successResponse(response, httpCode.OK_REQUEST, result);
    })
    .catch((error) => {
      return errorResponse(request, response, httpCode.BAD_REQUEST, error, false, { functionName: 'updateObj', fileName });
    });
};

module.exports = {
  createNew,
  getList,
  updateObj,
  getDetail
};
