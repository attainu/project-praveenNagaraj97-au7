"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComputerReviewModel = void 0;

var _mongoose = require("mongoose");

var _productReviewModel = require("../productReviewModel");

var computerReviewSchema = new _mongoose.Schema({
  portability: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide Portability of Product(Based on Battery Life Under a mix of light, and heavy task, size and weight.)"]
  },
  graphics: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide Rating Based on graphics"]
  },
  processor: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide Rating for processor"]
  },
  storage: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide Rating Based on storage"]
  },
  valueForMoney: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide Rating for value for money"]
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
computerReviewSchema.pre("save", function (next) {
  this.averageReview = (this.portability + this.graphics + this.processor + this.storage + this.valueForMoney) / 5;
  next();
});

var ComputerReviewModel = _productReviewModel.BaseProductReviewModel.discriminator("ComputersReview", computerReviewSchema);

exports.ComputerReviewModel = ComputerReviewModel;