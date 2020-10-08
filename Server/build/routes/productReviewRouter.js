"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productReviewRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _productReviewController = require("../controller/productReviewController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var upload = (0, _multer["default"])();
var productReviewRouter = (0, _express.Router)();
exports.productReviewRouter = productReviewRouter;
productReviewRouter.route("/getReviews").get(_productReviewController.getProductReviewBasedOnProductId);
productReviewRouter.route("/foundHelpful/:bool").post(_productReviewController.protectRoute, _productReviewController.preFillUserId, _productReviewController.preFillReviewHelpulForLikeOrUndo, _productReviewController.reviewHelpfulPost);
productReviewRouter.route("/addMobileReview").post(upload.array("productReviewImage"), // (req, res, next) => {
//   console.log(req.files);
//   res.send(req.files);
// },
_productReviewController.protectRoute, _productReviewController.preFillUserId, _productReviewController.handleProductReviewImage, _productReviewController.processProductReviewImage, _productReviewController.addProductMobileReview);
productReviewRouter.route("/addComputerReview").post(upload.array("productReviewImage"), // (req, res, next) => {
//   res.send(req.files);
// },
_productReviewController.protectRoute, _productReviewController.preFillUserId, _productReviewController.handleProductReviewImage, _productReviewController.processProductReviewImage, _productReviewController.addProductComputerReview);
productReviewRouter.route("/addElectronicsReview").post(upload.array("productReviewImage"), _productReviewController.protectRoute, _productReviewController.preFillUserId, _productReviewController.handleProductReviewImage, _productReviewController.processProductReviewImage, _productReviewController.addProductElectronicsReview);
productReviewRouter.route("/addBeautyReview").post(upload.array("productReviewImage"), _productReviewController.protectRoute, _productReviewController.preFillUserId, _productReviewController.handleProductReviewImage, _productReviewController.processProductReviewImage, _productReviewController.addProductBeautyReview);
productReviewRouter.route("/addFashionReview").post(upload.array("productReviewImage"), _productReviewController.protectRoute, _productReviewController.preFillUserId, _productReviewController.handleProductReviewImage, _productReviewController.processProductReviewImage, _productReviewController.addProductFashionReview);
productReviewRouter.route("/addKitchenReview").post(upload.array("productReviewImage"), _productReviewController.protectRoute, _productReviewController.preFillUserId, _productReviewController.handleProductReviewImage, _productReviewController.processProductReviewImage, _productReviewController.addProductKitchenReview);
productReviewRouter.route("/addPetReview").post(upload.array("productReviewImage"), _productReviewController.protectRoute, _productReviewController.preFillUserId, _productReviewController.handleProductReviewImage, _productReviewController.processProductReviewImage, _productReviewController.addProductPetReview);
productReviewRouter.route("/addFoodReview").post(upload.array("productReviewImage"), _productReviewController.protectRoute, _productReviewController.preFillUserId, _productReviewController.handleProductReviewImage, _productReviewController.processProductReviewImage, _productReviewController.addProductFoodReview);