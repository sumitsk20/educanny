/*
@author: Sumeet Kumar
*/

const route = require('express').Router();

const authController = require('../controllers/authController');
// const { isAuthenticated } = require('../middlewares');

route.post('/register', authController.registerUser);
route.post('/login', authController.loginUserByPassword);
route.post('/logout', authController.logout);


module.exports = route;
