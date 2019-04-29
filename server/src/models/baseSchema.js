/**
 * @author: Sumeet Kumar
 * @description: This file contain base fields, methods and schema for all other schema.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaTranslator = {
  getters: true, virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    if (ret.createdAt) { ret.createdAt = ret.createdAt.getTime(); }
    if (ret.updatedAt) { ret.updatedAt = ret.updatedAt.getTime(); }
    delete ret.password;
    delete ret.tokens;
    delete ret.__v;
  }
};

let getByQuery = function (model, query) {
  return model.find(query);
};

let getById = function (model, _id) {
  return model.findOne({ _id });
};

let update = function (model, _id, data) {
  return model.findByIdAndUpdate(_id, { $set: data }, { new: true });
};

let updateInstance = function (obj, data) {
  for (let key in data) {
    obj[key] = data[key];
  }
  return obj.save();
};

let createObj = function (mongooseModel, data) {
  let obj = new mongooseModel(data);
  return obj.save();
};

function addHelper(mongooseModel) {
  mongooseModel.set('toObject', schemaTranslator);
  mongooseModel.set('toString', schemaTranslator);
  mongooseModel.set('toJSON', schemaTranslator);

  mongooseModel.statics.getByQuery = function (query) {
    return getByQuery(this, query);
  };

  mongooseModel.statics.getById = function (_id) {
    return getById(this, _id);
  };

  mongooseModel.statics.update = function (_id, data) {
    return update(this, _id, data);
  };

  mongooseModel.methods.updateInstance = function (data) {
    return updateInstance(this, data);
  };

  mongooseModel.statics.create = function (data) {
    return createObj(this, data);
  };
  mongooseModel.methods.isOwnedBy = function (user) {
    // this method is supposed to recieve created_by object as parameter and will compare the id for ownership.
    if (!this.created_by) {
      return String(this._id) === String(user.id) || String(this.user) === String(user.id) || String(this.user._id) === String(user.id);
    } else {
      return String(this.created_by._id) === String(user.id) || String(this.created_by) === String(user.id);
    }
  };
}

let baseSchema = {
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  deletedAt: {
    type: Number,
  },
};

module.exports = {
  baseSchema,
  addHelper,
};
