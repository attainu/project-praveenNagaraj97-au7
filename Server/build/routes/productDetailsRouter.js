"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productDetailRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _productDetailController = require("../controller/productDetailController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productDetailRouter = (0, _express.Router)();
exports.productDetailRouter = productDetailRouter;
var upload = (0, _multer["default"])();
productDetailRouter.route("/addDetail/detail").post(upload.array("productVideo"), _productDetailController.protectRoute, (0, _productDetailController.restrictTo)("manufacturer"), _productDetailController.preFillProductdetailedDescription, _productDetailController.handleProductDetailVideo, _productDetailController.processProductDetailVideo, _productDetailController.addDetailForProduct);
productDetailRouter.route("/updateProductDetailVideo").patch(_productDetailController.preCheckifProductUpdateDetailVideoHasFileAttached, _productDetailController.checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo, _productDetailController.handleProductDetailVideo, _productDetailController.processProductDetailVideo, _productDetailController.updateProductDetailVideo);