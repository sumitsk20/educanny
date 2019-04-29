/*
Author: Sumeet Kumar
Summary: This model contains Category schema, model and related functions
*/
'use strict';

const mongoose = require('mongoose');

const modelConstants = require('./constants');
const { baseSchema, addHelper } = require('./baseSchema');

const Schema = mongoose.Schema;

let categoryFields = {
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    trim: true,
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Name' })],

  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
};

const categorySchema = new Schema(Object.assign({}, categoryFields, baseSchema),
  { runSettersOnQuery: true, timestamps: true });

addHelper(categorySchema);

let modelCategory = mongoose.model('category', categorySchema);

module.exports = modelCategory;
