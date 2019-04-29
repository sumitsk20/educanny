/*
Summary: Date helper methods
Author: Sumeet Kumar (sumitsk20@gmail.com)
TODO:
*/
'use strict';

let nowUTC = () => (new Date()).getTime();

let nowIST = () => nowUTC() + 19800000;

module.exports = {
  nowIST,
  nowUTC
};
