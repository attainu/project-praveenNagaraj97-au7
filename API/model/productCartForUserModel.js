"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProductCart = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userProductCartSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide UserId!"],
    unique: true
  },
  cartItems: {
    type: [_mongoose.Schema.Types.ObjectId]
  }
});
userProductCartSchema.plugin(_mongooseUniqueValidator["default"]);
var UserProductCart = (0, _mongoose.model)("UserProductCart", userProductCartSchema);
exports.UserProductCart = UserProductCart;