"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "preFillCartIdasParams", {
  enumerable: true,
  get: function get() {
    return _productPreFillers.preFillCartIdasParams;
  }
});
Object.defineProperty(exports, "preFillProductBoards", {
  enumerable: true,
  get: function get() {
    return _productPreFillers.preFillProductBoards;
  }
});
Object.defineProperty(exports, "getAllProductsWithAverageReviewAttached", {
  enumerable: true,
  get: function get() {
    return _productPreFillers.getAllProductsWithAverageReviewAttached;
  }
});
Object.defineProperty(exports, "preFillManufacturerId", {
  enumerable: true,
  get: function get() {
    return _productPreFillers.preFillManufacturerId;
  }
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
exports.addProductBoards = exports.processProductBoards = exports.handleProductBoardImages = exports.getProduct = exports.addProductDescriptionAndImages = exports.processProductImages = exports.handleProductImages = exports.getProductDetailsWithProductIds = exports.getAllProducts = exports.addNewProduct = exports.productImageLink = exports.getProductImageProcessed = void 0;

var _constants = require("../constants");

var _productModel = require("../model/productModel");

var _factoryHandler = require("../handlers/factoryHandler");

var _imageProcessMiddleware = require("../middleware/imageProcessMiddleware");

var _productPreFillers = require("../middleware/productPreFillers");

var _userController = require("./userController");

var LEXA_PRODUCT_COVERS = _constants.GCS_BUCKET_NAME.LEXA_PRODUCT_COVERS,
    PRODUCT_DETAILS_IMAGES = _constants.GCS_BUCKET_NAME.PRODUCT_DETAILS_IMAGES,
    PRODUCT_BOARDS = _constants.GCS_BUCKET_NAME.PRODUCT_BOARDS; // Protect Middlewares

var getProductImageProcessed = (0, _imageProcessMiddleware.handleImageUpload)(1, LEXA_PRODUCT_COVERS, false, false);
exports.getProductImageProcessed = getProductImageProcessed;
var productImageLink = (0, _imageProcessMiddleware.processSingleImage)("productCoverImage", false);
exports.productImageLink = productImageLink;
var addNewProduct = (0, _factoryHandler.createNewDocumnet)(_productModel.Product, {
  message: "New Product Added Successfully"
});
exports.addNewProduct = addNewProduct;
var getAllProducts = (0, _factoryHandler.readAllDocument)(_productModel.Product, {
  message: "List Of Products",
  next: true
}); // Cart

exports.getAllProducts = getAllProducts;
var getProductDetailsWithProductIds = (0, _factoryHandler.readAllDocument)(_productModel.Product, {
  message: "Details Of Products in Cart"
}); // Product Description

exports.getProductDetailsWithProductIds = getProductDetailsWithProductIds;
var handleProductImages = (0, _imageProcessMiddleware.handleImageUpload)(5, PRODUCT_DETAILS_IMAGES, false, false);
exports.handleProductImages = handleProductImages;
var processProductImages = (0, _imageProcessMiddleware.processMultipleImages)("productImages");
exports.processProductImages = processProductImages;
var addProductDescriptionAndImages = (0, _factoryHandler.createNewDocumnet)(_productModel.ProductDescriptionAndImages, {
  message: "Product Description and Images added"
});
exports.addProductDescriptionAndImages = addProductDescriptionAndImages;
var getProduct = (0, _factoryHandler.readDocumentByIdThroughQuery)(_productModel.Product, {
  message: "Requested Product"
}); // Product Boards

exports.getProduct = getProduct;
var handleProductBoardImages = (0, _imageProcessMiddleware.handleImageUploadWithNoImageLimit)(PRODUCT_BOARDS);
exports.handleProductBoardImages = handleProductBoardImages;
var processProductBoards = (0, _imageProcessMiddleware.processMultipleImages)("boardImages");
exports.processProductBoards = processProductBoards;
var addProductBoards = (0, _factoryHandler.createNewDocumnet)(_productModel.ProductBoards, {
  message: "Product Boards Added"
});
exports.addProductBoards = addProductBoards;