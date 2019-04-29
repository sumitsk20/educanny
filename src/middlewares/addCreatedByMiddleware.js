/**
 * @author: Sumeet Kumar
 * @description: This middleware add created by to any objeft created by request user.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 */

const { errorResponse, httpCode } = require('../utils').controllerResponse;

module.exports = function (request, response, next) {
  let userMessage = 'You should login to perform this action';
  try {
    if (!request.path.contains('signup') && request.method === 'POST') {
      request.body.createdBy = request.user.id;
    }
    next();
  } catch (error) {
    return errorResponse(request, response, httpCode.UNAUTHORIZED, error, userMessage, {
      action: 'addCreatedByMiddleware',
      filename: 'addCreatedByMiddleware',
    });
  }
};
