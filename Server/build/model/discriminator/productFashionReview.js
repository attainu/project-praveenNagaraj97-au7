"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FashionReviewModel = void 0;

var _mongoose = require("mongoose");

var _productReviewModel = require("../productReviewModel");

var fashionProductReviewSchema = new _mongoose.Schema({
  fitting: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide fitting rating for Fashion Product"]
  },
  quality: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide freshness rating for Fashion Product"]
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
fashionProductReviewSchema.pre("save", function (next) {
  this.averageReview = (this.packaging + this.valueForMoney + this.quality + this.fitting) / 4;
  next();
});

var FashionReviewModel = _productReviewModel.BaseProductReviewModel.discriminator("FashionReview", fashionProductReviewSchema);

exports.FashionReviewModel = FashionReviewModel;