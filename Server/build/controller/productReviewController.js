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
Object.defineProperty(exports, "preFillUserId", {
  enumerable: true,
  get: function get() {
    return _preFillers.preFillUserId;
  }
});
exports.addProductFoodReview = exports.addProductPetReview = exports.addProductKitchenReview = exports.addProductFashionReview = exports.addProductBeautyReview = exports.addProductElectronicsReview = exports.addProductComputerReview = exports.addProductMobileReview = exports.reviewHelpfulPost = exports.preFillReviewHelpulForLikeOrUndo = exports.averageReviewOfProducts = exports.getProductReviewBasedOnProductId = exports.processProductReviewImage = exports.handleProductReviewImage = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _productReviewModel = require("../model/productReviewModel");

var _discriminator = require("../model/discriminator");

var _factoryHandler = require("../handlers/factoryHandler");

var _constants = require("../constants");

var _Aggregation = require("../utils/Aggregation");

var _imageProcessMiddleware = require("../middleware/imageProcessMiddleware");

var _reviewPreFillers = require("../middleware/reviewPreFillers");

var _userController = require("./userController");

var _preFillers = require("../middleware/preFillers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Only SmartPhones!!
var LEXA_PRODUCT_REVIEWS = _constants.GCS_BUCKET_NAME.LEXA_PRODUCT_REVIEWS;
var handleProductReviewImage = (0, _imageProcessMiddleware.handleImageUpload)(5, LEXA_PRODUCT_REVIEWS, true, true);
exports.handleProductReviewImage = handleProductReviewImage;
var processProductReviewImage = (0, _imageProcessMiddleware.processMultipleImages)("productReviewImages");
exports.processProductReviewImage = processProductReviewImage;
var getProductReviewBasedOnProductId = (0, _factoryHandler.readAllDocument)(_productReviewModel.BaseProductReviewModel, {
  message: "List Of reviews for this Product"
});
exports.getProductReviewBasedOnProductId = getProductReviewBasedOnProductId;

var averageReviewOfProducts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var productIds,
        pipeline,
        averageReviewOfProducts,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            productIds = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
            pipeline = [{
              $match: {
                productId: {
                  $in: productIds.map(function (each) {
                    return new _mongoose["default"].Types.ObjectId(each);
                  })
                }
              }
            }, {
              $group: {
                _id: "$productId",
                averageReview: {
                  $avg: "$averageReview"
                },
                reviewersCount: {
                  $sum: 1
                }
              }
            }];
            _context.next = 4;
            return (0, _Aggregation.aggregationPipeline)(_productReviewModel.BaseProductReviewModel, pipeline);

          case 4:
            averageReviewOfProducts = _context.sent;
            return _context.abrupt("return", averageReviewOfProducts);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function averageReviewOfProducts() {
    return _ref.apply(this, arguments);
  };
}(); // If the user removes image before sumbitting image has to be deleted
// export const deleteProductReviewImge = deleteFile(LEXA_PRODUCT_REVIEWS);
// Review Helpful Like/Undo


exports.averageReviewOfProducts = averageReviewOfProducts;
var preFillReviewHelpulForLikeOrUndo = (0, _reviewPreFillers.preFillReviewFoundHelpFul)(_productReviewModel.ReviewHelpful, {
  message: "Successfully undo"
});
exports.preFillReviewHelpulForLikeOrUndo = preFillReviewHelpulForLikeOrUndo;
var reviewHelpfulPost = (0, _factoryHandler.createNewDocumnet)(_productReviewModel.ReviewHelpful, {
  message: "Success"
}); // Add review

exports.reviewHelpfulPost = reviewHelpfulPost;
var addProductMobileReview = (0, _factoryHandler.createNewDocumnet)(_discriminator.MobileReviewModel, {
  message: "Thanks for feedback"
});
exports.addProductMobileReview = addProductMobileReview;
var addProductComputerReview = (0, _factoryHandler.createNewDocumnet)(_discriminator.ComputerReviewModel, {
  message: "Thanks for feedback"
});
exports.addProductComputerReview = addProductComputerReview;
var addProductElectronicsReview = (0, _factoryHandler.createNewDocumnet)(_discriminator.ElectronicsReviewModel, {
  message: "Thanks for feedback"
});
exports.addProductElectronicsReview = addProductElectronicsReview;
var addProductBeautyReview = (0, _factoryHandler.createNewDocumnet)(_discriminator.BeautyReviewModel, {
  message: "Thanks for feedback"
});
exports.addProductBeautyReview = addProductBeautyReview;
var addProductFashionReview = (0, _factoryHandler.createNewDocumnet)(_discriminator.FashionReviewModel, {
  message: "Thanks for feedback"
});
exports.addProductFashionReview = addProductFashionReview;
var addProductKitchenReview = (0, _factoryHandler.createNewDocumnet)(_discriminator.KitchenReviewModel, {
  message: "Thanks for feedback"
});
exports.addProductKitchenReview = addProductKitchenReview;
var addProductPetReview = (0, _factoryHandler.createNewDocumnet)(_discriminator.PetReviewModel, {
  message: "Thanks for feedback"
});
exports.addProductPetReview = addProductPetReview;
var addProductFoodReview = (0, _factoryHandler.createNewDocumnet)(_discriminator.FoodReviewModel, {
  message: "Thanks for feedback"
});
exports.addProductFoodReview = addProductFoodReview;