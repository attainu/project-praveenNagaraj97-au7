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
Object.defineProperty(exports, "preCheckCategoryInputs", {
  enumerable: true,
  get: function get() {
    return _preChecks.preCheckCategoryInputs;
  }
});
exports.deleteCategory = exports.updateCategory = exports.deletePrevImageFromGCloud = exports.getAllCategories = exports.createNewCategory = exports.categoryImageLink = exports.getCatgoryImageProcessed = void 0;

var _categoryModel = _interopRequireDefault(require("../model/categoryModel"));

var _constants = require("../constants");

var _factoryHandler = require("../handlers/factoryHandler");

var _imageProcessMiddleware = require("../middleware/imageProcessMiddleware");

var _productPreFillers = require("../middleware/productPreFillers");

var _userController = require("./userController");

var _preChecks = require("../middleware/preChecks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LEXA_PRODUCT_CATEGORIES = _constants.GCS_BUCKET_NAME.LEXA_PRODUCT_CATEGORIES;
var getCatgoryImageProcessed = (0, _imageProcessMiddleware.handleImageUpload)(1, LEXA_PRODUCT_CATEGORIES, false, false);
exports.getCatgoryImageProcessed = getCatgoryImageProcessed;
var categoryImageLink = (0, _imageProcessMiddleware.processSingleImage)("categoryIcon", false);
exports.categoryImageLink = categoryImageLink;
var createNewCategory = (0, _factoryHandler.createNewDocumnet)(_categoryModel["default"], {
  message: "New Category Added Successfully"
});
exports.createNewCategory = createNewCategory;
var getAllCategories = (0, _factoryHandler.readAllDocument)(_categoryModel["default"], {
  message: "List Of Categories"
});
exports.getAllCategories = getAllCategories;
var deletePrevImageFromGCloud = (0, _productPreFillers.deleteCategoryCoverImageFromGCloud)(_categoryModel["default"], LEXA_PRODUCT_CATEGORIES);
exports.deletePrevImageFromGCloud = deletePrevImageFromGCloud;
var updateCategory = (0, _factoryHandler.updateDocumentByID)(_categoryModel["default"], {
  message: "Category Update Successfully"
});
exports.updateCategory = updateCategory;
var deleteCategory = (0, _factoryHandler.deleteDocumentById)(_categoryModel["default"], {
  message: "Category Deleted"
});
exports.deleteCategory = deleteCategory;