"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteImage = exports.handleImageUploadWithNoImageLimit = exports.processMultipleImages = exports.processSingleVideo = exports.processSingleImage = exports.handleVideoUpload = exports.handleImageUpload = void 0;

var _catchAsyncError = _interopRequireDefault(require("../utils/catchAsyncError"));

var _AppError = require("../utils/AppError");

var _GCloudStorageService = require("../utils/GCloudStorageService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var handleImageUpload = function handleImageUpload(imageCount, bucketName) {
  var inbetween = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var optional = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var imageUrls, files, i, validImage, _i, url;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(optional && !req.files)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", next());

            case 2:
              _context.prev = 2;

              if (!(optional && !req.files.length)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", next());

            case 5:
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", next());

            case 10:
              if (!(req.files.length > imageCount)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", next(new _AppError.AppError("This request takes maximum of ".concat(imageCount, " images!."))));

            case 12:
              if (!inbetween) {
                _context.next = 15;
                break;
              }

              if (!(req.files.length < 1)) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", next(new _AppError.AppError("This request takes minimum of ".concat(1, " images!."))));

            case 15:
              if (inbetween) {
                _context.next = 18;
                break;
              }

              if (!(req.files.length < imageCount)) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", next(new _AppError.AppError("This request takes minimum of ".concat(imageCount, " images!."))));

            case 18:
              imageUrls = [];
              files = [];
              i = 0;

            case 21:
              if (!(i < req.files.length)) {
                _context.next = 29;
                break;
              }

              validImage = /\.(gif|jpe?g|png)$/i.test(req.files[i].originalname);

              if (validImage) {
                _context.next = 25;
                break;
              }

              return _context.abrupt("return", next(new _AppError.AppError("Cannot Process File of non Image Format", 415)));

            case 25:
              files.push(req.files[i]);

            case 26:
              i++;
              _context.next = 21;
              break;

            case 29:
              _i = 0;

            case 30:
              if (!(_i < req.files.length)) {
                _context.next = 38;
                break;
              }

              _context.next = 33;
              return (0, _GCloudStorageService.uploadImageToGoogle)(files[_i], bucketName);

            case 33:
              url = _context.sent;
              imageUrls.push(url);

            case 35:
              _i++;
              _context.next = 30;
              break;

            case 38:
              req.imageUrls = imageUrls;
              next();

            case 40:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 7]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.handleImageUpload = handleImageUpload;

var handleVideoUpload = function handleVideoUpload(videoCount, bucketName) {
  var inbetween = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var optional = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var videoUrls, files, i, validImage, _i2, url;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(optional && !req.files.length)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", next());

            case 2:
              if (!(req.files.length > videoCount)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", next(new _AppError.AppError("This request takes maximum of ".concat(videoCount, " Videos!."))));

            case 4:
              if (!inbetween) {
                _context2.next = 9;
                break;
              }

              if (!(req.files.length < req.files.length)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", next(new _AppError.AppError("This request takes minimum of ".concat(videoCount, " Videos!."))));

            case 7:
              _context2.next = 11;
              break;

            case 9:
              if (!(req.files.length < videoCount)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", next(new _AppError.AppError("This request takes minimum of ".concat(videoCount, " Videos!."))));

            case 11:
              videoUrls = [];
              files = [];
              i = 0;

            case 14:
              if (!(i < req.files.length)) {
                _context2.next = 22;
                break;
              }

              validImage = /\.(mp4|mkv|wmv|mov)$/i.test(req.files[i].originalname);

              if (validImage) {
                _context2.next = 18;
                break;
              }

              return _context2.abrupt("return", next(new _AppError.AppError("Cannot Process File of non Video Format- Available Formats : mp4|mkv|wmv|mov ", 415)));

            case 18:
              files.push(req.files[i]);

            case 19:
              i++;
              _context2.next = 14;
              break;

            case 22:
              _i2 = 0;

            case 23:
              if (!(_i2 < req.files.length)) {
                _context2.next = 31;
                break;
              }

              _context2.next = 26;
              return (0, _GCloudStorageService.uploadImageToGoogle)(files[_i2], bucketName);

            case 26:
              url = _context2.sent;
              videoUrls.push(url);

            case 28:
              _i2++;
              _context2.next = 23;
              break;

            case 31:
              req.videoUrls = videoUrls;
              next();

            case 33:
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
};

exports.handleVideoUpload = handleVideoUpload;

var processSingleImage = function processSingleImage(imageFieldName) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(optional && !req.imageUrls)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", next());

            case 2:
              req.body[imageFieldName] = req.imageUrls[0];
              next();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }());
};

exports.processSingleImage = processSingleImage;

var processSingleVideo = function processSingleVideo(videoFieldName) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(optional && !req.videoUrls)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", next());

            case 2:
              req.body[videoFieldName] = req.videoUrls[0];
              next();

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }());
};

exports.processSingleVideo = processSingleVideo;

var processMultipleImages = function processMultipleImages(imagesFieldName, optional) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(optional && req.imageUrls.length === 0)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", next());

            case 2:
              req.body[imagesFieldName] = req.imageUrls;
              next();

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x13, _x14, _x15) {
      return _ref5.apply(this, arguments);
    };
  }());
};

exports.processMultipleImages = processMultipleImages;

var handleImageUploadWithNoImageLimit = function handleImageUploadWithNoImageLimit(bucketName) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
      var imageUrls, files, i, validImage, _i3, url;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(req.files.length === 0)) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", next(new _AppError.AppError("This request takes maximum of 1 Videos!.")));

            case 2:
              imageUrls = [];
              files = [];
              i = 0;

            case 5:
              if (!(i < req.files.length)) {
                _context6.next = 13;
                break;
              }

              validImage = /\.(gif|jpe?g|png)$/i.test(req.files[i].originalname);

              if (validImage) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return", next(new _AppError.AppError("Cannot Process File of non Image Format", 415)));

            case 9:
              files.push(req.files[i]);

            case 10:
              i++;
              _context6.next = 5;
              break;

            case 13:
              _i3 = 0;

            case 14:
              if (!(_i3 < req.files.length)) {
                _context6.next = 22;
                break;
              }

              _context6.next = 17;
              return (0, _GCloudStorageService.uploadImageToGoogle)(files[_i3], bucketName);

            case 17:
              url = _context6.sent;
              imageUrls.push(url);

            case 19:
              _i3++;
              _context6.next = 14;
              break;

            case 22:
              req.imageUrls = imageUrls;
              next();

            case 24:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x16, _x17, _x18) {
      return _ref6.apply(this, arguments);
    };
  }());
};

exports.handleImageUploadWithNoImageLimit = handleImageUploadWithNoImageLimit;

var deleteImage = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(bucketName, filename) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _GCloudStorageService.deleteFile)(bucketName, filename);

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteImage(_x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteImage = deleteImage;