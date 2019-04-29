/*
Author: Sumeet Kumar
Summary: This model contains Language schema, model and related functions
*/
'use strict';

const mongoose = require('mongoose');
const modelConstants = require('./constants');
const { baseSchema, addHelper } = require('./baseSchema');

const Schema = mongoose.Schema;

let languageFields = {
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    trim: true
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 60,
    trim: true
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 60,
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Category' })],

  },
  image: {
    type: String,
  },
  isActive: {  // inactive account / deactivated
    type: Boolean,
    default: true,
  }
};

const languageSchema = new Schema(Object.assign({}, languageFields, baseSchema),
  { runSettersOnQuery: true, timestamps: true });

addHelper(languageSchema);

let modelLanguage = mongoose.model('language', languageSchema);

module.exports = modelLanguage;
