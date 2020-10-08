"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoodReviewModel = void 0;

var _mongoose = require("mongoose");

var _productReviewModel = require("../productReviewModel");

var foodProductReviewSchema = new _mongoose.Schema({
  taste: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide fitting rating for Food Product"]
  },
  quantity: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide freshness rating for Food Product"]
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
    required: [true, "Provide Value For Money rating for food"]
  }
});
foodProductReviewSchema.pre("save", function (next) {
  this.averageReview = (this.packaging + this.valueForMoney + this.quantity + this.taste) / 4;
  next();
});

var FoodReviewModel = _productReviewModel.BaseProductReviewModel.discriminator("FoodReview", foodProductReviewSchema);

exports.FoodReviewModel = FoodReviewModel;