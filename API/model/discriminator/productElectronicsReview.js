"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElectronicsReviewModel = void 0;

var _mongoose = require("mongoose");

var _productReviewModel = require("../productReviewModel");

var electronicsProductReviewSchema = new _mongoose.Schema({
  quality: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide quality rating for electronics"]
  },
  valueForMoney: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide Value For Money rating for electronics"]
  }
});
electronicsProductReviewSchema.pre("save", function (next) {
  this.averageReview = (this.quality + this.valueForMoney) / 2;
  next();
});

var ElectronicsReviewModel = _productReviewModel.BaseProductReviewModel.discriminator("ElectronicsReview", electronicsProductReviewSchema);

exports.ElectronicsReviewModel = ElectronicsReviewModel;