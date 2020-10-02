"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductDetailModel = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productDetailSchema = new _mongoose.Schema({
  // Irrespitive of the mobile sub-type the details applies to all model,
  //   For this Ids Same details will be Shown
  productId: {
    type: [_mongoose.Schema.Types.ObjectId],
    required: [true, "productId needs to be provided in order to Get This details, at time of querying!"],
    unique: true
  },
  manufacturerId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "please Enter Manufacture Id"]
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