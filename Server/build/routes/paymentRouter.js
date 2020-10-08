"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentRouter = void 0;

var _express = require("express");

var _paymentController = require("../controller/paymentController");

var paymentRouter = (0, _express.Router)();
/**
 * @deprecated Template views only
 */

exports.paymentRouter = paymentRouter;
paymentRouter.route("/buyProducts").post(_paymentController.protectRoute, _paymentController.buyProductsdeprecated, _paymentController.paymentSessiondeprecated);
paymentRouter.route("/buyProducts/paymentIntent").post(_paymentController.protectRoute, _paymentController.buyProducts, _paymentController.paymentIntent);