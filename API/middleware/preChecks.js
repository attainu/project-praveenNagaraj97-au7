"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preCheckIfPreviousVideoExistsAndDelete = exports.preCheckifProductUpdateDetailVideoHasFileAttached = exports.preCheckCategoryInputs = void 0;

var _AppError = require("../utils/AppError");

var _catchAsyncError = _interopRequireDefault(require("../utils/catchAsyncError"));

var _GCloudStorageService = require("../utils/GCloudStorageService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var preCheckCategoryInputs = function preCheckCategoryInputs(req, res, next) {
  if (!req.body.categoryName) return next(new _AppError.AppError("Please Enter Category Name", 422));
  next();
};

exports.preCheckCategoryInputs = preCheckCategoryInputs;

var preCheckifProductUpdateDetailVideoHasFileAttached = function preCheckifProductUpdateDetailVideoHasFileAttached(req, res, next) {
  if (!req.files) return new _AppError.AppError("Select Video to Update!!!", 422);
  req.body = {};
  next();
};

exports.preCheckifProductUpdateDetailVideoHasFileAttached = preCheckifProductUpdateDetailVideoHasFileAttached;

var preCheckIfPreviousVideoExistsAndDelete = function preCheckIfPreviousVideoExistsAndDelete(ModelName, bucketName, videoFieldName) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var docs;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return ModelName.findOne(req.query);

            case 2:
              docs = _context.sent;

              if (docs[videoFieldName]) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", next());

            case 5:
              _context.next = 7;
              return (0, _GCloudStorageService.deleteFile)(bucketName, docs[videoFieldName].split(bucketName + "/")[1]);

            case 7:
              next();

            case 8:
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

exports.preCheckIfPreviousVideoExistsAndDelete = preCheckIfPreviousVideoExistsAndDelete;