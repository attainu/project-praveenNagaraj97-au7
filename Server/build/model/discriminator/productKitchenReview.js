"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KitchenReviewModel = void 0;

var _mongoose = require("mongoose");

var _productReviewModel = require("../productReviewModel");

var kitchenProductReviewSchema = new _mongoose.Schema({
  quality: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide freshness rating for Kitchen Product"]
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
    required: [true, "Provide Value For Money rating for Kitchen utensiles"]
  }
});
kitchenProductReviewSchema.pre("save", function (next) {
  this.averageReview = (this.packaging + this.valueForMoney + this.quality) / 3;
  next();
});

var KitchenReviewModel = _productReviewModel.BaseProductReviewModel.discriminator("KitchenReview", kitchenProductReviewSchema);

exports.KitchenReviewModel = KitchenReviewModel;