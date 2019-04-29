/*
@author: Sumeet Kumar
*/

const route = require('express').Router();
const controller = require('../controllers/categoryController');


route.get('/', controller.getList);
route.post('/', controller.createNew);
route.get('/:id', controller.getDetail);
route.put('/:id', controller.updateObj);


module.exports = route;
