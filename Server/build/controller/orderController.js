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
Object.defineProperty(exports, "buyProducts", {
  enumerable: true,
  get: function get() {
    return _paymentController.buyProducts;
  }
});
Object.defineProperty(exports, "retrievePaymentIntent", {
  enumerable: true,
  get: function get() {
    return _paymentController.retrievePaymentIntent;
  }
});
Object.defineProperty(exports, "preFillGetUserOrders", {
  enumerable: true,
  get: function get() {
    return _preFillers.preFillGetUserOrders;
  }
});
Object.defineProperty(exports, "preFillGetManufacturerOrders", {
  enumerable: true,
  get: function get() {
    return _preFillers.preFillGetManufacturerOrders;
  }
});
exports.getOrders = exports.processOrder = void 0;

var _OrderModel = require("../model/OrderModel");

var _productModel = require("../model/productModel");

var _AppError = require("../utils/AppError");

var _catchAsyncError = _interopRequireDefault(require("../utils/catchAsyncError"));

var _factoryHandler = require("../handlers/factoryHandler");

var _userController = require("./userController");

var _paymentController = require("./paymentController");

var _preFillers = require("../middleware/preFillers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @description user order via find order where user id is userID
 *              same for manufactureres
 */
var processOrder = (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var orders, _iterator, _step, prod, modelledOrderData, orderIds, getCurrentQuantity, quantityReduceModel, _loop, _i, _orderIds, order;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // All checks are done in payment controller
            orders = [];
            _iterator = _createForOfIteratorHelper(req.itemsList);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                prod = _step.value;
                modelledOrderData = {
                  paymentId: req.params.id,
                  amount: prod.productPrice,
                  item: prod._id,
                  quantity: prod.quantity,
                  manufacturerId: prod.manufacturerId,
                  userId: req.user._id,
                  paid: true,
                  address: req.body.address
                };
                orders.push(modelledOrderData);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            orderIds = Object.keys(req.productIdsQuantity); // Get Actual Quantity

            _context.next = 6;
            return _productModel.Product.find({
              _id: orderIds
            }).select("quantity");

          case 6:
            getCurrentQuantity = _context.sent;
            quantityReduceModel = [];

            _loop = function _loop() {
              var each = _orderIds[_i];
              var model = {
                quantity: getCurrentQuantity.find(function (_ref2) {
                  var _id = _ref2._id;
                  return _id == each;
                }).quantity - 1
              };
              quantityReduceModel.push(model);
            };

            for (_i = 0, _orderIds = orderIds; _i < _orderIds.length; _i++) {
              _loop();
            } // console.log(quantityReduceModel);


            _context.next = 12;
            return _productModel.Product.updateMany.apply(_productModel.Product, [{
              _id: {
                $in: orderIds
              }
            }].concat(quantityReduceModel));

          case 12:
            _context.next = 14;
            return _OrderModel.Order.create(orders);

          case 14:
            order = _context.sent;

            if (!(!order || order.length < 1)) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", next(new _AppError.AppError("Something went wrong", 500)));

          case 17:
            res.status(201).json({
              message: "Ordered Successfull",
              orderDetails: order
            });

          case 18:
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
exports.processOrder = processOrder;
var getOrders = (0, _factoryHandler.readAllDocument)(_OrderModel.Order, {
  message: "List Of Order"
});
exports.getOrders = getOrders;