/*
Author: Sumeet Kumar
Summary: This file contains Util methods for using Bcrypt.
*/
'use strict';
const bcrypt = require('bcrypt');

function generateHash(plainText, salt){
  // This method returns a promise
  salt = Number(process.env.SECRET_SALT) ? Number(process.env.SECRET_SALT) : salt;
  return bcrypt.hash(plainText, salt);
}

function compareHash(plainText, hash){
  // This method returns a promise
  return bcrypt.compare(plainText, hash);
}

module.exports = {
  generateHash,
  compareHash
};
