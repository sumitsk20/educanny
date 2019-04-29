/*
@author: Sumeet Kumar
*/

const route = require('express').Router();

const controller = require('../controllers/userController');

const { isAuthenticated, addCreatedByMiddleware } = require('../middlewares');

route.get('/', controller.getList);
route.post('/', [isAuthenticated, addCreatedByMiddleware], controller.createNew);
route.get('/:id', controller.getDetail);
route.put('/:id', [isAuthenticated, addCreatedByMiddleware], controller.updateObj);


module.exports = route;
