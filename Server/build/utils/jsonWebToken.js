"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyJWToken = exports.generateJWToken = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _dotenvConfig = _interopRequireDefault(require("../config/dotenvConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenvConfig["default"])();

var generateJWToken = function generateJWToken(payload) {
  var expiresIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "24h";
  return new Promise(function (resolve, reject) {
    (0, _jsonwebtoken.sign)(payload, process.env.JWT_PRIVATE_KEY, expiresIn === "infinite" ? {} : {
      algorithm: "HS256",
      expiresIn: expiresIn
    }, function (err, encoded) {
      if (err) reject(err);
      resolve(encoded);
    });
  });
};

exports.generateJWToken = generateJWToken;

var verifyJWToken = function verifyJWToken(token) {
  return new Promise(function (resolve, reject) {
    var verifyStatus = (0, _jsonwebtoken.verify)(token, process.env.JWT_PRIVATE_KEY);
    if (verifyStatus) return resolve(verifyStatus);
    reject("Token is Invalid");
  });
};

exports.verifyJWToken = verifyJWToken;