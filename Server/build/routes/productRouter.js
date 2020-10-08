"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _productsController = require("../controller/productsController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productRouter = (0, _express.Router)();
exports.productRouter = productRouter;
var upload = (0, _multer["default"])(); // Public Routes

productRouter.route("/getProducts").get(_productsController.getAllProducts, _productsController.getAllProductsWithAverageReviewAttached);
productRouter.route("/getProductDetailsWithProductIds").post(_productsController.preFillCartIdasParams, _productsController.getProductDetailsWithProductIds);
productRouter.route("/getProduct").get(_productsController.getProduct); // Seller Route
// DevRoute

productRouter.route("/dev/addNewProduct").post(upload.array("productCoverImage"), _productsController.protectRoute, (0, _productsController.restrictTo)("manufacturer"), _productsController.preFillManufacturerId, _productsController.getProductImageProcessed, _productsController.productImageLink, _productsController.addNewProduct);
productRouter.route("/dev/addProductDescAndImages").post(upload.array("productImages"), _productsController.handleProductImages, _productsController.processProductImages, _productsController.addProductDescriptionAndImages);
productRouter.route("/dev/addProductBoards").post(upload.array("productBoards"), _productsController.preFillProductBoards, _productsController.handleProductBoardImages, _productsController.processProductBoards, _productsController.addProductBoards);