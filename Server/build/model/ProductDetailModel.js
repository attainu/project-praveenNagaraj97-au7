"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductDetailModel = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productDetailSchema = new _mongoose.Schema({
  productId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  featuresList: {
    type: [String],
    required: [true, "Enter List Of Feature for this Mobile"]
  },
  productVideo: {
    type: String
  },
  productDetails: {
    type: Object
  }
});
productDetailSchema.plugin(_mongooseUniqueValidator["default"]);
productDetailSchema.pre(/^find/, function (next) {
  this.populate({
    path: "manufacturerId",
    model: "User"
  });
  next();
});
var ProductDetailModel = (0, _mongoose.model)("ProductDetail", productDetailSchema);
exports.ProductDetailModel = ProductDetailModel;