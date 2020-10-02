"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCategoryCoverImageFromGCloud = exports.getAllProductsWithAverageReviewAttached = exports.preFillProductBoards = exports.preFillProductdetailedDescription = exports.preFillCartIdasParams = void 0;

var _productReviewController = require("../../controller/productReviewController");

var _AppError = require("../../utils/AppError");

var _catchAsyncError = _interopRequireDefault(require("../../utils/catchAsyncError"));

var _imageProcessMiddleware = require("../imageProcessMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var preFillCartIdasParams = function preFillCartIdasParams(req, res, next) {
  if (!req.body.cartItems || req.body.cartItems.length === 0) return next(new _AppError.AppError("Provide Cart List of Product Ids", 422));
  req.query.listOfRecords = req.body.cartItems;
  next();
};

exports.preFillCartIdasParams = preFillCartIdasParams;

var preFillProductdetailedDescription = function preFillProductdetailedDescription(req, res, next) {
  if (!req.body.featuresList) return next(new _AppError.AppError("Provide List Of Features as array!!!", 422));
  if (!req.body.productId) return next(new _AppError.AppError("Provide at least 1 or group of productIds!!!", 422));
  if (!req.body.manufacturerId) return next(new _AppError.AppError("Provide a manufacturerId", 422));

  var inputValues = _objectSpread({}, req.body);

  var technicalDetails = inputValues;
  req.body.productId = technicalDetails.productId.split(",");
  req.body.featuresList = JSON.parse(technicalDetails.featuresList);
  req.body.manufacturerId = technicalDetails.manufacturerId;
  delete technicalDetails.productId;
  delete technicalDetails.featuresList;
  delete technicalDetails.manufacturerId;
  req.body.productDetails = technicalDetails;
  next();
};

exports.preFillProductdetailedDescription = preFillProductdetailedDescription;

var preFillProductBoards = function preFillProductBoards(req, res, next) {
  req.body.productId = req.body.productId.split(",");
  next();
};

exports.preFillProductBoards = preFillProductBoards;
var getAllProductsWithAverageReviewAttached = (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var ids, i, averageReview, details, _loop, j;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /**
             * @desc - as limit of each request is set to max-10 items
             *         performace doesn't get affected as aggregation pipeline is used!
             * @requires - this middleware needs to be changed on model fields chanege or virtual fields added
             */
            ids = [];

            for (i = 0; i < req.details.length; i++) {
              ids.push(req.details[i]._id);
            }

            _context.next = 4;
            return (0, _productReviewController.averageReviewOfProducts)(ids);

          case 4:
            averageReview = _context.sent;
            details = [];

            _loop = function _loop(j) {
              var response = req.details[j];
              details.push({
                _id: response._id,
                productName: response.productName,
                categoryId: {
                  _id: response.categoryId ? response.categoryId._id : undefined,
                  categoryName: response.categoryId ? response.categoryId.categoryName : undefined,
                  categoryIcon: response.categoryId ? response.categoryId.categoryIcon : undefined,
                  id: response.categoryId ? response.categoryId.id : undefined
                },
                productPrice: response.productPrice,
                productCoverImage: response.productCoverImage,
                createdAt: response.createdAt,
                updatedAt: response.updatedAt,
                id: response.id,
                averageReview: averageReview.filter(function (each) {
                  return String(each._id) === String(response._id);
                })
              });
            };

            for (j = 0; j < req.details.length; j++) {
              _loop(j);
            }

            res.status(200).json({
              foundResults: req.details.length,
              message: req.message,
              details: details
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.getAllProductsWithAverageReviewAttached = getAllProductsWithAverageReviewAttached;

var deleteCategoryCoverImageFromGCloud = function deleteCategoryCoverImageFromGCloud(ModelName, bucketName) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var category;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return ModelName.findById(req.params.id);

            case 2:
              category = _context2.sent;
              _context2.prev = 3;
              _context2.next = 6;
              return (0, _imageProcessMiddleware.deleteImage)(bucketName, category.categoryIcon.split(bucketName + "/")[1]);

            case 6:
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](3);
              next();

            case 11:
              next();

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 8]]);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.deleteCategoryCoverImageFromGCloud = deleteCategoryCoverImageFromGCloud;