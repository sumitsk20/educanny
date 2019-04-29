/*
Summary: middleware initializer
Author: Sumeet Kumar
*/
'use strict';

module.exports = {
  corsHandler: require('./corsHandler'),
  responseTracker: require('./responseTracker'),
  rolesAllowed: require('./rolesAllowed'),
  isAuthenticated: require('./isAuthenticated'),
  addCreatedByMiddleware: require('./addCreatedByMiddleware')
};
