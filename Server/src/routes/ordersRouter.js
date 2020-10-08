import { Router } from "express";

import {
  protectRoute,
  buyProducts,
  getOrders,
  retrievePaymentIntent,
  processOrder,
  preFillGetUserOrders,
  preFillGetManufacturerOrders,
} from "../controller/orderController";

export const ordersRouter = Router();

ordersRouter
  .route("/buyProduct/retrieveIntent/:id")
  .post(protectRoute, buyProducts, retrievePaymentIntent, processOrder);

ordersRouter
  .route("/getUserOrders")
  .get(protectRoute, preFillGetUserOrders, getOrders);

ordersRouter
  .route("/getManufacturerOrders")
  .get(protectRoute, preFillGetManufacturerOrders, getOrders);
