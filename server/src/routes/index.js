/*
@author: Sumeet Kumar
@summary: Main route file. This will work as a collaborator for all route files.
  This will export router on module level.
*/

const express = require('express');
const route = express.Router();

route.use('/auth', require('./authRoutes'));
route.use('/users', require('./userRoutes'));
route.use('/categories', require('./categoryRoutes'));
route.use('/languages', require('./languageRoutes'));
route.use('/courses', require('./courseRoutes'));

// export related route
module.exports = route;
