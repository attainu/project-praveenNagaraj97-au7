"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeautyReviewModel = void 0;

var _mongoose = require("mongoose");

var _productReviewModel = require("../productReviewModel");

var beautyProductReviewSchema = new _mongoose.Schema({
  freshness: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide freshness rating for Beauty Product"]
  },
  packaging: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide rating for Package of product"]
  },
  valueForMoney: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide Value For Money rating for electronics"]
  }
});
beautyProductReviewSchema.pre("save", function (next) {
  this.averageReview = (this.packaging + this.valueForMoney + this.freshness) / 3;
  next();
});

var BeautyReviewModel = _productReviewModel.BaseProductReviewModel.discriminator("BeautyReview", beautyProductReviewSchema);

exports.BeautyReviewModel = BeautyReviewModel;