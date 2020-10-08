"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _path = require("path");

var _default = function _default() {
  return (0, _dotenv.config)({
    path: (0, _path.resolve)(__dirname, "../", ".env")
  });
};

exports["default"] = _default;