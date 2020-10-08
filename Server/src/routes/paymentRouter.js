import { Router } from "express";

import {
  buyProductsdeprecated,
  paymentSessiondeprecated,
  protectRoute,
  buyProducts,
  paymentIntent,
  retrievePaymentIntent,
  processOrder,
} from "../controller/paymentController";

export const paymentRouter = Router();

/**
 * @deprecated Template views only
 */
paymentRouter
  .route("/buyProducts")
  .post(protectRoute, buyProductsdeprecated, paymentSessiondeprecated);

paymentRouter
  .route("/buyProducts/paymentIntent")
  .post(protectRoute, buyProducts, paymentIntent);
