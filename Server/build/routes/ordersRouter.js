"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ordersRouter = void 0;

var _express = require("express");

var _orderController = require("../controller/orderController");

var ordersRouter = (0, _express.Router)();
exports.ordersRouter = ordersRouter;
ordersRouter.route("/buyProduct/retrieveIntent/:id").post(_orderController.protectRoute, _orderController.buyProducts, _orderController.retrievePaymentIntent, _orderController.processOrder);
ordersRouter.route("/getUserOrders").get(_orderController.protectRoute, _orderController.preFillGetUserOrders, _orderController.getOrders);
ordersRouter.route("/getManufacturerOrders").get(_orderController.protectRoute, _orderController.preFillGetManufacturerOrders, _orderController.getOrders);