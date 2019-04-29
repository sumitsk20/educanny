/*
Author: Sumeet Kumar
Summary: This model contains Language schema, model and related functions
*/
'use strict';

const mongoose = require('mongoose');
const modelConstants = require('./constants');
const { baseSchema, addHelper } = require('./baseSchema');

const Schema = mongoose.Schema;

let courseFields = {
  name: {
    type: String,
    minlength: 2,
    maxlength: 80,
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Name' })],
    trim: true
  },
  tags: [{
    type: String,
    minlength: 2,
    maxlength: 12,
    trim: true
  }],
  description: {
    type: String,
    minlength: 2,
    maxlength: 250,
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Category' })],
  },
  language: {
    type: Schema.Types.ObjectId,
    ref: 'language',
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Language' })],
  },
  image: {
    type: String,
  },
  sourceLink: {
    type: String,
    minlength: 2,
    maxlength: 256,
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Source Link' })],
    trim: true
  },
  sourceWebsite: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Source Website' })],
    trim: true
  },
  votes: {
    type: Number,
    default: 0
  },
  isTrending: {  // inactive account / deactivated
    type: Boolean,
    default: false,
  },
  isActive: {  // inactive account / deactivated
    type: Boolean,
    default: true,
  }
};

const courseSchema = new Schema(Object.assign({}, courseFields, baseSchema),
  { runSettersOnQuery: true, timestamps: true });

addHelper(courseSchema);

let modelCourse = mongoose.model('course', courseSchema);

module.exports = modelCourse;
