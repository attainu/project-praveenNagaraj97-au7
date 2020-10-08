"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "restrictTo", {
  enumerable: true,
  get: function get() {
    return _userHandler.restrictTo;
  }
});
Object.defineProperty(exports, "accreditReact", {
  enumerable: true,
  get: function get() {
    return _accreditReact.accreditReact;
  }
});
Object.defineProperty(exports, "preFillManufacturerWareHouseLocation", {
  enumerable: true,
  get: function get() {
    return _preFillers.preFillManufacturerWareHouseLocation;
  }
});
exports.manufacturerSignIn = exports.addNewManufacturer = exports.employeeSignIn = exports.addDevTeamUser = exports.updateMe = exports.changeUserPassword = exports.getMe = exports.resetPassword = exports.forgotPassword = exports.signIn = exports.signUp = exports.protectRoute = void 0;

var _UserModel = require("../model/UserModel");

var _discriminator = require("../model/discriminator");

var _userHandler = require("../handlers/userHandler");

var _accreditReact = require("../middleware/accreditReact");

var _preFillers = require("../middleware/preFillers");

var protectRoute = (0, _userHandler.protectRoute)(_UserModel.User);
exports.protectRoute = protectRoute;
var signUp = (0, _userHandler.signUpHandler)(_UserModel.User, {
  message: "Signed Up Successfully"
});
exports.signUp = signUp;
var signIn = (0, _userHandler.signInHandler)(_UserModel.User, {
  message: "Signed In Successfully"
});
exports.signIn = signIn;
var forgotPassword = (0, _userHandler.forgotPasswordHandler)(_UserModel.User, {
  message: "Reset Token Sent to registred mail address."
});
exports.forgotPassword = forgotPassword;
var resetPassword = (0, _userHandler.resetPasswordHandler)(_UserModel.User, {
  message: "Password reset Successfully"
});
exports.resetPassword = resetPassword;

var getMe = function getMe(req, res, next) {
  res.status(200).json({
    message: "requested user",
    user: req.user
  });
};

exports.getMe = getMe;
var changeUserPassword = (0, _userHandler.changeUserPasswordHandler)(_UserModel.User, {
  message: "Password Changed Successfully"
});
exports.changeUserPassword = changeUserPassword;
var updateMe = (0, _userHandler.updateUserDetails)(_UserModel.User, {
  message: "User Details Updated"
}); // dev

exports.updateMe = updateMe;
var addDevTeamUser = (0, _userHandler.addDeveloperHandler)(_discriminator.DevTeamUserModel, {
  message: "Successfully Added Employee"
});
exports.addDevTeamUser = addDevTeamUser;
var employeeSignIn = (0, _userHandler.employeeLoginHandler)(_discriminator.DevTeamUserModel, {
  message: "Logged in Successfully"
}); // Manufacturer

exports.employeeSignIn = employeeSignIn;
var addNewManufacturer = (0, _userHandler.addManufacturerHandler)(_discriminator.ManufacturerModel, {
  message: "Thank you for joining"
});
exports.addNewManufacturer = addNewManufacturer;
var manufacturerSignIn = (0, _userHandler.manufacturerLoginHandler)(_discriminator.ManufacturerModel, {
  message: "Logged In Successfully"
});
exports.manufacturerSignIn = manufacturerSignIn;