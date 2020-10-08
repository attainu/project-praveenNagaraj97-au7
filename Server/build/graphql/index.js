"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _categoryModel = _interopRequireDefault(require("../model/categoryModel"));

var _productModel = require("../model/productModel");

var _chatModel = _interopRequireDefault(require("../model/chatModel"));

var _UserModel = require("../model/UserModel");

var _typeDefs = _interopRequireDefault(require("./typeDefs"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _middleware = require("./middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pubsub = new _apolloServerExpress.PubSub();
var apolloServer = new _apolloServerExpress.ApolloServer({
  typeDefs: _typeDefs["default"],
  resolvers: _resolvers["default"],
  playground: true,
  introspection: true,
  subscriptions: {
    onConnect: function () {
      var _onConnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var authorization, _yield$authCheck, error, user;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                authorization = _ref.authorization;
                _context.next = 3;
                return (0, _middleware.authCheck)(null, _UserModel.User, authorization);

              case 3:
                _yield$authCheck = _context.sent;
                error = _yield$authCheck.error;
                user = _yield$authCheck.user;

                if (!error) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", new _apolloServerExpress.AuthenticationError(error));

              case 8:
                return _context.abrupt("return", user);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onConnect(_x) {
        return _onConnect.apply(this, arguments);
      }

      return onConnect;
    }()
  },
  context: function context(_ref2) {
    var req = _ref2.req,
        res = _ref2.res;
    return {
      req: req,
      res: res,
      Category: _categoryModel["default"],
      Product: _productModel.Product,
      User: _UserModel.User,
      Chat: _chatModel["default"],
      pubsub: pubsub
    };
  },
  tracing: true
});
var _default = apolloServer;
exports["default"] = _default;