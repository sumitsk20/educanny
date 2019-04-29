/*
Author: Sumeet Kumar
Summary: This file will contain the commonly used model functions like regex for phone and email.
*/
'use strict';

// Utility email regex matching function
let emailRegexChecker = function (value) {
  const emailRegex = new RegExp('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$');
  return emailRegex.test(value);
};

// Utility phone regex matching function
// @TODO: Find a suitable phone regex for Indian phone numbers
let phoneRegexChecker = function (value) {
  const phoneRegex = new RegExp('');
  return phoneRegex.test(value);
};

let arrayLengthValidator = function (array) {
  return array.length > 0;
};

module.exports = {
  emailRegexChecker,
  phoneRegexChecker,
  arrayLengthValidator
};
