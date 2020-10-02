"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDocumentById = exports.updateDocumentByField = exports.updateDocumentByID = exports.readDocumentByIdThroughQuery = exports.readAllDocument = exports.createNewDocumnet = void 0;

var _AppError = require("../utils/AppError");

var _catchAsyncError = _interopRequireDefault(require("../utils/catchAsyncError"));

var _APIFeatures = require("../utils/APIFeatures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createNewDocumnet = function createNewDocumnet(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return ModelName.create(req.body);

            case 2:
              response = _context.sent;

              if (response) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", next(new _AppError.AppError("request failed", 422)));

            case 5:
              res.status(201).json({
                message: responseMessage.message,
                details: response
              });

            case 6:
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

exports.createNewDocumnet = createNewDocumnet;

var readAllDocument = function readAllDocument(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var featuredModel, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              featuredModel = new _APIFeatures.ApiFeatures(ModelName.find(), req.query).filter().limit().pagination().search().sort().listOfRecords();
              _context2.next = 3;
              return featuredModel.queryObj;

            case 3:
              response = _context2.sent;

              if (!(!response || response.length === 0)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", next(new _AppError.AppError("No Document Found", 404)));

            case 6:
              if (!responseMessage.hasOwnProperty("next")) {
                _context2.next = 10;
                break;
              }

              req.details = response;
              req.message = responseMessage.message;
              return _context2.abrupt("return", next());

            case 10:
              res.status(200).json({
                foundResults: response.length,
                message: responseMessage.message,
                details: response
              });

            case 11:
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

exports.readAllDocument = readAllDocument;

var readDocumentByIdThroughQuery = function readDocumentByIdThroughQuery(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var docs;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (req.query.id) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", next(new _AppError.AppError("Provide Id of the Document You are Querying !!", 422)));

            case 2:
              _context3.next = 4;
              return ModelName.findById(req.query.id);

            case 4:
              docs = _context3.sent;

              if (docs) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", next(new _AppError.AppError("No Results found With The Given Id", 204)));

            case 7:
              res.status(200).json({
                message: responseMessage.message,
                detail: docs
              });

            case 8:
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
}; // export const readDocumentByFields = (ModelName, responseMessage) =>
//   catchAsyncError(async (req, res, next) => {
//     if (!req.query) return new AppError("Provide Find Fields in query");
//     const docs = await ModelName.findOne(req.query);
//     if (!docs)
//       return next(new AppError("No Results found With The Given Id", 204));
//     res.status(200).json({
//       message: responseMessage.message,
//       detail: docs,
//     });
//   });


exports.readDocumentByIdThroughQuery = readDocumentByIdThroughQuery;

var updateDocumentByID = function updateDocumentByID(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      var docx;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (Object.keys(req.body).length) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", next(new _AppError.AppError("Document Not Changed As No Values Given", 304)));

            case 2:
              _context4.next = 4;
              return ModelName.findByIdAndUpdate(req.params.id, req.body, {
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
                context: "query",
                "new": true
              });

            case 4:
              docx = _context4.sent;

              if (docx) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", next(new _AppError.AppError("Document with ".concat(req.params.id, " is not Found"), 500)));

            case 7:
              responseMessage.document = docx;
              responseMessage.updatedValue = req.body;
              res.status(202).json(responseMessage);

            case 10:
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
}; // Field is passes via query!!


exports.updateDocumentByID = updateDocumentByID;

var updateDocumentByField = function updateDocumentByField(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      var docx;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (Object.keys(req.body).length) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", next(new _AppError.AppError("Document Not Changed As No Values Given", 304)));

            case 2:
              if (req.query) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", next(new _AppError.AppError("Specify the Field with value Which has to updated in req query!!!", 422)));

            case 4:
              _context5.next = 6;
              return ModelName.findOneAndUpdate(req.query, req.body, {
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
                context: "query",
                "new": true
              });

            case 6:
              docx = _context5.sent;

              if (docx) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", next(new _AppError.AppError("Document with ".concat(req.params.id, " is not Found"), 500)));

            case 9:
              responseMessage.document = docx;
              responseMessage.updatedValue = req.body;
              res.status(202).json(responseMessage);

            case 12:
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

exports.updateDocumentByField = updateDocumentByField;

var deleteDocumentById = function deleteDocumentById(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
      var docx;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (req.params.id) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", next(new _AppError.AppError("Enter Id as params !!!", 406)));

            case 2:
              _context6.next = 4;
              return ModelName.findByIdAndDelete(req.params.id);

            case 4:
              docx = _context6.sent;

              if (docx) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", next(new _AppError.AppError("Request failed as nothing was found with given ID", 406)));

            case 7:
              responseMessage.deltedDocument = docx;
              res.status(200).json(responseMessage);

            case 9:
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

exports.deleteDocumentById = deleteDocumentById;