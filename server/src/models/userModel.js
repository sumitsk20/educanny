/*
Author: Sumeet Kumar
Summary: This model contains User schema, model and related functions
*/
'use strict';

const mongoose = require('mongoose');

const modelConstants = require('./constants');
const modelUtil = require('./modelUtils');
const { utilBycrypt, utilDate, utilJWT } = require('../utils');

const { baseSchema, addHelper } = require('./baseSchema');

const Schema = mongoose.Schema;

let userFields = {
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    default: '',
    trim: true
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    default: '',
    trim: true
  },
  countryCode: {
    type: String,
    minlength: 1,
    maxlength: 3,
    trim: true,
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Country Code' })],
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
    trim: true,
    validate: {
      validator: modelUtil.phoneRegexChecker,
      message: '{VALUE} is not a valid mobile number.'
    },
    unique: true,
    sparse: true,
    index: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
    sparse: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: modelUtil.emailRegexChecker,
      message: '{VALUE} is not a valid email.'
    },
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Email' })],
  },
  password: {
    type: String,
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Password' })],
    minlength: 8
  },
  image: {
    type: String,
  },
  userType: {
    type: String,
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'User Type' })],
    enum: modelConstants.ENUM_USERTYPES,
    lowercase: true,
    trim: true,
    index: true
  },
  tokens: {
    type: [{
      _id: false,
      token: {
        type: String,
        required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Token' })],
      }
    }],
    default: null,
  },
  isBlocked: { // blocked by admin
    type: Boolean,
    default: false,
  },
  isActive: {  // inactive account / deactivated
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Number,
  }
};

const userSchema = new Schema(Object.assign({}, userFields, baseSchema),
  { runSettersOnQuery: true, timestamps: true });

addHelper(userSchema);

userSchema.statics.createObj = function (data) {
  let userObj = new this(data);
  if (data.password) {
    return utilBycrypt.generateHash(userObj.password).then((hash) => {
      userObj.password = hash;
      return userObj.save();
    });
  } else {
    return userObj.save();
  }
};

userSchema.statics.getByEmail = function (email) {
  return this.findOne({ email });
};

userSchema.statics.getByPhone = function (phone) {
  return this.findOne({ phone });
};

userSchema.virtual('getFullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

// userSchema.virtual('getFullNumber').get(function () {
//   let mobile = this.countryCode + '' + this.phone;
//   return Number(mobile);
// });

userSchema.methods.generateAuthToken = function () {
  let user = this;
  let payload = {
    'userId': mongoose.Types.ObjectId(user._id),
    'userType': user.userType
  };
  let token = utilJWT.generateJWT(payload);
  user.tokens.push({ token });
  user.lastLogin = utilDate.nowUTC();
  user.save().then();
  return token;
};

userSchema.statics.getUserByToken = function (token) {
  let decoded = utilJWT.verifyJWT(token);
  return this.findOne({ 'tokens.token': token, _id: decoded.userId });
};

let modelUser = mongoose.model('user', userSchema);

module.exports = modelUser;
