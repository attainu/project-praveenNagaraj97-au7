"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ProductResolvers = {
  Query: {
    getAllCategories: function getAllCategories(parent, args, _ref, info) {
      var Category = _ref.Category;
      return Category.find();
    },
    getAllCategoriesWithItsProduct: function () {
      var _getAllCategoriesWithItsProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref2, info) {
        var Category, Product, category, results, _iterator, _step, each, products;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Category = _ref2.Category, Product = _ref2.Product;
                _context.next = 3;
                return Category.find();

              case 3:
                category = _context.sent;
                results = [];
                _iterator = _createForOfIteratorHelper(category);
                _context.prev = 6;

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context.next = 16;
                  break;
                }

                each = _step.value;
                _context.next = 12;
                return Product.find({
                  categoryId: each._id
                });

              case 12:
                products = _context.sent;
                results.push({
                  category: each._doc,
                  products: products
                });

              case 14:
                _context.next = 8;
                break;

              case 16:
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](6);

                _iterator.e(_context.t0);

              case 21:
                _context.prev = 21;

                _iterator.f();

                return _context.finish(21);

              case 24:
                return _context.abrupt("return", results);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 18, 21, 24]]);
      }));

      function getAllCategoriesWithItsProduct(_x, _x2, _x3, _x4) {
        return _getAllCategoriesWithItsProduct.apply(this, arguments);
      }

      return getAllCategoriesWithItsProduct;
    }(),
    getAllProducts: function getAllProducts(parent, args, _ref3, info) {
      var Product = _ref3.Product;
      return Product.find();
    }
  },
  Mutation: {
    getProductBasedOnCategory: function () {
      var _getProductBasedOnCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref4, _ref5, info) {
        var name, Product, Category, category;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                name = _ref4.name;
                Product = _ref5.Product, Category = _ref5.Category;

                if (name) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", Product.find());

              case 4:
                _context2.next = 6;
                return Category.findOne({
                  categoryName: name
                });

              case 6:
                category = _context2.sent;

                if (category) {
                  _context2.next = 9;
                  break;
                }

                throw new ApolloError("No Products Found With The given Category.", 404);

              case 9:
                _context2.next = 11;
                return Product.find({
                  categoryId: category._id
                });

              case 11:
                return _context2.abrupt("return", _context2.sent);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getProductBasedOnCategory(_x5, _x6, _x7, _x8) {
        return _getProductBasedOnCategory.apply(this, arguments);
      }

      return getProductBasedOnCategory;
    }()
  }
};
var _default = ProductResolvers;
exports["default"] = _default;