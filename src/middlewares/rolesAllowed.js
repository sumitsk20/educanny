/**
 * @author Sumeet Kumar
 * @summary This middleware is used to check if request.user is allowed to pass this middleware on basis of passed argument.
 */

const { errorResponse, httpCode } = require('../utils/controllerResponse');


module.exports = function (...alowedUserTypes) {
  return function (request, response, next) {

    if (!request.user || alowedUserTypes.indexOf(request.user.userType) == -1) {
      return errorResponse(request, response, httpCode.FORBIDDEN, false,
        'You don\'t have permission to perform this action',
        {
          fileName: 'rolesAllowed', functionName: 'rolesAllowed-NotAllowed',
          userObj: request.user,
          allowedUserType: alowedUserTypes,
          userType: request.user.userType
        }
      );
    }
    return next();
  };
};
