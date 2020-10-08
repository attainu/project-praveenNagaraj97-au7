"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secondLevelAdvertiseModel = exports.TopLevelAdvertiseModel = void 0;

var _mongoose = require("mongoose");

var advertisementSchema = new _mongoose.Schema({
  productId: {
    type: _mongoose.Schema.Types.ObjectId
  },
  link: {
    type: String,
    validate: {
      validator: function validator(val) {
        return this.productId ? false : true;
      },
      message: "Link is Allowed only when productId is not specified"
    }
  },
  soldTo: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide manufacturer Id Who is Buying!"]
  },
  startDate: {
    type: Date,
    required: [true, "Provide the start date from when the advertisement should be displayed"]
  },
  endDate: {
    type: Date,
    required: [true, "Provide the end date from when the advertisement should be taken-off"]
  }
});
var AdvertisementModel = (0, _mongoose.model)("PaidAdvertisement", advertisementSchema);
advertisementSchema.pre(/^find/, function (next) {
  this.populate({
    path: "productId",
    model: "Product",
    select: ["categoryId"]
  });
  next();
}); // only one advertisement allowed for time duration!!!

var topLevelAdvertiseSchema = new _mongoose.Schema({
  // 1k per-day
  amount: {
    type: Number,
    "enum": [1000],
    required: [true, "Amount per day"]
  },
  advertiseBoard: {
    type: String,
    required: [true, "Provide Advertisement board/image"]
  }
});
var TopLevelAdvertiseModel = AdvertisementModel.discriminator("TopLevelAdvertise", topLevelAdvertiseSchema); // 5 advertisements allowed

exports.TopLevelAdvertiseModel = TopLevelAdvertiseModel;
var secondLevelAdvertiseModel = AdvertisementModel.discriminator("SecondLevelAdvertise", new _mongoose.Schema({
  amount: {
    type: Number,
    "enum": [500],
    required: [true, "Amount per day"]
  },
  advertiseBoard: {
    type: String,
    required: [true, "Provide Advertisement board/image"]
  }
}));
exports.secondLevelAdvertiseModel = secondLevelAdvertiseModel;