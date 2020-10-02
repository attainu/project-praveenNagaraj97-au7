"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _categoriesController = require("../controller/categoriesController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var categoryRouter = (0, _express.Router)();
exports.categoryRouter = categoryRouter;
var upload = (0, _multer["default"])(); // Public Routes

categoryRouter.route("/getAllCategories").get(_categoriesController.getAllCategories); // Developers Only Routes..

categoryRouter.route("/dev/addNewCategory").post(upload.array("categoryImage"), _categoriesController.protectRoute, (0, _categoriesController.restrictTo)("dev"), _categoriesController.preCheckCategoryInputs, _categoriesController.getCatgoryImageProcessed, _categoriesController.categoryImageLink, _categoriesController.createNewCategory);
categoryRouter.route("/dev/:id/updateCategory").patch(upload.array("categoryImage"), _categoriesController.protectRoute, (0, _categoriesController.restrictTo)("dev"), _categoriesController.deletePrevImageFromGCloud, _categoriesController.getCatgoryImageProcessed, _categoriesController.categoryImageLink, _categoriesController.updateCategory);
categoryRouter.route("/dev/:id/deleteCategory")["delete"](_categoriesController.protectRoute, (0, _categoriesController.restrictTo)("dev"), _categoriesController.deleteCategory);