"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetReviewModel = void 0;

var _mongoose = require("mongoose");

var _productReviewModel = require("../productReviewModel");

var PetProductReviewSchema = new _mongoose.Schema({
  howHappyIsYourPet: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide pet happines rating for Pet Product"]
  },
  quality: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide freshness rating for Pet Product"]
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
PetProductReviewSchema.pre("save", function (next) {
  this.averageReview = (this.packaging + this.valueForMoney + this.quality + this.howHappyIsYourPet) / 4;
  next();
});

var PetReviewModel = _productReviewModel.BaseProductReviewModel.discriminator("PetReview", PetProductReviewSchema);

exports.PetReviewModel = PetReviewModel;