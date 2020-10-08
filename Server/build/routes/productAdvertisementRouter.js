"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productAdvertisementRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _productsAdvertisementController = require("../controller/productsAdvertisementController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var upload = (0, _multer["default"])();
var productAdvertisementRouter = (0, _express.Router)();
exports.productAdvertisementRouter = productAdvertisementRouter;
productAdvertisementRouter.route("/buyTopLevelAdvertise").post(upload.array("advertiseBoard"), _productsAdvertisementController.protectRoute, (0, _productsAdvertisementController.restrictTo)("manufacturer"), _productsAdvertisementController.handleTopLevelAdvertiseBoard, _productsAdvertisementController.processTopLevelImage, _productsAdvertisementController.addNewTopLevelAdvertisement);
productAdvertisementRouter.route("/getTopLevelAdvertise").get(_productsAdvertisementController.getToplevelAdvertisement);