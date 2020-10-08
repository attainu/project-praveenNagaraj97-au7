"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _jsonWebToken = require("../../../utils/jsonWebToken");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Resolvers
var UserAuthenticationResolvers = {
  Mutation: {
    signUp: function () {
      var _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
        var User, user, token, responseMessage;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                User = _ref.User;
                _context.next = 3;
                return User.create(_objectSpread({}, args.data));

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", new _apolloServerExpress.ApolloError("SignUp Failed", 401));

              case 6:
                _context.next = 8;
                return (0, _jsonWebToken.generateJWToken)({
                  id: user._id
                });

              case 8:
                token = _context.sent;
                responseMessage = {
                  _id: user._id,
                  message: "SignedUp successfully.",
                  token: token
                };
                return _context.abrupt("return", responseMessage);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signUp(_x, _x2, _x3, _x4) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }(),
    signIn: function () {
      var _signIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref2, info) {
        var User, user, validPassword, JWToken, responseMessage;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                User = _ref2.User;
                _context2.next = 3;
                return User.findOne({
                  email: args.data.email
                }).select("+password");

              case 3:
                user = _context2.sent;

                if (user) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", new _apolloServerExpress.ApolloError("No user found with ".concat(args.data.email), 401));

              case 6:
                _context2.next = 8;
                return user.comparePassword(args.data.password, user.password);

              case 8:
                validPassword = _context2.sent;

                if (validPassword) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", new _apolloServerExpress.ApolloError("Entered password is wrong", 401));

              case 11:
                _context2.next = 13;
                return (0, _jsonWebToken.generateJWToken)({
                  id: user._id
                }, args.data.keepLoggedIn ? "infinite" : "24h");

              case 13:
                JWToken = _context2.sent;
                responseMessage = {
                  message: "User Logged In Successfully",
                  _id: user._id,
                  token: JWToken
                };
                return _context2.abrupt("return", responseMessage);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function signIn(_x5, _x6, _x7, _x8) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }
};
var _default = UserAuthenticationResolvers;
exports["default"] = _default;