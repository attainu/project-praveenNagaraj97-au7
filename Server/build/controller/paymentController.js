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
exports.retrievePaymentIntent = exports.buyProducts = exports.paymentIntent = exports.buyProductsdeprecated = exports.paymentSessiondeprecated = void 0;

var _stripe = require("stripe");

var _lodash = _interopRequireDefault(require("lodash"));

var _productModel = require("../model/productModel");

var _catchAsyncError = _interopRequireDefault(require("../utils/catchAsyncError"));

var _AppError = require("../utils/AppError");

var _dotenvConfig = _interopRequireDefault(require("../config/dotenvConfig"));

var _userController = require("./userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenvConfig["default"])();
var stripe = new _stripe.Stripe(process.env.SECRET_KEY);
/**
 * @deprecated for template views only
 */

var paymentSessiondeprecated = (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var session;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              line_items: [{
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: req.name,
                    images: [req.image]
                  },
                  unit_amount: 100 * req.price
                },
                quantity: req.quantity
              }],
              mode: "payment",
              success_url: "http://localhost:3000",
              cancel_url: "http://localhost:3000/cart"
            });

          case 2:
            session = _context.sent;
            res.status(200).json({
              id: session.id
            });

          case 4:
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
/**
 * @deprecated for template views only
 */

exports.paymentSessiondeprecated = paymentSessiondeprecated;
var buyProductsdeprecated = (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var requestedProducts, products, unit_amount, name, image, quantity, _loop, i;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.body.products.length < 1)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", next(new _AppError.AppError("No Products selected", 422)));

          case 2:
            requestedProducts = req.body.products;
            _context2.next = 5;
            return _productModel.Product.find({
              _id: req.body.products
            });

          case 5:
            products = _context2.sent;
            unit_amount = 0;
            name = "";
            image = "";
            quantity = 0;

            if (requestedProducts.length === 1) {
              unit_amount = products[0].productPrice;
              name = "".concat(products[0].productName);
              image = products[0].productCoverImage;
              quantity = 1;
            } else {
              _loop = function _loop(i) {
                var product = products.find(function (_ref3) {
                  var _id = _ref3._id;
                  return _id == requestedProducts[i];
                });
                unit_amount += product.productPrice;
                name += "\n      ".concat(i + 1 + ")" + product.productName, ",\n      ");
              };

              for (i = 0; i < requestedProducts.length; i++) {
                _loop(i);
              }

              quantity = requestedProducts.length;
              image = "https://blog-assets.lightspeedhq.com/img/2019/12/8c48d7df-retail-purchase-orders.jpg";
            }

            req.price = unit_amount;
            req.name = name;
            req.image = image;
            req.quantity = quantity;
            next();

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
exports.buyProductsdeprecated = buyProductsdeprecated;
var paymentIntent = (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var paymentIntent;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return stripe.paymentIntents.create({
              amount: 100 * req.price,
              currency: "inr",
              description: JSON.stringify(req.body.products)
            });

          case 2:
            paymentIntent = _context3.sent;
            res.status(200).json({
              clientSecret: paymentIntent.client_secret
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
exports.paymentIntent = paymentIntent;

var addQuantityPropToProducts = function addQuantityPropToProducts(cartItems) {
  var result = {};
  cartItems.forEach(function (item) {
    result[item] = (result[item] || 0) + 1;
  });
  return result;
};

var buyProducts = (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var requestedProducts, products, price, productIdQuantityCheck, qunatityOfProductItems, buyingItems, quantityCheck, i;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (req.body.products) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", next(new _AppError.AppError("No Products selected", 422)));

          case 2:
            if (!(req.body.products.length < 1)) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", next(new _AppError.AppError("No Products selected", 422)));

          case 4:
            requestedProducts = req.body.products;
            _context4.next = 7;
            return _productModel.Product.find({
              _id: req.body.products
            });

          case 7:
            products = _context4.sent;
            price = 0;
            productIdQuantityCheck = {};
            qunatityOfProductItems = addQuantityPropToProducts(requestedProducts); // Total Price Collection

            buyingItems = products.map(function (item) {
              item.quantity = qunatityOfProductItems[item._id];
              productIdQuantityCheck[item._id] = item.quantity;
              price += item.productPrice * item.quantity;
              return item;
            });
            _context4.next = 14;
            return _productModel.Product.find({
              _id: req.body.products
            });

          case 14:
            quantityCheck = _context4.sent;
            i = 0;

          case 16:
            if (!(i < quantityCheck.length)) {
              _context4.next = 22;
              break;
            }

            if (!(quantityCheck[i].quantity < productIdQuantityCheck[quantityCheck[i]._id])) {
              _context4.next = 19;
              break;
            }

            return _context4.abrupt("return", next(new _AppError.AppError("".concat(quantityCheck[i].productName, " are Not available"), 500)));

          case 19:
            i++;
            _context4.next = 16;
            break;

          case 22:
            req.price = price;
            req.itemsList = buyingItems;
            req.productIdsQuantity = productIdQuantityCheck;
            next();

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}());
exports.buyProducts = buyProducts;
var retrievePaymentIntent = (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var paymentIntent, orderedItems;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (req.params.id) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return", next(new _AppError.AppError("Provide Payment Intent Success ID", 422)));

          case 2:
            _context5.next = 4;
            return stripe.paymentIntents.retrieve(req.params.id);

          case 4:
            paymentIntent = _context5.sent;

            if (!(paymentIntent.status !== "succeeded")) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", next(new _AppError.AppError(paymentIntent.status, 402)));

          case 7:
            orderedItems = JSON.parse(paymentIntent.description); // Payment Modified Check

            if (_lodash["default"].isEqual(orderedItems.sort(), req.body.products.sort())) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", next(new _AppError.AppError("orders alteration found not proccessable", 423)));

          case 10:
            next();

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}());
exports.retrievePaymentIntent = retrievePaymentIntent;