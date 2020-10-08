"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevTeamUserModel = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var _UserModel = require("../UserModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @access only owner/Manager can add the devs account
 * and on successful adding, developers get Email with their Emp-Id and Password(Which they can change)
 * @description Dev Team users are only allowed to login via Emp-Id and Password
 */
var devTeamUserSchema = new _mongoose.Schema({
  techRole: {
    type: String,
    "enum": ["Technical Support", "keyboarders", "Advertisement Team"],
    required: [true, "Provide Job Role for the Employess"]
  },
  profilePic: {
    type: String
  },
  address: {
    type: String,
    required: [true, "Provide employee address"]
  },
  empId: {
    type: String,
    unique: true
  }
});
devTeamUserSchema.plugin(_mongooseUniqueValidator["default"]);

var DevTeamUserModel = _UserModel.User.discriminator("DevTeam", devTeamUserSchema);

exports.DevTeamUserModel = DevTeamUserModel;