"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preFillReviewFoundHelpFul = void 0;

var _catchAsyncError = _interopRequireDefault(require("../../utils/catchAsyncError"));

var _AppError = require("../../utils/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var preFillReviewFoundHelpFul = function preFillReviewFoundHelpFul(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var docx;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(req.params.bool === "true")) {
                _context.next = 5;
                break;
              }

              req.body.helpul = req.params.bool;
              next();
              _context.next = 11;
              break;

            case 5:
              _context.next = 7;
              return ModelName.findOneAndDelete({
                userId: req.user._id
              });

            case 7:
              docx = _context.sent;

              if (docx) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", next(new _AppError.AppError("This review Like doesn't belongs to you", 401)));

            case 10:
              res.status(200).json({
                message: responseMessage.message
              });

            case 11:
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
};

exports.preFillReviewFoundHelpFul = preFillReviewFoundHelpFul;