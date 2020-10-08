"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Order = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var orderSchema = new _mongoose.Schema({
  paymentId: {
    type: String,
    required: [true, "Provide Payment Succedded Id"]
  },
  paid: {
    type: Boolean,
    "default": false
  },
  amount: {
    type: Number,
    required: [true, "Provide total amount of the order"]
  },
  item: {
    type: _mongoose.Schema.Types.ObjectId
  },
  quantity: {
    type: Number,
    min: 1
  },
  manufacturerId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  delivered: {
    type: String,
    "enum": ["delivered", "not-delivered", "cancelled", "pending", "dispatched", "confirmed"],
    "default": "pending"
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
orderSchema.plugin(_mongooseUniqueValidator["default"]);
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "item",
    model: "Product"
  }).populate({
    path: "userId",
    model: "User",
    select: ["name", "email", "phoneNumber"]
  }).populate({
    path: "manufacturerId",
    model: "Manufacturer",
    select: ["email", "companyName", "phoneNumber", "warehouseLocation"]
  });
  next();
});
var Order = (0, _mongoose.model)("Order", orderSchema);
exports.Order = Order;