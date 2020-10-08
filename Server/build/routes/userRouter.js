"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = void 0;

var _express = require("express");

var _userController = require("../controller/userController");

var userRouter = (0, _express.Router)();
exports.userRouter = userRouter;
userRouter.route("/signup").post(function (req, res, next) {
  req.body.userRole = "user";
  next();
}, _userController.signUp);
userRouter.route("/signin").post(_userController.signIn);
userRouter.route("/updateme").patch(_userController.protectRoute, (0, _userController.restrictTo)("user"), _userController.updateMe);
userRouter.route("/forgotPassword").post(_userController.forgotPassword);
userRouter.route("/resetPassword/:token").post(_userController.resetPassword);
userRouter.route("/getMe").get(_userController.protectRoute, (0, _userController.restrictTo)("user"), _userController.getMe);
userRouter.route("/changePassword").post(_userController.protectRoute, (0, _userController.restrictTo)("user", "dev"), _userController.changeUserPassword); // Don't Modify This Route
// Exclusive for FrontEnd Auth.

userRouter.route("/accredit").get(_userController.protectRoute, _userController.accreditReact); // Dev team

userRouter.route("/employeeSignUp").post( // protectRoute,
function (req, res, next) {
  req.body.userRole = "dev";
  next();
}, _userController.addDevTeamUser);
userRouter.route("/employeeSignIn").post(_userController.employeeSignIn); // manufacturer / Seller

userRouter.route("/signUpasManufacturer").post(function (req, res, next) {
  req.body.userRole = "manufacturer";
  next();
}, _userController.preFillManufacturerWareHouseLocation, _userController.addNewManufacturer);
userRouter.route("/manufacturerSignIn").post(_userController.manufacturerSignIn);