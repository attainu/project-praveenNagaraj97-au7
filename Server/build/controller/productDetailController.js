"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "protectRoute", {
  enumerable: true,
  get: function get() {
    return _userController.protectRoute;
  }
});
Object.defineProperty(exports, "restrictTo", {
  enumerable: true,
  get: function get() {
    return _userController.restrictTo;
  }
});
Object.defineProperty(exports, "preCheckifProductUpdateDetailVideoHasFileAttached", {
  enumerable: true,
  get: function get() {
    return _preChecks.preCheckifProductUpdateDetailVideoHasFileAttached;
  }
});
Object.defineProperty(exports, "preFillProductdetailedDescription", {
  enumerable: true,
  get: function get() {
    return _productPreFillers.preFillProductdetailedDescription;
  }
});
exports.updateProductDetailVideo = exports.checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo = exports.addDetailForProduct = exports.processProductDetailVideo = exports.handleProductDetailVideo = void 0;

var _ProductDetailModel = require("../model/ProductDetailModel");

var _constants = require("../constants");

var _factoryHandler = require("../handlers/factoryHandler");

var _imageProcessMiddleware = require("../middleware/imageProcessMiddleware");

var _userController = require("./userController");

var _preChecks = require("../middleware/preChecks");

var _productPreFillers = require("../middleware/productPreFillers");

// This Controller doesn't have ay get Endpoints
// as this gets called along with get Products endpoint as a virtual Prop
var PRODUCT_DETAILS_VIDEOS = _constants.GCS_BUCKET_NAME.PRODUCT_DETAILS_VIDEOS;
var handleProductDetailVideo = (0, _imageProcessMiddleware.handleVideoUpload)(1, PRODUCT_DETAILS_VIDEOS, false, true);
exports.handleProductDetailVideo = handleProductDetailVideo;
var processProductDetailVideo = (0, _imageProcessMiddleware.processSingleVideo)("productVideo", true);
exports.processProductDetailVideo = processProductDetailVideo;
var addDetailForProduct = (0, _factoryHandler.createNewDocumnet)(_ProductDetailModel.ProductDetailModel, {
  message: "Product Detail Added"
}); // Edit Option are limited to certain fields !! to restrict product details being spammed!!!

exports.addDetailForProduct = addDetailForProduct;
var checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo = (0, _preChecks.preCheckIfPreviousVideoExistsAndDelete)(_ProductDetailModel.ProductDetailModel, PRODUCT_DETAILS_VIDEOS, "productVideo");
exports.checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo = checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo;
var updateProductDetailVideo = (0, _factoryHandler.updateDocumentByField)(_ProductDetailModel.ProductDetailModel, {
  message: "Product Detail Video Updated"
});
exports.updateProductDetailVideo = updateProductDetailVideo;