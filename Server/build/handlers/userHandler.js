"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manufacturerLoginHandler = exports.addManufacturerHandler = exports.employeeLoginHandler = exports.addDeveloperHandler = exports.changeUserPasswordHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.updateUserDetails = exports.restrictTo = exports.protectRoute = exports.signInHandler = exports.signUpHandler = void 0;

var _catchAsyncError = _interopRequireDefault(require("../utils/catchAsyncError"));

var _AppError = require("../utils/AppError");

var _jsonWebToken = require("../utils/jsonWebToken");

var _mailer = require("../utils/mailer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUpHandler = function signUpHandler(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var user, token, mailOptions, url, message;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return ModelName.create(req.body);

            case 2:
              user = _context.sent;
              _context.next = 5;
              return (0, _jsonWebToken.generateJWToken)({
                id: user._id
              }, req.body.expiresIn);

            case 5:
              token = _context.sent;
              mailOptions = {
                email: user.email,
                username: user.name
              };
              process.env.NODE_ENV === "production" ? url = "".concat(process.env.DEPLOY_LINK) : url = "".concat(process.env.LOCAL_DEPLOY_LINK);
              _context.next = 10;
              return new _mailer.Email(mailOptions, url).sendWelcome();

            case 10:
              message = responseMessage.message;
              res.status(201).json({
                message: message,
                token: token
              });

            case 12:
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

exports.signUpHandler = signUpHandler;

var signInHandler = function signInHandler(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var _req$body, email, password, user, token, message;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context2.next = 3;
              return ModelName.findOne({
                email: email
              }).select("+password");

            case 3:
              user = _context2.sent;

              if (user) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", next(new _AppError.AppError("No user Found With ".concat(email), 401)));

            case 6:
              if (!(user.userRole != "user")) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", next(new _AppError.AppError("You are not allowed here", 401)));

            case 8:
              _context2.next = 10;
              return user.comparePassword(password, user.password);

            case 10:
              if (_context2.sent) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", next(new _AppError.AppError("Entered Password is Wrong", 401)));

            case 12:
              _context2.next = 14;
              return (0, _jsonWebToken.generateJWToken)({
                id: user._id
              }, req.body.expiresIn);

            case 14:
              token = _context2.sent;
              message = responseMessage.message;
              res.status(202).json({
                user: user,
                message: message,
                token: token
              });

            case 17:
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

exports.signInHandler = signInHandler;

var protectRoute = function protectRoute(ModelName) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var auth_token, tokenDetails, user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (req.headers.authorization) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", next(new _AppError.AppError("Please Login First", 401)));

            case 2:
              if (!req.headers.authorization) {
                _context3.next = 5;
                break;
              }

              if (req.headers.authorization.startsWith("Bearer")) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", next(new _AppError.AppError("Bearer Token not Found", 401)));

            case 5:
              auth_token = req.headers.authorization.split("Bearer ")[1];
              _context3.next = 8;
              return (0, _jsonWebToken.verifyJWToken)(auth_token);

            case 8:
              tokenDetails = _context3.sent;
              _context3.next = 11;
              return ModelName.findById(tokenDetails.id);

            case 11:
              user = _context3.sent;

              if (user) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt("return", next(new _AppError.AppError("Authentication Error Invalid Token", 401)));

            case 14:
              req.user = user;
              next();

            case 16:
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

exports.protectRoute = protectRoute;

var restrictTo = function restrictTo() {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (roles.includes(req.user.userRole)) next();else next(new _AppError.AppError("You Are Not Allowed to this Operation", 404));
  };
};

exports.restrictTo = restrictTo;

var updateUserDetails = function updateUserDetails(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      var user;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!req.body.hasOwnProperty("password")) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", next(new _AppError.AppError("Not Allowed to change Password", 403)));

            case 2:
              _context4.next = 4;
              return ModelName.findByIdAndUpdate(req.user._id, req.body, {
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
                context: "query",
                "new": true
              });

            case 4:
              user = _context4.sent;

              if (user) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", next(new _AppError.AppError("No User Found with given Id", 404)));

            case 7:
              res.status(200).json({
                responseMessage: responseMessage,
                newDetails: user
              });

            case 8:
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

exports.updateUserDetails = updateUserDetails;

var forgotPasswordHandler = function forgotPasswordHandler(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      var user, resetToken, url, mailOptions;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return ModelName.findOne({
                email: req.body.email
              });

            case 2:
              user = _context5.sent;

              if (user) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return", next(new _AppError.AppError("No User Found with ".concat(req.body.email), 404)));

            case 5:
              _context5.next = 7;
              return user.createUserResetPasswordToken(user._id);

            case 7:
              resetToken = _context5.sent;
              process.env.NODE_ENV === "production" ? url = "".concat(process.env.DEPLOY_PASSWORD_RESET_LINK, "/").concat(resetToken) : url = "".concat(process.env.LOCAL_DEPLOY_PASSWORD_RESET_LINK, "/").concat(resetToken);
              mailOptions = {
                email: user.email,
                username: user.name
              };
              _context5.next = 12;
              return new _mailer.Email(mailOptions, url).sendResetPassword();

            case 12:
              if (process.env.NODE_ENV === "development") {
                responseMessage.resetToken = "".concat(req.protocol, "://").concat(req.get("host"), "/api/v1/user/resetPassword/").concat(resetToken);
              }

              res.send(responseMessage);

            case 14:
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

exports.forgotPasswordHandler = forgotPasswordHandler;

var resetPasswordHandler = function resetPasswordHandler(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
      var user, token;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(!req.body.password || !req.body.confirmPassword)) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", next(new _AppError.AppError("Provide Password and Confirm Password!!", 422)));

            case 2:
              if (!(req.body.password !== req.body.confirmPassword)) {
                _context6.next = 4;
                break;
              }

              return _context6.abrupt("return", next(new _AppError.AppError("Password didn't match !!", 422)));

            case 4:
              _context6.next = 6;
              return ModelName.findOne({
                "resetToken.token": req.params.token
              }).select("+password +resetToken");

            case 6:
              user = _context6.sent;

              if (user) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return", next(new _AppError.AppError("User Token Invalid", 403)));

            case 9:
              if (!(user.resetToken.timeStamp < Date.now())) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return", next(new _AppError.AppError("Reset Token Expired", 401)));

            case 11:
              _context6.next = 13;
              return user.comparePassword(req.body.password, user.password);

            case 13:
              if (!_context6.sent) {
                _context6.next = 15;
                break;
              }

              return _context6.abrupt("return", next(new _AppError.AppError("password is same as Previous password!!!", 418)));

            case 15:
              user.password = req.body.password;
              user.resetToken = undefined;
              _context6.next = 19;
              return user.save({
                validateBeforeSave: true
              });

            case 19:
              _context6.next = 21;
              return (0, _jsonWebToken.generateJWToken)({
                id: user._id
              }, req.body.expiresIn);

            case 21:
              token = _context6.sent;
              responseMessage.token = token;
              res.status(202).json(responseMessage);

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
}; // User has to be logged in


exports.resetPasswordHandler = resetPasswordHandler;

var changeUserPasswordHandler = function changeUserPasswordHandler(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
      var user;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (req.body.currentPassword) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return", next(new _AppError.AppError("Enter Current Password", 403)));

            case 2:
              if (!(!req.body.password || !req.body.confirmPassword)) {
                _context7.next = 4;
                break;
              }

              return _context7.abrupt("return", next(new _AppError.AppError("Provide Password and Confirm Password!!", 422)));

            case 4:
              if (!(req.body.password !== req.body.confirmPassword)) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", next(new _AppError.AppError("Password didn't match !!", 422)));

            case 6:
              if (!(req.body.currentPassword === req.body.password)) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", next(new _AppError.AppError("Password can't be changed as current password is same as the password you are requesting to change", 403)));

            case 8:
              _context7.next = 10;
              return ModelName.findById(req.user._id).select("+password");

            case 10:
              user = _context7.sent;
              _context7.next = 13;
              return user.comparePassword(req.body.currentPassword, user.password);

            case 13:
              if (_context7.sent) {
                _context7.next = 15;
                break;
              }

              return _context7.abrupt("return", next(new _AppError.AppError("Entered Password is Wrong", 403)));

            case 15:
              user.password = req.body.password;
              _context7.next = 18;
              return user.save();

            case 18:
              res.status(200).json(responseMessage);

            case 19:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x19, _x20, _x21) {
      return _ref7.apply(this, arguments);
    };
  }());
}; // Dev - Team Handler


exports.changeUserPasswordHandler = changeUserPasswordHandler;

var addDeveloperHandler = function addDeveloperHandler(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
      var randomPassword, employer, employerId, employeeDetail, mailOptions, url;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              // preCheck Owner With Password
              // Generate a random password for employer
              randomPassword = _toConsumableArray(Array(10)).map(function (i) {
                return (~~(Math.random() * 36)).toString(36);
              }).join("");
              req.body.password = randomPassword;
              req.body.confirmPassword = randomPassword;
              _context8.next = 5;
              return ModelName.create(req.body);

            case 5:
              employer = _context8.sent;

              if (employer) {
                _context8.next = 8;
                break;
              }

              return _context8.abrupt("return", next(new _AppError.AppError("Something went wrong while adding employer", 500)));

            case 8:
              // Create Employee ID
              employerId = "Lexa-".concat(employer.name.substring(0, 4), "-").concat(String(employer._id).substring(String(employer._id).length, 16));
              _context8.prev = 9;
              _context8.next = 12;
              return ModelName.findByIdAndUpdate(employer._id, {
                empId: employerId
              }, {
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
                context: "query",
                "new": true
              });

            case 12:
              employeeDetail = _context8.sent;
              _context8.next = 20;
              break;

            case 15:
              _context8.prev = 15;
              _context8.t0 = _context8["catch"](9);
              _context8.next = 19;
              return ModelName.findByIdAndUpdate(employer._id, {
                empId: "Lexa-".concat(employer.name.substring(0, 4), "-").concat(String(employer._id).substring(String(employer._id)))
              }, {
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
                context: "query",
                "new": true
              });

            case 19:
              employeeDetail = _context8.sent;

            case 20:
              mailOptions = {
                email: employeeDetail.email,
                username: employeeDetail.name
              };
              url = {
                empid: employerId,
                password: randomPassword
              };
              _context8.next = 24;
              return new _mailer.Email(mailOptions, url).sendNewEmployeeWelcome();

            case 24:
              // Mail which contails details about employee -ID which is MongoID
              res.status(201).json({
                message: responseMessage.message,
                employee_id: employerId,
                password: randomPassword,
                employeeDetail: employeeDetail
              });

            case 25:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[9, 15]]);
    }));

    return function (_x22, _x23, _x24) {
      return _ref8.apply(this, arguments);
    };
  }());
};

exports.addDeveloperHandler = addDeveloperHandler;

var employeeLoginHandler = function employeeLoginHandler(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res, next) {
      var employee, validPassword, token;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!(!req.body.employeeId || !req.body.password)) {
                _context9.next = 2;
                break;
              }

              return _context9.abrupt("return", next(new _AppError.AppError("Enter employeeId and Password", 422)));

            case 2:
              _context9.next = 4;
              return ModelName.findOne({
                empId: req.body.employeeId
              }).select("+password");

            case 4:
              employee = _context9.sent;

              if (employee) {
                _context9.next = 7;
                break;
              }

              return _context9.abrupt("return", next(new _AppError.AppError("Enter Valid Employee Id", 401)));

            case 7:
              _context9.next = 9;
              return employee.comparePassword(req.body.password, employee.password);

            case 9:
              validPassword = _context9.sent;

              if (validPassword) {
                _context9.next = 12;
                break;
              }

              return _context9.abrupt("return", next(new _AppError.AppError("Enter Password is wrong", 401)));

            case 12:
              _context9.next = 14;
              return (0, _jsonWebToken.generateJWToken)({
                id: employee._id
              }, "8h");

            case 14:
              token = _context9.sent;
              res.status(200).json({
                message: responseMessage.message,
                token: token,
                user: {
                  _id: employee._id,
                  userRole: employee.userRole,
                  name: employee.name,
                  techRole: employee.techRole,
                  email: employee.email
                }
              });

            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x25, _x26, _x27) {
      return _ref9.apply(this, arguments);
    };
  }());
};

exports.employeeLoginHandler = employeeLoginHandler;

var addManufacturerHandler = function addManufacturerHandler(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res, next) {
      var manufacturer, manufacturerId, manufacturerDetail, mailOptions, url;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return ModelName.create(req.body);

            case 2:
              manufacturer = _context10.sent;

              if (manufacturer) {
                _context10.next = 5;
                break;
              }

              return _context10.abrupt("return", next(new _AppError.AppError("Something went wrong while signingUp", 500)));

            case 5:
              // Create Employee ID
              manufacturerId = "Lexa-MFR-".concat(manufacturer.name.substring(0, 4), "-").concat(String(manufacturer._id).substring(String(manufacturer._id).length, 16));
              _context10.prev = 6;
              _context10.next = 9;
              return ModelName.findByIdAndUpdate(manufacturer._id, {
                mfrId: manufacturerId
              }, {
                upsert: true,
                runValidators: false,
                setDefaultsOnInsert: true,
                context: "query",
                "new": true
              });

            case 9:
              manufacturerDetail = _context10.sent;
              _context10.next = 17;
              break;

            case 12:
              _context10.prev = 12;
              _context10.t0 = _context10["catch"](6);
              _context10.next = 16;
              return ModelName.findByIdAndUpdate(manufacturer._id, {
                mfrId: "Lexa-MFR-".concat(manufacturer.name.substring(0, 4), "-").concat(String(manufacturer._id).substring(String(manufacturer._id)))
              }, {
                upsert: true,
                runValidators: false,
                setDefaultsOnInsert: true,
                context: "query",
                "new": true
              });

            case 16:
              manufacturerDetail = _context10.sent;

            case 17:
              mailOptions = {
                email: manufacturerDetail.email,
                username: manufacturerDetail.name
              };
              url = {
                mfrid: manufacturerId
              };
              _context10.next = 21;
              return new _mailer.Email(mailOptions, url).sendNewManufacturerWelcome();

            case 21:
              // Mail which contails details about employee -ID which is MongoID
              res.status(201).json({
                message: responseMessage.message
              });

            case 22:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[6, 12]]);
    }));

    return function (_x28, _x29, _x30) {
      return _ref10.apply(this, arguments);
    };
  }());
};

exports.addManufacturerHandler = addManufacturerHandler;

var manufacturerLoginHandler = function manufacturerLoginHandler(ModelName, responseMessage) {
  return (0, _catchAsyncError["default"])( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res, next) {
      var manufacturer, validPassword, token;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (!(!req.body.manufacturerId || !req.body.password)) {
                _context11.next = 2;
                break;
              }

              return _context11.abrupt("return", next(new _AppError.AppError("Enter manufacturerId and Password", 422)));

            case 2:
              _context11.next = 4;
              return ModelName.findOne({
                mfrId: req.body.manufacturerId
              }).select("+password");

            case 4:
              manufacturer = _context11.sent;

              if (manufacturer) {
                _context11.next = 7;
                break;
              }

              return _context11.abrupt("return", next(new _AppError.AppError("Enter Valid manufacturer Id", 401)));

            case 7:
              _context11.next = 9;
              return manufacturer.comparePassword(req.body.password, manufacturer.password);

            case 9:
              validPassword = _context11.sent;

              if (validPassword) {
                _context11.next = 12;
                break;
              }

              return _context11.abrupt("return", next(new _AppError.AppError("Enter Password is wrong", 401)));

            case 12:
              _context11.next = 14;
              return (0, _jsonWebToken.generateJWToken)({
                id: manufacturer._id
              }, req.body.expiresIn || "24h");

            case 14:
              token = _context11.sent;
              res.status(200).json({
                message: responseMessage.message,
                token: token,
                user: {
                  _id: manufacturer._id,
                  userRole: manufacturer.userRole,
                  name: manufacturer.name,
                  email: manufacturer.email
                }
              });

            case 16:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x31, _x32, _x33) {
      return _ref11.apply(this, arguments);
    };
  }());
};

exports.manufacturerLoginHandler = manufacturerLoginHandler;