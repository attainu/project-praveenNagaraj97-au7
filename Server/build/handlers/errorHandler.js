"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalErrorHandler = exports.unCaughtExceptionErrorHandler = exports.serverCloser = exports.pageNotFoundError = void 0;

var _dotenvConfig = _interopRequireDefault(require("../config/dotenvConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenvConfig["default"])();

var pageNotFoundError = function pageNotFoundError(req, res, next) {
  res.status(404).json({
    message: "Page Not Found"
  });
}; // Unhandled and Uncaught Exceptions


exports.pageNotFoundError = pageNotFoundError;

var serverCloser = function serverCloser(server, mongooseConnection) {
  return server.close(function () {
    mongooseConnection.close();
    console.log("Server Closed");
  });
}; //   UnCaught Exception Handler


exports.serverCloser = serverCloser;

var unCaughtExceptionErrorHandler = function unCaughtExceptionErrorHandler(err) {
  console.log(err.name, err.message);
  console.log(err);
};

exports.unCaughtExceptionErrorHandler = unCaughtExceptionErrorHandler;

var handleMongoError = function handleMongoError(errName) {
  if (errName === "ValidationError") {
    return {
      errCode: 422
    };
  }

  if (errName === "CastError") {
    return {
      errCode: 422,
      errMsg: "Server doesn't accept this type of data"
    };
  }
};

var globalErrorHandler = function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message;
  err.stack = err.stack;

  if (err.name === "CastError") {
    var error = handleMongoError(err.name);
    err.statusCode = error.errCode;
    err.message = error.errMsg;
  }

  if (err.name === "ValidationError") {
    var _error = handleMongoError(err.name);

    err.statusCode = _error.errCode;
  }

  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "nothing to show";
  }

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      message: err.message,
      occuredAt: err.stack
    });
  }

  if (process.env.NODE_ENV === "production") {
    res.status(err.statusCode).json({
      message: err.message
    });
  }
};

exports.globalErrorHandler = globalErrorHandler;
console.log(process.env.NODE_ENV);