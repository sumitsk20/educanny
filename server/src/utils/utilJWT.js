
const jwt = require('jsonwebtoken');


let options = {
  issuer: 'educanny',
  subject: 'educannyToken',
  expiresIn: process.env.JWT_TOKEN_EXPIRATION || '30d',
};

let generateJWT = function (payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, options);
};

let decodeJWT = function (token) {
  return jwt.decode(token, process.env.SECRET_KEY, options);
};

let verifyJWT = function (token) {
  console.log(process.env.SECRET_KEY);
  return jwt.verify(token, process.env.SECRET_KEY, options);
};

module.exports = {
  generateJWT,
  verifyJWT,
  decodeJWT
};
