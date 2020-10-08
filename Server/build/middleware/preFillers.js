"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preFillGetManufacturerOrders = exports.preFillGetUserOrders = exports.preFillManufacturerWareHouseLocation = exports.preFillUserId = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var preFillUserId = function preFillUserId(req, res, next) {
  req.body.userId = req.user._id;
  next();
};

exports.preFillUserId = preFillUserId;

var preFillManufacturerWareHouseLocation = function preFillManufacturerWareHouseLocation(req, res, next) {
  if (_typeof(req.body.warehouseLocation) !== "object") {
    req.body.warehouseLocation = req.body.warehouseLocation.split(",");
  }

  req.body.warehouseLocation = req.body.warehouseLocation.map(function (each) {
    return Number(each);
  });
  req.body.warehouseLocation = {
    type: "Point",
    coordinates: req.body.warehouseLocation
  };
  next();
};

exports.preFillManufacturerWareHouseLocation = preFillManufacturerWareHouseLocation;

var preFillGetUserOrders = function preFillGetUserOrders(req, res, next) {
  req.query.userId = req.user._id;
  req.query.sort = "-createdAt";
  next();
};

exports.preFillGetUserOrders = preFillGetUserOrders;

var preFillGetManufacturerOrders = function preFillGetManufacturerOrders(req, res, next) {
  req.query.manufacturerId = req.user._id;
  req.query.sort = "-createdAt";
  next();
};

exports.preFillGetManufacturerOrders = preFillGetManufacturerOrders;