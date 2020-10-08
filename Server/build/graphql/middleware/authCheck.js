"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonWebToken = require("../../utils/jsonWebToken");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, context) {
    var auth_token,
        output,
        authToken,
        tokenDetails,
        user,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            auth_token = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
            output = {
              error: null,
              user: null
            };

            if (!(auth_token === null && req !== null)) {
              _context.next = 11;
              break;
            }

            if (req.headers.authorization) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", _objectSpread(_objectSpread({}, output), {}, {
              error: "Please Login First"
            }));

          case 5:
            if (!req.headers.authorization) {
              _context.next = 8;
              break;
            }

            if (req.headers.authorization.startsWith("Bearer")) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", _objectSpread(_objectSpread({}, output), {}, {
              error: "Bearer token Not Found"
            }));

          case 8:
            authToken = req.headers.authorization.split("Bearer ")[1];
            _context.next = 12;
            break;

          case 11:
            authToken = auth_token.split("Bearer ")[1];

          case 12:
            _context.next = 14;
            return (0, _jsonWebToken.verifyJWToken)(authToken);

          case 14:
            tokenDetails = _context.sent;
            _context.next = 17;
            return context.findById(tokenDetails.id);

          case 17:
            user = _context.sent;

            if (user) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", _objectSpread(_objectSpread({}, output), {}, {
              error: "Authentication Error Invalid Token"
            }));

          case 20:
            return _context.abrupt("return", _objectSpread(_objectSpread({}, output), {}, {
              user: user
            }));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;